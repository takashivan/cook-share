"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
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
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { SignupCreatePayload } from "@/api/__generated__/authentication/data-contracts";
import { REGISTER_COMPANY_PAGE } from "@/lib/const/consts";

export default function ChefRegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { user: companyUser, logout: companyUserLogout } = useCompanyAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Submitting form with:", { email, name });

    if (!validateEmail(email)) {
      setError("有効なメールアドレスを入力してください");
      setIsSubmitting(false);
      return;
    }

    try {
      // 企業ユーザーがログインしている場合はログアウトする
      if (companyUser) {
        companyUserLogout();
      }

      await register({ email, password } as SignupCreatePayload);

      toast({
        title: "認証メールを送信しました",
        description: "メールを確認してください",
      });

      router.push("/register/chef-verify-email");
    } catch (error: any) {
      console.error("Registration failed:", error);
      // APIからのエラーメッセージを表示
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "登録に失敗しました。入力内容を確認してください。";
      setError(errorMessage);
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
              シェフユーザー登録
            </CardTitle>
            <CardDescription>
              シェフとして登録して、お仕事を探しましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="山田 太郎"
                />
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@example.com"
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

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "登録中..." : "登録する"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link
                href="/login"
                className="text-sm text-primary hover:underline">
                シェフアカウントをお持ちの方はこちら
              </Link>
            </div>
            <div className="mt-4 text-center">
              <Link
                href={REGISTER_COMPANY_PAGE}
                className="text-sm text-primary hover:underline">
                企業アカウントの登録はこちら
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
