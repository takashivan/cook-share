"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import type { Message, WorkSessionWithJob } from "@/types";
import { messageApi, CreateMessageParams } from "@/lib/api/message";
import { workSessionApi } from "@/lib/api/workSession";
import useSWR from "swr";
import { ChatSheet } from "@/components/chat/ChatSheet";
import { XanoClient } from "@xano/js-sdk";
import { getWorkSessionsByUserId } from "@/lib/api/workSession";

export default function SchedulePage() {
  const { user } = useAuth();
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  // ワークセッション一覧の取得
  const { data: workSessions } = useSWR<WorkSessionWithJob[]>(
    user?.id ? `workSessions-${user.id}` : null,
    async () => {
      const result = await getWorkSessionsByUserId(user?.id || "");
      return result as WorkSessionWithJob[];
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log(workSessions);

  // 選択されたワークセッション
  const selectedWorkSession = workSessions?.find(
    (ws) => ws?.job?.id === selectedJobId
  );

  // メッセージの取得
  const { data: messages, mutate: mutateMessages } = useSWR<Message[]>(
    selectedWorkSession ? `messages-${selectedWorkSession.id}` : null,
    async () => {
      if (!selectedWorkSession) return [];
      const result = await messageApi.getMessagesByWorkSessionId(
        selectedWorkSession.id
      );
      return result as Message[];
    }
  );

  // Xanoのリアルタイム接続を設定
  useEffect(() => {
    if (!selectedWorkSession?.id) return;

    const xanoClient = new XanoClient({
      instanceBaseUrl: process.env.NEXT_PUBLIC_XANO_BASE_URL || "",
      realtimeConnectionHash: process.env.NEXT_PUBLIC_XANO_REALTIME_HASH || "",
    });

    let channel: any;

    const setupChannel = async () => {
      try {
        // チャンネルの設定
        channel = xanoClient.channel(`worksession/${selectedWorkSession.id}`);
        console.log("Channel setup for workSession:", selectedWorkSession.id);

        // メッセージの購読
        channel.on((message: any) => {
          console.log("Chef received message:", message);
          mutateMessages();
        });
      } catch (error) {
        console.error("Error setting up channel:", error);
      }
    };

    setupChannel();

    return () => {
      if (channel) {
        channel.off();
      }
    };
  }, [selectedWorkSession?.id, mutateMessages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !selectedWorkSession) return;

    try {
      const messageParams: CreateMessageParams = {
        content: message,
        worksession_id: selectedWorkSession.id,
        application_id: selectedWorkSession.application_id,
        sender_type: "chef",
      };

      await messageApi.createMessage(messageParams);
      mutateMessages();
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

  // ワークセッションをステータスでフィルタリング
  const filteredWorkSessions = {
    upcoming: workSessions?.filter((ws) => ws.status === "SCHEDULED") || [],
    completed:
      workSessions?.filter((ws) =>
        ["COMPLETED", "VERIFIED"].includes(ws.status)
      ) || [],
  };

  const renderWorkSessionCard = (workSession: WorkSessionWithJob) => {
    if (!workSession.job) return null;

    const workDate = format(
      new Date(workSession.job.work_date),
      "yyyy年MM月dd日 (E)",
      {
        locale: ja,
      }
    );
    const startTime = format(
      new Date(workSession.job.start_time * 1000),
      "HH:mm"
    );
    const endTime = format(new Date(workSession.job.end_time * 1000), "HH:mm");

    return (
      <Card
        key={workSession.id}
        className="mb-4 hover:bg-gray-50 transition-colors"
        onClick={() => openChat(Number(workSession.job.id))}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{workDate}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-500">
                {startTime} 〜 {endTime}
              </span>
            </div>
          </div>
          <div className="text-gray-500 mb-1">
            {workSession.job.restaurant.name}
          </div>
          <div className="text-xs text-gray-400 mb-2">
            {workSession.job.restaurant.address}
          </div>
          <div className="font-medium">{workSession.job.title}</div>
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

        <TabsContent value="upcoming" className="mt-6">
          {filteredWorkSessions.upcoming.length > 0 ? (
            filteredWorkSessions.upcoming.map(renderWorkSessionCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              予定されているお仕事はありません
            </p>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {filteredWorkSessions.completed.length > 0 ? (
            filteredWorkSessions.completed.map(renderWorkSessionCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              完了したお仕事はありません
            </p>
          )}
        </TabsContent>
      </Tabs>

      <ChatSheet
        isOpen={selectedJobId !== null}
        onClose={closeChat}
        messages={messages}
        mutateMessages={mutateMessages}
        onSendMessage={handleSendMessage}
        restaurantName={selectedWorkSession?.job?.restaurant.name || ""}
        restaurantImage={selectedWorkSession?.job?.restaurant.image_url || ""}
        workDate={selectedWorkSession?.job?.work_date || ""}
        startTime={selectedWorkSession?.job?.start_time || 0}
        workSessionId={selectedWorkSession?.id || 0}
      />
    </div>
  );
}
