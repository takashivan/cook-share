"use client";

import {
  Download,
  MoreHorizontal,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { fetchBillings } from "@/lib/redux/slices/operatorSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Papa from "papaparse";
import { exportCsv } from "@/lib/utils";

export default function BillingList() {
  const dispatch = useDispatch<AppDispatch>();

  const billingSummaries = useSelector(
    (state: RootState) => state.operator.billingSummaries.data
  );
  const isLoading = useSelector(
    (state: RootState) => state.operator.billingSummaries.loading
  );
  const error = useSelector(
    (state: RootState) => state.operator.billingSummaries.error
  );

  // 検索用state追加
  const [searchQuery, setSearchQuery] = useState("");

  // ソート状態管理
  const [sortKey, setSortKey] = useState<
    | "invoice_number"
    | "company_id"
    | "company_name"
    | "created_at"
    | "month"
    | "amount"
    | "status"
    | null
  >(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // フィルタ状態管理
  const [filterOpen, setFilterOpen] = useState(false);
  const [createdAtMin, setCreatedAtMin] = useState("");
  const [createdAtMax, setCreatedAtMax] = useState("");
  const [monthMin, setMonthMin] = useState("");
  const [monthMax, setMonthMax] = useState("");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>(["PAID", "PENDING", "FAILED"]);

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

  // 期間（例: "25-05"）の比較用関数
  function compareMonth(a: string, b: string) {
    // "25-05" → 2025-05-01 のDateに変換して比較
    if (!a || !b) return 0;

    const [aYY, aMM] = a.split("-");
    // 2000年以降前提
    const aYear = 2000 + Number(aYY);
    const aMonth = Number(aMM) - 1;
    const aDate = new Date(aYear, aMonth, 1);

    const [bYY, bMM] = b.split("-");
    const bDate = new Date(Number(bYY), Number(bMM) - 1, 1);

    return aDate.getTime() - bDate.getTime();
  }

  // フィルタ
  const filteredBillings = billingSummaries.filter((billing) => {
    const query = searchQuery.trim().toLowerCase();
    if (
      query &&
      !(
        billing.invoice_number.toLowerCase().includes(query) ||
        billing.company.id.toString().includes(query) ||
        billing.company.name.toLowerCase().includes(query)
      )
    ) {
      return false;
    }
    // 発行日フィルタ
    if (
      (createdAtMin && new Date(billing.created_at) < new Date(createdAtMin)) ||
      (createdAtMax && new Date(billing.created_at) > new Date(createdAtMax))
    ) {
      return false;
    }
    // 期間フィルタ（例: "25-05" などの文字列比較→年月比較）
    if (
      (monthMin && compareMonth(billing.month, monthMin) < 0) ||
      (monthMax && compareMonth(billing.month, monthMax) > 0)
    ) {
      return false;
    }
    // 金額フィルタ
    if (
      (amountMin && billing.amount < Number(amountMin)) ||
      (amountMax && billing.amount > Number(amountMax))
    ) {
      return false;
    }
    // ステータスフィルタ
    if (statusFilter.length === 0 || !statusFilter.includes(billing.status)) {
      return false;
    }
    return true;
  });

  // ソート済みデータ
  const sortedBillings = [...filteredBillings].sort((a, b) => {
    if (!sortKey) return 0;
    let aValue, bValue;
    switch (sortKey) {
      case "invoice_number":
        aValue = a.invoice_number;
        bValue = b.invoice_number;
        break;
      case "company_id":
        aValue = a.company.id;
        bValue = b.company.id;
        break;
      case "company_name":
        aValue = a.company.name;
        bValue = b.company.name;
        break;
      case "created_at":
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
        break;
      case "month":
        aValue = a.month;
        bValue = b.month;
        break;
      case "amount":
        aValue = a.amount;
        bValue = b.amount;
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
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

  useEffect(() => {
    dispatch(fetchBillings());
  }, [dispatch]);

  if (isLoading) {
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

  if (!billingSummaries) {
    return <div>No billings found</div>;
  }

  // フィルターリセット関数
  const handleFilterReset = () => {
    setCreatedAtMin("");
    setCreatedAtMax("");
    setMonthMin("");
    setMonthMax("");
    setAmountMin("");
    setAmountMax("");
    setStatusFilter(["PAID", "PENDING", "FAILED"]);
  };

  // エクスポート関数
  const handleExportCSV = () => {
    if (!sortedBillings.length) return;

    const data = sortedBillings.map((billing) => ({
      請求番号: billing.invoice_number,
      会社ID: billing.company.id,
      会社名: billing.company.name,
      発行日: new Date(billing.created_at).toLocaleDateString(),
      期間: billing.month,
      金額: billing.amount,
      ステータス:
        billing.status === "PAID"
          ? "支払い済み"
          : billing.status === "PENDING"
          ? "未払い"
          : billing.status === "FAILED"
          ? "失敗"
          : "不明",
    }));

    const csv = Papa.unparse(data);
    exportCsv(csv, "billings.csv");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">請求一覧</h2>
        <p className="text-muted-foreground">会社への請求情報一覧です</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="請求番号・会社ID・会社名で検索..."
            className="w-full pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
        >
          <Download className="mr-2 h-4 w-4" />
          エクスポート
        </Button>
      </div>

      {/* フィルターダイアログ */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>請求フィルター</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>発行日（開始）</label>
              <Input
                type="date"
                value={createdAtMin}
                onChange={e => setCreatedAtMin(e.target.value)}
              />
            </div>
            <div>
              <label>発行日（終了）</label>
              <Input
                type="date"
                value={createdAtMax}
                onChange={e => setCreatedAtMax(e.target.value)}
              />
            </div>
            <div>
              <label>期間（開始: 例 2024-05）</label>
              <Input
                type="month"
                value={monthMin}
                onChange={e => setMonthMin(e.target.value)}
              />
            </div>
            <div>
              <label>期間（終了: 例 2024-06）</label>
              <Input
                type="month"
                value={monthMax}
                onChange={e => setMonthMax(e.target.value)}
              />
            </div>
            <div>
              <label>金額（最小）</label>
              <Input
                type="number"
                value={amountMin}
                onChange={e => setAmountMin(e.target.value)}
              />
            </div>
            <div>
              <label>金額（最大）</label>
              <Input
                type="number"
                value={amountMax}
                onChange={e => setAmountMax(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label>ステータス</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={statusFilter.includes("PAID")}
                    onCheckedChange={checked => {
                      setStatusFilter(prev =>
                        checked
                          ? [...prev, "PAID"]
                          : prev.filter(v => v !== "PAID")
                      );
                    }}
                  />
                  支払い済み
                </label>
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={statusFilter.includes("PENDING")}
                    onCheckedChange={checked => {
                      setStatusFilter(prev =>
                        checked
                          ? [...prev, "PENDING"]
                          : prev.filter(v => v !== "PENDING")
                      );
                    }}
                  />
                  未払い
                </label>
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={statusFilter.includes("FAILED")}
                    onCheckedChange={checked => {
                      setStatusFilter(prev =>
                        checked
                          ? [...prev, "FAILED"]
                          : prev.filter(v => v !== "FAILED")
                      );
                    }}
                  />
                  失敗
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
                    onClick={() => handleSort("invoice_number")}
                    className="cursor-pointer"
                  >
                    請求番号 {renderSortIcon("invoice_number")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "10em", width: "10em" }}
                    onClick={() => handleSort("company_id")}
                    className="cursor-pointer"
                  >
                    会社ID {renderSortIcon("company_id")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "10em", width: "10em" }}
                    onClick={() => handleSort("company_name")}
                    className="cursor-pointer"
                  >
                    会社名 {renderSortIcon("company_name")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "7em", width: "7em" }}
                    onClick={() => handleSort("created_at")}
                    className="cursor-pointer"
                  >
                    発行日 {renderSortIcon("created_at")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "5em", width: "5em" }}
                    onClick={() => handleSort("month")}
                    className="cursor-pointer"
                  >
                    期間 {renderSortIcon("month")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "6em", width: "6em" }}
                    onClick={() => handleSort("amount")}
                    className="cursor-pointer"
                  >
                    金額 {renderSortIcon("amount")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "8em", width: "8em" }}
                    onClick={() => handleSort("status")}
                    className="cursor-pointer"
                  >
                    ステータス {renderSortIcon("status")}
                  </TableHead>
                  <TableHead style={{ minWidth: "4em", width: "4em" }}>
                    操作
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedBillings.map((billing) => (
                  <TableRow key={billing.id}>
                    <TableCell className="font-medium">
                      {billing.invoice_number}
                    </TableCell>
                    <TableCell>{billing.company.id}</TableCell>
                    <TableCell>{billing.company.name}</TableCell>
                    <TableCell>
                      {new Date(billing.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{billing.month}</TableCell>
                    <TableCell>¥{billing.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          billing.status === "PAID"
                            ? "bg-green-100 text-green-800"
                            : billing.status === "PENDING"
                            ? "bg-amber-100 text-amber-800"
                            : billing.status === "FAILED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                        {billing.status === "PAID"
                          ? "支払い済み"
                          : billing.status === "PENDING"
                          ? "未払い"
                          : billing.status === "FAILED"
                          ? "失敗"
                          : "不明"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">メニューを開く</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem disabled={!billing.hosted_invoice_url}>
                            <a
                              href={billing.hosted_invoice_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full">
                              請求書を表示
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled={!billing.invoice_pdf}>
                            <a
                              href={billing.invoice_pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full">
                              PDFをダウンロード
                            </a>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
