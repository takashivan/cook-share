"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  ChefNotification,
  ChefNotificationType,
  getChefNotificationsByChefId,
  markChefNotificationAsRead,
  markAllChefNotificationsAsRead,
} from "@/lib/api/chefNotification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Bell,
  User,
  MessageSquare,
  Calendar,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function ChefNotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<ChefNotification[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [filter, setFilter] = useState<ChefNotificationType | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      try {
        const data = await getChefNotificationsByChefId(Number(user.id));
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user?.id]);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markChefNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllChefNotificationsAsRead();
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  // 通知タイプに応じたアイコンを返す関数
  const getNotificationIcon = (type: string) => {
    const notificationType = type as ChefNotificationType;
    switch (notificationType) {
      case "new_job":
        return <User className="h-5 w-5" />;
      case "application_status":
        return <User className="h-5 w-5" />;
      case "new_message":
        return <MessageSquare className="h-5 w-5" />;
      case "review":
        return <Calendar className="h-5 w-5" />;
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "operator":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  // 通知タイプに応じた色を返す関数
  const getNotificationColor = (type: string) => {
    const notificationType = type as ChefNotificationType;
    switch (notificationType) {
      case "new_job":
        return "bg-blue-100 text-blue-600";
      case "application_status":
        return "bg-green-100 text-green-600";
      case "new_message":
        return "bg-purple-100 text-purple-600";
      case "review":
        return "bg-yellow-100 text-yellow-600";
      case "payment":
        return "bg-emerald-100 text-emerald-600";
      case "operator":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // 通知タイプの日本語表示
  const getNotificationTypeLabel = (type: string | "all") => {
    if (type === "all") return "すべて";
    const notificationType = type as ChefNotificationType;
    switch (notificationType) {
      case "new_job":
        return "新着求人";
      case "application_status":
        return "応募状況";
      case "new_message":
        return "メッセージ";
      case "review":
        return "レビュー";
      case "payment":
        return "お支払い";
      case "operator":
        return "システム";
      default:
        return "その他";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesTab = activeTab === "all" || !notification.read;
    const matchesFilter =
      filter === "all" || notification.notification_type === filter;
    return matchesTab && matchesFilter;
  });

  if (loading) {
    return <div>Loading...</div>;
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
                setFilter(value as ChefNotificationType | "all")
              }>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="通知タイプ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="new_job">新着求人</SelectItem>
                <SelectItem value="application_status">応募状況</SelectItem>
                <SelectItem value="new_message">メッセージ</SelectItem>
                <SelectItem value="review">レビュー</SelectItem>
                <SelectItem value="payment">お支払い</SelectItem>
                <SelectItem value="operator">システム</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  !notification.read ? "bg-blue-50" : ""
                }`}>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(
                      notification.notification_type
                    )}`}>
                    {getNotificationIcon(notification.notification_type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{notification.message}</h3>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}>
                          既読にする
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(
                        new Date(notification.created_at),
                        "yyyy年MM月dd日 HH:mm",
                        {
                          locale: ja,
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {filteredNotifications.length === 0 && (
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
