"use client";

import Link from "next/link";
import {
  Bell,
  Store,
  MessageSquare,
  Calendar,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { formatToJapanDateTime } from "@/lib/functions";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ByUserDetailData } from "@/api/__generated__/base/data-contracts";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useMarkReadChefNotification } from "@/hooks/api/user/chefNotifications/useMarkReadChefNotification";
import { toast } from "@/hooks/use-toast";

interface ChefNotificationDropdownItemProps {
  notification: ByUserDetailData[number];
  handleSuccessMarkRead?: () => void;
}

export function ChefNotificationDropdownItem({
  notification,
  handleSuccessMarkRead,
}: ChefNotificationDropdownItemProps) {
  const { user } = useAuth();

  const { trigger: markReadTrigger } = useMarkReadChefNotification({
    userId: user?.id,
    chefNotificationId: notification.id,
  });
  
  const handleNotificationClick = async () => {
    if (!notification.is_read) {
      try {
        await markReadTrigger();
        if (handleSuccessMarkRead) {
          handleSuccessMarkRead();
        }
      } catch (error) {
        toast({
          title: "エラー",
          description: "通知の既読処理に失敗しました",
          variant: "destructive",
        });
      }
    }
  };

  // 通知タイプに応じたアイコンを決定する
  const notificationIcon = notification.type === "new_job" ||
    notification.type === "application_status"
    ? <Store className="h-4 w-4" />
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

  const NotificationContent = () => (
    <div className="flex gap-3 w-full">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center ${notificationColor}`}>
        {notificationIcon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {notification.content}
        </p>

        <p className="text-xs text-muted-foreground">
          {formatToJapanDateTime(notification.created_at)}
        </p>
      </div>
      {!notification.is_read && (
        <div className="w-2 h-2 rounded-full bg-blue-600 self-start mt-2"></div>
      )}
    </div>
  )

  return (
    <DropdownMenuItem
      className={`p-3 cursor-pointer ${
        !notification.is_read ? "bg-muted/50" : ""
      }`}
      onClick={handleNotificationClick}
      asChild>
      {notification.related_link !== "" ? (
        <Link href={notification.related_link}>
          <NotificationContent />
        </Link>
      ) : (
        <div>
          <NotificationContent />
        </div>
      )}
    </DropdownMenuItem>
  )
}