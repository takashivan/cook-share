"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getApi } from "@/api/api-factory";
import { LinkLineId } from "@/api/__generated__/LINE/LinkLineId";

export default function LinkAccountPage() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const doLink = async () => {
      try {
        // ユーザー読み込み前、または、LINEアカウントが既に連携されている場合は何もしない
        if (!user || user.line_user_id !== '') {
          return;
        }

        const liff = (await import("@line/liff")).default;
        await liff.init({
          liffId: "2007239287-yqkpjQBl",
          withLoginOnExternalBrowser: true,
        });
        const profile = await liff.getProfile();
        // LinkLineIdを使ってAPI連携
        const linkLineIdApi = getApi(LinkLineId);
        const response = await linkLineIdApi.linkLineIdCreate({
          user_id: user?.id || "",
          line_user_id: profile.userId,
          name: profile.displayName,
          picture: profile.pictureUrl || ""
        });

        if (response.data) {
          router.push("/chef/dashboard");
          setUser(response.data);
        } else {
          setError("連携に失敗しました");
        }
      } catch (error: any) {
        setError(error.response?.data.message || "エラーが発生しました。もう一度お試しください。");
      } finally {
        setIsLoading(false);
      }
    };
    doLink();
  }, [router, user, setUser]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            LINEアカウント連携
          </h2>
          <p className="text-gray-600">
            {isLoading
              ? "連携中..."
              : error
              ? error
              : "LINEアカウントと連携します。"}
          </p>
        </div>
      </Card>
    </div>
  );
}
