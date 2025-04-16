import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { ChevronDown, Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "@/types";
import { XanoClient } from "@xano/js-sdk";

interface ChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[] | undefined;
  onSendMessage: (message: string) => void;
  restaurantName: string;
  restaurantImage?: string;
  workDate: string | Date;
  startTime: number;
  workSessionId: number;
  mutateMessages: () => void;
}

interface XanoMessage {
  action: string;
  payload: {
    content: string;
    worksession_id: number;
    sender_type: string;
  };
}

export function ChatSheet({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  restaurantName,
  restaurantImage,
  workDate,
  startTime,
  workSessionId,
  mutateMessages,
}: ChatSheetProps) {
  const [messageInput, setMessageInput] = useState("");
  const xanoClientRef = useRef<XanoClient | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // メッセージが更新されたらスクロール
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen || !workSessionId) return;

    // XanoClientの初期化
    const xanoClient = new XanoClient({
      instanceBaseUrl: process.env.NEXT_PUBLIC_XANO_BASE_URL || "",
      realtimeConnectionHash: process.env.NEXT_PUBLIC_XANO_REALTIME_HASH || "",
    });

    let channel: any;

    const setupChannel = () => {
      try {
        // チャンネルの設定
        channel = xanoClient.channel(`worksession/${workSessionId}`);
        console.log("Channel setup for workSessionId:", workSessionId);

        // メッセージの購読
        channel.on((message: any) => {
          console.log("Received message:", message);
          mutateMessages();
        });

        xanoClientRef.current = xanoClient;
      } catch (error) {
        console.error("Error setting up channel:", error);
      }
    };

    setupChannel();
  }, [isOpen, workSessionId, mutateMessages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !xanoClientRef.current || !workSessionId)
      return;

    try {
      const channel = xanoClientRef.current.channel(
        `worksession/${workSessionId}`
      );
      console.log("Sending message to workSessionId:", workSessionId);
      onSendMessage(messageInput);
      channel.message(messageInput);
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="p-0 h-[80vh] rounded-t-xl">
        <SheetHeader className="sr-only">
          <SheetTitle>チャット</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {/* ヘッダー */}
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={restaurantImage || "/placeholder.svg"}
                    alt={restaurantName}
                  />
                  <AvatarFallback>{restaurantName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{restaurantName}</h3>
                  <p className="text-xs text-gray-500">
                    {workDate
                      ? format(new Date(workDate), "yyyy年MM月dd日")
                      : ""}{" "}
                    {startTime
                      ? format(new Date(startTime * 1000), "HH:mm")
                      : ""}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2">
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* メッセージエリア */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages && messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender_type === "chef"
                      ? "justify-end"
                      : "justify-start"
                  }`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender_type === "chef"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-100"
                    }`}>
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender_type === "chef"
                          ? "text-primary-foreground/70"
                          : "text-gray-500"
                      }`}>
                      {format(new Date(message.created_at), "HH:mm")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                メッセージはまだありません
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア */}
          <div className="border-t p-4 flex gap-2">
            <Input
              placeholder="メッセージを入力..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
