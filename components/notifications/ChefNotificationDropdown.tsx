"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatToJapanDateTime } from "@/lib/functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChefNotification } from "@/lib/api/chefNotification";

interface ChefNotificationDropdownProps {
  notifications: ChefNotification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export function ChefNotificationDropdown({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: ChefNotificationDropdownProps) {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleNotificationClick = (notification: ChefNotification) => {
    if (!notification.is_read) {
      onMarkAsRead(notification.id);
    }
    setOpen(false);
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
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>通知</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-auto py-1"
              onClick={onMarkAllAsRead}>
              すべて既読にする
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications
              .sort((a, b) => b.created_at - a.created_at)
              .map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-3 cursor-pointer ${
                    !notification.is_read ? "bg-muted/50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                  asChild>
                  <Link href={notification.related_link}>
                    <div className="flex gap-3 w-full">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center ${getNotificationColor(
                          notification.notification_type
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
              ))
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              <p>通知はありません</p>
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <Link href="/chef/notifications" className="w-full text-center">
            すべての通知を見る
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
