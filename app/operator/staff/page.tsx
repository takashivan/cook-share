"use client";

import Link from "next/link";
import {
  Download,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Plus,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function StaffList() {
  const staff = [
    {
      id: 1,
      name: "管理者 太郎",
      email: "admin1@cookchef.jp",
      role: "システム管理者",
      lastLogin: "2024/03/31 10:30",
      status: "アクティブ",
    },
    {
      id: 2,
      name: "運営 花子",
      email: "operator1@cookchef.jp",
      role: "運営担当",
      lastLogin: "2024/03/30 15:45",
      status: "アクティブ",
    },
    {
      id: 3,
      name: "サポート 一郎",
      email: "support1@cookchef.jp",
      role: "カスタマーサポート",
      lastLogin: "2024/03/29 09:15",
      status: "アクティブ",
    },
    {
      id: 4,
      name: "経理 次郎",
      email: "finance1@cookchef.jp",
      role: "経理担当",
      lastLogin: "2024/03/28 14:20",
      status: "アクティブ",
    },
    {
      id: 5,
      name: "マーケ 三郎",
      email: "marketing1@cookchef.jp",
      role: "マーケティング担当",
      lastLogin: "2024/03/25 11:10",
      status: "停止中",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            運営スタッフ管理
          </h2>
          <p className="text-muted-foreground">運営スタッフの一覧と管理</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            スタッフを追加
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="スタッフを検索..."
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
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>役割</TableHead>
                <TableHead>最終ログイン</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32&text=${person.name.charAt(
                            0
                          )}`}
                          alt={person.name}
                        />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {person.name}
                    </div>
                  </TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {person.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{person.lastLogin}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        person.status === "アクティブ"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {person.status}
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
                            href={`/operator/staff/${person.id}`}
                            className="w-full">
                            詳細を表示
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>編集</DropdownMenuItem>
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}>
                              {person.status === "アクティブ"
                                ? "アカウントを停止"
                                : "アカウントを有効化"}
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {person.status === "アクティブ"
                                  ? "アカウント停止の確認"
                                  : "アカウント有効化の確認"}
                              </DialogTitle>
                              <DialogDescription>
                                {person.status === "アクティブ"
                                  ? `${person.name}のアカウントを停止しますか？停止中は管理画面にログインできなくなります。`
                                  : `${person.name}のアカウントを有効化しますか？`}
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">キャンセル</Button>
                              <Button
                                variant={
                                  person.status === "アクティブ"
                                    ? "destructive"
                                    : "default"
                                }>
                                {person.status === "アクティブ"
                                  ? "停止する"
                                  : "有効化する"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
        {staff.map((person) => (
          <Card key={person.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&text=${person.name.charAt(
                        0
                      )}`}
                      alt={person.name}
                    />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {person.email}
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
                        href={`/operator/staff/${person.id}`}
                        className="w-full">
                        詳細を表示
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>編集</DropdownMenuItem>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          {person.status === "アクティブ"
                            ? "アカウントを停止"
                            : "アカウントを有効化"}
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {person.status === "アクティブ"
                              ? "アカウント停止の確認"
                              : "アカウント有効化の確認"}
                          </DialogTitle>
                          <DialogDescription>
                            {person.status === "アクティブ"
                              ? `${person.name}のアカウントを停止しますか？停止中は管理画面にログインできなくなります。`
                              : `${person.name}のアカウントを有効化しますか？`}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">キャンセル</Button>
                          <Button
                            variant={
                              person.status === "アクティブ"
                                ? "destructive"
                                : "default"
                            }>
                            {person.status === "アクティブ"
                              ? "停止する"
                              : "有効化する"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">役割</p>
                  <Badge variant="outline" className="font-normal mt-1">
                    {person.role}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">最終ログイン</p>
                  <p>{person.lastLogin}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      person.status === "アクティブ"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {person.status}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link href={`/operator/staff/${person.id}`}>
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
