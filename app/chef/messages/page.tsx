"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChatSheet } from "@/components/chat/ChatSheet";
import { useSubscriptionMessagesByUserId } from "@/hooks/api/user/messages/useSubscriptionMessagesByUserId";
import {
  MessageSummary,
  useSubscriptionMessageSummaryByUser,
} from "@/hooks/api/user/messages/useSubscriptionMessageSummaryByUser";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingScreen } from "@/components/LoadingScreen";
import { toast } from "@/hooks/use-toast";
import { WorksessionsListResult } from "@/api/__generated__/base/data-contracts";

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedWorkSession, setSelectedWorkSession] = useState<
    MessageSummary["worksession"] | null
  >(null);

  // メッセージの取得
  const {
    messageSummaryData,
    isLoading: isMessageSummaryLoading,
    error: messageSummaryError,
  } = useSubscriptionMessageSummaryByUser({
    userId: user?.id,
  });

  const sortedMessageSummaryData = messageSummaryData?.message_summaries.sort((a, b) => {
    const aDate = a.first_message ? new Date(a.first_message.created_at) : null;
    const bDate = b.first_message ? new Date(b.first_message.created_at) : null;

    // メッセージがある場合はメッセージの作成日時の降順でソート
    if (aDate && bDate) {
      return bDate.getTime() - aDate.getTime();
    }

    // 一方にのみメッセージがある場合: メッセージがある方を前に
    if (aDate && !bDate) return -1;
    if (!aDate && bDate) return 1;

    // 両方にメッセージがない場合はworksessionのcreated_at（マッチング日時）の降順でソート
    const aWorkDate = new Date(a.worksession.created_at);
    const bWorkDate = new Date(b.worksession.created_at);
    return bWorkDate.getTime() - aWorkDate.getTime();
  });

  // メッセージの取得
  const {
    messagesData,
    sendMessage,
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useSubscriptionMessagesByUserId({
    userId: user?.id,
    workSessionId: selectedWorkSession?.id ?? undefined,
  });

  const openChat = (worksession: MessageSummary["worksession"]) => {
    setSelectedWorkSession(worksession);
  };

  const closeChat = () => {
    setSelectedWorkSession(null);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !selectedWorkSession) return;

    try {
      sendMessage(message);
    } catch (error) {
      toast({
        title: "エラー",
        description: "メッセージの送信に失敗しました。",
        variant: "destructive",
      });
    }
  };

  if (messageSummaryError) {
    return (
      <div className="flex px-4">
        <ErrorPage />
      </div>
    )
  }

  if (isMessageSummaryLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="メッセージを読み込んでいます..."
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">メッセージ</h1>
      {sortedMessageSummaryData && sortedMessageSummaryData.length > 0 ? (
        <>
          {sortedMessageSummaryData.map((messageSummary) => {
            return (
              <Link
                key={messageSummary.worksession.id}
                href=""
                className="block"
                onClick={() => {
                  openChat(messageSummary.worksession);
                }}>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center gap-3 mb-2 relative">
                    <Badge variant="outline" className="text-sm bg-white">
                      {messageSummary.worksession.job.work_date
                        ? format(
                            new Date(messageSummary.worksession.job.work_date),
                            "MM/dd"
                          )
                        : "未定"}
                    </Badge>
                    <div className="font-medium truncate">
                      {`${messageSummary.worksession.restaurant.name}(${messageSummary.worksession.job.title})`}
                    </div>
                    {messageSummary.unread_count > 0 && (
                      <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white">
                        {messageSummary.unread_count}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 truncate">
                    {messageSummary.first_message?.content ??
                      "メッセージはありません"}
                  </p>
                </div>
              </Link>
            );
          })}
          <ChatSheet
            isOpen={selectedWorkSession !== null}
            onClose={closeChat}
            worksession={(selectedWorkSession as unknown as WorksessionsListResult[number]) ?? undefined}
            messagesData={messagesData}
            isMessagesDataLoading={isMessagesLoading}
            messagesDataError={messagesError}
            onSendMessage={handleSendMessage}
            restaurantName={selectedWorkSession?.restaurant?.name || ""}
            restaurantImage={
              selectedWorkSession?.restaurant?.profile_image || ""
            }
            workDate={selectedWorkSession?.job?.work_date || ""}
            startTime={selectedWorkSession?.job?.start_time || 0}
            endTime={selectedWorkSession?.job?.end_time || 0}
            jobId={selectedWorkSession?.job?.id || 0}
            jobTitle={selectedWorkSession?.job?.title || ""}
          />
        </>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          メッセージはありません
        </div>
      )}
    </div>
  );
}
