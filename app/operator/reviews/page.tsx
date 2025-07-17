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
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ChefsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const chefReviews = useSelector(
    (state: RootState) => state.operator.chefReviews.data
  );
  const chefReviewsLoading = useSelector(
    (state: RootState) => state.operator.chefReviews.loading
  );
  const chefReviewsError = useSelector(
    (state: RootState) => state.operator.chefReviews.error
  );

  const restaurantReviews = useSelector(
    (state: RootState) => state.operator.restaurantReviews.data
  );
  const restaurantReviewsLoading = useSelector(
    (state: RootState) => state.operator.restaurantReviews.loading
  );
  const restaurantReviewsError = useSelector(
    (state: RootState) => state.operator.restaurantReviews.error
  );

  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("chefReviews");
  const [sortKey, setSortKey] = useState<
    "id" | "userName" | "restaurantName" | "workDate" | "rating" | "comment" | null
  >(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [workDateMin, setWorkDateMin] = useState("");
  const [workDateMax, setWorkDateMax] = useState("");
  const [ratingMin, setRatingMin] = useState("");
  const [ratingMax, setRatingMax] = useState("");

  useEffect(() => {
    dispatch(fetchChefReviews());
    dispatch(fetchRestaurantReviews());
  }, [dispatch]);

  // ソート関数
  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // ソートアイコン
  const renderSortIcon = (key: typeof sortKey) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? "▲" : "▼";
  };

  const filteredReviews =
    (selectedTab === "chefReviews" ? chefReviews : restaurantReviews)?.filter(
      (review) => {
        const query = searchQuery.trim().toLowerCase();
        if (
          query &&
          !(
            review.id.toString().includes(query) ||
            review.user.name.toLowerCase().includes(query) ||
            review.restaurant.name.toLowerCase().includes(query) ||
            review.comment.toLowerCase().includes(query)
          )
        ) {
          return false;
        }
        // 勤務日フィルタ
        const workDate = new Date(review.worksession.check_in_time);
        if (
          (workDateMin && workDate < new Date(workDateMin)) ||
          (workDateMax && workDate > new Date(workDateMax))
        ) {
          return false;
        }
        // 点数フィルタ
        if (
          (ratingMin && review.rating < Number(ratingMin)) ||
          (ratingMax && review.rating > Number(ratingMax))
        ) {
          return false;
        }
        return true;
      }
    ) || [];

  // ソート済みデータ
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (!sortKey) return 0;
    let aValue, bValue;
    switch (sortKey) {
      case "id":
        aValue = a.id;
        bValue = b.id;
        break;
      case "userName":
        aValue = selectedTab === "chefReviews" ? a.user.name : a.restaurant.name;
        bValue = selectedTab === "chefReviews" ? b.user.name : b.restaurant.name;
        break;
      case "restaurantName":
        aValue = selectedTab === "chefReviews" ? a.restaurant.name : a.user.name;
        bValue = selectedTab === "chefReviews" ? b.restaurant.name : b.user.name;
        break;
      case "workDate":
        aValue = new Date(a.worksession.check_in_time);
        bValue = new Date(b.worksession.check_in_time);
        break;
      case "rating":
        aValue = a.rating;
        bValue = b.rating;
        break;
      case "comment":
        aValue = a.comment;
        bValue = b.comment;
        break;
      default:
        return 0;
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }
    return 0;
  });

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
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ID・シェフ名・店舗名・レビュー内容で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            フィルター
          </Button>
        </div>
      </div>

      {/* フィルターダイアログ */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>レビュー フィルター</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>勤務日（開始）</Label>
              <Input
                type="date"
                value={workDateMin}
                onChange={(e) => setWorkDateMin(e.target.value)}
              />
            </div>
            <div>
              <Label>勤務日（終了）</Label>
              <Input
                type="date"
                value={workDateMax}
                onChange={(e) => setWorkDateMax(e.target.value)}
              />
            </div>
            <div>
              <Label>点数（最小）</Label>
              <Input
                type="number"
                value={ratingMin}
                onChange={(e) => setRatingMin(e.target.value)}
              />
            </div>
            <div>
              <Label>点数（最大）</Label>
              <Input
                type="number"
                value={ratingMax}
                onChange={(e) => setRatingMax(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilterOpen(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
                  ID {renderSortIcon("id")}
                </TableHead>
                <TableHead onClick={() => handleSort("userName")} className="cursor-pointer">
                  {selectedTab === "chefReviews" ? "シェフ名" : "店舗名"} {renderSortIcon("userName")}
                </TableHead>
                <TableHead onClick={() => handleSort("restaurantName")} className="cursor-pointer">
                  {selectedTab === "chefReviews" ? "勤務店舗名" : "勤務シェフ名"} {renderSortIcon("restaurantName")}
                </TableHead>
                <TableHead onClick={() => handleSort("workDate")} className="cursor-pointer">
                  勤務日 {renderSortIcon("workDate")}
                </TableHead>
                <TableHead onClick={() => handleSort("rating")} className="cursor-pointer">
                  点数（★の数） {renderSortIcon("rating")}
                </TableHead>
                <TableHead onClick={() => handleSort("comment")} className="cursor-pointer">
                  レビュー内容 {renderSortIcon("comment")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedReviews.map((review) => (
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
