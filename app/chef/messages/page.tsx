"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  UnreadMessageWithWorksession,
  useSubscriptionUnreadMessagesByUser,
} from "@/hooks/api/user/messages/useSubscriptionUnreadMessagesByUser";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChatSheet } from "@/components/chat/ChatSheet";
import { useSubscriptionMessagesByUserId } from "@/hooks/api/user/messages/useSubscriptionMessagesByUserId";

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedWorkSession, setSelectedWorkSession] = useState<
    UnreadMessageWithWorksession["worksession"] | null
  >(null);

  // 未読メッセージの取得
  const { unreadMessagesData } = useSubscriptionUnreadMessagesByUser({
    userId: user?.id,
  });

  // メッセージの取得
  const { messagesData, sendMessage } = useSubscriptionMessagesByUserId({
    userId: user?.id,
    workSessionId: selectedWorkSession?.id ?? undefined,
    applicationId: selectedWorkSession?.application_id ?? undefined,
  });

  const openChat = (
    worksession: UnreadMessageWithWorksession["worksession"]
  ) => {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">メッセージ</h1>
      {unreadMessagesData &&
      unreadMessagesData.length > 0 &&
      unreadMessagesData.some(
        (messageData) => messageData.unread_message_count > 0
      ) ? (
        <>
          {unreadMessagesData
            .filter(
              (unreadMessageData) =>
                unreadMessageData.unread_message_count > 0
            )
            .map((unreadMessageData) => {
              let latestMessage = null;
              for (const message of unreadMessageData.unread_messages) {
                if (
                  !latestMessage ||
                  message.message_seq > latestMessage.message_seq
                ) {
                  latestMessage = message;
                }
              }

              return (
                <Link
                  key={unreadMessageData.worksession.id}
                  href=""
                  className="block"
                  onClick={() => {
                    openChat(unreadMessageData.worksession);
                  }}>
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center gap-3 mb-2 relative">
                      <MessageSquare className="h-5 w-5 text-gray-700" />
                      <div className="font-medium">
                        {unreadMessageData.worksession.restaurant.name}
                      </div>
                      {unreadMessageData.unread_messages.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white">
                          {unreadMessageData.unread_messages.length}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 truncate">
                      {latestMessage?.content ?? ""}
                    </p>
                  </div>
                </Link>
              );
            }
          )}
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
        </>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          未読メッセージはありません
        </div>
      )}
    </div>
  )
}