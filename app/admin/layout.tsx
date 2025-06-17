"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import {
  CreditCard,
  LogOut,
  Menu,
  Utensils,
  Settings,
  Tag,
  Store,
  Users,
  Building,
  ChevronRight,
  Home,
  Bell,
  ChevronDown,
  Mail,
  HelpCircle,
  Grip,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RestaurantNotificationDropdown } from "@/components/notifications/restaurantNotificationDropdown/RestaurantNotificationDropdown";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useSubscriptionCompanyUserNotificationsByUserId } from "@/hooks/api/companyuser/companyUserNotifications/useSubscriptionCompanyUserNotificationsByUserId";
import { useGetRestaurantsByCompanyUserId } from "@/hooks/api/companyuser/restaurants/useGetRestaurantsByCompanyUserId";
import { Badge } from "@/components/ui/badge";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  show: boolean;
  onClick?: () => void;
  isOpen?: boolean;
  className?: string;
  notification?: React.ReactNode;
}

interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useCompanyAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isStoreListOpen, setIsStoreListOpen] = useState(false);
  const { toast } = useToast();

  const { data: restaurants } = useGetRestaurantsByCompanyUserId({
    companyuserId: user?.id,
  });

  const { notifications } = useSubscriptionCompanyUserNotificationsByUserId({
    userId: user?.id,
    handleSuccessGetMessage: (message: any) => {
      console.log("New notification received:", message);
      toast({
        title: "新しい通知",
        description: message.content || "新しい通知が届きました",
        className: "bg-orange-500 text-white border-0",
        duration: 5000,
      });
    },
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isLoading) {
          // 認証状態の初期化中は何もしない
          return;
        }

        // 初期ロード後、未認証の場合はログインページへ
        if (!isAuthenticated && pathname.startsWith("/admin")) {
          router.push("/login/company");
          return;
        }

        // 認証済みの場合
        if (isAuthenticated && user) {
          // 通常のスタッフが会社管理画面にアクセスしようとした場合、ダッシュボードにリダイレクト
          if (!user.is_admin && pathname.startsWith("/admin/company")) {
            router.push("/admin");
            return;
          }

          // メール認証が未完了の場合、メール認証ページへリダイレクト
          if (!user.is_verified) {
            router.push("/register/company-verify-email");
            return;
          }

          // 会社IDが無い＝会社情報未登録の場合、会社プロフィール登録ページへリダイレクト
          if (!user.companies_id) {
            router.push("/register/company-profile");
            return;
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        router.push("/login/company");
      }
    };

    initAuth();
  }, [isLoading, isAuthenticated, user, pathname, router]);

  // 認証確認中は何も表示しない（一瞬で終わるのでローディングは表示しない）
  if (isLoading) {
    return null;
  }

  // 認証済みでない場合は何も表示しない
  if (!isAuthenticated) {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const isStoreDetail =
    pathSegments.includes("stores") && pathSegments.length > 3;
  const isJobDetail = pathSegments.includes("jobs") && pathSegments.length > 3;

  const navigation: NavigationGroup[] = [
    {
      title: "ダッシュボード",
      items: [
        {
          title: "ホーム",
          href: "/admin",
          icon: Home,
          active: pathname === "/admin",
          show: true,
        },
      ],
    },
    ...(user?.is_admin
      ? [
          {
            title: "会社管理",
            items: [
              {
                title: "会社情報",
                href: "/admin/company",
                icon: Building,
                active: pathname === "/admin/company",
                show: true,
              },
              {
                title: "スタッフ管理",
                href: "/admin/company/staffs",
                icon: Users,
                active: pathname === "/admin/company/staffs",
                show: true,
              },
              {
                title: "請求管理",
                href: "/admin/company/billings",
                icon: CreditCard,
                active: pathname === "/admin/company/billings",
                show: true,
              },
            ],
          },
        ]
      : []),
    {
      title: "店舗管理",
      items: [
        {
          title: "店舗一覧",
          href: "/admin/stores",
          icon: Utensils,
          active: pathname === "/admin/stores",
          show: true,
        },
        {
          title: "店舗詳細",
          href: "#",
          icon: Store,
          active: pathname.startsWith("/admin/stores/"),
          show: true,
          onClick: () => setIsStoreListOpen(!isStoreListOpen),
          isOpen: isStoreListOpen,
        },
        ...(isStoreListOpen
          ? (restaurants ?? []).map((restaurant) => {
              const notificationCount =
                notifications?.filter(
                  (notification) =>
                    notification.restaurant_id === restaurant.id &&
                    !notification.is_read
                ).length ?? 0;

              return {
                title: restaurant.name,
                href: `/admin/stores/${restaurant.id}`,
                icon: Tag,
                active: pathname === `/admin/stores/${restaurant.id}`,
                show: true,
                className: "ml-4",
                notification:
                  notificationCount > 0 ? (
                    <Badge className="h-5 flex items-center justify-center bg-red-500 text-white px-1.5 py-0.5 ml-auto">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </Badge>
                  ) : null,
              };
            })
          : []),
      ],
    },
    // {
    //   title: "求人管理",
    //   items: [
    //     {
    //       title: "求人一覧",
    //       href: "/admin/jobs",
    //       icon: MessageSquare,
    //       active:
    //         pathname === "/admin/jobs" || pathname.startsWith("/admin/jobs/"),
    //       show: true,
    //     },
    //   ],
    // },

    {
      title: "その他",
      items: [
        {
          title: "アカウント設定",
          href: "/admin/settings",
          icon: Settings,
          active: pathname === "/admin/settings",
          show: true,
        },
        {
          title: "すべての通知",
          href: "/admin/notifications",
          icon: Bell,
          active: pathname === "/admin/notifications",
          show: true,
        },
        {
          title: "お問い合わせ",
          href: "/admin/contact",
          icon: Mail,
          active: pathname === "/admin/contact",
          show: true,
        },
        {
          title: "よくある質問",
          href: "/admin/faq",
          icon: HelpCircle,
          active: pathname === "/admin/faq",
          show: true,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster />
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <div className="flex flex-col h-full">
            <div className="border-b p-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/chef_illust/chef_logo.png?height=200&width=400"
                  alt="CHEFDOM Logo"
                  width={120}
                  height={30}
                />
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                  管理画面
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-auto py-2">
              {navigation.map((group) => (
                <div key={group.title} className="px-3 py-2">
                  <h3 className="mb-2 px-4 text-xs font-semibold text-gray-500">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items
                      .filter((item) => item.show)
                      .map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            if (item.onClick) {
                              e.preventDefault();
                              item.onClick();
                            }
                          }}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                            item.active
                              ? "bg-gray-100 text-gray-900 font-medium"
                              : "text-gray-700 hover:bg-gray-100",
                            item.className
                          )}>
                          <item.icon className="h-4 w-4" />
                          {item.title}
                          {item.notification}
                          {item.isOpen !== undefined && (
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 ml-auto transition-transform",
                                item.isOpen ? "rotate-180" : ""
                              )}
                            />
                          )}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="/placeholder.svg?height=36&width=36"
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium">
                    {user?.name || "ユーザー"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "email@example.com"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">ログアウト</span>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 border-r bg-white">
        <div className="flex flex-col h-full">
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <Image
                src="/chef_illust/chef_logo.png?height=200&width=400"
                alt="CHEFDOM Logo"
                width={120}
                height={30}
              />
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full ml-auto">
                管理画面
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-auto py-2">
            {navigation.map((group) => (
              <div key={group.title} className="px-3 py-2">
                <h3 className="mb-2 px-4 text-xs font-semibold text-gray-500">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items
                    .filter((item) => item.show)
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                          }
                        }}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          item.active
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-100",
                          item.className
                        )}>
                        <item.icon className="h-4 w-4" />
                        {item.title}
                        {item.notification}
                        {item.isOpen !== undefined && (
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 ml-auto transition-transform",
                              item.isOpen ? "rotate-180" : ""
                            )}
                          />
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="/placeholder.svg?height=36&width=36"
                  alt={user?.name || "User"}
                />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium">
                  {user?.name || "ユーザー"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "email@example.com"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="sr-only">ログアウト</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:pl-72 min-w-0 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/admin" className="hover:text-foreground">
                ホーム
              </Link>

              {user?.is_admin && pathname.includes("/company") && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <Link
                    href="/admin/company"
                    className={
                      pathname === "/admin/company"
                        ? "text-foreground"
                        : "hover:text-foreground"
                    }>
                    会社情報
                  </Link>

                  {pathname.includes("/company/staffs") && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-foreground">スタッフ管理</span>
                    </>
                  )}
                  {pathname.includes("/company/billings") && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-foreground">請求管理</span>
                    </>
                  )}
                </>
              )}

              {pathname.includes("/stores") && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <Link
                    href="/admin/stores"
                    className={
                      pathname === "/admin/stores"
                        ? "text-foreground"
                        : "hover:text-foreground"
                    }>
                    店舗一覧
                  </Link>

                  {isStoreDetail && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-foreground">
                        洋食 黒船亭 上野店
                      </span>
                    </>
                  )}
                </>
              )}

              {pathname.includes("/jobs") && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <Link
                    href="/admin/jobs"
                    className={
                      pathname === "/admin/jobs"
                        ? "text-foreground"
                        : "hover:text-foreground"
                    }>
                    求人一覧
                  </Link>

                  {isJobDetail && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-foreground">
                        【明治創業】上野駅徒歩5分、老舗洋食店での勤務
                      </span>
                    </>
                  )}
                </>
              )}

              {pathname.includes("/settings") && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">アカウント設定</span>
                </>
              )}

              {pathname.includes("/notifications") && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">すべての通知</span>
                </>
              )}

              {pathname.includes("/contact") && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">お問い合わせ</span>
                </>
              )}

              {pathname.includes("/faq") && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">よくある質問</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Grip className="h-5 w-5" />
                <span className="text-sm text-muted-foreground hidden sm:block">求人検索</span>
              </Button>
            </Link>
            <RestaurantNotificationDropdown
              notifications={notifications ?? []}
              userId={user?.id?.toString() || ""}
              restaurantId={0}
            />
          </div>
        </header>
        <main className="p-4 md:p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
