"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkLineUser } from "@/lib/api/line";

export default function LinkAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const lineUserId = searchParams.get("line_user_id");
  const name = searchParams.get("name");
  const picture = searchParams.get("picture");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await LinkLineUser({
        line_user_id: lineUserId || "",
        email,
        password,
      });

      if (response.success) {
        router.push("/line-connect/liff");
      } else {
        setError(response.message || "連携に失敗しました");
      }
    } catch (error) {
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <div className="mb-4">
            {picture && (
              <img
                src={picture}
                alt={name || ""}
                className="w-20 h-20 rounded-full mx-auto"
              />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {name}さん、ようこそ！
          </h2>
          <p className="text-gray-600">
            既存のアカウントと連携するために、ログイン情報を入力してください。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "連携中..." : "アカウントを連携"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => {
              router.push(
                `/line-connect/register?line_user_id=${encodeURIComponent(
                  lineUserId || ""
                )}&name=${encodeURIComponent(
                  name || ""
                )}&picture=${encodeURIComponent(picture || "")}`
              );
            }}>
            新規アカウントを作成する
          </Button>
        </div>
      </Card>
    </div>
  );
}
