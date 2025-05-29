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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { operatorApi } from "@/lib/api/operator";
import useSWR from "swr";

interface Billing {
  id: string;
  created_at: number;
  companies_id: string;
  month: string;
  amount: number;
  invoice_id: string;
  status: string;
  fee_rate: number;
  session_count: number;
  start_date?: string;
  end_date?: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  invoice_number: string;
  companies?: {
    name: string;
  };
}

export default function BillingList() {
  const { data: billings, isLoading } = useSWR<Billing[]>(
    "/api/operator/billings",
    operatorApi.getAllBilling
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!billings) {
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

      {/* Desktop View */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>請求番号</TableHead>
                <TableHead>会社ID</TableHead>
                <TableHead>発行日</TableHead>
                <TableHead>期間</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>セッション数</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billings.map((billing) => (
                <TableRow key={billing.id}>
                  <TableCell className="font-medium">
                    {billing.invoice_number}
                  </TableCell>
                  <TableCell>{billing.companies?.name || "---"}</TableCell>
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
                          : "bg-red-100 text-red-800"
                      }`}>
                      {billing.status}
                    </div>
                  </TableCell>
                  <TableCell>{billing.session_count}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">メニューを開く</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <a
                            href={billing.hosted_invoice_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full">
                            請求書を表示
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {billings.map((billing) => (
          <Card key={billing.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{billing.invoice_number}</p>
                  <p className="text-sm text-muted-foreground">
                    {billing.companies_id}
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
                    <DropdownMenuItem>
                      <a
                        href={billing.hosted_invoice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full">
                        請求書を表示
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">発行日</p>
                  <p>{new Date(billing.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">期間</p>
                  <p>{billing.month}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">金額</p>
                  <p className="font-medium">
                    ¥{billing.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      billing.status === "PAID"
                        ? "bg-green-100 text-green-800"
                        : billing.status === "PENDING"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {billing.status}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
