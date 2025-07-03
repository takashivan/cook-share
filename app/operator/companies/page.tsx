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
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { useEffect } from "react";
import { fetchCompanies } from "@/lib/redux/slices/operatorSlice";

export default function CompaniesList() {
  const dispatch = useDispatch<AppDispatch>();
  const companies = useSelector((state: RootState) => state.operator.companies.data);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

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
                <TableHead>ID</TableHead>
                <TableHead>会社名</TableHead>
                <TableHead>店舗数</TableHead>
                <TableHead>求人数</TableHead>
                <TableHead>マッチング数</TableHead>
                <TableHead>企業キャンセル数</TableHead>
                <TableHead>企業キャンセル率</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.id}</TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
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
                        {/* {company.status === "未承認" && (
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
                        )} */}
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
                    <p className="font-medium">{company.id}</p>
                    <p className="font-medium">{company.name}</p>
                    {/* <p className="text-sm text-muted-foreground">
                      {company.email}
                    </p> */}
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
                    {/* {company.status === "未承認" && (
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
                    )} */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">店舗数</p>
                  <p>{company.restaurantCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">求人数</p>
                  <p>{company.jobCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">マッチング数</p>
                  <p>{company.worksessionCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">企業キャンセル数</p>
                  <p>{company.worksessionCanceledByRestaurantCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">企業キャンセル率</p>
                  <p>
                    {company.worksessionCanceledByRestaurantCount > 0
                      ? `${(
                          (company.worksessionCanceledByRestaurantCount /
                            company.worksessionCount) *
                          100
                        ).toFixed(2)}%`
                      : "0%"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">ステータス</p>
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
