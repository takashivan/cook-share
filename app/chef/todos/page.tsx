"use client";

import Link from "next/link";
import { Edit } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useGetWorksessionsByUserIdByTodo } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserIdByTodo";
import { motion } from "framer-motion";
import Image from "next/image";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function TodosPage() {
  const { user } = useAuth();

  // ワークセッションの取得
  const {
    data: workSessionsData,
    isLoading: isWorkSessionsLoading,
    error: workSessionsError,
  } = useGetWorksessionsByUserIdByTodo({
    userId: user?.id,
  });

  const inProgressJobs =
    workSessionsData?.filter((session) => session.status === "IN_PROGRESS") ??
    [];

  if (workSessionsError) {
    return (
      <div className="flex px-4">
        <ErrorPage />
      </div>
    );
  }

  if (isWorkSessionsLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="やることを読み込んでいます..."
      />
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold mb-6">やること</h1>
        {inProgressJobs.length > 0 ? (
          inProgressJobs.map((session) => (
            <Link
              key={session.id}
              href={`/chef/job/${session.job_id}`}
              className="block">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Edit className="h-5 w-5 text-gray-700" />
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    完了報告
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {format(new Date(session.created_at), "MM/dd (E)", {
                        locale: ja,
                      })}
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-500">
                      {format(new Date(session.check_in_time), "HH:mm")} 〜{" "}
                      {format(new Date(session.check_out_time), "HH:mm")}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 mb-1">
                  {session.job.restaurant.name}
                </div>
                <div className="font-medium">{session.job.title}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
            お疲れ様です！今はやることはありません。ゆっくり休んでください。
          </div>
        )}
      </div>

      {/* 追加: 連携促進カード */}
      {user && (
        <div className="container mx-auto px-4 pb-8 space-y-4">
          {/* Stripe未連携カード */}
          {user.stripe_verified === false && (
            <motion.div
              whileHover={{
                y: -4,
                boxShadow: "0 8px 32px rgba(80,80,200,0.10)",
              }}
              className="flex items-center bg-white rounded-lg shadow p-4 mb-4 transition">
              <div className="flex-shrink-0 mr-4">
                <Image
                  src="/logos/Stripe.png"
                  alt="Stripe"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  Stripe連携が必要です
                </div>
                <div className="text-gray-500 text-sm mb-2">
                  報酬受取にはStripe連携が必須です。
                </div>
                <Link href="/chef/account-settings">
                  <button className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">
                    連携する
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
          {/* LINE未連携カード */}
          {!user.line_user_id && (
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
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
