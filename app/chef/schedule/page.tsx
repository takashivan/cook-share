"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { MoreHorizontal, MessageSquare, Send, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { applicationApi } from "@/lib/api/application";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Application, Job, Message, WorkSession } from "@/types";
import { messageApi, CreateMessageParams } from "@/lib/api/message";
import { workSessionApi } from "@/lib/api/workSession";
import useSWR from "swr";

// APIレスポンスの型
interface ApplicationResponse extends Omit<Application, "job"> {
  job: {
    id: number;
    created_at: string;
    title: string;
    description: string;
    work_date: string;
    start_time: number;
    end_time: number;
    hourly_rate: number;
    required_skills: string[];
    status: string;
    updated_at: string;
    restaurant_id: number;
    image: string | null;
    creator_id: number;
    task: string | null;
    skill: string | null;
    whattotake: string | null;
    note: string | null;
    point: string | null;
    transportation: string;
    is_approved: boolean;
    _restaurant: {
      id: number;
      name: string;
      address: string;
      image: string | null;
    };
  };
}

interface ApplicationWithJob extends Application {
  job?: Job & {
    restaurant: {
      id: number;
      name: string;
      address: string;
      image: string | null;
    };
  };
}

export default function SchedulePage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [activeTab, setActiveTab] = useState("applied");
  const [messageInput, setMessageInput] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const selectedApplication = selectedJobId
    ? applications.find((app) => app.job?.id === selectedJobId)
    : null;

  // ワークセッションの取得
  const { data: workSession } = useSWR<WorkSession | null>(
    selectedApplication?.status === "ACCEPTED"
      ? `workSession-${selectedApplication.id}`
      : null,
    async () => {
      if (!selectedApplication) return null;
      const result = (await workSessionApi.getWorkSessions()) as WorkSession[];
      // 選択された応募に紐づくワークセッションを探す
      const matchingWorkSession = result.find(
        (ws) => ws.application_id === selectedApplication.id.toString()
      );
      console.log("Debug - Selected application:", selectedApplication.id);
      console.log("Debug - Found work session:", matchingWorkSession);
      return matchingWorkSession || null;
    }
  );

  // メッセージの取得
  const { data: messages, mutate: mutateMessages } = useSWR<Message[]>(
    workSession ? `messages-${workSession.id}` : null,
    async () => {
      if (!workSession) return [];
      const result = await messageApi.getMessagesByWorkSessionId(
        workSession.id
      );
      return result as Message[];
    }
  );

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !workSession || !selectedApplication) return;

    try {
      const messageParams: CreateMessageParams = {
        content: messageInput,
        worksession_id: workSession.id,
        application_id: selectedApplication.id.toString(),
        sender_type: "chef",
      };

      await messageApi.createMessage(messageParams);
      setMessageInput(""); // 入力をクリア
      mutateMessages(); // メッセージ一覧を更新
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const openChat = (jobId: number) => {
    setSelectedJobId(jobId);
  };

  const closeChat = () => {
    setSelectedJobId(null);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      if (user?.id) {
        try {
          const response = (await applicationApi.getApplicationsByUser(
            user.id
          )) as ApplicationResponse[];
          console.log("API Response:", response);
          // レスポンスのジョブデータを適切な型に変換
          const applicationsWithJobs = response.map((app) => {
            if (!app.job) return { ...app, job: undefined };

            // タイムスタンプを数値に変換し、null値を適切に処理
            const jobWithNumberTimestamps = {
              ...app.job,
              created_at: new Date(app.job.created_at).getTime(),
              updated_at: new Date(app.job.updated_at).getTime(),
              image: app.job.image || "",
              task: app.job.task || "",
              skill: app.job.skill || "",
              whattotake: app.job.whattotake || "",
              note: app.job.note || "",
              point: app.job.point || "",
              restaurant: {
                ...app.job._restaurant,
                image: app.job._restaurant.image || "",
              },
            };
            console.log("Transformed job:", jobWithNumberTimestamps);
            return { ...app, job: jobWithNumberTimestamps };
          });
          console.log("Final applications:", applicationsWithJobs);
          setApplications(applicationsWithJobs as ApplicationWithJob[]);
        } catch (error) {
          console.error("Failed to fetch applications:", error);
        }
      }
    };

    fetchApplications();
  }, [user?.id]);

  console.log("Current applications state:", applications);

  const filteredApplications = {
    applied: applications.filter((app) => app.status === "APPLIED"),
    upcoming: applications.filter((app) => app.status === "ACCEPTED"),
    completed: applications.filter((app) => ["DONE"].includes(app.status)),
  };

  console.log("Filtered applications:", filteredApplications);

  const renderJobCard = (application: ApplicationWithJob) => {
    if (!application.job) return null;

    const workDate = format(
      new Date(application.job.work_date),
      "yyyy年MM月dd日 (E)",
      {
        locale: ja,
      }
    );
    const startTime = format(
      new Date(application.job.start_time * 1000),
      "HH:mm"
    );
    const endTime = format(new Date(application.job.end_time * 1000), "HH:mm");

    return (
      <Card
        className="mb-4 hover:bg-gray-50 transition-colors"
        onClick={() => openChat(application.job!.id)}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{workDate}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-500">
                {startTime} 〜 {endTime}
              </span>
            </div>
            {/* <button className="p-1" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>
            <Badge
              variant={
                application.status === "APPLIED"
                  ? "secondary"
                  : application.status === "ACCEPTED"
                  ? "default"
                  : application.status === "REJECTED"
                  ? "destructive"
                  : application.status === "CANCELED"
                  ? "outline"
                  : "outline"
              }>
              {application.status === "APPLIED"
                ? "応募中"
                : application.status === "ACCEPTED"
                ? "確定"
                : application.status === "REJECTED"
                ? "不採用"
                : application.status === "CANCELED"
                ? "キャンセル"
                : "完了"}
            </Badge> */}
          </div>
          <div className="text-gray-500 mb-1">
            {application.job.restaurant.name}
          </div>
          <div className="text-xs text-gray-400 mb-2">
            {application.job.restaurant.address}
          </div>
          <div className="font-medium">{application.job.title}</div>
          {application.notes && (
            <div className="text-sm text-gray-500 mt-2">
              {application.notes}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">お仕事スケジュール</h1>

      <Tabs
        defaultValue="applied"
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="applied">応募中</TabsTrigger>
          <TabsTrigger value="upcoming">次のお仕事</TabsTrigger>
          <TabsTrigger value="completed">完了</TabsTrigger>
        </TabsList>

        <TabsContent value="applied" className="mt-6">
          {filteredApplications.applied.length > 0 ? (
            filteredApplications.applied.map(renderJobCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              応募中のお仕事はありません
            </p>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          {filteredApplications.upcoming.length > 0 ? (
            filteredApplications.upcoming.map(renderJobCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              確定しているお仕事はありません
            </p>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {filteredApplications.completed.length > 0 ? (
            filteredApplications.completed.map(renderJobCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              完了したお仕事はありません
            </p>
          )}
        </TabsContent>
      </Tabs>
      {/* チャットシート - 下から表示 */}
      <Sheet
        open={selectedJobId !== null}
        onOpenChange={(open) => !open && closeChat()}>
        <SheetContent side="bottom" className="p-0 h-[80vh] rounded-t-xl">
          {selectedApplication?.job && (
            <div className="flex flex-col h-full">
              {/* ヘッダー */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={
                          selectedApplication.job.restaurant.image ||
                          "/placeholder.svg"
                        }
                        alt={selectedApplication.job.restaurant.name}
                      />
                      <AvatarFallback>
                        {selectedApplication.job.restaurant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {selectedApplication.job.restaurant.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {format(
                          new Date(selectedApplication.job.work_date),
                          "yyyy年MM月dd日"
                        )}{" "}
                        {format(
                          new Date(selectedApplication.job.start_time * 1000),
                          "HH:mm"
                        )}
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
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
