"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function VerifyEmailPage() {
  const { user, loading, confirmEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current || loading) return;

    const verifyingEmail = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("無効な認証情報です");
        return;
      }

      // ログインユーザーがいない場合はログインしてから再試行するよう促す
      if (!user) {
        setStatus("error");
        setErrorMessage("ログイン後、再度お試しください。");
        return;
      }

      // メールアドレスが変更されていない場合はダッシュボードへリダイレクト
      if (!user?.pending_email) {
        router.push("/chef/dashboard");
        return;
      }

      try {
        await confirmEmail(token);
        setStatus("success");
        hasRun.current = true;
      } catch (error) {
        console.error("Email verification failed:", error);
        setStatus("error");
        setErrorMessage("メール認証に失敗しました");
      }
    };

    verifyingEmail();
  }, [token, user, confirmEmail, router, loading]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex justify-center mb-8">
        <Image
          src="/chef_illust/chef_logo.png"
          alt="Chef Logo"
          width={200}
          height={200}
          priority
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>メールアドレス認証</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "verifying" && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>認証中...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-green-600">
                メールアドレスの認証が完了しました
              </p>
              <Button
                onClick={() => router.push("/chef/dashboard")}
                className="w-full">
                ダッシュボードへ
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-red-600">{errorMessage}</p>
              <Button onClick={() => router.push("/login")} className="w-full">
                ログインページへ
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
