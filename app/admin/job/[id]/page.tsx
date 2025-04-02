"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Users,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import useSWR from "swr";
import { jobApi } from "@/lib/api/job";
import { applicationApi } from "@/lib/api/application";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Application } from "@/types/index";
import { GetApplicationsResponse } from "@/lib/api/application";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(
    null
  );

  const { data: job, error: jobError } = useSWR(
    [`job`, params.id],
    ([_, id]) => jobApi.getJob(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  const { data: applications, error: applicationsError } =
    useSWR<GetApplicationsResponse>(
      params.id ? [`applications`, params.id] : null,
      async ([_, id]) => {
        const result = await applicationApi.getApplicationsByJob(Number(id));
        return result;
      },
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 10000,
      }
    );

  const isLoading =
    (!job && !jobError) || (!applications && !applicationsError);
  const error = jobError || applicationsError;

  const selectedApplicantData = applications?.find(
    (a) => a.id === selectedApplicant
  );

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
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/stores/${job?.restaurant_id}`}
            className="hover:opacity-80">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {job?.title || "求人詳細"}
            </h2>
            <p className="text-muted-foreground">
              {format(
                job?.work_date ? new Date(job.work_date) : new Date(),
                "yyyy年MM月dd日",
                { locale: ja }
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            求人を編集
          </Button>
        </div>

        <Tabs defaultValue="detail">
          <TabsList>
            <TabsTrigger value="detail">求人詳細</TabsTrigger>
            <TabsTrigger value="applicants">応募者管理</TabsTrigger>
          </TabsList>

          <TabsContent value="detail">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>求人詳細</CardTitle>
                  <Badge variant="outline">{job?.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      勤務日時
                    </h3>
                    <p>
                      {format(
                        job?.work_date ? new Date(job.work_date) : new Date(),
                        "yyyy年MM月dd日",
                        { locale: ja }
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(
                        job?.start_time ? new Date(job.start_time) : new Date(),
                        "HH:mm"
                      )}{" "}
                      〜{" "}
                      {format(
                        job?.end_time ? new Date(job.end_time) : new Date(),
                        "HH:mm"
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      給与
                    </h3>
                    <p>時給 {job?.hourly_rate}円</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    仕事内容
                  </h3>
                  <p className="whitespace-pre-wrap">{job?.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applicants">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Applicants List */}
              <Card className="lg:col-span-1">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-lg">応募者一覧</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    全 {applications?.length || 0} 名
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {applications?.map((application) => (
                      <div
                        key={application.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedApplicant === application.id
                            ? "bg-gray-50"
                            : ""
                        }`}
                        onClick={() => setSelectedApplicant(application.id)}>
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                application.user.profile_image ||
                                `/placeholder.svg?height=40&width=40&text=${application.user.name.charAt(
                                  0
                                )}`
                              }
                              alt={application.user.name}
                            />
                            <AvatarFallback>
                              {application.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">
                                {application.user.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(
                                  new Date(application.created_at),
                                  "MM/dd HH:mm"
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">
                                {application.status || "応募済み"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate mt-1">
                              {application.notes || "メッセージはありません"}
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
                            src={
                              selectedApplicantData.user.profile_image ||
                              `/placeholder.svg?height=40&width=40&text=${selectedApplicantData.user.name.charAt(
                                0
                              )}`
                            }
                            alt={selectedApplicantData.user.name}
                          />
                          <AvatarFallback>
                            {selectedApplicantData.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {selectedApplicantData.user.name}
                          </CardTitle>
                          <Badge variant="outline">
                            {selectedApplicantData.status || "応募済み"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-2" />
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
                                    src={
                                      selectedApplicantData.user
                                        .profile_image ||
                                      `/placeholder.svg?height=40&width=40&text=${selectedApplicantData.user.name.charAt(
                                        0
                                      )}`
                                    }
                                    alt={selectedApplicantData.user.name}
                                  />
                                  <AvatarFallback>
                                    {selectedApplicantData.user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-medium">
                                    {selectedApplicantData.user.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    30歳・男性
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-1">
                                    連絡先
                                  </h4>
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
                                  <h4 className="text-sm font-medium mb-1">
                                    居住地
                                  </h4>
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
                        <Input
                          placeholder="メッセージを入力..."
                          className="flex-1"
                        />
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
