"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useUpdateRestaurant } from "@/hooks/api/companyuser/restaurants/useUpdateRestaurant";
import { toast } from "@/hooks/use-toast";
import { EditRestaurantModal } from "@/components/modals/EditRestaurantModal";
import { RestaurantsPartialUpdatePayload } from "@/api/__generated__/base/data-contracts";
import { useGetRestaurant } from "@/hooks/api/companyuser/restaurants/useGetRestaurant";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { Badge } from "@/components/ui/badge";
import { useGetRestaurantCuisines } from "@/hooks/api/all/restaurantCuisines/useGetRestaurantCuisines";

interface RestaurantDetailProps {
  restaurantId: number;
}

export function RestaurantDetail({
  restaurantId
}: RestaurantDetailProps) {
  const { user } = useCompanyAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: cuisines, error: errorGetCuisines, isLoading: isCuisinesLoading } = useGetRestaurantCuisines();

  // レストラン情報の取得
  const {
    data: restaurant,
    error: restaurantError,
    isLoading: isRestaurantLoading,
  } = useGetRestaurant({
    restaurantId,
  });

  // レストランの更新
  const { trigger: updateRestaurantTrriger } = useUpdateRestaurant({
    restaurantId,
    companyId: restaurant?.companies_id ?? undefined,
    companyuserId: user?.id,
    handleSuccess: () => {
      setIsEditModalOpen(false);
      toast({
        title: "更新成功",
        description: "レストラン情報が更新されました",
      });
    },
    handleError: () => {
      toast({
        title: "更新エラー",
        description: "レストラン情報の更新に失敗しました",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (data: RestaurantsPartialUpdatePayload) => {
    await updateRestaurantTrriger(data);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>店舗詳細</CardTitle>
        </CardHeader>
        <CardContent>
          {restaurantError || errorGetCuisines ? (
            <ErrorPage />
          ) : isRestaurantLoading || isCuisinesLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">住所</h4>
                <p className="text-sm text-gray-500">
                  {restaurant?.address}
                </p>
              </div>
              <div>
                <h4 className="font-medium">電話番号</h4>
                <p className="text-sm text-gray-500">
                  {restaurant?.contact_info}
                </p>
              </div>

              <div>
                <h4 className="font-medium">ジャンル</h4>
                {restaurant != null && restaurant.restaurant_cuisine_id.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {cuisines?.filter((cuisine) => restaurant.restaurant_cuisine_id.includes(cuisine.id)).map((cuisine) => (
                      <Badge key={cuisine.id} variant="secondary">
                        {cuisine.category}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium">説明文</h4>
                <p className="text-sm text-gray-500">
                  {restaurant?.description}
                </p>
              </div>
              <div>
                <h4 className="font-medium">営業時間</h4>
                <p className="text-sm text-gray-500">
                  {restaurant?.business_hours}
                </p>
              </div>
              <div>
                <h4 className="font-medium">アクセス</h4>
                <p className="text-sm text-gray-500">
                  {restaurant?.access}
                </p>
              </div>
              <div>
                <h4 className="font-medium">最寄り駅</h4>
                <p className="text-sm text-gray-500">
                  {restaurant?.station}
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setIsEditModalOpen(true);
                    console.log("restaurant", restaurant);
                  }}>
                  <Edit className="mr-2 h-4 w-4" />
                  店舗情報を編集
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {restaurant &&
        <EditRestaurantModal
          isOpen={isEditModalOpen && !!restaurant}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleSubmit}
          restaurant={restaurant}
        />
      }
    </>
  )
};
