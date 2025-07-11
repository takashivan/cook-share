"use client";

import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { approveRestaurant, banRestaurant, fetchCuisines, fetchRestaurantDetail } from "@/lib/redux/slices/operatorSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RestaurantStatusBadgeForAdmin } from "@/components/badge/RestaurantStatusBadgeForAdmin";
import { ja } from "date-fns/locale";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RestaurantsDetailData } from "@/api/__generated__/operator/data-contracts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

  const { toast } = useToast();

  const [banReason, setBanReason] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantDetail(Number(id)));
    }
    dispatch(fetchCuisines());
  }, [dispatch, id]);

  const handleBan = async (restaurant: RestaurantsDetailData['restaurant']) => {
    if (!banReason) return;

    try {
      await dispatch(
        banRestaurant({ id: restaurant.id, reason: banReason })
      ).unwrap();
      toast({
        title: "レストランをBANしました",
        description: `${restaurant.name}をBANしました。`,
      });
      setBanReason("");
      dispatch(fetchRestaurantDetail(restaurant.id));
    } catch (error) {
      toast({
        title: "エラー",
        description: "BANに失敗しました。",
        variant: "destructive",
      });
    }
  };
  
  const handleApprove = async (restaurant:  RestaurantsDetailData['restaurant']) => {
    try {
      await dispatch(
        approveRestaurant({ id: restaurant.id, reason: "承認" })
      ).unwrap();
      toast({
        title: "レストランを承認しました",
        description: `${restaurant.name}を承認しました。`,
      });
      dispatch(fetchRestaurantDetail(restaurant.id));
    } catch (error) {
      toast({
        title: "エラー",
        description: "承認に失敗しました。",
        variant: "destructive",
      });
    }
  };

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
                  {restaurantDetail.companyUsers.map((user) => (
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
            <div>
              {restaurantDetail.restaurant.status === "BANNED" || restaurantDetail.restaurant.status === "PENDING" ? (
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        className="w-full"
                      >
                        承認する
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>店舗の承認</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        店舗を承認しますか？
                      </DialogDescription>
                      <DialogFooter className="gap-2">
                        <DialogClose>キャンセル</DialogClose>
                        <Button
                          variant="default"
                          onClick={() => handleApprove(restaurantDetail.restaurant)}>
                          承認する
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : restaurantDetail.restaurant.status === "APPROVED" ? (
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="mt-2 w-full"
                      >
                        BANする
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          店舗のBAN
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <span className="mb-2">店舗をBANしますか？</span>
                          <Input
                            placeholder="BAN理由を入力"
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleBan(restaurantDetail.restaurant)}
                          className="bg-red-600 hover:bg-red-700">
                          削除する
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ): null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}