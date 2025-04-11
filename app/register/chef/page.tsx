"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { register } from "@/lib/api/user";
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

export default function ChefRegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

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
              src="/chef_illust/chef_logo.png?height=200&width=400"
              alt="CookChef Logo"
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
                href="/register/company"
                className="text-sm text-primary hover:underline">
                企業アカウントの登録はこちら
              </Link>
            </div>
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
