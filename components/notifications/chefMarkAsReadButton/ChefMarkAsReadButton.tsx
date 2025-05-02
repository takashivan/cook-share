"use client";

import { Button } from "@/components/ui/button";
import { useMarkReadChefNotification } from "@/hooks/api/user/chefNotifications/useMarkReadChefNotification";
import { useAuth } from "@/lib/contexts/AuthContext";

interface ChefNotificationDropdownProps {
  notificationId: number;
}

export function ChefMarkAsReadButton ({
  notificationId
}: ChefNotificationDropdownProps) {
  const { user } = useAuth();
  const { trigger: markReadTrigger } = useMarkReadChefNotification({
    userId: user?.id,
    chefNotificationId: notificationId,
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => { markReadTrigger(); }}>
      既読にする
    </Button>
  )
};
