"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckLineUser } from "@/lib/api/line";

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

        if (response) {
          router.push("/line-connect/link");
        } else {
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

  return <div>{loaded ? "リダイレクト中..." : "Loading..."}</div>;
}
