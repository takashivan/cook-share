"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { ChatSheet } from "@/components/chat/ChatSheet";
import { useGetWorksessionsByUserId } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserId";
import { WorksessionsListResult } from "@/api/__generated__/base/data-contracts";
import { useSubscriptionMessagesByUserId } from "@/hooks/api/user/messages/useSubscriptionMessagesByUserId";
import { useSubscriptionUnreadMessagesByUser } from "@/hooks/api/user/messages/useSubscriptionUnreadMessagesByUser";
import { Badge } from "@/components/ui/badge";
import { formatJapanHHMM } from "@/lib/functions";

export default function SchedulePage() {
  const { user } = useAuth();
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  // ワークセッション一覧の取得
  const { data: workSessions } = useGetWorksessionsByUserId({
    userId: user?.id,
  });
  console.log(workSessions);

  // 選択されたワークセッション
  const selectedWorkSession = workSessions?.find(
    (ws) => ws?.job?.id === selectedJobId
  );

  // メッセージの取得
  const { messagesData, sendMessage } = useSubscriptionMessagesByUserId({
    userId: user?.id,
    workSessionId: selectedWorkSession?.id,
    applicationId: selectedWorkSession?.application_id ?? undefined,
  });

  // 未読メッセージの取得
  const { unreadMessagesData } = useSubscriptionUnreadMessagesByUser({
    userId: user?.id,
  });

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !selectedWorkSession) return;

    try {
      sendMessage(message);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const openChat = (jobId: number) => {
    setSelectedJobId(jobId);
  };

  const closeChat = () => {
    setSelectedJobId(null);
  };

  // ワークセッションをステータスでフィルタリング
  const filteredWorkSessions = {
    upcoming: workSessions?.filter((ws) => ws.status === "SCHEDULED") || [],
    completed:
      workSessions?.filter((ws) =>
        ["COMPLETED", "VERIFIED"].includes(ws.status)
      ) || [],
  };

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

    return (
      <Card
        key={workSession.id}
        className="mb-4 hover:bg-gray-50 transition-colors"
        onClick={() => openChat(workSession.job.id)}>
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
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">お仕事スケジュール</h1>

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="upcoming">次のお仕事</TabsTrigger>
          <TabsTrigger value="completed">完了</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {filteredWorkSessions.upcoming.length > 0 ? (
            filteredWorkSessions.upcoming.map(renderWorkSessionCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              予定されているお仕事はありません
            </p>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {filteredWorkSessions.completed.length > 0 ? (
            filteredWorkSessions.completed.map(renderWorkSessionCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              完了したお仕事はありません
            </p>
          )}
        </TabsContent>
      </Tabs>

      <ChatSheet
        isOpen={selectedJobId !== null}
        onClose={closeChat}
        worksessionId={selectedWorkSession?.id}
        messagesData={messagesData}
        onSendMessage={handleSendMessage}
        restaurantName={selectedWorkSession?.job?.restaurant.name || ""}
        restaurantImage={
          selectedWorkSession?.job?.restaurant.profile_image || ""
        }
        workDate={selectedWorkSession?.job?.work_date || ""}
        startTime={selectedWorkSession?.job?.start_time || 0}
        endTime={selectedWorkSession?.job?.end_time || 0}
        jobId={selectedWorkSession?.job?.id || 0}
        jobTitle={selectedWorkSession?.job?.title || ""}
      />
    </div>
  );
}
