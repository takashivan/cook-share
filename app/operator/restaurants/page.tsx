"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchRestaurants,
  banRestaurant,
  approveRestaurant,
  RestaurantsListResponse,
  fetchCuisines,
} from "@/lib/redux/slices/operatorSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { RestaurantStatusBadgeForAdmin } from "@/components/badge/RestaurantStatusBadgeForAdmin";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RestaurantsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const restaurants = useSelector((state: RootState) => state.operator.restaurants.data);
  const loading = useSelector((state: RootState) => state.operator.restaurants.loading);
  const error = useSelector((state: RootState) => state.operator.restaurants.error);
  const cuisines = useSelector((state: RootState) => state.operator.cuisines);

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantsListResponse | null>(null);
  const [banReason, setBanReason] = useState("");
  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchCuisines());
  }, [dispatch]);

  const handleBan = async (restaurant: RestaurantsListResponse) => {
    if (!banReason) return;

    try {
      await dispatch(
        banRestaurant({ id: restaurant.id, reason: banReason })
      ).unwrap();
      toast({
        title: "レストランをBANしました",
        description: `${restaurant.name}をBANしました。`,
      });
      setSelectedRestaurant(null);
      setBanReason("");
      dispatch(fetchRestaurants());
    } catch (error) {
      toast({
        title: "エラー",
        description: "BANに失敗しました。",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (restaurant: RestaurantsListResponse) => {
    try {
      await dispatch(
        approveRestaurant({ id: restaurant.id, reason: "承認" })
      ).unwrap();
      toast({
        title: "レストランを承認しました",
        description: `${restaurant.name}を承認しました。`,
      });
      dispatch(fetchRestaurants());
    } catch (error) {
      toast({
        title: "エラー",
        description: "承認に失敗しました。",
        variant: "destructive",
      });
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      searchQuery === "" ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !showSuspendedOnly || restaurant.status !== "APPROVED";
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">レストラン一覧</h2>
            <p className="text-muted-foreground">登録されているレストランの一覧です</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-80 mr-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="店舗名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="suspended-filter"
              checked={showSuspendedOnly}
              onCheckedChange={setShowSuspendedOnly}
            />
            <Label htmlFor="suspended-filter">一時停止中のみ表示</Label>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            フィルター
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>会社ID</TableHead>
                  <TableHead>会社名</TableHead>
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
                {filteredRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.id}>
                    <TableCell>{restaurant.companies_id}</TableCell>
                    <TableCell>{restaurant.company.name}</TableCell>
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
          </CardContent>
        </Card>
      </div>
      {/* {selectedRestaurant && (
        <Dialog open={!!selectedRestaurant} onOpenChange={() => setSelectedRestaurant(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>レストラン詳細</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-semibold">基本情報</h3>
                  <p>店舗名: {selectedRestaurant.name}</p>
                  <p>住所: {selectedRestaurant.address || "-"}</p>
                  <p>
                    ステータス:{" "}
                    {selectedRestaurant.status === "APPROVED"
                      ? "承認済み"
                      : selectedRestaurant.status === "BANNED"
                      ? "一時停止中"
                      : selectedRestaurant.status === "PENDING"
                      ? "承認待ち"
                      : selectedRestaurant.status === "DELETED"
                      ? "削除済み"
                      : "不明"}
                  </p>
                </div>
              </div>
              {selectedRestaurant.status === "BANNED" || selectedRestaurant.status === "PENDING" ? (
                <div>
                  <h3 className="font-semibold mb-2">承認</h3>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleApprove(selectedRestaurant)}>
                    承認する
                  </Button>
                </div>
              ) : selectedRestaurant.status === "APPROVED" ? (
                <div>
                  <h3 className="font-semibold mb-2">BAN</h3>
                  <Input
                    placeholder="BAN理由を入力"
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                  />
                  <Button
                    variant="destructive"
                    className="mt-2 w-full"
                    onClick={() => handleBan(selectedRestaurant)}>
                    BANする
                  </Button>
                </div>
              ): null}
            </div>
          </DialogContent>
        </Dialog>
      )} */}
    </>
  );
}
