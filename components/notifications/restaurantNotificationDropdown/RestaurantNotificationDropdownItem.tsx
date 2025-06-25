"use client";

import Link from "next/link";
import {
  Bell,
  User,
  MessageSquare,
  Calendar,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useMarkReadCompanyUserNotifications } from "@/hooks/api/companyuser/companyUserNotifications/useMarkReadCompanyUserNotifications";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { ByUserDetailOutput } from "@/hooks/api/companyuser/companyUserNotifications/useGetCompanyUserNotificationsByUserId";

interface RestaurantNotificationDropdownItemProps {
  notification: ByUserDetailOutput[number];
  handleSuccessMarkRead?: () => void;
  handleErrorMarkRead: () => void;
}

export function RestaurantNotificationDropdownItem({
  notification,
  handleSuccessMarkRead,
  handleErrorMarkRead,
}: RestaurantNotificationDropdownItemProps) {
  const { user } = useCompanyAuth();

  const { trigger: markReadTrigger } = useMarkReadCompanyUserNotifications({
    userId: user?.id,
    companyUserNotificationId: notification.id ?? undefined,
  });

  const handleNotificationClick = async () => {
    if (!notification.is_read) {
      try {
        await markReadTrigger();
        if (handleSuccessMarkRead) {
          handleSuccessMarkRead();
        }
      } catch (error) {
        handleErrorMarkRead();
      }
    }
  };

  // 通知タイプに応じたアイコンを返す関数
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

  // 通知アイコンの色を決定する関数
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
          {new Date(notification.created_at).toLocaleDateString(
            "ja-JP",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
        </p>
      </div>
      {!notification.is_read && (
        <div className="w-2 h-2 rounded-full bg-blue-600 self-start mt-2"></div>
      )}
    </div>
  );

  return(
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
  );
}
