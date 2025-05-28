"use client";

import {
  MessageSquare,
  QrCode,
  Send,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useSubscriptionMessagesByCompanyUserId } from "@/hooks/api/companyuser/messages/useSubscriptionMessagesByCompanyUserId";
import { format } from "date-fns";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useRef, useState } from "react";
import { formatJapanHHMM, isMobile } from "@/lib/functions";
import { toast } from "@/hooks/use-toast";
import { useUpdateReadMessageByCompanyUser } from "@/hooks/api/companyuser/messages/useUpdateReadMessageByCompanyUser";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { CheckInQRModal } from "@/components/modals/CheckInQRModal";
import { AdminJobActionsMenu } from "@/components/dropdownMenu/AdminJobActionsMenu";
import { JobStatusBadgeForAdmin } from "@/components/badge/JobStatusBadgeForAdmin";
import { useGetWorksessionsByJobId } from "@/hooks/api/companyuser/worksessions/useGetWorksessionsByJobId";
import { ChefProfileForAdminModal } from "@/components/modals/ChefProfileForAdminModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ChatSheetProps {
  restaurantId: number;
  restaurantName: string;
  restaurantAddress?: string;
  selectedChat: {
    id: string;
    name: string;
    avatar: string;
    jobId: number;
  } | null;
  handleCloseAction: () => void;
}

export function ChatSheet({
  restaurantId,
  restaurantName,
  restaurantAddress,
  selectedChat,
  handleCloseAction,
}: ChatSheetProps) {
  const { user } = useCompanyAuth();

  const [isChefProfileForAdminModalOpen, setIsChefProfileForAdminModalOpen] = useState(false);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: workSessions, error: workSessionsError, isLoading: workSessionsLoading } =
    useGetWorksessionsByJobId({ jobId:selectedChat?.jobId });
  const selectedWorkSession = workSessions?.[0];

  const {
    messagesData,
    sendMessage,
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useSubscriptionMessagesByCompanyUserId({
    companyUserId: user?.id,
    workSessionId: selectedWorkSession?.id,
  });

  const { trigger: updateReadMessageTrigger } = useUpdateReadMessageByCompanyUser({
    companyUserId: user?.id,
    workSessionId: selectedWorkSession?.id,
    restaurantId,
  });

  const handleSendMessage = async () => {
    try {
      await sendMessage(messageInput);
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "エラー",
        description: "メッセージの送信に失敗しました。",
        variant: "destructive",
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setMessageInput("");
    handleCloseAction();
  }

  useEffect(() => {
    // メッセージが更新されたらスクロール
    scrollToBottom();

    if (
      !messagesData?.messages ||
      messagesData.messages.length === 0 ||
      !selectedChat
    ) {
      return;
    }

    // 最新のメッセージを取得（message_seqが最大のもの）
    let latestMessage = null;
    for (const message of messagesData.messages) {
      if (!latestMessage || message.message_seq > latestMessage.message_seq) {
        latestMessage = message;
      }
    }

    if (!latestMessage) return;
    // 既読情報が最新のメッセージと同じ場合は何もしない
    if (
      latestMessage.message_seq ===
      messagesData.restaurant_last_read?.last_read_message_seq
    )
      return;

    // 既読情報更新
    if (selectedWorkSession) {
      updateReadMessageTrigger({
        worksession_id: selectedWorkSession?.id,
        last_read_message_seq: latestMessage.message_seq,
      });
    }
  }, [messagesData, selectedChat, updateReadMessageTrigger]);

  return (
    <>
      <Sheet open={!!selectedChat} onOpenChange={handleClose}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader className="mb-4">
            <div className="flex items-center gap-3">
              <button
                className="hover:opacity-80 transition-opacity"
                onClick={() => {
                  setIsChefProfileForAdminModalOpen(true);
                }}
              >
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                  <AvatarImage
                    src={
                      selectedWorkSession?.user.profile_image ||
                      "/chef-logo.png"
                    }
                    alt={selectedWorkSession?.user.name || ""}
                  />
                  <AvatarFallback>
                    {selectedWorkSession?.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </button>
              <div>
                <SheetTitle className="space-x-2">
                  {selectedChat?.name}
                  <span className="text-xs text-muted-foreground">
                    シェフ
                  </span>
                </SheetTitle>
              </div>
              {/* {selectedChat && (
                <Badge variant="outline" className="text-xs sm:text-sm">
                  {formatWorkSessionJapaneseStatus(
                    selectedWorkSession?.status
                  )}
                </Badge>
              )} */}
              <div className="flex items-center gap-1 sm:gap-2 ml-auto flex-shrink-0">
                {selectedWorkSession?.status === "SCHEDULED" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 p-0"
                      onClick={() => {
                        setIsQrDialogOpen(true);
                      }}>
                      <QrCode className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">
                        チェックインQR
                      </span>
                    </Button>
                    <CheckInQRModal
                      isOpen={isQrDialogOpen}
                      onCloseAction={() => {
                        setIsQrDialogOpen(false);
                      }}
                      workSessionData={{
                        id: selectedWorkSession.id.toString(),
                        check_in_code: selectedWorkSession.check_in_code,
                        chefName: selectedWorkSession.user.name,
                        restaurantName,
                      }}
                    />
                    <AdminJobActionsMenu
                      job={selectedWorkSession.job}
                      workSession={selectedWorkSession}
                      sendMessageAction={sendMessage}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                {selectedWorkSession != null && (
                  <>
                    <JobStatusBadgeForAdmin
                      job={selectedWorkSession.job}
                      lastWorksession={selectedWorkSession}
                    />
                    <Badge variant="outline" className="text-sm bg-white">
                      {selectedWorkSession.job.work_date
                        ? format(new Date(selectedWorkSession.job.work_date), "MM/dd")
                        : "未定"}
                      &nbsp;&nbsp;
                      {selectedWorkSession.job.start_time && selectedWorkSession.job.end_time ? (
                        <>
                          {formatJapanHHMM(selectedWorkSession.job.start_time)}〜
                          {formatJapanHHMM(selectedWorkSession.job.end_time)}
                        </>
                      ) : (
                        "未定"
                      )}
                    </Badge>
                  </>
                )}
              </div>
              <Badge variant="outline" className="text-sm bg-white truncate">
                <span className="truncate">{selectedWorkSession?.job.title}</span>
              </Badge>
            </div>
          </SheetHeader>

          <div className="flex flex-col h-[calc(100vh-8rem)]">
            {messagesError || workSessionsError ? (
              <ErrorPage />
            ) : isMessagesLoading || !messagesData || workSessionsLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messagesData.messages.length > 0 ? 
                    messagesData.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender_type === "restaurant" ? "justify-end" : "justify-start"
                        }`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender_type === "restaurant"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}>
                          <p className="text-sm">
                            {message.content.split("\n").map((line, idx) => (
                              <span key={idx}>
                                {line}
                                {idx !== message.content.split("\n").length - 1 && (
                                  <br />
                                )}
                              </span>
                            ))}
                          </p>
                          <span className="text-xs text-muted-foreground mt-1">
                            {format(new Date(message.created_at), "HH:mm")}
                          </span>
                        </div>
                      </div>
                    ))
                  : (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                      <div className="space-y-2">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                        <h3 className="text-lg font-medium">
                          まだメッセージがありません
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          シェフとのチャットを始めましょう
                        </p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm text-muted-foreground mb-2">
                      クイックメッセージ
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setMessageInput(
                            "はじめまして！ご応募ありがとうございます。"
                          )
                        }>
                        👋 はじめまして
                      </Button>
                      {selectedWorkSession?.job.whattotake && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setMessageInput(
                              `当日の持ち物について確認させていただきます。\n\n以下の持ち物をご準備ください：\n${selectedWorkSession.job.whattotake}`
                            )
                          }>
                          📋 持ち物の確認
                        </Button>
                      )}
                      {selectedWorkSession?.job.work_date && selectedWorkSession?.job.start_time && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setMessageInput(
                              `当日の集合時間と場所の確認をさせていただきます。\n\n日時：${format(
                                new Date(selectedWorkSession.job.work_date),
                                "MM月dd日"
                              )} ${formatJapanHHMM(
                                selectedWorkSession.job.start_time
                              )}\n場所：${restaurantAddress || ""}`
                            )
                          }>
                          🕒 集合時間の確認
                        </Button>
                      )}
                      {selectedWorkSession?.job.note && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setMessageInput(
                              `その他の注意事項について確認させていただきます。\n\n${selectedWorkSession.job.note}`
                            )
                          }>
                          ℹ️ 注意事項の確認
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <TextareaAutosize
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="メッセージを入力..."
                      minRows={1}
                      maxRows={6}
                      className="flex-1 resize-none bg-white px-3 py-2 border rounded-md text-base focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition"
                      onKeyDown={(
                        e: React.KeyboardEvent<HTMLTextAreaElement>
                      ) => {
                        // PC: Enterで送信、Shift+Enterで改行
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          !e.nativeEvent.isComposing &&
                          !isMobile()
                        ) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                        // Shift+Enterで改行
                        if (e.key === "Enter" && e.shiftKey) {
                          setMessageInput((prev) => prev + "\n");
                        }
                        // モバイル: Enterは常に改行
                        if (e.key === "Enter" && isMobile()) {
                          setMessageInput((prev) => prev + "\n");
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
      {selectedWorkSession &&
        <ChefProfileForAdminModal
          isOpen={isChefProfileForAdminModalOpen}
          onCloseAction={() => setIsChefProfileForAdminModalOpen(false)}
          worksession={selectedWorkSession}
        />
      }
    </>
  );
};
