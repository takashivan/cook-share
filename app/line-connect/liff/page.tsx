"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckLineUser } from "@/lib/api/line";
import Image from "next/image";

export default function LiffPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const run = async () => {
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
        const lineUserId = profile.userId;
        const name = profile.displayName;
        const picture = profile.pictureUrl;

        const response = await CheckLineUser(lineUserId);
        console.log("CheckLineUser response:", response); // デバッグ用

        // レスポンスの構造に応じて条件を修正
        if (response && response.count > 0) {
          // 既に連携されている場合
          router.push("/chef/dashboard");
        } else {
          // 未連携の場合
          router.push(
            `/line-connect/link?line_user_id=${encodeURIComponent(lineUserId || "")}&name=${encodeURIComponent(name || "")}&picture=${encodeURIComponent(picture || "")}`
          );
        }
      } catch (error) {
        console.error("LIFF Error:", error);
      } finally {
        setLoaded(true);
      }
    };

    run();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06C755] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <Image
            src="/chef_illust/chef_logo.png"
            alt="CookChef Logo"
            width={200}
            height={50}
            className="mx-auto"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-[#06C755] border-t-transparent rounded-full animate-spin"></div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">
              {loaded ? "アカウント連携中..." : "LINEログイン中..."}
            </h2>
            <p className="text-gray-600 text-sm">
              {loaded
                ? "アカウントの連携を処理しています。少々お待ちください..."
                : "LINEアカウントでログインしています。少々お待ちください..."}
            </p>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          <p>Powered by LINE</p>
        </div>
      </div>
    </div>
  );
}
