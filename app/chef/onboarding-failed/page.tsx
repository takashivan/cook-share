"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, HelpCircle } from "lucide-react";

export default function OnboardingFailedPage() {
  return (
    <div className="container mx-auto max-w-md py-12">
      <Card className="border-2 border-red-200">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-xl text-red-700">
            登録プロセスが中断されました
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-muted-foreground mb-6">
            Stripeアカウントの設定プロセスが完了しませんでした。以下の理由が考えられます：
          </p>

          <div className="bg-red-50 p-4 rounded-lg text-sm text-red-800 text-left">
            <ul className="list-disc pl-5 space-y-2">
              <li>プロセスが途中でキャンセルされた</li>
              <li>セッションの有効期限が切れた</li>
              <li>必要な情報の入力中に問題が発生した</li>
              <li>ネットワーク接続の問題</li>
            </ul>
          </div>

          <div className="mt-6 p-4 border rounded-lg border-gray-200 text-sm">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground text-left">
                心配しないでください。いつでも再度登録プロセスを開始できます。サポートが必要な場合はお問い合わせください。
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/chef/onboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              登録プロセスを再開する
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/chef/contact">サポートに問い合わせる</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/chef/dashboard">ダッシュボードに戻る</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
