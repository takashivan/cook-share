"use client";

import {
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
import { isMobile } from "@/lib/functions";
import { toast } from "@/hooks/use-toast";
import { useUpdateReadMessageByCompanyUser } from "@/hooks/api/companyuser/messages/useUpdateReadMessageByCompanyUser";

export interface ChatSheetProps {
  restaurantId: number;
  selectedChat: {
    id: string;
    name: string;
    avatar: string;
    workSessionId: number;
  } | null;
  handleCloseAction: () => void;
}

export function ChatSheet({
  restaurantId,
  selectedChat,
  handleCloseAction,
}: ChatSheetProps) {
  const { user } = useCompanyAuth();

  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messagesData, sendMessage } = useSubscriptionMessagesByCompanyUserId({
    companyUserId: user?.id,
    workSessionId: selectedChat?.workSessionId,
  });

  const { trigger: updateReadMessageTrigger } = useUpdateReadMessageByCompanyUser({
    companyUserId: user?.id,
    workSessionId: selectedChat?.workSessionId,
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
    updateReadMessageTrigger({
      worksession_id: selectedChat?.workSessionId,
      last_read_message_seq: latestMessage.message_seq,
    });
  }, [messagesData, selectedChat, updateReadMessageTrigger]);

  return (
    <Sheet open={!!selectedChat} onOpenChange={handleCloseAction}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader className="mb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={selectedChat?.avatar || "/placeholder.svg"}
                alt={selectedChat?.name || ""}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <SheetTitle>{selectedChat?.name} シェフ</SheetTitle>
              {/* <SheetDescription>オンライン</SheetDescription> */}
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-6rem)]">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messagesData?.messages.map((message) => (
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
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t pt-4">
            <div className="flex gap-2">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
