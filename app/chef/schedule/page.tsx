"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { useGetWorksessionsByUserId } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserId";
import { WorksessionsListResult } from "@/api/__generated__/base/data-contracts";
import { useSubscriptionUnreadMessagesByUser } from "@/hooks/api/user/messages/useSubscriptionUnreadMessagesByUser";
import { Badge } from "@/components/ui/badge";
import { formatJapanHHMM } from "@/lib/functions";
import { Star } from "lucide-react";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useGetRestaurantReviewsByUserId } from "@/hooks/api/user/restaurantReviews/useGetRestaurantReviewsByUserId";

export default function SchedulePage() {
  const { user } = useAuth();

  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "upcoming";
  const initialSubTab = searchParams.get("subTab") || "cancelledByUser";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeCanceledTab, setActiveCanceledTab] = useState(initialSubTab);

  // ワークセッション一覧の取得
  const {
    data: workSessions,
    isLoading: isWorkSessionsLoading,
    error: workSessionsError,
  } = useGetWorksessionsByUserId({
    userId: user?.id,
  });

  // レビューの取得
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useGetRestaurantReviewsByUserId({
    userId: user?.id,
  });

  // 未読メッセージの取得
  const {
    unreadMessagesData,
    isLoading: isUnreadMessagesLoading,
    error: unreadMessagesError,
  } = useSubscriptionUnreadMessagesByUser({
    userId: user?.id,
  });

  const sortedWorkSessions = workSessions?.slice().sort((a, b) => {
    // 日付の降順にソート
    return new Date(b.job.work_date).getTime() - new Date(a.job.work_date).getTime();
  });

  // ワークセッションをステータスでフィルタリング
  const filteredWorkSessions = {
    upcoming: sortedWorkSessions?.filter((ws) => ws.status === "SCHEDULED").sort((a, b) => {
      // 日付の昇順にソート
      return new Date(a.job.work_date).getTime() - new Date(b.job.work_date).getTime();
    }) || [],
    completed:
      sortedWorkSessions?.filter((ws) =>
        ["COMPLETED", "VERIFIED"].includes(ws.status)
      ) || [],
    cancelledByUser:
      sortedWorkSessions?.filter((ws) => ws.status === "CANCELED_BY_CHEF") || [],
    cancelledByRestaurant:
      sortedWorkSessions?.filter((ws) => ws.status === "CANCELED_BY_RESTAURANT") ||
      [],
  };

  if (workSessionsError || reviewsError || unreadMessagesError) {
    return (
      <div className="flex px-4">
        <ErrorPage />
      </div>
    );
  }

  if (isWorkSessionsLoading || isReviewsLoading || isUnreadMessagesLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="スケジュールを読み込んでいます..."
      />
    );
  }
  
  const renderWorkSessionCard = (
    workSession: WorksessionsListResult[number]
  ) => {
    if (!workSession.job) return null;

    const workDate = format(
      new Date(workSession.job.work_date),
      "yyyy年MM月dd日 (E)",
      {
        locale: ja,
      }
    );
    const startTime = formatJapanHHMM(workSession.job.start_time);
    const endTime = formatJapanHHMM(workSession.job.end_time);

    const unreadMessageData = unreadMessagesData?.find(
      (unreadMessageData) => unreadMessageData.worksession.id === workSession.id
    );
    const unreadMessageCount = unreadMessageData
      ? unreadMessageData.unread_messages.length
      : 0;

    const review = reviews?.find(
      (review) =>
        review.session_id === workSession.id 
    );

    return (
      <Card
        className="mb-4 hover:bg-gray-50 transition-colors"
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2 relative">
            <div className="flex items-center gap-2">
              <span className="font-medium">{workDate}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-500">
                {startTime} 〜 {endTime}
              </span>
            </div>
            {unreadMessageCount > 0 && (
              <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white">
                {unreadMessageCount}
              </Badge>
            )}
          </div>
          <div className="text-gray-500 mb-1">
            {workSession.job.restaurant.name}
          </div>
          <div className="text-xs text-gray-400 mb-2">
            {workSession.job.restaurant.address}
          </div>
          <div className="font-medium">{workSession.job.title}</div>
          {(workSession.cancel_bychef_log || workSession.cancel_byrestaurant_log) && (
            <div className="font-medium mt-2">
              <div className="text-xs text-gray-400">
                キャンセル理由:
              </div>
              {workSession.cancel_bychef_log?.reason || workSession.cancel_byrestaurant_log?.reason}
            </div>
          )}
          
          {review &&
            <div
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold">レストランからのレビュー</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {review.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                {review.comment}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {format(
                    new Date(review.created_at),
                    "yyyy年MM月dd日",
                    { locale: ja }
                  )}
                </span>
              </div>
            </div>
          }
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">お仕事スケジュール</h1>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="upcoming">次のお仕事</TabsTrigger>
          <TabsTrigger value="completed">完了</TabsTrigger>
          <TabsTrigger value="others">その他</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {filteredWorkSessions.upcoming.length > 0 ? (
            filteredWorkSessions.upcoming.map((workSession) => (
              <Link
                key={workSession.id}
                href={`/chef/job/${workSession.job.id}`}
                className="block"
              >
                {renderWorkSessionCard(workSession)}
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              予定されているお仕事はありません
            </p>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {filteredWorkSessions.completed.length > 0 ? (
            filteredWorkSessions.completed.map((workSession) => (
              <Link
                key={workSession.id}
                href={`/chef/job/${workSession.job.id}`}
                className="block"
              >
                {renderWorkSessionCard(workSession)}
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              完了したお仕事はありません
            </p>
          )}
        </TabsContent>

        <TabsContent value="others" className="mt-6">
          <Tabs
            value={activeCanceledTab}
            onValueChange={setActiveCanceledTab}
            className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="cancelledByUser">
                キャンセルしたお仕事
              </TabsTrigger>
              <TabsTrigger value="cancelledByRestaurant">
                キャンセルされたお仕事
              </TabsTrigger>
            </TabsList>
            <TabsContent value="cancelledByUser">
              {filteredWorkSessions.cancelledByUser.length > 0 ? (
                filteredWorkSessions.cancelledByUser.map(renderWorkSessionCard)
              ) : (
                <p className="text-center text-gray-500 py-8">
                  キャンセルしたお仕事はありません
                </p>
              )}
            </TabsContent>
            <TabsContent value="cancelledByRestaurant">
              {filteredWorkSessions.cancelledByRestaurant.length > 0 ? (
                filteredWorkSessions.cancelledByRestaurant.map(
                  renderWorkSessionCard
                )
              ) : (
                <p className="text-center text-gray-500 py-8">
                  キャンセルされたお仕事はありません
                </p>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
