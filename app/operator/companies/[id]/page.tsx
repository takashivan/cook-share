"use client";

import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchCompanyDetail, fetchCuisines } from "@/lib/redux/slices/operatorSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ja } from "date-fns/locale";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RestaurantStatusBadgeForAdmin } from "@/components/badge/RestaurantStatusBadgeForAdmin";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompanyDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const id = params.id;

  const dispatch = useDispatch<AppDispatch>();
  const companyDetail = useSelector((state: RootState) => state.operator.companyDetail.data);
  const loading = useSelector((state: RootState) => state.operator.companyDetail.loading);
  const error = useSelector((state: RootState) => state.operator.companyDetail.error);
  const cuisines = useSelector((state: RootState) => state.operator.cuisines.data);

  useEffect(() => {
    if (id) {
      dispatch(fetchCompanyDetail(id));
    }
    dispatch(fetchCuisines());
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">エラーが発生しました: {error}</div>
      </div>
    );
  }

  if (!companyDetail) {
    return <div className="p-4">会社の詳細が見つかりません。</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col text-2xl font-bold">
            <span className="text-gray-500 text-sm">
              ID: {companyDetail.company.id || "-"}
            </span>
            {companyDetail.company.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">基本データ</h3>
              <div className="flex">
                <div className="w-32 flex-shrink-0">住所</div>
                <div>{companyDetail.company.address || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">電話番号</div>
                <div>{companyDetail.company.phone || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">メールアドレス</div>
                <div>{companyDetail.company.company_email || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">Webサイト</div>
                <div>{companyDetail.company.website || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">会社概要</div>
                <div>{companyDetail.company.description || "-"}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">ステータス</div>
                <div>
                  <Badge
                    className={`${companyDetail.company.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : companyDetail.company.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                    }`}
                  >
                    {companyDetail.company.status === "approved"
                      ? "承認済み"
                      : companyDetail.company.status === "pending"
                      ? "未承認"
                      : companyDetail.company.status === "banned"
                      ? "一時停止中"
                      : "拒否"}
                  </Badge>
                </div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">登録日時</div>
                <div>
                  {format(new Date(companyDetail.company.created_at), "yyyy/MM/dd HH:mm", { locale: ja })}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">統計情報</h3>
              <div className="flex">
                <div className="w-32 flex-shrink-0">レストラン数</div>
                <div>{companyDetail.restaurants.length || 0}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">求人数</div>
                <div>{companyDetail.jobCount || 0}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">マッチング数</div>
                <div>{companyDetail.worksessionCount || 0}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">キャンセル数</div>
                <div>{companyDetail.worksessionCanceledByRestaurantCount || 0}</div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">キャンセル率</div>
                <div>
                  {Number(companyDetail.worksessionCanceledByRestaurantCount) > 0
                    ? `${(
                        (Number(companyDetail.worksessionCanceledByRestaurantCount) /
                          Number(companyDetail.worksessionCount)) *
                        100
                      ).toFixed(2)}%`
                    : "0%"}
                </div>
              </div>
              <div className="flex">
                <div className="w-32 flex-shrink-0">累計報酬金額</div>
                <div>{`¥${companyDetail.total_paid_amount.toLocaleString()}`}</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">店舗一覧</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>店舗ID</TableHead>
                    <TableHead>店舗名</TableHead>
                    <TableHead>ジャンル</TableHead>
                    <TableHead>住所</TableHead>
                    <TableHead>スタッフ数</TableHead>
                    <TableHead>求人数</TableHead>
                    <TableHead>マッチング数</TableHead>
                    <TableHead>キャンセル数</TableHead>
                    <TableHead>キャンセル率</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>点数</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companyDetail.restaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell>{restaurant.id}</TableCell>
                      <TableCell>{restaurant.name}</TableCell>
                      <TableCell>
                        {restaurant.restaurant_cuisine_id.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {cuisines?.filter((cuisine) => restaurant.restaurant_cuisine_id.includes(cuisine.id)).map((cuisine) => (
                              <Badge key={cuisine.id} variant="secondary">
                                {cuisine.category}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{restaurant.address || "-"}</TableCell>
                      <TableCell>{restaurant.companyUserCount}</TableCell>
                      <TableCell>{restaurant.jobCount}</TableCell>
                      <TableCell>{restaurant.worksessionCount}</TableCell>
                      <TableCell>{restaurant.worksessionCanceledByRestaurantCount}</TableCell>
                      <TableCell>
                        {restaurant.worksessionCanceledByRestaurantCount > 0
                          ? `${(
                              (restaurant.worksessionCanceledByRestaurantCount /
                                restaurant.worksessionCount) *
                              100
                            ).toFixed(2)}%`
                          : "0%"}
                      </TableCell>
                      <TableCell>
                        <RestaurantStatusBadgeForAdmin
                          status={restaurant.status}
                        />
                      </TableCell>
                      <TableCell>{restaurant.rating}</TableCell>
                      <TableCell>
                        <Link href={`/operator/restaurants/${restaurant.id}`}>
                          <Button
                            variant="outline"
                          >
                            詳細
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h3 className="font-semibold">スタッフ一覧</h3>
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
                  {companyDetail.company_users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        {user.is_admin ? "管理者" : "店舗スタッフ"}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
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
