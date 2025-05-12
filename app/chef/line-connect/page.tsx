"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function LineConnectPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLineConnect = async () => {
    setIsLoading(true);
    setError(null);
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

      // ここでAPIに連携リクエスト
      const res = await fetch("/api/connect-line-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id,
          line_user_id: profile.userId,
          line_display_name: profile.displayName,
          user_type: "chef",
        }),
      });
      if (res.ok) {
        router.push("/chef/profile");
      } else {
        setError("連携に失敗しました");
      }
    } catch (e) {
      setError("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>LINE連携</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLineConnect} disabled={isLoading}>
            {isLoading ? "連携中..." : "LINEと連携する"}
          </Button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
