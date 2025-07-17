"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchRestaurants,
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
import { Label } from "@/components/ui/label";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { RestaurantStatusBadgeForAdmin } from "@/components/badge/RestaurantStatusBadgeForAdmin";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RestaurantStatus } from "@/lib/const/restaurant";
import Papa from "papaparse";
import { exportCsv } from "@/lib/utils";

export default function RestaurantsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const restaurants = useSelector((state: RootState) => state.operator.restaurants.data);
  const loading = useSelector((state: RootState) => state.operator.restaurants.loading);
  const error = useSelector((state: RootState) => state.operator.restaurants.error);
  const cuisines = useSelector((state: RootState) => state.operator.cuisines);

  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);

  // 検索用state追加
  const [searchQuery, setSearchQuery] = useState("");

  // ソート状態管理
  const [sortKey, setSortKey] = useState<keyof typeof restaurants[0] | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // フィルター状態管理
  const [filterOpen, setFilterOpen] = useState(false);
  const [staffCountMin, setStaffCountMin] = useState("");
  const [staffCountMax, setStaffCountMax] = useState("");
  const [jobCountMin, setJobCountMin] = useState("");
  const [jobCountMax, setJobCountMax] = useState("");
  const [worksessionCountMin, setWorksessionCountMin] = useState("");
  const [worksessionCountMax, setWorksessionCountMax] = useState("");
  const [canceledCountMin, setCanceledCountMin] = useState("");
  const [canceledCountMax, setCanceledCountMax] = useState("");
  const [ratingMin, setRatingMin] = useState("");
  const [ratingMax, setRatingMax] = useState("");
  // ステータス複数選択
  const [statusFilter, setStatusFilter] = useState<RestaurantStatus['value'][]>(["APPROVED", "PENDING", "BANNED", "DELETED"]);

  // ソート関数
  const handleSort = (key: keyof typeof restaurants[0]) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // ソートアイコン
  const renderSortIcon = (key: keyof typeof restaurants[0]) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? "▲" : "▼";
  };

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchCuisines());
  }, [dispatch]);

  // ステータスチェックボックスのハンドラ
  const handleStatusChange = (status: RestaurantStatus['value']) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // フィルターリセット関数
  const handleFilterReset = () => {
    setStaffCountMin("");
    setStaffCountMax("");
    setJobCountMin("");
    setJobCountMax("");
    setWorksessionCountMin("");
    setWorksessionCountMax("");
    setCanceledCountMin("");
    setCanceledCountMax("");
    setRatingMin("");
    setRatingMax("");
    setStatusFilter(["APPROVED", "PENDING", "BANNED", "DELETED"]);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const query = searchQuery.trim().toLowerCase();

    // ジャンル名リスト取得
    const genreNames = cuisines
      ?.filter((cuisine) => restaurant.restaurant_cuisine_id.includes(cuisine.id))
      .map((cuisine) => cuisine.category.toLowerCase()) ?? [];

    // 検索フィルタ
    const matchesSearch =
      !query ||
      (restaurant.companies_id != null && restaurant.companies_id.toString().includes(query)) ||
      restaurant.company.name.toLowerCase().includes(query) ||
      restaurant.id.toString().includes(query) ||
      restaurant.name.toLowerCase().includes(query) ||
      genreNames.some((genre) => genre.includes(query)) ||
      (restaurant.address ?? "").toLowerCase().includes(query);

    // 数値範囲フィルタ
    const matchesNumber =
      (!staffCountMin || restaurant.companyUserCount >= Number(staffCountMin)) &&
      (!staffCountMax || restaurant.companyUserCount <= Number(staffCountMax)) &&
      (!jobCountMin || restaurant.jobCount >= Number(jobCountMin)) &&
      (!jobCountMax || restaurant.jobCount <= Number(jobCountMax)) &&
      (!worksessionCountMin || restaurant.worksessionCount >= Number(worksessionCountMin)) &&
      (!worksessionCountMax || restaurant.worksessionCount <= Number(worksessionCountMax)) &&
      (!canceledCountMin || restaurant.worksessionCanceledByRestaurantCount >= Number(canceledCountMin)) &&
      (!canceledCountMax || restaurant.worksessionCanceledByRestaurantCount <= Number(canceledCountMax)) &&
      (!ratingMin || restaurant.rating >= Number(ratingMin)) &&
      (!ratingMax || restaurant.rating <= Number(ratingMax));

    // ステータス複数選択フィルタ
    const matchesStatus =
      statusFilter.length > 0 && statusFilter.includes(restaurant.status);

    // すべての条件を満たすものだけ表示
    return matchesSearch && matchesNumber && matchesStatus;
  });

  // ソート済みデータ
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  // エクスポート関数
  const handleExportCSV = () => {
    if (!sortedRestaurants.length) return;

    const data = sortedRestaurants.map((restaurant) => ({
      会社ID: restaurant.companies_id,
      会社名: restaurant.company.name,
      店舗ID: restaurant.id,
      店舗名: restaurant.name,
      ジャンル: (cuisines
        ?.filter((cuisine) => restaurant.restaurant_cuisine_id.includes(cuisine.id))
        .map((cuisine) => cuisine.category)
        .join("、")) || "",
      住所: restaurant.address || "-",
      スタッフ数: restaurant.companyUserCount,
      求人数: restaurant.jobCount,
      マッチング数: restaurant.worksessionCount,
      キャンセル数: restaurant.worksessionCanceledByRestaurantCount,
      キャンセル率:
        restaurant.worksessionCanceledByRestaurantCount > 0
          ? (
              (restaurant.worksessionCanceledByRestaurantCount / restaurant.worksessionCount) *
              100
            ).toFixed(2) + "%"
          : "0%",
      ステータス:
        restaurant.status === "APPROVED"
          ? "公開中"
          : restaurant.status === "PENDING"
          ? "審査中"
          : restaurant.status === "BANNED"
          ? "運用停止"
          : "削除済み",
      点数: restaurant.rating,
    }));

    const csv = Papa.unparse(data);
    exportCsv(csv, "restaurants.csv");
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">レストラン一覧</h2>
          <p className="text-muted-foreground">登録されているレストランの一覧です</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="会社ID・会社名・店舗ID・店舗名・ジャンル・住所で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 bg-white"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => setFilterOpen(true)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            フィルター
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
        </div>

        {/* フィルターダイアログ */}
        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>レストランフィルター</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>スタッフ数（最小）</Label>
                <Input type="number" value={staffCountMin} onChange={e => setStaffCountMin(e.target.value)} />
              </div>
              <div>
                <Label>スタッフ数（最大）</Label>
                <Input type="number" value={staffCountMax} onChange={e => setStaffCountMax(e.target.value)} />
              </div>
              <div>
                <Label>求人数（最小）</Label>
                <Input type="number" value={jobCountMin} onChange={e => setJobCountMin(e.target.value)} />
              </div>
              <div>
                <Label>求人数（最大）</Label>
                <Input type="number" value={jobCountMax} onChange={e => setJobCountMax(e.target.value)} />
              </div>
              <div>
                <Label>マッチング数（最小）</Label>
                <Input type="number" value={worksessionCountMin} onChange={e => setWorksessionCountMin(e.target.value)} />
              </div>
              <div>
                <Label>マッチング数（最大）</Label>
                <Input type="number" value={worksessionCountMax} onChange={e => setWorksessionCountMax(e.target.value)} />
              </div>
              <div>
                <Label>キャンセル数（最小）</Label>
                <Input type="number" value={canceledCountMin} onChange={e => setCanceledCountMin(e.target.value)} />
              </div>
              <div>
                <Label>キャンセル数（最大）</Label>
                <Input type="number" value={canceledCountMax} onChange={e => setCanceledCountMax(e.target.value)} />
              </div>
              <div>
                <Label>点数（最小）</Label>
                <Input type="number" value={ratingMin} onChange={e => setRatingMin(e.target.value)} />
              </div>
              <div>
                <Label>点数（最大）</Label>
                <Input type="number" value={ratingMax} onChange={e => setRatingMax(e.target.value)} />
              </div>
              <div className="col-span-2">
                <Label>ステータス</Label>
                <div className="flex gap-4 flex-wrap">
                  <label className="flex items-center gap-1">
                    <Checkbox
                      checked={statusFilter.includes("APPROVED")}
                      onCheckedChange={() => handleStatusChange("APPROVED")}
                    />
                    公開中
                  </label>
                  <label className="flex items-center gap-1">
                    <Checkbox
                      checked={statusFilter.includes("PENDING")}
                      onCheckedChange={() => handleStatusChange("PENDING")}
                    />
                    審査中
                  </label>
                  <label className="flex items-center gap-1">
                    <Checkbox
                      checked={statusFilter.includes("BANNED")}
                      onCheckedChange={() => handleStatusChange("BANNED")}
                    />
                    運用停止
                  </label>
                  <label className="flex items-center gap-1">
                    <Checkbox
                      checked={statusFilter.includes("DELETED")}
                      onCheckedChange={() => handleStatusChange("DELETED")}
                    />
                    削除済み
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-row gap-2 justify-end">
              <Button
                variant="secondary"
                type="button"
                onClick={handleFilterReset}
              >
                フィルターリセット
              </Button>
              <Button variant="outline" onClick={() => setFilterOpen(false)}>
                閉じる
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card>
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      style={{ minWidth: "10em", width: "10em" }}
                      onClick={() => handleSort("companies_id")}
                      className="cursor-pointer"
                    >
                      会社ID {renderSortIcon("companies_id")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "10em", width: "10em" }}
                      onClick={() => handleSort("company")}
                      className="cursor-pointer"
                    >
                      会社名 {renderSortIcon("company")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "5em", width: "5em" }}
                      onClick={() => handleSort("id")}
                      className="cursor-pointer"
                    >
                      店舗ID {renderSortIcon("id")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "12em", width: "12em" }}
                      onClick={() => handleSort("name")}
                      className="cursor-pointer"
                    >
                      店舗名 {renderSortIcon("name")}
                    </TableHead>
                    <TableHead style={{ minWidth: "7em", width: "7em" }}>
                      ジャンル
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "12em", width: "12em" }}
                      onClick={() => handleSort("address")}
                      className="cursor-pointer"
                    >
                      住所 {renderSortIcon("address")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "7em", width: "7em" }}
                      onClick={() => handleSort("companyUserCount")}
                      className="cursor-pointer"
                    >
                      スタッフ数 {renderSortIcon("companyUserCount")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "5em", width: "5em" }}
                      onClick={() => handleSort("jobCount")}
                      className="cursor-pointer"
                    >
                      求人数 {renderSortIcon("jobCount")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "8em", width: "8em" }}
                      onClick={() => handleSort("worksessionCount")}
                      className="cursor-pointer"
                    >
                      マッチング数 {renderSortIcon("worksessionCount")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "8em", width: "8em" }}
                      onClick={() => handleSort("worksessionCanceledByRestaurantCount")}
                      className="cursor-pointer"
                    >
                      キャンセル数 {renderSortIcon("worksessionCanceledByRestaurantCount")}
                    </TableHead>
                    <TableHead style={{ minWidth: "8em", width: "8em" }}>
                      キャンセル率
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "8em", width: "8em" }}
                      onClick={() => handleSort("status")}
                      className="cursor-pointer"
                    >
                      ステータス {renderSortIcon("status")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "4em", width: "4em" }}
                      onClick={() => handleSort("rating")}
                      className="cursor-pointer"
                    >
                      点数 {renderSortIcon("rating")}
                    </TableHead>
                    <TableHead style={{ minWidth: "5em", width: "5em" }}>
                      操作
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRestaurants.map((restaurant) => (
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
                        <RestaurantStatusBadgeForAdmin status={restaurant.status} />
                      </TableCell>
                      <TableCell>{restaurant.rating}</TableCell>
                      <TableCell>
                        <Link href={`/operator/restaurants/${restaurant.id}`}>
                          <Button variant="outline">詳細</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
