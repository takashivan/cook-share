import { RESTAURANT_STATUS } from "@/lib/const/restaurant";
import { Badge } from "@/components/ui/badge";

interface RestaurantStatusBadgeForAdminProps {
  status: typeof RESTAURANT_STATUS[number]['value'];
}

export function RestaurantStatusBadgeForAdmin({
  status,
}: RestaurantStatusBadgeForAdminProps) {
  return (
    <Badge variant="secondary"
      className={`${
        status === "APPROVED"
          ? "bg-green-100 text-green-800"
          : status === "PENDING"
            ? "bg-yellow-100 text-yellow-800"
            : status === "BANNED"
              ? "bg-red-100 text-red-800"
              : status === "DELETED"
                ? "bg-gray-100 text-gray-800"
                : "bg-gray-200 text-gray-800"
      }`}>
      {RESTAURANT_STATUS.find(s => s.value === status)?.label || "不明"}
    </Badge>
  );
};
