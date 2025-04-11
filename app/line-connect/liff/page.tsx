"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckLineUser } from "@/lib/api/line";

export default function LiffPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const lineUserId = searchParams.get("line_user_id");
    const name = searchParams.get("name");
    const picture = searchParams.get("picture");

    if (!lineUserId || !name || !picture) return; // クエリが揃うまで待機

    const checkLineUser = async () => {
      try {
        const response = await CheckLineUser(lineUserId);

        if (response) {
          router.push("/chef/line-connect/link");
        } else {
          router.push(
            `/chef/line-connect/link?line_user_id=${lineUserId}&name=${name}&picture=${picture}`
          );
        }
      } catch (error) {
        console.error("Failed to check line user:", error);
      } finally {
        setLoaded(true);
      }
    };

    checkLineUser();
  }, [searchParams, router]);

  return <div>{loaded ? "リダイレクト中..." : "Loading..."}</div>;
}
