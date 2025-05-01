"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { CheckLineUser } from "@/lib/api/line";
import { ChevronLeft, LogOut, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/lib/contexts/AuthContext";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Message, WorkSessionWithJob } from "@/types";
import { getWorkSessionsByUserId } from "@/lib/api/workSession";
import { messageApi, CreateMessageParams } from "@/lib/api/message";
import useSWR from "swr";
import { LinkAccountScreen } from "../components/LinkAccountScreen";
import { useSubscriptionMessagesByUserId } from "@/hooks/api/user/messages/useSubscriptionMessagesByUserId";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={className}>
      {children}
    </motion.section>
  );
};

function MessagesPage({ profile }: { profile: any }) {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");

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

  // 選択されたワークセッション
  const selectedWorkSession = workSessions?.find(
    (ws) => ws?.job?.id === selectedJobId
  );

  // メッセージの取得
  const { messagesData, sendMessage } = useSubscriptionMessagesByUserId({
    userId: user?.id,
    workSessionId: selectedWorkSession?.id,
    applicationId: selectedWorkSession?.application_id,
  })

  const handleSendMessage = async () => {
    try {
      sendMessage(messageInput);
      setMessageInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const liff = (await import("@line/liff")).default;
      liff.logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderMessageCard = (workSession: WorkSessionWithJob) => {
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
      <motion.div
        key={workSession.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}>
        <Card
          className="mb-4 hover:bg-gray-50 transition-colors"
          onClick={() => setSelectedJobId(Number(workSession.job.id))}>
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
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/line-connect/liff")}
              className="text-gray-600 hover:text-gray-900">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="font-bold text-gray-900">メッセージ</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatedSection>
          {workSessions && workSessions.length > 0 ? (
            workSessions.map(renderMessageCard)
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-500">メッセージはありません</p>
                </div>
              </CardContent>
            </Card>
          )}
        </AnimatedSection>
      </main>

      {/* チャットシート */}
      <Sheet
        open={selectedJobId !== null}
        onOpenChange={() => setSelectedJobId(null)}>
        <SheetContent side="bottom" className="h-[80vh]">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
              {messagesData?.messages?.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender_type === "chef" ? "text-right" : "text-left"
                  }`}>
                  <div
                    className={`inline-block rounded-lg px-4 py-2 ${
                      message.sender_type === "chef"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="メッセージを入力..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>送信</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function MessagesLiffPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLinked, setIsLinked] = useState<boolean | null>(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liff = (await import("@line/liff")).default;

        // LIFFの初期化
        await liff.init({
          liffId: "2007239287-yqkpjQBl",
          withLoginOnExternalBrowser: true,
        });

        // ログイン状態の確認
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        // プロフィール情報の取得
        const profile = await liff.getProfile();
        setProfile(profile);

        // アカウント連携の確認
        const response = await CheckLineUser(profile.userId);
        setIsLinked(response && response.count > 0);
        setIsLoading(false);
      } catch (error) {
        console.error("LIFF initialization failed:", error);
        setError("初期化に失敗しました。ページをリロードしてください。");
        setIsLoading(false);
      }
    };

    initializeLiff();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            ページをリロード
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!isLinked && profile) {
    return (
      <LinkAccountScreen
        lineUserId={profile.userId}
        name={profile.displayName}
        picture={profile.pictureUrl || ""}
      />
    );
  }

  if (isLinked && profile) {
    return <MessagesPage profile={profile} />;
  }

  return null;
}
