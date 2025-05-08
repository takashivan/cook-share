"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { login } from "@/lib/api/companyUser";
import { toast } from "@/hooks/use-toast";
import { CompanyForgotPasswordModal } from "@/components/modals/CompanyForgotPasswordModal";

export default function CompanyLoginPage() {
  const router = useRouter();
  const { login: authLogin } = useCompanyAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const response = await login(data);
      console.log("Login response:", response);
      await authLogin(response.sessionToken, response.user);

      toast({
        title: "ログインしました",
        description: "ダッシュボードに移動します。",
      });

      router.push("/admin");
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "エラーが発生しました",
        description: "メールアドレスまたはパスワードが正しくありません。",
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
              src="/chef_illust/chef_logo.png"
              alt="CookChef Logo"
              width={120}
              height={30}
              className="text-orange-500"
            />
          </Link>
          <Link href="/register/company">
            <Button variant="outline" size="sm" className="border-gray-300">
              企業登録
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">企業ログイン</CardTitle>
            <CardDescription>
              アカウントにログインして、求人を管理しましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@company.jp"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">パスワード</Label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordModalOpen(true)}
                    className="text-xs text-primary underline underline-offset-4">
                    パスワードをお忘れですか？
                  </button>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "ログイン中..." : "ログイン"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                企業アカウントをお持ちでないですか？{" "}
                <Link
                  href="/register/company"
                  className="text-primary underline underline-offset-4">
                  企業登録
                </Link>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                シェフの方はこちら{" "}
                <Link
                  href="/login"
                  className="text-primary underline underline-offset-4">
                  シェフログイン
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <CompanyForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />

      <footer className="border-t py-6"></footer>
    </div>
  );
}
