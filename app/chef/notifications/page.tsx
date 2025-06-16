"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSubscriptionChefNotificationsByUserId } from "@/hooks/api/user/chefNotifications/useSubscriptionChefNotificationsByUserId";
import { useMarkReadAllChefNotifications } from "@/hooks/api/user/chefNotifications/useMarkReadAllChefNotifications";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { toast } from "@/hooks/use-toast";
import { ByUserDetailData } from "@/api/__generated__/base/data-contracts";
import { NotificationItem } from "./component/NotificationItem";

type ChefNotificationType = ByUserDetailData[number]["type"];
type ChefNotificationFilterType = ChefNotificationType | "all";

export default function ChefNotificationsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [filter, setFilter] = useState<ChefNotificationFilterType>("all");

  const {
    notifications,
    isLoading,
    error,
  } = useSubscriptionChefNotificationsByUserId({
    userId: user?.id,
  });

  const { trigger: markReadAllTrigger } = useMarkReadAllChefNotifications({
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
    }
  };

  const filteredNotifications = notifications?.filter((notification) => {
    const matchesTab = activeTab === "all" || !notification.is_read;
    const matchesFilter =
      filter === "all" || notification.type === filter;
    return matchesTab && matchesFilter;
  }) ?? [];

  if (error) {
    return (
      <div className="flex px-4">
        <ErrorPage />
      </div>
    );
  }

  if (isLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="通知を読み込んでいます..."
      />
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">通知</h1>
        <Button onClick={handleMarkAllAsRead}>すべて既読にする</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "all" | "unread")}>
            <TabsList>
              <TabsTrigger value="all">すべて</TabsTrigger>
              <TabsTrigger value="unread">未読</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <Select
              value={filter}
              onValueChange={(value) =>
                setFilter(value as ChefNotificationFilterType)
              }>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="通知タイプ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                {/* <SelectItem value="new_job">新着求人</SelectItem> */}
                <SelectItem value="application_status">応募状況</SelectItem>
                <SelectItem value="new_message">メッセージ</SelectItem>
                {/* <SelectItem value="review">レビュー</SelectItem> */}
                <SelectItem value="payment">お支払い</SelectItem>
                <SelectItem value="operator">運営からのお知らせ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                通知はありません
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
