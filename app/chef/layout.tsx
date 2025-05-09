"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Home, Calendar, Wallet, MessageSquare, ListTodo } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ChefNotificationDropdown } from "@/components/notifications/chefNotificationDropdown/ChefNotificationDropdown";
import { useSubscriptionChefNotificationsByUserId } from "@/hooks/api/user/chefNotifications/useSubscriptionChefNotificationsByUserId";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, HelpCircle } from "lucide-react";
import { useSubscriptionUnreadMessagesByUser } from "@/hooks/api/user/messages/useSubscriptionUnreadMessagesByUser";
import { Badge } from "@/components/ui/badge";

export default function ChefLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "upcoming";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.replace("/login");
  };

  const { notifications } = useSubscriptionChefNotificationsByUserId({
    userId: user?.id,
  });

  // 未読メッセージの取得
  const { unreadMessagesData } = useSubscriptionUnreadMessagesByUser({
    userId: user?.id,
  });

  // 未読メッセージの合計数を計算
  const totalUnreadMessages =
    unreadMessagesData?.reduce((total, messageData) => {
      return total + (messageData.unread_message_count || 0);
    }, 0) || 0;

  useEffect(() => {
    // 初期ロード時は何もしない
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    // 初期ロード後、未認証の場合はログインページへ
    if (!isAuthenticated && pathname.startsWith("/chef")) {
      router.replace("/login");
      return;
    }

    // 認証済みの場合、メール認証とプロフィール完了状態をチェック
    if (isAuthenticated && user) {
      // @ts-ignore - TODO: Fix type definition
      if (!user.is_verified) {
        router.replace("/register/chef-verify-email");
        return;
      }
      // @ts-ignore - TODO: Fix type definition
      if (!user.profile_completed) {
        router.replace("/register/chef-profile");
        return;
      }
    }
  }, [isAuthenticated, router, pathname, isInitialLoad, user]);

  // 初期ロード時は表示を維持
  if (isInitialLoad) {
    return null;
  }

  // 初期ロード後、未認証の場合は何も表示しない
  if (!isAuthenticated && pathname.startsWith("/chef")) {
    return null;
  }

  // 認証済みだが、メール認証またはプロフィール完了していない場合も表示しない
  if (isAuthenticated && user) {
    // @ts-ignore - TODO: Fix type definition
    if (!user.is_verified || !user.profile_completed) {
      return null;
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/chef/dashboard" className="flex items-center gap-2">
            <Image
              src="/chef_illust/chef_logo.png?height=200&width=400"
              alt="CHEFDOM Logo"
              width={120}
              height={30}
              className="text-white"
            />
          </Link>
          <div className="flex items-center gap-4">
            <ChefNotificationDropdown notifications={notifications ?? []} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile_image} alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/chef/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>プロフィール</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/chef/account-settings"
                    className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>設定</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/chef/guide" className="flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>ご利用の流れ</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/chef/faq" className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>よくある質問</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 h-16">
            <Link
              href="/chef/dashboard"
              className={`flex flex-col items-center justify-center gap-1 ${
                pathname === "/chef/dashboard"
                  ? "text-orange-600"
                  : "text-gray-500"
              }`}>
              <Home className="h-5 w-5" />
              <span className="text-xs">ホーム</span>
            </Link>
            <Link
              href="/chef/schedule"
              className={`flex flex-col items-center justify-center gap-1 ${
                pathname === "/chef/schedule"
                  ? "text-orange-600"
                  : "text-gray-500"
              }`}>
              <Calendar className="h-5 w-5" />
              <span className="text-xs">スケジュール</span>
            </Link>
            <Link
              href="/chef/todos"
              className={`flex flex-col items-center justify-center gap-1 ${
                pathname === "/chef/todos" ? "text-orange-600" : "text-gray-500"
              }`}>
              <ListTodo className="h-5 w-5" />
              <span className="text-xs">やること</span>
            </Link>
            <Link
              href="/chef/messages"
              className={`flex flex-col items-center justify-center gap-1 relative ${
                pathname === "/chef/messages"
                  ? "text-orange-600"
                  : "text-gray-500"
              }`}>
              <div className="relative">
                <MessageSquare className="h-5 w-5" />
                {totalUnreadMessages > 0 && (
                  <Badge className="absolute -top-3 -right-5 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white">
                    {totalUnreadMessages}
                  </Badge>
                )}
              </div>
              <span className="text-xs">メッセージ</span>
            </Link>
            <Link
              href="/chef/salary"
              className={`flex flex-col items-center justify-center gap-1 ${
                pathname === "/chef/salary"
                  ? "text-orange-600"
                  : "text-gray-500"
              }`}>
              <Wallet className="h-5 w-5" />
              <span className="text-xs">給料</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
