"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
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
import { ByUserDetailData } from "@/api/__generated__/base/data-contracts";
import { useMarkReadAllChefNotifications } from "@/hooks/api/user/chefNotifications/useMarkReadAllChefNotifications";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ChefNotificationDropdownItem } from "./ChefNotificationDropdownItem";

interface ChefNotificationDropdownProps {
  notifications: ByUserDetailData;
}

export function ChefNotificationDropdown({
  notifications,
}: ChefNotificationDropdownProps) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const { trigger: markReadAllTrigger } = useMarkReadAllChefNotifications({
    userId: user?.id,
    handleSuccess: () => {
      setOpen(false);
    },
  });

  const handleMarkAllAsRead = async () => {
    if (!user?.id) return;
   
    await markReadAllTrigger({
      user_id: user.id,
    });
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
              onClick={handleMarkAllAsRead}>
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
                <ChefNotificationDropdownItem
                  key={notification.id}
                  notification={notification}
                  handleSuccessMarkRead={() => {
                    setOpen(false)
                  }}
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
          <Link href="/chef/notifications" className="w-full text-center">
            すべての通知を見る
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
