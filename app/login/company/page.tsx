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
import { toast } from "@/hooks/use-toast";
import { CompanyForgotPasswordModal } from "@/components/modals/CompanyForgotPasswordModal";
import { useAuth } from "@/lib/contexts/AuthContext";
import { REGISTER_COMPANY_PAGE } from "@/lib/const/consts";

export default function CompanyLoginPage() {
  const router = useRouter();
  const { user, login } = useCompanyAuth();
  const { user: chefUser, logout: chefUserLogout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

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
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const loggedinUser = await login(data.email, data.password);

      if (!loggedinUser?.is_verified) {
        // ユーザーが未認証の場合はメール認証ページにリダイレクト
        router.push("/register/company-verify-email");
        toast({
          title: "ログインしました",
          description: "メール認証を完了してください。",
        });
      } else if (loggedinUser?.companies_id == null) {
        router.push("/register/company-profile");
        toast({
          title: "ログインしました",
          description: "会社プロフィールを登録してください",
        });
      } else {
        router.push("/admin");
        toast({
          title: "ログインしました",
          description: "ダッシュボードに移動します。",
        });
      }
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
              alt="CHEFDOM Logo"
              width={120}
              height={30}
              className="text-orange-500"
            />
          </Link>
          <Link href={REGISTER_COMPANY_PAGE}>
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
                  href={REGISTER_COMPANY_PAGE}
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
