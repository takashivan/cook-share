import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Send,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { WorksessionsMessagesListResult } from "@/api/__generated__/base/data-contracts";
import { useUpdateReadMessageByUser } from "@/hooks/api/user/messages/useUpdateReadMessageByUser";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useGetJobChangeRequestByWorksessionId } from "@/hooks/api/user/jobChangeRequests/useGetJobChangeRequestByWorksessionId";
import { useAcceptJobChangeRequest } from "@/hooks/api/user/jobChangeRequests/useAcceptJobChangeRequest";
import { useRejectJobChangeRequest } from "@/hooks/api/user/jobChangeRequests/useRejectJobChangeRequest";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { formatJapanHHMM, formatToJapanDate } from "@/lib/functions";

interface ChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  worksessionId?: number;
  messagesData: WorksessionsMessagesListResult | undefined;
  onSendMessage: (message: string) => void;
  restaurantName: string;
  restaurantImage?: string;
  workDate: string | Date;
  startTime: number;
  endTime: number;
}

export function ChatSheet({
  isOpen,
  onClose,
  worksessionId,
  messagesData,
  onSendMessage,
  restaurantName,
  restaurantImage,
  workDate,
  startTime,
  endTime,
}: ChatSheetProps) {
  const { user } = useAuth();

  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { trigger: updateReadMessageTrigger } = useUpdateReadMessageByUser({
    userId: user?.id,
    workSessionId: worksessionId,
  });

  // 変更リクエスト取得
  const { data: changeRequests } = useGetJobChangeRequestByWorksessionId({
    worksessionId,
  });
  const pendingRequest = changeRequests?.find(
    (req) => req.status === "PENDING"
  );
  const [isChangeRequestModalOpen, setIsChangeRequestModalOpen] =
    useState(false);
  const [selectedChangeRequest, setSelectedChangeRequest] = useState<any>(null);
  const { trigger: acceptJobChangeRequest } = useAcceptJobChangeRequest({
    jobChangeRequestId: selectedChangeRequest?.id?.toString() || "",
  });
  const { trigger: rejectJobChangeRequest } = useRejectJobChangeRequest({
    jobChangeRequestId: selectedChangeRequest?.id?.toString() || "",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // メッセージが更新されたらスクロール
    scrollToBottom();

    if (
      !messagesData ||
      !messagesData.messages ||
      messagesData.messages.length === 0
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

    console.log("latestMessage", latestMessage);

    if (!latestMessage || !worksessionId) return;
    // 既読情報が最新のメッセージと同じ場合は何もしない
    if (
      latestMessage.message_seq ===
      messagesData.chef_last_read?.last_read_message_seq
    )
      return;

    // 既読情報更新
    updateReadMessageTrigger({
      worksession_id: worksessionId,
      last_read_message_seq: latestMessage.message_seq,
    });
  }, [messagesData, worksessionId, scrollToBottom, updateReadMessageTrigger]);

  const handleSendMessage = () => {
    try {
      onSendMessage(messageInput);
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChangeRequestResponse = async (
    status: "APPROVED" | "REJECTED"
  ) => {
    if (!selectedChangeRequest) return;
    try {
      if (status === "APPROVED") {
        await acceptJobChangeRequest();
      } else {
        await rejectJobChangeRequest();
      }
      const message = `【変更リクエストの${
        status === "APPROVED" ? "承認" : "拒否"
      }】\n以下の変更リクエストを${
        status === "APPROVED" ? "承認" : "拒否"
      }しました：\n\n日付: ${
        selectedChangeRequest.proposed_changes.work_date
      }\n時間: ${selectedChangeRequest.proposed_changes.start_time}\n〜${
        selectedChangeRequest.proposed_changes.end_time
      }\n業務内容: ${selectedChangeRequest.proposed_changes.task}\n報酬: ¥${
        selectedChangeRequest.proposed_changes.fee
      }`;
      onSendMessage(message);
      toast({
        title: `変更リクエストを${
          status === "APPROVED" ? "承認" : "拒否"
        }しました`,
        description:
          status === "APPROVED"
            ? "変更内容が適用されました。"
            : "変更は適用されませんでした。",
      });
      setIsChangeRequestModalOpen(false);
      setSelectedChangeRequest(null);
    } catch (error) {
      toast({
        title: "エラー",
        description: "変更リクエストの処理に失敗しました。",
        variant: "destructive",
      });
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
                    {workDate ? new Date(workDate).toLocaleDateString() : ""}
                    &nbsp;
                    {startTime ? formatJapanHHMM(startTime) : ""}-
                    {endTime ? formatJapanHHMM(endTime) : ""}
                  </p>
                </div>
              </div>
              {/* 変更リクエスト通知ボタン */}
              {pendingRequest && (
                <Button
                  variant="outline"
                  className="bg-red-50 text-red-800 border-red-200 hover:bg-red-100"
                  onClick={() => {
                    setSelectedChangeRequest(pendingRequest);
                    setIsChangeRequestModalOpen(true);
                  }}>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  変更リクエストが届いています
                </Button>
              )}
            </div>
          </div>

          {/* メッセージエリア */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messagesData &&
            messagesData.messages &&
            messagesData.messages.length > 0 ? (
              messagesData.messages.map((message) => (
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
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">メッセージはまだありません</p>
                <p className="text-sm text-muted-foreground">
                  まずは「はじめまして」の挨拶から始めてみましょう！
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア */}
          <div className="border-t bg-background">
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
                      "はじめまして！この度は採用いただき、ありがとうございます。"
                    )
                  }>
                  👋 はじめまして
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setMessageInput(
                      `集合時間・場所の確認をさせていただきます。\n\n${format(
                        new Date(workDate),
                        "MM月dd日"
                      )} ${format(
                        new Date(startTime * 1000),
                        "HH:mm"
                      )}に${restaurantName}に伺えばよろしいでしょうか？`
                    )
                  }>
                  🕒 集合時間の確認
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setMessageInput(
                      "持ち物について確認させていただきたいのですが、必要な物はありますでしょうか？"
                    )
                  }>
                  📋 持ち物の確認
                </Button>
              </div>
            </div>
            <div className="border-t p-4 flex gap-2">
              <TextareaAutosize
                minRows={1}
                maxRows={6}
                placeholder="メッセージを入力..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.nativeEvent.isComposing
                  ) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                  // Shift+Enterで改行
                  if (e.key === "Enter" && e.shiftKey) {
                    setMessageInput((prev) => prev + "\n");
                  }
                }}
                className="flex-1 resize-none px-3 py-2 border rounded-md text-sm bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition"
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

        {/* 変更リクエストモーダル */}
        <Dialog
          open={isChangeRequestModalOpen}
          onOpenChange={setIsChangeRequestModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>変更リクエストの確認</DialogTitle>
              <DialogDescription>
                以下の変更リクエストを承認または拒否してください。
              </DialogDescription>
            </DialogHeader>
            {selectedChangeRequest && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">変更内容</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      日付: {selectedChangeRequest.proposed_changes.work_date}
                    </p>
                    <p>
                      時間:{" "}
                      {format(
                        new Date(
                          selectedChangeRequest.proposed_changes.start_time
                        ),
                        "HH:mm"
                      )}
                      〜
                      {format(
                        new Date(
                          selectedChangeRequest.proposed_changes.end_time
                        ),
                        "HH:mm"
                      )}
                    </p>
                    <p>
                      業務内容: {selectedChangeRequest.proposed_changes.task}
                    </p>
                    <p>報酬: ¥{selectedChangeRequest.proposed_changes.fee}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">変更理由</h4>
                  <p className="text-sm">{selectedChangeRequest.reason}</p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsChangeRequestModalOpen(false)}
                    className="rounded-md px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200">
                    閉じる
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleChangeRequestResponse("REJECTED")}
                    className="rounded-md px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200">
                    <XCircle className="h-4 w-4 mr-2" />
                    拒否
                  </Button>
                  <Button
                    onClick={() => handleChangeRequestResponse("APPROVED")}
                    className="rounded-md px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 border border-orange-500">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    承認
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
}
