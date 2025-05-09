"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CheckCircle, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/contexts/AuthContext";
import { checkStripeAccount } from "@/lib/api/user";

export default function OnboardingCompletePage() {
  const { user, reloadUser } = useAuth();
  const [status, setStatus] = useState<
    "loading" | "verified" | "pending" | "error"
  >("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyStatus = async () => {
      if (!user?.id) {
        setStatus("error");
        setMessage("ユーザー情報が見つかりません。");
        return;
      }

      try {
        const res = await checkStripeAccount(user.id);

        if (res.user.stripe_verified) {
          reloadUser();
          setStatus("verified");
          setMessage(
            "おめでとうございます！Stripeアカウントの設定が完了しました。"
          );
        } else {
          setStatus("pending");
          setMessage("Stripeアカウントの設定が完了していません。");
        }
      } catch (error) {
        console.error("Error:", error);
        setStatus("error");
        setMessage("ステータスの確認中にエラーが発生しました。");
      }
    };

    verifyStatus();
  }, [user?.id]);

  if (status === "loading") {
    return <LoadingScreen message="アカウント状態を確認しています..." />;
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4">
            {status === "verified" ? (
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            ) : status === "pending" ? (
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                <Clock className="h-10 w-10 text-amber-600" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-600">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
            )}
          </div>
          <CardTitle
            className={cn(
              "text-xl",
              status === "verified" && "text-green-700",
              status === "pending" && "text-amber-700",
              status === "error" && "text-red-700"
            )}>
            {status === "verified"
              ? "登録完了"
              : status === "pending"
                ? "登録処理中"
                : "エラーが発生しました"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-muted-foreground">{message}</p>

          {status === "pending" && (
            <div className="mt-6 bg-amber-50 p-4 rounded-lg text-sm text-amber-800">
              <p className="font-medium mb-2">以下をご確認ください：</p>
              <ul className="text-left list-disc pl-5 space-y-1">
                <li>すべての必須情報が入力されているか</li>
                <li>本人確認書類が正しくアップロードされているか</li>
                <li>銀行口座情報が正確か</li>
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {status === "verified" ? (
            <Button asChild className="w-full">
              <Link href="/chef/dashboard">
                ダッシュボードへ戻る <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : status === "pending" ? (
            <>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href="https://dashboard.stripe.com/account"
                  target="_blank"
                  rel="noopener noreferrer">
                  Stripeダッシュボードで続ける
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/chef/dashboard">後で完了する</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="w-full">
                <Link href="/chef/onboard">再試行する</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/chef/contact">サポートに問い合わせる</Link>
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
