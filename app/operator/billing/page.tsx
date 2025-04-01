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

export default function BillingList() {
  const billings = [
    {
      id: "INV-2024-001",
      company: "株式会社フードサービス",
      date: "2024/03/01",
      dueDate: "2024/03/15",
      amount: "¥45,000",
      status: "支払済",
      paymentMethod: "クレジットカード",
      period: "2024年3月分",
    },
    {
      id: "INV-2024-002",
      company: "レストラングループ株式会社",
      date: "2024/03/01",
      dueDate: "2024/03/15",
      amount: "¥38,500",
      status: "支払済",
      paymentMethod: "銀行振込",
      period: "2024年3月分",
    },
    {
      id: "INV-2024-003",
      company: "株式会社キッチンワークス",
      date: "2024/03/01",
      dueDate: "2024/03/15",
      amount: "¥22,000",
      status: "未払い",
      paymentMethod: "クレジットカード",
      period: "2024年3月分",
    },
    {
      id: "INV-2024-004",
      company: "株式会社ダイニングプラス",
      date: "2024/03/01",
      dueDate: "2024/03/15",
      amount: "¥15,000",
      status: "期限切れ",
      paymentMethod: "銀行振込",
      period: "2024年3月分",
    },
    {
      id: "INV-2024-005",
      company: "グルメフード株式会社",
      date: "2024/03/01",
      dueDate: "2024/03/15",
      amount: "¥10,000",
      status: "支払済",
      paymentMethod: "クレジットカード",
      period: "2024年3月分",
    },
  ];

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
                <TableHead>会社名</TableHead>
                <TableHead>発行日</TableHead>
                <TableHead>支払期限</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>支払い方法</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billings.map((billing) => (
                <TableRow key={billing.id}>
                  <TableCell className="font-medium">{billing.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      {billing.company}
                    </div>
                  </TableCell>
                  <TableCell>{billing.date}</TableCell>
                  <TableCell>{billing.dueDate}</TableCell>
                  <TableCell>{billing.amount}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        billing.status === "支払済"
                          ? "bg-green-100 text-green-800"
                          : billing.status === "未払い"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {billing.status}
                    </div>
                  </TableCell>
                  <TableCell>{billing.paymentMethod}</TableCell>
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
                          <Link
                            href={`/operator/billing/${billing.id}`}
                            className="w-full">
                            詳細を表示
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          請求書をダウンロード
                        </DropdownMenuItem>
                        {billing.status !== "支払済" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}>
                                支払い状態を更新
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>支払い状態の更新</DialogTitle>
                                <DialogDescription>
                                  {billing.company}の請求 {billing.id}{" "}
                                  の支払い状態を更新します。
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4 space-y-4">
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" className="w-full">
                                    未払い
                                  </Button>
                                  <Button variant="outline" className="w-full">
                                    支払い中
                                  </Button>
                                  <Button className="w-full">支払済</Button>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">キャンセル</Button>
                                <Button>更新する</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        {billing.status === "期限切れ" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}>
                                リマインダーを送信
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  支払いリマインダーの送信
                                </DialogTitle>
                                <DialogDescription>
                                  {billing.company}
                                  に支払いリマインダーを送信します。
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">キャンセル</Button>
                                <Button>送信する</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
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
                  <p className="font-medium">{billing.id}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                      <Building className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {billing.company}
                    </p>
                  </div>
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
                      <Link
                        href={`/operator/billing/${billing.id}`}
                        className="w-full">
                        詳細を表示
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>請求書をダウンロード</DropdownMenuItem>
                    {billing.status !== "支払済" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}>
                            支払い状態を更新
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>支払い状態の更新</DialogTitle>
                            <DialogDescription>
                              {billing.company}の請求 {billing.id}{" "}
                              の支払い状態を更新します。
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" className="w-full">
                                未払い
                              </Button>
                              <Button variant="outline" className="w-full">
                                支払い中
                              </Button>
                              <Button className="w-full">支払済</Button>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">キャンセル</Button>
                            <Button>更新する</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">発行日</p>
                  <p>{billing.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">支払期限</p>
                  <p>{billing.dueDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">金額</p>
                  <p className="font-medium">{billing.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      billing.status === "支払済"
                        ? "bg-green-100 text-green-800"
                        : billing.status === "未払い"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {billing.status}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link href={`/operator/billing/${billing.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    詳細を表示
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
