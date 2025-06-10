"use client";

import { Button } from "@/components/ui/button";
import { useMarkReadChefNotification } from "@/hooks/api/user/chefNotifications/useMarkReadChefNotification";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

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

  const handleClick = async () => {
    try {
      await markReadTrigger();
    } catch (error) {
      toast({
        title: "エラー",
        description: "通知の既読処理に失敗しました",
        variant: "destructive",
      });
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}>
      既読にする
    </Button>
  )
};
