"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useSubscriptionCompanyUserNotificationsByUserId } from "@/hooks/api/companyuser/companyUserNotifications/useSubscriptionCompanyUserNotificationsByUserId";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useMarkReadAllCompanyUserNotifications } from "@/hooks/api/companyuser/companyUserNotifications/useMarkReadAllCompanyUserNotifications";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { NotificationItem } from "./component/NotificationItem";
import { ByUserDetailOutput } from "@/hooks/api/companyuser/companyUserNotifications/useGetCompanyUserNotificationsByUserId";

export type CompanyUserNotificationType = ByUserDetailOutput[number]["type"];
type CompanyUserNotificationFilterType = CompanyUserNotificationType | "all";

export default function RestaurantNotificationsPage() {
  const { user } = useCompanyAuth();
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [filter, setFilter] = useState<CompanyUserNotificationFilterType>(
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
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
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
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
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
