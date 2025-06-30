import { LoginCreateData } from "@/api/__generated__/authentication/data-contracts";
import { CheckLineFriendshipStatus } from "@/api/__generated__/LINE/CheckLineFriendshipStatus";
import { getApi } from "@/api/api-factory";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LineConnectCardProps {
  user: LoginCreateData["user"]
}

export function LineConnectCard({ user }: LineConnectCardProps) {
  const [isFriend, setIsFriend] = useState<boolean>(true);

  useEffect(() => {
    const checkLineFriendship = async () => {
      if (user?.line_user_id) {
        try {
          const lineApi = getApi(CheckLineFriendshipStatus);
          const response = await lineApi.checkLineFriendshipStatusDetail(user.line_user_id, {
            headers: {
              "X-User-Type": "chef"
            }
          });
          setIsFriend(response.data as unknown as boolean);
        } catch (error) {
          console.error("Error checking LINE friendship status:", error);
        }
      }
    };

    checkLineFriendship();
  }, [user]);

  if (user.line_user_id && isFriend) {
    // LINEアカウントが連携済みかつ友達の場合は何も表示しない
    return null;
  }

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: "0 8px 32px rgba(0,200,100,0.10)",
      }}
      className="flex items-center bg-white rounded-lg shadow p-4 mb-4 transition">
      <div className="flex-shrink-0 mr-4">
        <Image
          src="/logos/LINE.png"
          alt="LINE"
          width={40}
          height={40}
        />
      </div>
      <div className="flex-1">
        {!user.line_user_id ? (
          <>
            <div className="font-semibold text-gray-900 mb-1">
              LINE連携で通知を受け取ろう
            </div>
            <div className="text-gray-500 text-sm mb-2">
              LINE連携でお仕事の通知が届きます。
            </div>
            <Link href="/chef/line-connect/liff">
              <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">
                連携する
              </button>
            </Link>
          </>
        ) : !isFriend ? (
          <>
            <div className="font-semibold text-gray-900 mb-1">
              友だち追加で通知を受け取ろう
            </div>
            <div className="text-gray-500 text-sm mb-2">
              友だち追加でお仕事の通知が届きます。
            </div>
            <Link href="https://lin.ee/rx7F2P6" target="_blank" rel="noopener noreferrer">
              <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">
                友だち追加する
              </button>
            </Link>
          </>
        ) : null}
      </div>
    </motion.div>
  )
}
