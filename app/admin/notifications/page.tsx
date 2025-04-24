"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  User,
  MessageSquare,
  Calendar,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import {
  CompanyUserNotification,
  CompanyUserNotificationType,
  getCompanyUserNotificationsByCompanyUserId,
  markCompanyUserNotificationAsRead,
  markAllCompanyUserNotificationsAsRead,
} from "@/lib/api/companyUserNotification";

export default function RestaurantNotificationsPage() {
  const { user } = useCompanyAuth();
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [filter, setFilter] = useState<CompanyUserNotificationType | "all">(
    "all"
  );
  const [notifications, setNotifications] = useState<CompanyUserNotification[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

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
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchNotifications();
  }, [user?.id]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markCompanyUserNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === Number(notificationId) ? { ...n, read: true } : n
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // 通知をフィルタリングする
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread" && notification.is_read) return false;
    if (filter !== "all" && notification.type !== filter) return false;
    return true;
  });

  // 通知タイプに応じたアイコンを返す関数
  const getNotificationIcon = (type: CompanyUserNotificationType) => {
    const iconMap: Record<CompanyUserNotificationType, string> = {
      new_job: "📋",
      application_status: "📊",
      new_message: "💬",
      review: "⭐",
      operator: "📢",
      payment: "💰",
    };
    return iconMap[type] || "📌";
  };

  // 通知タイプに応じた色を返す関数
  const getNotificationColor = (type: CompanyUserNotificationType) => {
    const colorMap: Record<CompanyUserNotificationType, string> = {
      new_job: "bg-blue-100 text-blue-800",
      application_status: "bg-green-100 text-green-800",
      new_message: "bg-purple-100 text-purple-800",
      review: "bg-yellow-100 text-yellow-800",
      operator: "bg-red-100 text-red-800",
      payment: "bg-indigo-100 text-indigo-800",
    };
    return colorMap[type] || "bg-gray-100 text-gray-800";
  };

  // 通知タイプの日本語表示
  const getNotificationTypeLabel = (
    type: CompanyUserNotificationType
  ): string => {
    const typeMap: Record<CompanyUserNotificationType, string> = {
      new_job: "新規求人",
      application_status: "応募状況",
      new_message: "新規メッセージ",
      review: "レビュー",
      operator: "運営からのお知らせ",
      payment: "支払い",
    };
    return typeMap[type] || type;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">通知</h2>
          <p className="text-muted-foreground">店舗に関する通知の一覧です</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "all" | "unread")}
          className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">すべて</TabsTrigger>
            <TabsTrigger value="unread">未読</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-0">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Link key={notification.id} href="#">
                  <Card
                    className={`${!notification.is_read ? "bg-gray-50" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(
                            notification.type as CompanyUserNotificationType
                          )}`}>
                          {getNotificationIcon(
                            notification.type as CompanyUserNotificationType
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">
                              {notification.content}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {new Date(
                                notification.created_at
                              ).toLocaleDateString("ja-JP", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                weekday: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getNotificationColor(
                              notification.type as CompanyUserNotificationType
                            )}`}>
                            {getNotificationTypeLabel(
                              notification.type as CompanyUserNotificationType
                            )}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                通知はありません
              </div>
            )}
          </TabsContent>
          <TabsContent value="unread" className="mt-0">
            {filteredNotifications
              .filter((n) => !n.is_read)
              .map((notification) => (
                <Link key={notification.id} href="#">
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(
                            notification.type as CompanyUserNotificationType
                          )}`}>
                          {getNotificationIcon(
                            notification.type as CompanyUserNotificationType
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">
                              {notification.content}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {new Date(
                                notification.created_at
                              ).toLocaleDateString("ja-JP", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                weekday: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getNotificationColor(
                              notification.type as CompanyUserNotificationType
                            )}`}>
                            {getNotificationTypeLabel(
                              notification.type as CompanyUserNotificationType
                            )}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
