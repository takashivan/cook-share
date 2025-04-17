"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bell,
  User,
  MessageSquare,
  Calendar,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { CompanyUserNotification } from "@/lib/api/companyUserNotification";
import { useToast } from "@/hooks/use-toast";
import { XanoClient } from "@xano/js-sdk/lib";

interface RestaurantNotificationDropdownProps {
  notifications: CompanyUserNotification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  userId: string;
  mutateNotifications: () => void;
}

export function RestaurantNotificationDropdown({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  userId,
  mutateNotifications,
}: RestaurantNotificationDropdownProps) {
  const [open, setOpen] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast();
  const xanoClient = new XanoClient({
    instanceBaseUrl: process.env.NEXT_PUBLIC_XANO_BASE_URL || "",
    realtimeConnectionHash: process.env.NEXT_PUBLIC_XANO_REALTIME_HASH || "",
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: CompanyUserNotification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    setOpen(false);
  };

  // 通知タイプに応じたアイコンを返す関数
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_job":
      case "application_status":
        return <User className="h-4 w-4" />;
      case "new_message":
        return <MessageSquare className="h-4 w-4" />;
      case "review":
        return <Calendar className="h-4 w-4" />;
      case "payment":
        return <CreditCard className="h-4 w-4" />;
      case "operator":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  // 通知アイコンの色を決定する関数
  const getNotificationColor = (type: string) => {
    switch (type) {
      case "new_job":
      case "application_status":
        return "bg-green-100 text-green-600";
      case "new_message":
        return "bg-blue-100 text-blue-600";
      case "review":
        return "bg-purple-100 text-purple-600";
      case "payment":
        return "bg-amber-100 text-amber-600";
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
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-3 cursor-pointer ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
                asChild>
                <Link href="#">
                  <div className="flex gap-3 w-full">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${getNotificationColor(
                        notification.type
                      )}`}>
                      {getNotificationIcon(notification.type)}
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
                    {!notification.read && (
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
          <Link href="/admin/notifications" className="w-full text-center">
            すべての通知を見る
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
