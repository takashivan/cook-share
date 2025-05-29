"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/contexts/AuthContext";
import { LinkLineId } from "@/lib/api/line";

export default function LinkAccountPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const doLink = async () => {
      try {
        const liff = (await import("@line/liff")).default;
        await liff.init({
          liffId: "2007239287-yqkpjQBl",
          withLoginOnExternalBrowser: true,
        });
        const profile = await liff.getProfile();
        // LinkLineIdを使ってAPI連携
        const response = await LinkLineId(
          user?.id || "",
          profile.userId,
          profile.displayName,
          profile.pictureUrl || ""
        );
        if (response.user) {
          router.push("/chef/dashboard");
        } else {
          setError(response.message || "連携に失敗しました");
        }
      } catch (e) {
        setError("エラーが発生しました。もう一度お試しください。");
      } finally {
        setIsLoading(false);
      }
    };
    doLink();
  }, [router, user]);

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
