"use client";


import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
=======
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LinkLineId } from "@/lib/api/line";
import { login } from "@/lib/api/user";
import Image from "next/image";

export default function LinkPage() {
  const router = useRouter();

  const [lineUserId, setLineUserId] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const liff = (await import("@line/liff")).default;
        await liff.init({
          liffId: "2007239287-yqkpjQBl",
          withLoginOnExternalBrowser: true,
        });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const profile = await liff.getProfile();
        setLineUserId(profile.userId);
        setName(profile.displayName);
        setPicture(profile.pictureUrl || "");
      } catch (err) {
        console.error("LIFF初期化エラー:", err);
      }
    };
    init();
  }, []);

  const handleLink = async () => {
    if (!lineUserId || !name || !email || !password) return;

    setIsLoading(true);
    try {
      // ① メール＋パスワードでログイン
      const loginRes = await login({ email, password });
      if (!loginRes.authToken) {
        alert("ログイン失敗しました");
        return;
      }

      // ② LINE IDを紐づける（トークン付きで）
      await LinkLineId(lineUserId, name, picture, loginRes.authToken);
      router.push("/chef/mypage");
    } catch (error) {
      console.error("連携失敗:", error);

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
                )}&name=${encodeURIComponent(name || "")}&picture=${encodeURIComponent(
                  picture || ""
                )}`
              );
            }}>
            新規アカウントを作成する
          </Button>
        </div>
      </Card>

    <div className="min-h-screen bg-[#06C755] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="mb-6 text-center">
          <Image
            src="/chef_illust/chef_logo.png"
            alt="CookChef Logo"
            width={200}
            height={50}
            className="mx-auto"
          />
        </div>

        <div className="space-y-6">
          {name && (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                アカウント連携
              </h1>
              <p className="text-gray-600 mt-2">
                こんにちは、<span className="font-medium">{name}</span>さん
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                placeholder="登録済みのメールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#06C755] focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#06C755] focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <button
            onClick={handleLink}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#06C755] text-white font-medium rounded-lg hover:bg-[#05b34d] focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                連携中...
              </div>
            ) : (
              "連携する"
            )}
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Powered by LINE</p>
        </div>
      </div>

    </div>
  );
}
