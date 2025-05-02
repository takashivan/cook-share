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
import { ByUserDetailOutput } from "@/api/__generated__/base/data-contracts";
import { useMarkReadCompanyUserNotifications } from "@/hooks/api/companyuser/companyUserNotifications/useMarkReadCompanyUserNotifications";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";

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
    handleSuccess: handleSuccessMarkRead,
    handleError: handleErrorMarkRead,
  });

  const handleNotificationClick = async (
    notification: ByUserDetailOutput[number]
  ) => {
    if (!notification.is_read) {
      await markReadTrigger();
    }
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

  return(
    <DropdownMenuItem
      key={notification.id}
      className={`p-3 cursor-pointer ${
        !notification.is_read ? "bg-muted/50" : ""
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
          {!notification.is_read && (
            <div className="w-2 h-2 rounded-full bg-blue-600 self-start mt-2"></div>
          )}
        </div>
      </Link>
    </DropdownMenuItem>
  );
}
