"use client";

import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useGetWorksessionsByUserIdByTodo } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserIdByTodo";
import { motion } from "framer-motion";
import Image from "next/image";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorPage } from "@/components/layout/ErrorPage";

export default function ChefDashboard() {
  const { user } = useAuth();

  // ワークセッションの取得
  const {
    data: workSessionsData,
    isLoading: isWorkSessionsLoading,
    error: workSessionsError,
  } = useGetWorksessionsByUserIdByTodo({
    userId: user?.id,
  });

  const upcomingJobs =
    workSessionsData?.filter((session) => session.status === "SCHEDULED") ?? [];

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
        message="ダッシュボードを読み込んでいます..."
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          ようこそ、{user?.name || "ゲスト"}さん
        </h1>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">次のお仕事</h2>
        {upcomingJobs && upcomingJobs.length > 0 ? (
          upcomingJobs.map((session) => (
            <Link
              key={session.id}
              href={`/chef/job/${session.job_id}`}
              className="block">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {format(new Date(session.job.work_date), "MM/dd (E)", {
                        locale: ja,
                      })}
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-500">
                      {format(new Date(session.job.start_time), "HH:mm")} 〜{" "}
                      {format(new Date(session.job.end_time), "HH:mm")}
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
          <div className="bg-gray-50 rounded-lg p-8 text-center space-y-4">
            <motion.div className="flex justify-center">
              <Image
                src="/chef_illust/chef_search_image.png"
                alt="No jobs"
                width={80}
                height={80}
              />
            </motion.div>
            <p className="text-gray-500 text-sm">次のお仕事は未定です</p>

            <Link href="/">
              <Button className="w-full py-3 text-base font-bold bg-[#DB3F1C] hover:bg-[#B83214] text-white rounded-lg transition shadow-md">
                お仕事を探す
              </Button>
            </Link>
          </div>
        )}
        {/* 追加: 連携促進カード */}
        {user && (
          <div className="mx-auto pb-8 space-y-4">
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
    </div>
  );
}
