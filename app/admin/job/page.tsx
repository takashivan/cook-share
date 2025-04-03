"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  Phone,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function JobApplicants() {
  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(1);

  const applicants = [
    {
      id: 1,
      name: "佐藤 健太",
      avatar: "/placeholder.svg?height=40&width=40&text=佐",
      status: "応募済み",
      lastMessage:
        "はじめまして、佐藤と申します。求人に応募させていただきました。",
      lastMessageTime: "10:30",
      unread: true,
    },
    {
      id: 2,
      name: "田中 美咲",
      avatar: "/placeholder.svg?height=40&width=40&text=田",
      status: "面接調整中",
      lastMessage: "面接の日程ですが、来週の水曜日は都合がよろしいでしょうか？",
      lastMessageTime: "昨日",
      unread: false,
    },
    {
      id: 3,
      name: "鈴木 大輔",
      avatar: "/placeholder.svg?height=40&width=40&text=鈴",
      status: "採用決定",
      lastMessage: "ありがとうございます。当日はよろしくお願いいたします。",
      lastMessageTime: "3日前",
      unread: false,
    },
    {
      id: 4,
      name: "高橋 由美",
      avatar: "/placeholder.svg?height=40&width=40&text=高",
      status: "不採用",
      lastMessage:
        "ご連絡ありがとうございました。また機会がありましたらよろしくお願いいたします。",
      lastMessageTime: "1週間前",
      unread: false,
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      text: "はじめまして、佐藤と申します。求人に応募させていただきました。",
      time: "10:30",
    },
    {
      id: 2,
      senderId: "admin",
      text: "佐藤様、応募ありがとうございます。ご経験やスキルについて教えていただけますか？",
      time: "10:35",
    },
    {
      id: 3,
      senderId: 1,
      text: "以前、洋食店で2年ほど調理補助として働いていました。ハンバーグやオムライスなどの基本的な調理は問題なくできます。",
      time: "10:40",
    },
    {
      id: 4,
      senderId: "admin",
      text: "ありがとうございます。当店では特にランチタイムの繁忙時間帯にお手伝いいただきたいと考えています。11時から15時の間で週3日程度の勤務は可能でしょうか？",
      time: "10:45",
    },
    {
      id: 5,
      senderId: 1,
      text: "はい、その時間帯であれば問題ありません。月・水・金であれば毎週出勤可能です。",
      time: "10:50",
    },
  ];

  const selectedApplicantData =
    applicants.find((a) => a.id === selectedApplicant) || null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">応募者管理</h2>
        <p className="text-muted-foreground">
          【明治創業】上野駅徒歩5分、老舗洋食店での勤務
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicants List */}
        <Card className="lg:col-span-1">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-lg">応募者一覧</CardTitle>
            <CardDescription>全 {applicants.length} 名</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {applicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedApplicant === applicant.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedApplicant(applicant.id)}>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={applicant.avatar}
                        alt={applicant.name}
                      />
                      <AvatarFallback>
                        {applicant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{applicant.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {applicant.lastMessageTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`
                          ${
                            applicant.status === "応募済み"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                          }
                          ${
                            applicant.status === "面接調整中"
                              ? "bg-purple-100 text-purple-800"
                              : ""
                          }
                          ${
                            applicant.status === "採用決定"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                          ${
                            applicant.status === "不採用"
                              ? "bg-gray-100 text-gray-800"
                              : ""
                          }
                        `}>
                          {applicant.status}
                        </Badge>
                        {applicant.unread && (
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {applicant.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedApplicantData ? (
            <>
              <CardHeader className="px-4 py-3 flex-row items-center justify-between space-y-0 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedApplicantData.avatar}
                      alt={selectedApplicantData.name}
                    />
                    <AvatarFallback>
                      {selectedApplicantData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {selectedApplicantData.name}
                    </CardTitle>
                    <Badge
                      className={`
                      ${
                        selectedApplicantData.status === "応募済み"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        selectedApplicantData.status === "面接調整中"
                          ? "bg-purple-100 text-purple-800"
                          : ""
                      }
                      ${
                        selectedApplicantData.status === "採用決定"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        selectedApplicantData.status === "不採用"
                          ? "bg-gray-100 text-gray-800"
                          : ""
                      }
                    `}>
                      {selectedApplicantData.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        プロフィール
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>応募者プロフィール</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={selectedApplicantData.avatar}
                              alt={selectedApplicantData.name}
                            />
                            <AvatarFallback>
                              {selectedApplicantData.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-medium">
                              {selectedApplicantData.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              30歳・男性
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">連絡先</h4>
                            <div className="text-sm flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              090-1234-5678
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              希望勤務日
                            </h4>
                            <div className="text-sm flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              月・水・金
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              希望勤務時間
                            </h4>
                            <div className="text-sm flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              11:00〜15:00
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">居住地</h4>
                            <div className="text-sm flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              東京都台東区
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              経歴・スキル
                            </h4>
                            <p className="text-sm">
                              洋食店で2年ほど調理補助として勤務。ハンバーグやオムライスなどの基本的な調理が可能。接客経験もあり。
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">メニューを開く</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>面接を設定</DropdownMenuItem>
                      <DropdownMenuItem>採用する</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        不採用にする
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 h-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "admin"
                          ? "justify-end"
                          : "justify-start"
                      }`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.senderId === "admin"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}>
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "admin"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="メッセージを入力..." className="flex-1" />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">送信</span>
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-8 flex flex-col items-center justify-center h-[500px] text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                応募者を選択してください
              </h3>
              <p className="text-muted-foreground">
                左側のリストから応募者を選択すると、チャット履歴が表示されます。
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
