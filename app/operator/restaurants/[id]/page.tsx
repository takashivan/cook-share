"use client";

import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchCuisines, fetchRestaurantDetail } from "@/lib/redux/slices/operatorSlice";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RestaurantStatusBadgeForAdmin } from "@/components/badge/RestaurantStatusBadgeForAdmin";
import { ja } from "date-fns/locale";
import { format } from "date-fns";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RestaurantDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const id = params.id;

  const dispatch = useDispatch<AppDispatch>();
  const restaurantDetail = useSelector((state: RootState) => state.operator.restaurantDetail.data);
  const loading = useSelector((state: RootState) => state.operator.restaurantDetail.loading);
  const error = useSelector((state: RootState) => state.operator.restaurantDetail.error);
  const cuisines = useSelector((state: RootState) => state.operator.cuisines);

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantDetail(Number(id)));
    }
    dispatch(fetchCuisines());
  }, [dispatch, id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!restaurantDetail) {
    return <div className="p-4">レストランの詳細が見つかりません。</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col text-2xl font-bold">
            <span className="text-gray-500 text-sm">
              ID: {restaurantDetail.restaurant.id || "-"}
            </span>
            {restaurantDetail.restaurant.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">基本データ</h3>
              <div className="flex">
                <div className="w-32 flex-shrink-0">会社ID</div>
                <div>{restaurantDetail.company.id || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">会社名</div>
                <div>{restaurantDetail.company.name || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">ジャンル</div>
                <div className="flex flex-wrap gap-2 my-1">
                  {restaurantDetail.restaurant.restaurant_cuisine_id.length > 0 ? (
                    cuisines?.filter((cuisine) => restaurantDetail.restaurant.restaurant_cuisine_id.includes(cuisine.id)).map((cuisine) => (
                      <Badge key={cuisine.id} variant="secondary">
                        {cuisine.category}
                      </Badge>
                    ))
                  ) : (
                    "ジャンルなし"
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">住所</div>
                <div>{restaurantDetail.restaurant.address || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">電話番号</div>
                <div>{restaurantDetail.restaurant.phone || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">店舗説明</div>
                <div>{restaurantDetail.restaurant.description || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">営業時間</div>
                <div>{restaurantDetail.restaurant.business_hours || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">最寄り駅</div>
                <div>{restaurantDetail.restaurant.station || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">アクセス</div>
                <div>{restaurantDetail.restaurant.access || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">店舗画像</div>
                <div>
                  {restaurantDetail.restaurant.profile_image ? (
                    <img src={restaurantDetail.restaurant.profile_image} alt={restaurantDetail.restaurant.name} />
                  ) : (
                    "-"
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">ステータス</div>
                <div>
                  <RestaurantStatusBadgeForAdmin status={restaurantDetail.restaurant.status} />
                </div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">登録日時</div>
                <div>
                  {format(new Date(restaurantDetail.restaurant.created_at), "yyyy/MM/dd HH:mm", { locale: ja })}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">統計情報</h3>
              <div className="flex">
                <div className="w-32 flex-shrink-0">スタッフ数</div>
                <div>{restaurantDetail.companyUsers.length}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">求人数</div>
                <div>{restaurantDetail.jobCount}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">マッチング数</div>
                <div>{restaurantDetail.worksessionCount}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">キャンセル数</div>
                <div>{restaurantDetail.worksessionCanceledByRestaurantCount}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">キャンセル率</div>
                <div>
                  {restaurantDetail.worksessionCanceledByRestaurantCount > 0
                    ? `${(
                        (restaurantDetail.worksessionCanceledByRestaurantCount /
                          restaurantDetail.worksessionCount) *
                        100
                      ).toFixed(2)}%`
                    : "0%"}
                </div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">点数</div>
                <div>{restaurantDetail.rating}</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">店舗担当者のメールアドレス</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>担当者ID</TableHead>
                    <TableHead>担当者名</TableHead>
                    <TableHead>区分</TableHead>
                    <TableHead>メールアドレス</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restaurantDetail.companyUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableHead>{user.id}</TableHead>
                      <TableHead>{user.name}</TableHead>
                      <TableHead>
                        {user.is_admin ? "管理者" : "店舗スタッフ"}
                      </TableHead>
                      <TableHead>{user.email}</TableHead>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}