"use client";

import { useEffect } from "react";
import {
  CreditCard,
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
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { useGetCurrentBillingSummaryByCompanyId } from "@/hooks/api/companyuser/billings/useGetCurrentBillingSummaryByCompanyId";

export default function BillingList() {
  const { user } = useCompanyAuth();
  const { data: billings, isLoading, error } = useGetCurrentBillingSummaryByCompanyId({
    companyId: user?.companies_id,
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching billing data:", error);
      toast({
        title: "エラーが発生しました",
        description: "請求データの取得に失敗しました。",
        variant: "destructive",
      });
    }
  }, [error]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) return "-";
    const milliseconds =
      timestamp.toString().length === 13 ? timestamp : timestamp * 1000;
    return format(new Date(milliseconds), "yyyy/MM/dd");
  };

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">請求一覧</h2>
          <p className="text-muted-foreground">会社の請求履歴一覧です</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            支払い方法を変更
          </Button>
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

      {/* Desktop View */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>請求番号</TableHead>
                <TableHead>日付</TableHead>
                <TableHead>期間</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>手数料率</TableHead>
                <TableHead>セッション数</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billings?.map((billing) => (
                <TableRow key={billing.id}>
                  <TableCell className="font-medium">
                    {billing.invoice_number}
                  </TableCell>
                  <TableCell>{formatDate(billing.created_at)}</TableCell>
                  <TableCell>{billing.month || "-"}</TableCell>
                  <TableCell>{formatAmount(billing.amount)}</TableCell>
                  <TableCell>{billing.fee_rate * 100}%</TableCell>
                  <TableCell>{billing.session_count}回</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        billing.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : billing.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                      {billing.status === "PAID" ? "支払済" : "未払い"}
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
                        <DropdownMenuItem asChild>
                          <a
                            href={billing.hosted_invoice_url}
                            target="_blank"
                            rel="noopener noreferrer">
                            請求書を表示
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a
                            href={billing.invoice_pdf}
                            target="_blank"
                            rel="noopener noreferrer">
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

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {billings?.map((billing) => (
          <Card key={billing.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{billing.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(billing.created_at)}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">メニューを開く</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a
                        href={billing.hosted_invoice_url}
                        target="_blank"
                        rel="noopener noreferrer">
                        請求書を表示
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a
                        href={billing.invoice_pdf}
                        target="_blank"
                        rel="noopener noreferrer">
                        PDFをダウンロード
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">期間</p>
                  <p>{billing.month || "-"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">金額</p>
                  <p className="font-medium">{formatAmount(billing.amount)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      billing.status === "PAID"
                        ? "bg-green-100 text-green-800"
                        : billing.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}>
                    {billing.status === "PAID" ? "支払済" : "未払い"}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href={billing.hosted_invoice_url}
                    target="_blank"
                    rel="noopener noreferrer">
                    請求書を表示
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href={billing.invoice_pdf}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    PDFをダウンロード
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
