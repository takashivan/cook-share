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
import { register } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import API from "@/lib/api";
import { UserProfile } from "@/lib/api/user";
import { toast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        name: formData.get("name") as string,
      };

      const response = await register(data);
      await login(response.authToken, response.user);

      toast({
        title: "登録が完了しました",
        description: "プロフィールの登録に進みましょう。",
      });

      router.push("/register/chef-profile");
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
              src="/placeholder.svg?height=30&width=30"
              alt="CookChef Logo"
              width={30}
              height={30}
              className="text-orange-500"
            />
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" className="border-gray-300">
              ログイン
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">アカウント登録</CardTitle>
            <CardDescription>
              シェフとして登録して、あなたのスキルを活かせる仕事を見つけましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input id="name" name="name" placeholder="山田 太郎" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@cookchef.jp"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input id="password" name="password" type="password" required />
                <p className="text-xs text-muted-foreground">
                  8文字以上で、英字・数字を含めてください
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                次へ
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                すでにアカウントをお持ちですか？{" "}
                <Link
                  href="/login"
                  className="text-primary underline underline-offset-4">
                  ログイン
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© cookchef Co.,Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
