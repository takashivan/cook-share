"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingScreen } from "@/components/LoadingScreen";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  DollarSign,
  Shield,
  JapaneseYenIcon,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/contexts/AuthContext";
import { createStripeAccountLink } from "@/lib/api/user";

export default function OnboardPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handleOnboard = async () => {
    setLoading(true);
    try {
      // 実際の実装では、認証済みユーザーからchef_idを取得します
      const user_id = user?.id;
      console.log(user_id);
      if (!user_id) {
        throw new Error("ユーザーIDが見つかりません");
      }
      const res = await createStripeAccountLink(user_id);

      if (res.response.result.url) {
        window.location.href = res.response.result.url;
      } else {
        throw new Error("リンク取得に失敗しました");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("エラーが発生しました。もう一度お試しください。");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Stripeに接続しています..." />;
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          お支払い情報の登録
        </h1>
        <p className="text-muted-foreground">
          安全かつ迅速にお支払いを受け取るために、Stripeアカウントを設定しましょう
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-full bg-primary/10">
                <JapaneseYenIcon className="h-6 w-6 text-primary" />
              </div>
              <Image
                src="/chef_illust/chef_logo.png?height=200&width=400"
                alt="CHEFDOM"
                width={100}
                height={40}
                className="object-contain"
              />
            </div>
            <CardTitle>Stripeアカウント登録</CardTitle>
            <CardDescription>
              CHEFDOMでの収入を受け取るために必要な手続きです
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">簡単セットアップ</h3>
                <p className="text-sm text-muted-foreground">
                  数分で完了する簡単な手続きです
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">安全な情報管理</h3>
                <p className="text-sm text-muted-foreground">
                  あなたの情報は暗号化され安全に保管されます
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">迅速な支払い</h3>
                <p className="text-sm text-muted-foreground">
                  仕事完了後、迅速に報酬が振り込まれます
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleOnboard} className="w-full gap-2">
              Stripe登録を始める
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="p-2 w-fit rounded-full bg-blue-100 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">安全なプラットフォーム</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stripeは世界中で信頼されている決済プラットフォームです。あなたの個人情報と銀行情報は最高レベルのセキュリティで保護されます。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="p-2 w-fit rounded-full bg-amber-100 mb-2">
                <CreditCard className="h-5 w-5 text-amber-600" />
              </div>
              <CardTitle className="text-lg">必要な情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                登録には以下の情報が必要です：
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>本人確認書類（運転免許証など）</li>
                <li>銀行口座情報</li>
                <li>住所情報</li>
                <li>連絡先情報</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-sm text-center text-muted-foreground mt-4">
            <p>この手続きは初回のみ必要です</p>
            <p>
              質問がある場合は
              <a href="/chef/contact" className="text-primary underline">
                サポートチーム
              </a>
              にお問い合わせください
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
