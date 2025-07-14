"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchChefReviews,
  fetchRestaurantReviews,
} from "@/lib/redux/slices/operatorSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function ChefsPage() {
  const dispatch = useDispatch<AppDispatch>();
  
  const chefReviews = useSelector((state: RootState) => state.operator.chefReviews.data);
  const chefReviewsLoading = useSelector((state: RootState) => state.operator.chefReviews.loading);
  const chefReviewsError = useSelector((state: RootState) => state.operator.chefReviews.error);
  
  const restaurantReviews = useSelector((state: RootState) => state.operator.restaurantReviews.data);
  const restaurantReviewsLoading = useSelector((state: RootState) => state.operator.restaurantReviews.loading);
  const restaurantReviewsError = useSelector((state: RootState) => state.operator.restaurantReviews.error);

  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("chefReviews");

  useEffect(() => {
    dispatch(fetchChefReviews());
    dispatch(fetchRestaurantReviews());
  }, [dispatch]);

  const filteredReviews =
    (selectedTab === "chefReviews" ? chefReviews : restaurantReviews)?.filter((review) => {
      // フィルター条件を組み合わせる
      const matchesSearch =
        searchQuery === "" ||
        review.user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !showSuspendedOnly;
      return matchesSearch && matchesStatus;
    }) || [];

  if (chefReviewsLoading || restaurantReviewsLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (chefReviewsError || restaurantReviewsError) {
    return <div className="p-4 text-red-500">{chefReviewsError || restaurantReviewsError}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">レビュー一覧</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="名前やメールアドレスで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-1">
        <TabsList>
          <TabsTrigger value="chefReviews">シェフレビュー</TabsTrigger>
          <TabsTrigger value="restaurantReviews">店舗レビュー</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{selectedTab === "chefReviews" ? "シェフ名" : "店舗名"}</TableHead>
                <TableHead>{selectedTab === "chefReviews" ? "勤務店舗名" : "勤務シェフ名"}</TableHead>
                <TableHead>勤務日</TableHead>
                <TableHead>点数（★の数）</TableHead>
                <TableHead>レビュー内容</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{selectedTab === "chefReviews" ? review.user.name : review.restaurant.name}</TableCell>
                  <TableCell>{selectedTab === "chefReviews" ? review.restaurant.name : review.user.name}</TableCell>
                  <TableCell>{format(new Date(review.worksession.check_in_time), "yyyy/MM/dd", { locale: ja })}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
