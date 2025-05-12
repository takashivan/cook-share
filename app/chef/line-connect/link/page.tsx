"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function ChefLineLinkPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const doLink = async () => {
      try {
        const liff = (await import("@line/liff")).default;
        await liff.init({
          liffId: "2007239287-yqkpjQBl",
          withLoginOnExternalBrowser: true,
        });
        const profile = await liff.getProfile();
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
    doLink();
  }, [router, user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>LINE連携</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            "連携中..."
          ) : error ? (
            <div className="text-red-500 mt-2">{error}</div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
