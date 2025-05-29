"use client";

import { MessageSummary, useSubscriptionMessageSummaryByRestaurantId } from "@/hooks/api/companyuser/messages/useSubscriptionMessageSummaryByRestaurantId";
import Image from "next/image";
import { useState } from "react";
import { ChatSheet, ChatSheetProps } from "./ChatSheet";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface MessageListProps {
  restaurantId: number;
  restaurantName: string;
  restaurantAddress?: string;
}

export function MessageList({
  restaurantId,
  restaurantName,
  restaurantAddress,
}: MessageListProps) {
  const [selectedChat, setSelectedChat] = useState<ChatSheetProps['selectedChat']>(null);

  const {
    messageSummaryData,
    isLoading,
    error,
  } = useSubscriptionMessageSummaryByRestaurantId({ restaurantId });

  const sortedMessageSummaryData = messageSummaryData?.sort((a, b) => {
    const aDate = a.first_message ? new Date(a.first_message.created_at) : null;
    const bDate = b.first_message ? new Date(b.first_message.created_at) : null;

    // メッセージがある場合はメッセージの作成日時の降順でソート
    if (aDate && bDate) {
      return bDate.getTime() - aDate.getTime();
    }

    // 一方にのみメッセージがある場合: メッセージがある方を前に
    if (aDate && !bDate) return -1;
    if (!aDate && bDate) return 1;

    // 両方にメッセージがない場合はjobのstart_timeの降順でソート
    const aWorkDate = new Date(a.worksession.job.start_time);
    const bWorkDate = new Date(b.worksession.job.start_time);
    return bWorkDate.getTime() - aWorkDate.getTime();
  });

  const handleMessageClick = (messageSummary: MessageSummary) => {
    setSelectedChat({
      id: messageSummary.worksession.user.id,
      name: messageSummary.worksession.user.name,
      avatar: messageSummary.worksession.user.profile_image,
      jobId: messageSummary.worksession.job_id,
    });
  }

  if (error) {
    return (
      <ErrorPage />
    );
  }

  if (isLoading || !messageSummaryData) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      <div className="space-y-4">
        {sortedMessageSummaryData && sortedMessageSummaryData.length > 0 ? (
          sortedMessageSummaryData?.map((messageSummary) => (
            <div
              key={messageSummary.worksession.id}
              className="flex items-center gap-4 p-4 border rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleMessageClick(messageSummary)}>
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={messageSummary.worksession.user.profile_image || "/placeholder.svg"}
                  alt={messageSummary.worksession.user.name || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium truncate">
                    {`${messageSummary.worksession.user.name} シェフ(${messageSummary.worksession.job.title})`}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {(() => {
                      const createdAt = messageSummary.first_message?.created_at;
                      if (!createdAt) return null;
                      const date = new Date(createdAt);
                      const now = new Date();
                      const isToday =
                        date.getFullYear() === now.getFullYear() &&
                        date.getMonth() === now.getMonth() &&
                        date.getDate() === now.getDate();
                      const pad = (n: number) => n.toString().padStart(2, "0");
                      if (isToday) {
                        return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
                      }
                      return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
                    })()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 truncate">
                    {messageSummary.first_message?.content ??
                      "メッセージはありません"}
                  </span>
                  {messageSummary.unread_count > 0 && (
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-white text-xs">
                      {messageSummary.unread_count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
            メッセージはありません
          </div>
        )}
      </div>
      <ChatSheet
        restaurantId={restaurantId}
        restaurantName={restaurantName}
        restaurantAddress={restaurantAddress}
        selectedChat={selectedChat}
        handleCloseAction={() => setSelectedChat(null)}
      />
    </>
  )
}