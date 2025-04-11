"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LinkLineId } from "@/lib/api/line";
import { getAuthToken } from "@/lib/api/config";

export default function LinkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lineUserId = searchParams.get("line_user_id");
  const name = searchParams.get("name");
  const picture = searchParams.get("picture");
  const [isLoading, setIsLoading] = useState(false);

  const handleLink = async () => {
    if (!lineUserId || !name) return;

    setIsLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        router.push("/login");
        return;
      }

      await LinkLineId(lineUserId, name, picture || "");
      router.push("/chef/mypage");
    } catch (error) {
      console.error("Failed to link line account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>LINEアカウント連携</h1>
      {name && <p>ようこそ、{name}さん</p>}
      <button onClick={handleLink} disabled={isLoading}>
        {isLoading ? "連携中..." : "連携する"}
      </button>
    </div>
  );
}
