"use client";

import Link from "next/link";
import { Edit } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useGetWorksessionsByUserIdByTodo } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserIdByTodo";

export default function TodosPage() {
  const { user } = useAuth();

  // ワークセッションの取得
  const { data: workSessionsData } = useGetWorksessionsByUserIdByTodo({
    userId: user?.id?.toString(),
  });

  const inProgressJobs =
    workSessionsData?.filter((session) => session.status === "IN_PROGRESS") ??
    [];

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
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border-l-4 border-indigo-400 rounded-lg shadow-md p-6 flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 bg-indigo-500 text-white rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-bold text-indigo-700 text-lg mb-1">
                  Stripe連携が必要です
                </div>
                <div className="text-gray-700 mb-2">
                  Stripe連携を完了しないと審査が進みません。下記ボタンから連携をお願いします。
                </div>
                <Link href="/chef/profile">
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded transition">
                    Stripe連携ページへ
                  </button>
                </Link>
              </div>
            </div>
          )}
          {/* LINE未連携カード */}
          {!user.line_user_id && (
            <div className="bg-gradient-to-r from-green-100 to-teal-100 border-l-4 border-teal-400 rounded-lg shadow-md p-6 flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 bg-teal-500 text-white rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M12 15v-6m0 0l-3 3m3-3l3 3"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-bold text-teal-700 text-lg mb-1">
                  LINE連携で便利に！
                </div>
                <div className="text-gray-700 mb-2">
                  LINEを連携すると、お仕事の通知がLINEで届くようになりとても便利です。ぜひ連携しましょう！
                </div>
                <Link href="/chef/line-connect">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition">
                    LINE連携ページへ
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
