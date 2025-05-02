"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { formatToJapanDateTime } from "@/lib/functions";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ByUserDetailData } from "@/api/__generated__/base/data-contracts";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useMarkReadChefNotification } from "@/hooks/api/user/chefNotifications/useMarkReadChefNotification";

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
    handleSuccess: handleSuccessMarkRead,
  });
  
  const handleNotificationClick = async (
    notification: ByUserDetailData[number]
  ) => {
    if (!notification.is_read) {
      await markReadTrigger();
    }
  };

  // 通知アイコンの色を決定する関数
  const getNotificationColor = (type: string) => {
    switch (type) {
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

  return (
    <DropdownMenuItem
      className={`p-3 cursor-pointer ${
        !notification.is_read ? "bg-muted/50" : ""
      }`}
      onClick={() => handleNotificationClick(notification)}
      asChild>
      <Link href={notification.related_link}>
        <div className="flex gap-3 w-full">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${getNotificationColor(
              notification.type
            )}`}>
            <Bell className="h-4 w-4" />
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
      </Link>
    </DropdownMenuItem>
  )
}