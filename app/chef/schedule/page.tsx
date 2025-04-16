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
import { ChatSheet } from "@/components/chat/ChatSheet";
import { XanoClient } from "@xano/js-sdk";

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
  const [activeTab, setActiveTab] = useState("upcoming");
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

  // Xanoのリアルタイム接続を設定
  useEffect(() => {
    if (!workSession?.id) return;

    const xanoClient = new XanoClient({
      instanceBaseUrl: process.env.NEXT_PUBLIC_XANO_BASE_URL || "",
      realtimeConnectionHash: process.env.NEXT_PUBLIC_XANO_REALTIME_HASH || "",
    });

    // チャンネルの設定
    const channel = xanoClient.channel(`worksession/${workSession.id}`);

    // メッセージの購読
    channel.on((message: any) => {
      console.log("Chef received message:", message);
      mutateMessages();
    });

    return () => {};
  }, [workSession?.id, mutateMessages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !workSession || !selectedApplication) return;

    try {
      const messageParams: CreateMessageParams = {
        content: message,
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
        key={application.id}
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
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="upcoming">次のお仕事</TabsTrigger>
          <TabsTrigger value="completed">完了</TabsTrigger>
        </TabsList>

        {/* <TabsContent value="applied" className="mt-6">
          {filteredApplications.applied.length > 0 ? (
            filteredApplications.applied.map(renderJobCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              応募中のお仕事はありません
            </p>
          )}
        </TabsContent> */}

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
      <ChatSheet
        isOpen={selectedJobId !== null}
        onClose={closeChat}
        messages={messages}
        mutateMessages={mutateMessages}
        onSendMessage={handleSendMessage}
        restaurantName={selectedApplication?.job?.restaurant.name || ""}
        restaurantImage={selectedApplication?.job?.restaurant.image || ""}
        workDate={selectedApplication?.job?.work_date || ""}
        startTime={selectedApplication?.job?.start_time || 0}
        workSessionId={selectedApplication?.job?.id || 0}
      />
    </div>
  );
}
