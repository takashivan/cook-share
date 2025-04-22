"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MessageSquare,
  Settings,
  User,
  Briefcase,
  Bell,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

export default function LiffDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liff = (await import("@line/liff")).default;
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        setProfile(profile);
        setIsLoading(false);
      } catch (error) {
        console.error("LIFF initialization failed:", error);
      }
    };

    initializeLiff();
  }, []);

  const handleLogout = async () => {
    try {
      const liff = (await import("@line/liff")).default;
      liff.logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              {profile?.pictureUrl && (
                <img
                  src={profile.pictureUrl}
                  alt={profile.displayName}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <span className="font-bold text-gray-900">
              {profile?.displayName}
            </span>
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
        {/* ステータスカード */}
        <AnimatedSection className="mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <Briefcase className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">現在の案件</p>
                    <p className="text-2xl font-bold text-gray-900">3件</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <MessageSquare className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">未読メッセージ</p>
                    <p className="text-2xl font-bold text-gray-900">2件</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <Bell className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">通知</p>
                    <p className="text-2xl font-bold text-gray-900">1件</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* メニュー */}
        <AnimatedSection className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">メニュー</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <Calendar className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      スケジュール
                    </h3>
                    <p className="text-sm text-gray-600">予定の確認と管理</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <Briefcase className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">案件管理</h3>
                    <p className="text-sm text-gray-600">現在の案件と履歴</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <MessageSquare className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">メッセージ</h3>
                    <p className="text-sm text-gray-600">飲食店とのやり取り</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <User className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      プロフィール
                    </h3>
                    <p className="text-sm text-gray-600">基本情報の管理</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <Settings className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">設定</h3>
                    <p className="text-sm text-gray-600">アカウント設定</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* 最近のアクティビティ */}
        <AnimatedSection>
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            最近のアクティビティ
          </h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    icon: MessageSquare,
                    title: "新しいメッセージ",
                    description: "レストランABCからメッセージが届きました",
                    time: "10分前",
                  },
                  {
                    icon: Briefcase,
                    title: "案件更新",
                    description: "案件「渋谷店 週末シフト」が承認されました",
                    time: "1時間前",
                  },
                  {
                    icon: Calendar,
                    title: "スケジュール更新",
                    description: "来週のシフトが確定しました",
                    time: "2時間前",
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4">
                    <div className="rounded-full bg-gray-100 p-2">
                      <activity.icon className="h-5 w-5 text-gray-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>
    </div>
  );
}
