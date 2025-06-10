"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import {
  CompanyUserNotificationType,
} from "@/lib/api/companyUserNotification";
import { useSubscriptionCompanyUserNotificationsByUserId } from "@/hooks/api/companyuser/companyUserNotifications/useSubscriptionCompanyUserNotificationsByUserId";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useMarkReadAllCompanyUserNotifications } from "@/hooks/api/companyuser/companyUserNotifications/useMarkReadAllCompanyUserNotifications";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorPage } from "@/components/layout/ErrorPage";

export default function RestaurantNotificationsPage() {
  const { user } = useCompanyAuth();
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [filter, setFilter] = useState<CompanyUserNotificationType | "all">(
    "all"
  );
  const { toast } = useToast();

  const { notifications, isLoading, error } = useSubscriptionCompanyUserNotificationsByUserId({
    userId: user?.id,
    handleSuccessGetMessage: (message: any) => {
      toast({
        title: "新しい通知",
        description: message.content || "新しい通知が届きました",
        className: "bg-orange-500 text-white border-0",
        duration: 5000,
      });
    }
  });

  // 通知をフィルタリングする
  const allTabNotifications = notifications?.filter((notification) => {
    if (filter !== "all" && notification.type !== filter) return false;
    return true;
  }) ?? [];

  const unreadTabNotifications = notifications?.filter((notification) => {
    if (filter !== "all" && notification.type !== filter) return false;
    return !notification.is_read;
  }) ?? [];

  const { trigger: markReadAllTrigger } = useMarkReadAllCompanyUserNotifications({
    userId: user?.id,
  });

  const handleMarkAllAsRead = async () => {
    if (!user?.id) return;
   
    try {
      await markReadAllTrigger({
        user_id: user.id,
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "通知の既読処理に失敗しました",
        variant: "destructive",
      });
      return;
    }
  };

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

  if (error) {
    return (
      <ErrorPage />
    );
  }

  if (isLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="通知を読み込んでいます..."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">通知</h1>
        <Button onClick={handleMarkAllAsRead}>すべて既読にする</Button>
      </div>
      <span className="text-muted-foreground">店舗に関する通知の一覧です</span>

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
            {allTabNotifications.length > 0 ? (
              allTabNotifications.map((notification) => (
                <Link key={notification.id} href="#" className="block mt-2">
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
            {unreadTabNotifications.length > 0 ?
              unreadTabNotifications.map((notification) => (
                <Link key={notification.id} href="#" className="block mt-2">
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
              )) : (
              <div className="text-center py-8 text-muted-foreground">
                未読の通知はありません
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}
