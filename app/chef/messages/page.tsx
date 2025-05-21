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

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedWorkSession, setSelectedWorkSession] = useState<
    MessageSummary["worksession"] | null
  >(null);

  // メッセージの取得
  const { messageSummaryData } = useSubscriptionMessageSummaryByUser({
    userId: user?.id,
  });

  // メッセージの取得
  const { messagesData, sendMessage } = useSubscriptionMessagesByUserId({
    userId: user?.id,
    workSessionId: selectedWorkSession?.id ?? undefined,
  });
  const sortedMessageSummaryData = messageSummaryData?.message_summaries.sort((a, b) => {
    const aDate = new Date(a.first_message?.created_at || 0);
    const bDate = new Date(b.first_message?.created_at || 0);
    return bDate.getTime() - aDate.getTime();
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
      console.error("Failed to send message:", error);
    }
  };

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
            worksessionId={selectedWorkSession?.id ?? undefined}
            messagesData={messagesData}
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
