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
  MessageSquare,
  Settings,
  Store,
  User,
  Users,
  Building,
  ChevronRight,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useCompanyAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 認証状態の初期化を待つ
    const initAuth = async () => {
      try {
        // ローカルストレージからトークンを確認
        const token = localStorage.getItem("company_auth_token");
        if (!token) {
          router.push("/login/company");
          return;
        }

        // 認証状態が確定するまで待機
        if (isAuthenticated === undefined) {
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth initialization error:", error);
        router.push("/login/company");
      }
    };

    initAuth();
  }, [isAuthenticated, router]);

  // ローディング中は早期リターン
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // 認証されていない場合は何も表示しない
  if (!isAuthenticated) {
    return null;
  }

  // 現在のパスに基づいて、階層構造を判断
  const pathSegments = pathname.split("/").filter(Boolean);
  const isStoreDetail =
    pathSegments.includes("stores") && pathSegments.length > 3;
  const isJobDetail = pathSegments.includes("jobs") && pathSegments.length > 3;

  // ナビゲーション項目
  const navigation = [
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
          href: "/admin/company/staff",
          icon: Users,
          active: pathname === "/admin/company/staff",
          show: true,
        },
        {
          title: "請求管理",
          href: "/admin/company/billing",
          icon: CreditCard,
          active: pathname === "/admin/company/billing",
          show: true,
        },
      ],
    },
    {
      title: "店舗管理",
      items: [
        {
          title: "店舗一覧",
          href: "/admin/stores",
          icon: Store,
          active:
            pathname === "/admin/stores" ||
            pathname.startsWith("/admin/stores/"),
          show: true,
        },
      ],
    },
    {
      title: "求人管理",
      items: [
        {
          title: "求人一覧",
          href: "/admin/jobs",
          icon: MessageSquare,
          active:
            pathname === "/admin/jobs" || pathname.startsWith("/admin/jobs/"),
          show: true,
        },
      ],
    },
    {
      title: "設定",
      items: [
        {
          title: "アカウント設定",
          href: "/admin/settings",
          icon: Settings,
          active: pathname === "/admin/settings",
          show: true,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <div className="flex flex-col h-full">
            <div className="border-b p-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/chef_illust/chef_logo.png?height=200&width=400"
                  alt="CookChef Logo"
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
                          onClick={() => setIsSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                            item.active
                              ? "bg-gray-100 text-gray-900 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          )}>
                          <item.icon className="h-4 w-4" />
                          {item.title}
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

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 border-r bg-white">
        <div className="flex flex-col h-full">
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <Image
                src="/chef_illust/chef_logo.png?height=200&width=400"
                alt="CookChef Logo"
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
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          item.active
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        )}>
                        <item.icon className="h-4 w-4" />
                        {item.title}
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

      {/* Main Content */}
      <div className="flex-1 lg:pl-72">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
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

              {/* 会社情報 */}
              {pathname.includes("/company") && (
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

                  {/* 会社情報の下層ページ */}
                  {pathname.includes("/company/staff") && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-foreground">スタッフ管理</span>
                    </>
                  )}
                  {pathname.includes("/company/billing") && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-foreground">請求管理</span>
                    </>
                  )}
                </>
              )}

              {/* 店舗一覧 */}
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

                  {/* 店舗詳細 */}
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

              {/* 求人一覧 */}
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

                  {/* 求人詳細 */}
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

              {/* 設定 */}
              {pathname.includes("/settings") && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">アカウント設定</span>
                </>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>プロフィール</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>設定</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>ログアウト</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
