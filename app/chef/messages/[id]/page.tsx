"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function MessageDetail({ params }: PageProps) {
  const [newMessage, setNewMessage] = useState("");

  const messages = [
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
    {
      id: 4,
      sender: "chef",
      text: "はい、その時間帯であれば問題ありません。月・水・金であれば毎週出勤可能です。",
      time: "10:50",
    },
    {
      id: 5,
      sender: "store",
      text: "ありがとうございます。では、まずは今月31日（月）に来ていただけますか？詳細はこちらでご確認ください。当日はよろしくお願いいたします。",
      time: "11:00",
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // 実際のアプリではここでメッセージを送信する処理を行う
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b p-4 flex items-center">
        <Link href="/chef/job/1" className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40&text=洋"
              alt="洋食 黒船亭"
            />
            <AvatarFallback>洋</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-medium">洋食 黒船亭</h1>
            <p className="text-xs text-gray-500">通常1時間以内に返信</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "chef" ? "justify-end" : "justify-start"
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
        ))}
      </div>

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
  );
}
