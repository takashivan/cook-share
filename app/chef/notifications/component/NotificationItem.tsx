import { ByUserDetailData } from "@/api/__generated__/base/data-contracts";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  User,
  MessageSquare,
  Calendar,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useMarkReadChefNotification } from "@/hooks/api/user/chefNotifications/useMarkReadChefNotification";
import { useAuth } from "@/lib/contexts/AuthContext";

interface NotificationItemProps {
  notification: ByUserDetailData[number];
}

export function NotificationItem({
  notification
}: NotificationItemProps) {
  const { user } = useAuth();
  
  const { trigger: markReadTrigger } = useMarkReadChefNotification({
    userId: user?.id,
    chefNotificationId: notification.id,
  });

  // 通知タイプに応じたアイコンを決定する
  const notificationIcon = notification.type === "new_job" ||
    notification.type === "application_status"
    ? <User className="h-4 w-4" />
    : notification.type === "new_message"
    ? <MessageSquare className="h-4 w-4" />
    : notification.type === "review"
    ? <Calendar className="h-4 w-4" />
    : notification.type === "payment"
    ? <CreditCard className="h-4 w-4" />
    : notification.type === "operator"
    ? <AlertTriangle className="h-4 w-4" />
    : <Bell className="h-4 w-4" />;

  // 通知アイコンの色を決定する
  const notificationColor = notification.type === "new_job" ||
    notification.type === "application_status"
    ? "bg-green-100 text-green-600"
    : notification.type === "new_message"
    ? "bg-blue-100 text-blue-600"
    : notification.type === "review"
    ? "bg-purple-100 text-purple-600"
    : notification.type === "payment"
    ? "bg-amber-100 text-amber-600"
    : notification.type === "operator"
    ? "bg-red-100 text-red-600"
    : "bg-gray-100 text-gray-600";

  // 通知タイプの日本語表示
  const notificationTypeLabel = notification.type === "new_job" ||
    notification.type === "application_status"
    ? "応募状況"
    : notification.type === "new_message"
    ? "メッセージ"
    : notification.type === "review"
    ? "レビュー"
    : notification.type === "payment"
    ? "お支払い"
    : notification.type === "operator"
    ? "運営からのお知らせ"
    : "通知";

  const handleNotificationClick = async () => {
    if (!notification.is_read) {
      try {
        await markReadTrigger();
      } catch (error) {
        toast({
          title: "エラー",
          description: "通知の既読化に失敗しました",
          variant: "destructive",
        });
      }
    }
  };

  const NotificationCard = () => (
    <Card
      className={`${!notification.is_read ? "bg-gray-50" : ""}`}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${notificationColor}`}>
            {notificationIcon}
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
              className={`text-xs ${notificationColor}`}>
              {notificationTypeLabel}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    notification.related_link !== "" ? (
      <Link
        href={notification.related_link}
        className="block mt-2"
        onClick={handleNotificationClick}
      >
        <NotificationCard />
      </Link>
    ) : (
      <div
        className="block mt-2 cursor-pointer"
        onClick={handleNotificationClick}
      >
        <NotificationCard />
      </div>
    )
  )
}
