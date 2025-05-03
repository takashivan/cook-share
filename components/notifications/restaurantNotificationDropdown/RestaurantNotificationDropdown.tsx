"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
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
import { useToast } from "@/hooks/use-toast";
import { useMarkReadAllCompanyUserNotifications } from "@/hooks/api/companyuser/companyUserNotifications/useMarkReadAllCompanyUserNotifications";
import { ByUserDetailOutput } from "@/api/__generated__/base/data-contracts";
import { RestaurantNotificationDropdownItem } from "./RestaurantNotificationDropdownItem";

interface RestaurantNotificationDropdownProps {
  restaurantId: number;
  notifications: ByUserDetailOutput;
  userId: string;
}

export function RestaurantNotificationDropdown({
  restaurantId,
  notifications,
  userId,
}: RestaurantNotificationDropdownProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleErrorMarkRead = () => {
    toast({
      title: "エラー",
      description: "通知の既読化に失敗しました",
      variant: "destructive",
    });
  }

  const { trigger: markReadAllTrigger } = useMarkReadAllCompanyUserNotifications({
    userId,
    handleSuccess: () => {
      setOpen(false);
    },
    handleError: handleErrorMarkRead,
  });

  const filteredNotifications = notifications.filter(
    (notification) =>
      restaurantId === 0 || notification.restaurant_id === restaurantId
  );

  const unreadCount = filteredNotifications.filter(
    (notification) => !notification.is_read
  ).length;

  console.log("Notifications:", notifications);
  console.log("Filtered Notifications:", filteredNotifications);
  console.log("Restaurant ID:", restaurantId);
  console.log("Unread Count:", unreadCount);

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
              onClick={() => { markReadAllTrigger({ user_id: userId }) }}>
              すべて既読にする
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <RestaurantNotificationDropdownItem
                key={notification.id}
                notification={notification}
                handleSuccessMarkRead={() => {
                  setOpen(false)
                }}
                handleErrorMarkRead={handleErrorMarkRead}
              />
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
