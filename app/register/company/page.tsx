"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function CompanyRegisterPage() {
  const router = useRouter();
  const { register } = useCompanyAuth();
  const { user: chefUser, logout: chefUserLogout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // シェフユーザーがログインしている場合はログアウトする
      if (chefUser) {
        chefUserLogout();
      }

      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        company_name: formData.get("company_name") as string,
      };

      const response = await register(data);
      console.log("Registration response:", response);

      toast({
        title: "登録が完了しました",
        description: "会社プロフィールの登録に進みましょう。",
      });

      router.push("/register/company-verify-email");
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "エラーが発生しました",
        description: "登録に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/chef_illust/chef_logo.png?height=200&width=400"
              alt="CHEFDOM Logo"
              width={120}
              height={30}
              className="text-orange-500"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              会社ユーザー登録
            </CardTitle>
            <CardDescription>
              会社の情報を入力して、シェフとマッチングしましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="山田 太郎"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_name">会社名</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  type="text"
                  required
                  placeholder="株式会社〇〇"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "登録中..." : "登録する"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="mt-4 text-center">
          <Link
            href="/login/company"
            className="text-sm text-primary hover:underline">
            企業アカウントをお持ちの方はこちら
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/register/chef"
            className="text-sm text-primary hover:underline">
            シェフアカウントの登録はこちら
          </Link>
        </div>
      </main>
    </div>
  );
}
