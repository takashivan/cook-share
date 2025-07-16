"use client";

import Link from "next/link";
import {
  Download,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Building,
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
import { useEffect } from "react";
import { fetchBillings } from "@/lib/redux/slices/operatorSlice";

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

  useEffect(() => {
    dispatch(fetchBillings());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!billingSummaries) {
    return <div>No billings found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">請求一覧</h2>
          <p className="text-muted-foreground">会社への請求情報一覧です</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="請求を検索..."
            className="w-full pl-8"
          />
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
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
                <TableHead>請求番号</TableHead>
                <TableHead>会社ID</TableHead>
                <TableHead>会社名</TableHead>
                <TableHead>発行日</TableHead>
                <TableHead>期間</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingSummaries.map((billing) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
