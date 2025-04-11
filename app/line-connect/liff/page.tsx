"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckLineUser, LinkLineId } from "@/lib/api/line";

export default function LiffPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lineUserId = searchParams.get("line_user_id");
  const name = searchParams.get("name");
  const picture = searchParams.get("picture");

  useEffect(() => {
    const checkLineUser = async () => {
      if (lineUserId) {
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
        }
      }
    };

    checkLineUser();
  }, [lineUserId, name, picture, router]);

  return <div>Loading...</div>;
}
