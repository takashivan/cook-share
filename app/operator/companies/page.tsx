"use client";

import Link from "next/link";
import {
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { fetchCompanies } from "@/lib/redux/slices/operatorSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function CompaniesList() {
  const dispatch = useDispatch<AppDispatch>();
  const companies = useSelector((state: RootState) => state.operator.companies.data);

  // 検索用state追加
  const [searchQuery, setSearchQuery] = useState("");

  // ソート状態管理
  const [sortKey, setSortKey] = useState<keyof typeof companies[0] | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // フィルターダイアログのオープン状態
  const [filterOpen, setFilterOpen] = useState(false);
  const [restaurantCountMin, setRestaurantCountMin] = useState("");
  const [restaurantCountMax, setRestaurantCountMax] = useState("");
  const [jobCountMin, setJobCountMin] = useState("");
  const [jobCountMax, setJobCountMax] = useState("");
  const [worksessionCountMin, setWorksessionCountMin] = useState("");
  const [worksessionCountMax, setWorksessionCountMax] = useState("");
  const [canceledCountMin, setCanceledCountMin] = useState("");
  const [canceledCountMax, setCanceledCountMax] = useState("");
  // ステータス複数選択
  const [statusFilter, setStatusFilter] = useState<string[]>(["approved", "pending", "banned", "rejected"]);

  // ソート関数
  const handleSort = (key: keyof typeof companies[0]) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // ステータスチェックボックスのハンドラ
  const handleStatusChange = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // フィルターリセット関数を追加
  const handleFilterReset = () => {
    setRestaurantCountMin("");
    setRestaurantCountMax("");
    setJobCountMin("");
    setJobCountMax("");
    setWorksessionCountMin("");
    setWorksessionCountMax("");
    setCanceledCountMin("");
    setCanceledCountMax("");
    setStatusFilter(["approved", "pending", "banned", "rejected"]);
  };

  // 検索・フィルタ
  const filteredCompanies = companies.filter((company) => {
    const query = searchQuery.trim().toLowerCase();
    if (
      query &&
      !(
        company.id.toString().includes(query) ||
        company.name.toLowerCase().includes(query)
      )
    ) {
      return false;
    }
    // 数値範囲フィルタ
    if (
      (restaurantCountMin && company.restaurantCount < Number(restaurantCountMin)) ||
      (restaurantCountMax && company.restaurantCount > Number(restaurantCountMax)) ||
      (jobCountMin && company.jobCount < Number(jobCountMin)) ||
      (jobCountMax && company.jobCount > Number(jobCountMax)) ||
      (worksessionCountMin && company.worksessionCount < Number(worksessionCountMin)) ||
      (worksessionCountMax && company.worksessionCount > Number(worksessionCountMax)) ||
      (canceledCountMin && company.worksessionCanceledByRestaurantCount < Number(canceledCountMin)) ||
      (canceledCountMax && company.worksessionCanceledByRestaurantCount > Number(canceledCountMax))
    ) {
      return false;
    }
    // ステータス複数選択フィルタ
    if (statusFilter.length === 0 || !statusFilter.includes(company.status)) {
      return false;
    }
    return true;
  });

  // ソート済みデータ
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
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

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // ソートアイコン
  const renderSortIcon = (key: keyof typeof companies[0]) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? "▲" : "▼";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">会社一覧</h2>
        <p className="text-muted-foreground">登録されている会社の一覧です</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="ID・会社名で検索..."
            className="w-full pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => setFilterOpen(true)}>
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          フィルター
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          エクスポート
        </Button>
      </div>

      {/* フィルターダイアログ */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>会社フィルター</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>店舗数（最小）</Label>
              <Input type="number" value={restaurantCountMin} onChange={e => setRestaurantCountMin(e.target.value)} />
            </div>
            <div>
              <Label>店舗数（最大）</Label>
              <Input type="number" value={restaurantCountMax} onChange={e => setRestaurantCountMax(e.target.value)} />
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
              <Label>企業キャンセル数（最小）</Label>
              <Input type="number" value={canceledCountMin} onChange={e => setCanceledCountMin(e.target.value)} />
            </div>
            <div>
              <Label>企業キャンセル数（最大）</Label>
              <Input type="number" value={canceledCountMax} onChange={e => setCanceledCountMax(e.target.value)} />
            </div>
            <div className="col-span-2">
              <Label>ステータス</Label>
              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={statusFilter.includes("approved")}
                    onCheckedChange={() => handleStatusChange("approved")}
                  />
                  承認済み
                </label>
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={statusFilter.includes("pending")}
                    onCheckedChange={() => handleStatusChange("pending")}
                  />
                  未承認
                </label>
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={statusFilter.includes("banned")}
                    onCheckedChange={() => handleStatusChange("banned")}
                  />
                  一時停止中
                </label>
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={statusFilter.includes("rejected")}
                    onCheckedChange={() => handleStatusChange("rejected")}
                  />
                  拒否
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
                    onClick={() => handleSort("id")}
                    className="cursor-pointer"
                  >
                    ID {renderSortIcon("id")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "10em", width: "10em" }}
                    onClick={() => handleSort("name")}
                    className="cursor-pointer"
                  >
                    会社名 {renderSortIcon("name")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "5em", width: "5em" }}
                    onClick={() => handleSort("restaurantCount")}
                    className="cursor-pointer"
                  >
                    店舗数 {renderSortIcon("restaurantCount")}
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
                    style={{ minWidth: "10em", width: "10em" }}
                    onClick={() => handleSort("worksessionCanceledByRestaurantCount")}
                    className="cursor-pointer"
                  >
                    企業キャンセル数 {renderSortIcon("worksessionCanceledByRestaurantCount")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "10em", width: "10em" }}
                    className="cursor-pointer"
                  >
                    企業キャンセル率
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "8em", width: "8em" }}
                    onClick={() => handleSort("status")}
                    className="cursor-pointer"
                  >
                    ステータス {renderSortIcon("status")}
                  </TableHead>
                  <TableHead style={{ minWidth: "5em", width: "5em" }}>
                    操作
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.id}</TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.restaurantCount}</TableCell>
                    <TableCell>{company.jobCount}</TableCell>
                    <TableCell>{company.worksessionCount}</TableCell>
                    <TableCell>{company.worksessionCanceledByRestaurantCount}</TableCell>
                    <TableCell>
                      {company.worksessionCanceledByRestaurantCount > 0
                        ? `${(
                            (company.worksessionCanceledByRestaurantCount /
                              company.worksessionCount) *
                            100
                          ).toFixed(2)}%`
                        : "0%"}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          company.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : company.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {company.status === "approved"
                          ? "承認済み"
                          : company.status === "pending"
                          ? "未承認"
                          : company.status === "banned"
                          ? "一時停止中"
                          : "拒否"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link href={`/operator/companies/${company.id}`}>
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
  );
}
