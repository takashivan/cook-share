"use client";

import Link from "next/link";
import { MessageSquare, Star, Edit } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import useSWR from "swr";
import { applicationApi } from "@/lib/api/application";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Application, Job, WorkSessionWithJob } from "@/types";
import { useEffect, useState } from "react";
import { workSessionApi } from "@/lib/api/workSession";
import { Button } from "@/components/ui/button";
import { RestaurantNotificationDropdown } from "@/components/notifications/RestaurantNotificationDropdown";
import { ChefNotificationDropdown } from "@/components/notifications/ChefNotificationDropdown";
import { UnreadMessageWithWorksession, useSubscriptionUnreadMessagesByUser } from "@/hooks/api/messages/useSubscriptionUnreadMessagesByUser";
import { ChatSheet } from "@/components/chat/ChatSheet";
import { useSubscriptionMessagesByUserId } from "@/hooks/api/messages/useSubscriptionMessagesByUserId";
import { Badge } from "@/components/ui/badge";
import { useGetWorksessionsByUserIdByTodo } from "@/hooks/api/worksessions/useGetWorksessionsByUserIdByTodo";

interface ApplicationWithJob extends Application {
  job?: Job & {
    restaurant: {
      id: number;
      name: string;
      address: string;
      image: string | null;
    };
  };
}

export default function ChefDashboard() {
  const { user } = useAuth();
  const [selectedWorkSession, setSelectedWorkSession] = useState<UnreadMessageWithWorksession['worksession'] | null>(null);

  // ワークセッションの取得
  const { data: workSessionsData } = useGetWorksessionsByUserIdByTodo({
    userId: user?.id?.toString()
  });

  const upcomingJobs = workSessionsData?.filter(
    (session) => session.status === "SCHEDULED"
  ) ?? [];
  console.log("upcomingJobs", upcomingJobs);

  const inProgressJobs = workSessionsData?.filter(
    (session) => session.status === "IN_PROGRESS"
  ) ?? [];

  // メッセージの取得
  const { messagesData, sendMessage } = useSubscriptionMessagesByUserId({
    userId: user?.id,
    workSessionId: selectedWorkSession?.id ?? undefined,
    applicationId: selectedWorkSession?.application_id ?? undefined,
  })

  // 未読メッセージの取得
  const { unreadMessagesData } = useSubscriptionUnreadMessagesByUser({
    userId: user?.id,
  });

  const openChat = (worksession: UnreadMessageWithWorksession['worksession']) => {
    setSelectedWorkSession(worksession);
  };

  const closeChat = () => {
    setSelectedWorkSession(null);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !selectedWorkSession) return;

    try {
      sendMessage(message)
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // const { data: applications } = useSWR<ApplicationWithJob[]>(
  //   user ? ["applications", user.id.toString()] : null,
  //   async ([_, userId]: [string, string]) => {
  //     const result = await applicationApi.getApplicationsByUser(userId);
  //     return result.map((app: any) => ({
  //       ...app,
  //       job: app.job
  //         ? {
  //             ...app.job,
  //             restaurant: app.job._restaurant,
  //           }
  //         : undefined,
  //     }));
  //   }
  // );

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          ようこそ、{user?.name || "ゲスト"}さん
        </h1>
        <ChefNotificationDropdown
          notifications={[]}
          onMarkAsRead={() => {}}
          onMarkAllAsRead={() => {}}
        />
      </div>

      {/* 次のお仕事 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">次のお仕事</h2>
        <div className="space-y-4">
          {upcomingJobs && upcomingJobs.length > 0 ? (
            upcomingJobs.map((session) => (
              <Link
                key={session.id}
                href={`/chef/job/${session.application_id}`}
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
              <p className="text-gray-500">次のお仕事は未定です</p>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  お仕事を探す
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* やること */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">やること</h2>
        <div className="space-y-4">
          {inProgressJobs.length > 0 ? (
            inProgressJobs.map((session) => (
              <Link
                key={session.id}
                href={`/chef/job/${session.application_id}`}
                className="block">
                <div
                  key={session.id}
                  className="bg-white rounded-lg shadow-md p-4">
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
      </section>

      {/* 未読メッセージ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">未読メッセージ</h2>
        <div className="space-y-4">
          {unreadMessagesData && unreadMessagesData.length > 0 && unreadMessagesData.some((messageData) => messageData.unread_message_count > 0) ? (
            unreadMessagesData.filter((unreadMessageData) => unreadMessageData.unread_message_count > 0).map((unreadMessageData) => {
              // 最新のメッセージを取得（message_seqが最大のもの）
              let latestMessage = null;
              for (const message of unreadMessageData.unread_messages) {
                if (!latestMessage || message.message_seq > latestMessage.message_seq) {
                  latestMessage = message;
                }
              }

              return (
                <Link
                  key={unreadMessageData.worksession.id}
                  href=''
                  className="block"
                  onClick={() => {
                    openChat(unreadMessageData.worksession)
                  }}
                >
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center gap-3 mb-2 relative">
                      <MessageSquare className="h-5 w-5 text-gray-700" />
                      <div className="font-medium">{unreadMessageData.worksession.restaurant.name}</div>
                      {unreadMessageData.unread_messages.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white">
                          {unreadMessageData.unread_messages.length}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 truncate">
                      {latestMessage?.content ?? ''}
                    </p>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              未読メッセージはありません
            </div>
          )}
        </div>
        <ChatSheet
          isOpen={selectedWorkSession !== null}
          onClose={closeChat}
          worksessionId={selectedWorkSession?.id ?? undefined}
          messagesData={messagesData}
          onSendMessage={handleSendMessage}
          restaurantName={selectedWorkSession?.restaurant?.name || ""}
          restaurantImage={selectedWorkSession?.restaurant?.profile_image || ""}
          workDate={selectedWorkSession?.job?.work_date || ""}
          startTime={selectedWorkSession?.job?.start_time || 0}
        />
      </section>
    </div>
  );
}
