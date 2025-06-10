export const RESTAURANT_STATUS = [
  { id: "banned", label: "停止中", value: "BANNED" },
  { id: "pending", label: "審査中", value: "PENDING" },
  { id: "deleted", label: "削除済み", value: "DELETED" },
  { id: "approved", label: "公開中", value: "APPROVED" },
] as const;
export type RestaurantStatus = typeof RESTAURANT_STATUS[number];
