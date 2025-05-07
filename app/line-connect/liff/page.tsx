"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckLineUser } from "@/lib/api/line";
import { LinkAccountScreen } from "./components/LinkAccountScreen";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

function DashboardPage({ profile }: { profile: any }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      const liff = (await import("@line/liff")).default;
      liff.logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* プロフィールセクション */}
        <AnimatedSection className="mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile.pictureUrl} />
                  <AvatarFallback>
                    {profile.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">
                    {profile.displayName}
                  </h2>
                  <p className="text-sm text-gray-500">シェフ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* ステータスカード */}
        <AnimatedSection className="mb-8">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">3</p>
                  <p className="text-sm text-gray-500">次のお仕事</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">2</p>
                  <p className="text-sm text-gray-500">未読メッセージ</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* メッセージ */}
        <AnimatedSection>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-center text-gray-500">
                リッチメニューから各機能にアクセスできます
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>
    </div>
  );
}

export default function LiffPage() {
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
    return <DashboardPage profile={profile} />;
  }

  return null;
}
