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

export default function CompaniesList() {
  const companies = [
    {
      id: 1,
      name: "株式会社フードサービス",
      email: "info@foodservice.example.com",
      storeCount: 5,
      jobCount: 12,
      status: "承認済み",
      registeredDate: "2023/10/15",
      paymentStatus: "正常",
    },
    {
      id: 2,
      name: "レストラングループ株式会社",
      email: "contact@restaurant-group.example.com",
      storeCount: 8,
      jobCount: 15,
      status: "承認済み",
      registeredDate: "2023/11/20",
      paymentStatus: "正常",
    },
    {
      id: 3,
      name: "株式会社キッチンワークス",
      email: "info@kitchenworks.example.com",
      storeCount: 3,
      jobCount: 7,
      status: "承認済み",
      registeredDate: "2023/12/05",
      paymentStatus: "遅延",
    },
    {
      id: 4,
      name: "グルメフード株式会社",
      email: "support@gourmefood.example.com",
      storeCount: 0,
      jobCount: 0,
      status: "未承認",
      registeredDate: "2024/03/28",
      paymentStatus: "未設定",
    },
    {
      id: 5,
      name: "株式会社ダイニングプラス",
      email: "info@diningplus.example.com",
      storeCount: 2,
      jobCount: 0,
      status: "停止中",
      registeredDate: "2023/09/10",
      paymentStatus: "未払い",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">会社一覧</h2>
          <p className="text-muted-foreground">登録されている会社の一覧です</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="会社を検索..."
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
                <TableHead>会社名</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>店舗数</TableHead>
                <TableHead>求人数</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>支払い状況</TableHead>
                <TableHead>登録日</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      {company.name}
                    </div>
                  </TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>{company.storeCount}</TableCell>
                  <TableCell>{company.jobCount}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        company.status === "承認済み"
                          ? "bg-green-100 text-green-800"
                          : company.status === "未承認"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {company.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        company.paymentStatus === "正常"
                          ? "bg-green-100 text-green-800"
                          : company.paymentStatus === "未設定"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {company.paymentStatus}
                    </div>
                  </TableCell>
                  <TableCell>{company.registeredDate}</TableCell>
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
                            href={`/operator/companies/${company.id}`}
                            className="w-full">
                            詳細を表示
                          </Link>
                        </DropdownMenuItem>
                        {company.status === "未承認" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}>
                                会社を承認
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>会社承認の確認</DialogTitle>
                                <DialogDescription>
                                  {company.name}
                                  を承認しますか？承認すると、会社はプラットフォームで店舗と求人を登録できるようになります。
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">キャンセル</Button>
                                <Button>承認する</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        {company.status === "承認済み" ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-600">
                                会社を停止
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>会社停止の確認</DialogTitle>
                                <DialogDescription>
                                  {company.name}
                                  を停止しますか？停止中は全ての店舗と求人が非表示になり、新しい求人を掲載できなくなります。
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">キャンセル</Button>
                                <Button variant="destructive">停止する</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          company.status === "停止中" && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}>
                                  会社を再開
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>会社再開の確認</DialogTitle>
                                  <DialogDescription>
                                    {company.name}
                                    を再開しますか？再開すると、会社は再びプラットフォームで活動できるようになります。
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">キャンセル</Button>
                                  <Button>再開する</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )
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
        {companies.map((company) => (
          <Card key={company.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {company.email}
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
                        href={`/operator/companies/${company.id}`}
                        className="w-full">
                        詳細を表示
                      </Link>
                    </DropdownMenuItem>
                    {company.status === "未承認" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}>
                            会社を承認
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>会社承認の確認</DialogTitle>
                            <DialogDescription>
                              {company.name}
                              を承認しますか？承認すると、会社はプラットフォームで店舗と求人を登録できるようになります。
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">キャンセル</Button>
                            <Button>承認する</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    {company.status === "承認済み" ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-red-600">
                            会社を停止
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>会社停止の確認</DialogTitle>
                            <DialogDescription>
                              {company.name}
                              を停止しますか？停止中は全ての店舗と求人が非表示になり、新しい求人を掲載できなくなります。
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">キャンセル</Button>
                            <Button variant="destructive">停止する</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      company.status === "停止中" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}>
                              会社を再開
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>会社再開の確認</DialogTitle>
                              <DialogDescription>
                                {company.name}
                                を再開しますか？再開すると、会社は再びプラットフォームで活動できるようになります。
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">キャンセル</Button>
                              <Button>再開する</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">店舗数</p>
                  <p>{company.storeCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">求人数</p>
                  <p>{company.jobCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      company.status === "承認済み"
                        ? "bg-green-100 text-green-800"
                        : company.status === "未承認"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {company.status}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">支払い状況</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      company.paymentStatus === "正常"
                        ? "bg-green-100 text-green-800"
                        : company.paymentStatus === "未設定"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {company.paymentStatus}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link href={`/operator/companies/${company.id}`}>
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
