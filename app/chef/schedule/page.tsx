"use client";

import { useState } from "react";
import { MoreHorizontal, MessageSquare, Send, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function ChefSchedule() {
  const [activeTab, setActiveTab] = useState<"next" | "applied" | "completed">(
    "next"
  );
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const jobs = [
    {
      id: 1,
      date: "03 / 31 (月)",
      time: "09:00 〜 22:00",
      store: "洋食 黒船亭",
      title: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
      messages: 3,
    },
    {
      id: 2,
      date: "03 / 31 (月)",
      time: "09:00 〜 22:00",
      store: "洋食 黒船亭",
      title: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
      messages: 0,
    },
    {
      id: 3,
      date: "03 / 31 (月)",
      time: "09:00 〜 22:00",
      store: "洋食 黒船亭",
      title: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
      messages: 0,
    },
    {
      id: 4,
      date: "03 / 31 (月)",
      time: "09:00 〜 22:00",
      store: "洋食 黒船亭",
      title: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
      messages: 0,
    },
  ];

  // サンプルメッセージデータ
  const jobMessages = {
    1: [
      {
        id: 1,
        sender: "store",
        text: "はじめまして。この度はご応募いただきありがとうございます。ご経験やスキルについて教えていただけますか？",
        time: "10:35",
      },
      {
        id: 2,
        sender: "chef",
        text: "はじめまして。応募させていただきました佐藤と申します。以前、洋食店で2年ほど調理補助として働いていました。ハンバーグやオムライスなどの基本的な調理は問題なくできます。",
        time: "10:40",
      },
      {
        id: 3,
        sender: "store",
        text: "ありがとうございます。当店では特にランチタイムの繁忙時間帯にお手伝いいただきたいと考えています。11時から15時の間で週3日程度の勤務は可能でしょうか？",
        time: "10:45",
      },
    ],
    2: [
      {
        id: 1,
        sender: "store",
        text: "ご応募ありがとうございます。当店での勤務を希望される理由を教えていただけますか？",
        time: "14:20",
      },
    ],
  };

  const openChat = (jobId: number) => {
    setSelectedJobId(jobId);
  };

  const closeChat = () => {
    setSelectedJobId(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedJobId) {
      // 実際のアプリではここでメッセージを送信する処理を行う
      setNewMessage("");
    }
  };

  // 選択されたお仕事の情報を取得
  const selectedJob = selectedJobId
    ? jobs.find((job) => job.id === selectedJobId)
    : null;

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        お仕事スケジュール
      </h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "next"
              ? "text-red-500 border-b-2 border-red-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("next")}>
          次のお仕事
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "applied"
              ? "text-red-500 border-b-2 border-red-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("applied")}>
          応募中
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "completed"
              ? "text-red-500 border-b-2 border-red-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("completed")}>
          完了した仕事
        </button>
      </div>

      {/* Job List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-4 cursor-pointer"
              onClick={() => openChat(job.id)}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{job.date}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-500">{job.time}</span>
                </div>
                <button className="p-1" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="text-gray-500 mb-1">{job.store}</div>
              <div className="font-medium">{job.title}</div>
              {job.messages > 0 && (
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <MessageSquare className="h-6 w-6 text-gray-700" />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {job.messages}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* チャットシート - 下から表示 */}
      <Sheet
        open={selectedJobId !== null}
        onOpenChange={(open) => !open && closeChat()}>
        <SheetContent side="bottom" className="p-0 h-[80vh] rounded-t-xl">
          {selectedJob && (
            <div className="flex flex-col h-full">
              {/* ヘッダー */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40&text=洋"
                        alt={selectedJob.store}
                      />
                      <AvatarFallback>洋</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedJob.store}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedJob.date} {selectedJob.time}
                      </p>
                    </div>
                  </div>
                  <button onClick={closeChat} className="p-2">
                    <ChevronDown className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* メッセージエリア */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {jobMessages[selectedJob.id as keyof typeof jobMessages]?.map(
                  (message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "chef"
                          ? "justify-end"
                          : "justify-start"
                      }`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === "chef"
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-100"
                        }`}>
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "chef"
                              ? "text-primary-foreground/70"
                              : "text-gray-500"
                          }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  )
                ) || (
                  <div className="text-center text-gray-500 py-4">
                    メッセージはまだありません
                  </div>
                )}
              </div>

              {/* 入力エリア */}
              <div className="border-t p-4 flex gap-2">
                <Input
                  placeholder="メッセージを入力..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
