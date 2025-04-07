"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchRestaurants,
  banRestaurant,
  approveRestaurant,
} from "@/lib/redux/slices/operatorSlice";
import { Restaurant } from "@/types/restaurant";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RestaurantsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants, loading, error } = useSelector((state: RootState) => ({
    restaurants: state.operator.restaurants.data,
    loading: state.operator.restaurants.loading,
    error: state.operator.restaurants.error,
  }));
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [banReason, setBanReason] = useState("");
  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleBan = async () => {
    if (!selectedRestaurant || !banReason) return;

    try {
      await dispatch(
        banRestaurant({ id: selectedRestaurant.id, reason: banReason })
      ).unwrap();
      toast({
        title: "レストランをBANしました",
        description: `${selectedRestaurant.name}をBANしました。`,
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

  const handleApprove = async (restaurant: Restaurant) => {
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
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !showSuspendedOnly || !restaurant.is_approved;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">レストラン一覧</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="suspended-filter"
              checked={showSuspendedOnly}
              onCheckedChange={setShowSuspendedOnly}
            />
            <Label htmlFor="suspended-filter">一時停止中のみ表示</Label>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="店舗名やメールアドレスで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>店舗名</TableHead>
              <TableHead>メール</TableHead>
              <TableHead>住所</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRestaurants.map((restaurant: Restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>
                  <Avatar>
                    {restaurant.image_url ? (
                      <AvatarImage
                        src={restaurant.image_url}
                        alt={restaurant.name}
                      />
                    ) : (
                      <AvatarFallback>{restaurant.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                </TableCell>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.email}</TableCell>
                <TableCell>{restaurant.address || "-"}</TableCell>
                <TableCell>
                  {restaurant.is_approved ? (
                    <Badge variant="default">承認済み</Badge>
                  ) : (
                    <Badge variant="destructive">一時停止中</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedRestaurant(restaurant)}>
                        詳細
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>レストラン詳細</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-20 w-20">
                            {restaurant.image_url ? (
                              <AvatarImage
                                src={restaurant.image_url}
                                alt={restaurant.name}
                              />
                            ) : (
                              <AvatarFallback>
                                {restaurant.name[0]}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">基本情報</h3>
                            <p>店舗名: {restaurant.name}</p>
                            <p>メール: {restaurant.email}</p>
                            <p>住所: {restaurant.address || "-"}</p>
                            <p>
                              ステータス:{" "}
                              {restaurant.is_approved
                                ? "承認済み"
                                : "一時停止中"}
                            </p>
                          </div>
                        </div>
                        {!restaurant.is_approved ? (
                          <div>
                            <h3 className="font-semibold mb-2">承認</h3>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => handleApprove(restaurant)}>
                              承認する
                            </Button>
                          </div>
                        ) : (
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
                              onClick={handleBan}>
                              BANする
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
