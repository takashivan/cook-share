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
  Utensils,
  Settings,
  Tag,
  Store,
  User,
  Users,
  Building,
  ChevronRight,
  Home,
  Bell,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { XanoClient } from "@xano/js-sdk/lib";
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
import { RestaurantNotificationDropdown } from "@/components/notifications/RestaurantNotificationDropdown";
import {
  getCompanyUserNotificationsByCompanyUserId,
  markCompanyUserNotificationAsRead,
  markAllCompanyUserNotificationsAsRead,
  CompanyUserNotification,
} from "@/lib/api/companyUserNotification";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchMyRestaurants } from "@/lib/store/restaurantSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, logout } = useCompanyAuth();
  const { restaurants } = useSelector((state: RootState) => state.restaurants);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<CompanyUserNotification[]>(
    []
  );
  const [isStoreListOpen, setIsStoreListOpen] = useState(false);
  const { toast } = useToast();

  const mutateNotifications = async () => {
    if (user?.id) {
      try {
        const data = await getCompanyUserNotificationsByCompanyUserId(user.id);
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    }
  };

  useEffect(() => {
    if (user?.companies_id) {
      dispatch(fetchMyRestaurants(user.companies_id));
    }
  }, [dispatch, user?.companies_id]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("company_auth_token");
        if (!token) {
          router.push("/login/company");
          return;
        }

        if (isAuthenticated === undefined) {
          return;
        }

        if (!user?.is_admin && pathname.startsWith("/admin/company")) {
          router.push("/admin");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth initialization error:", error);
        router.push("/login/company");
      }
    };

    initAuth();
  }, [isAuthenticated, router, user?.is_admin, pathname]);

  useEffect(() => {
    if (!user?.id) return;

    const xanoClient = new XanoClient({
      instanceBaseUrl: process.env.NEXT_PUBLIC_XANO_BASE_URL || "",
      realtimeConnectionHash: process.env.NEXT_PUBLIC_XANO_REALTIME_HASH || "",
    });

    let channel: any;

    const setupChannel = async () => {
      try {
        channel = xanoClient.channel(`notifications/${user?.id}`);
        console.log("Channel setup for notifications");

        channel.on((message: any) => {
          console.log("Admin received message:", message);
          if (message.action === "connection_status") {
            return;
          } else {
            toast({
              title: "新しい通知",
              description: message.content || "新しい通知が届きました",
              className: "bg-orange-500 text-white border-0",
              duration: 5000,
            });
            mutateNotifications();
          }
        });
      } catch (error) {
        console.error("Error setting up channel:", error);
      }
    };
    setupChannel();
  }, [user?.id, toast, mutateNotifications]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?.id) {
        try {
          const data = await getCompanyUserNotificationsByCompanyUserId(
            user.id
          );
          setNotifications(data);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [user?.id]);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markCompanyUserNotificationAsRead(notificationId.toString());
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllCompanyUserNotificationsAsRead(user?.id?.toString() || "");
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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
          title: "店舗",
          href: "/admin/stores",
          icon: Store,
          active: pathname.startsWith("/admin/stores/"),
          show: true,
          onClick: () => setIsStoreListOpen(!isStoreListOpen),
          isOpen: isStoreListOpen,
        },
        ...(isStoreListOpen
          ? restaurants.map((restaurant) => ({
              title: restaurant.name,
              href: `/admin/stores/${restaurant.id}`,
              icon: Tag,
              active: pathname === `/admin/stores/${restaurant.id}`,
              show: true,
              className: "ml-4",
            }))
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
                  alt="CookChef Logo"
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
            </div>
          </div>
          <div className="flex items-center gap-4">
            <RestaurantNotificationDropdown
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              userId={user?.id?.toString() || ""}
              mutateNotifications={mutateNotifications}
              restaurantId={0}
            />
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
