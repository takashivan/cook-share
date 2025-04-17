"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { verifyEmail } from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { changeEmail } from "@/lib/api/companyUser";
import { confirmEmail } from "@/lib/api/companyUser";

export default function ChefVerifyChangeEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const user_id = searchParams.get("user_id");
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const verifyingEmail = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("無効な認証情報です");
        return;
      }

      try {
        await confirmEmail(token);
        setStatus("success");
      } catch (error) {
        console.error("Email verification failed:", error);
        setStatus("error");
        setErrorMessage("メール認証に失敗しました");
      }
    };

    verifyingEmail();
  }, [token, user_id]);

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
              <Button onClick={() => router.push("/login")} className="w-full">
                ログインページへ
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-red-600">{errorMessage}</p>
              <Button
                onClick={() => router.push("/chef/login")}
                className="w-full">
                ログインページへ
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
