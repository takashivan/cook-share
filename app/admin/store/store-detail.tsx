import Link from "next/link";
import {
  BarChart3,
  Calendar,
  Edit,
  ExternalLink,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function StoreDetail() {
  // 店舗情報（実際のアプリではAPIから取得）
  const store = {
    id: "1",
    name: "洋食 黒船亭 上野店",
    address: "東京都台東区上野",
    type: "洋食",
    status: "営業中",
    phone: "03-1234-5678",
    email: "info@kurofune.example.com",
    manager: "田中 次郎",
    openingHours: "11:00〜22:00（L.O. 21:30）",
    description:
      "明治創業の老舗洋食店。デミグラスソースは自家製で、昔ながらに愛されてきた洋食を提供しています。",
  };

  const jobs = [
    {
      id: 1,
      title: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
      date: "2024/04/01",
      time: "09:00〜22:00",
      status: "公開中",
      applicants: 5,
      newMessages: 2,
    },
    {
      id: 2,
      title: "【週末限定】ランチタイムのホールスタッフ募集",
      date: "2024/04/02",
      time: "11:00〜15:00",
      status: "公開中",
      applicants: 3,
      newMessages: 0,
    },
    {
      id: 3,
      title: "【経験者優遇】ディナータイムの調理補助スタッフ",
      date: "2024/04/03",
      time: "17:00〜22:00",
      status: "公開中",
      applicants: 2,
      newMessages: 1,
    },
  ];

  const staff = [
    {
      id: 1,
      name: "山田 太郎",
      role: "調理スタッフ",
      status: "アクティブ",
      joinedDate: "2023/10/15",
    },
    {
      id: 2,
      name: "佐藤 花子",
      role: "ホールスタッフ",
      status: "アクティブ",
      joinedDate: "2023/11/01",
    },
    {
      id: 3,
      name: "鈴木 一郎",
      role: "調理補助",
      status: "アクティブ",
      joinedDate: "2024/01/10",
    },
    {
      id: 4,
      name: "高橋 由美",
      role: "ホールスタッフ",
      status: "休止中",
      joinedDate: "2023/08/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{store.name}</h2>
          <p className="text-muted-foreground">
            {store.address} - {store.type}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            店舗情報を編集
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日の予約</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">先週同日比 +3件</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.length}</div>
            <p className="text-xs text-muted-foreground">先月比 +2件</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">スタッフ数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
            <p className="text-xs text-muted-foreground">先月比 +1人</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">応募者数</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobs.reduce((total, job) => total + job.applicants, 0)}
            </div>
            <p className="text-xs text-muted-foreground">先月比 +5人</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>店舗情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  店舗名
                </h3>
                <p>{store.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  住所
                </h3>
                <p>{store.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  電話番号
                </h3>
                <p>{store.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  メールアドレス
                </h3>
                <p>{store.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  店舗責任者
                </h3>
                <p>{store.manager}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  営業時間
                </h3>
                <p>{store.openingHours}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  ジャンル
                </h3>
                <p>{store.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  ステータス
                </h3>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    store.status === "営業中"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {store.status}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              店舗説明
            </h3>
            <p>{store.description}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">求人一覧</TabsTrigger>
          <TabsTrigger value="staff">スタッフ一覧</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">掲載中の求人</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              求人を追加
            </Button>
          </div>

          {/* Desktop View */}
          <Card className="hidden md:block">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>求人タイトル</TableHead>
                    <TableHead>日付</TableHead>
                    <TableHead>時間</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>応募者</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {job.title}
                          {job.newMessages > 0 && (
                            <Badge
                              variant="secondary"
                              className="bg-red-100 text-red-800 hover:bg-red-100">
                              新着 {job.newMessages}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{job.date}</TableCell>
                      <TableCell>{job.time}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            job.status === "公開中"
                              ? "bg-green-100 text-green-800"
                              : job.status === "下書き"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {job.status}
                        </div>
                      </TableCell>
                      <TableCell>{job.applicants}</TableCell>
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
                                href={`/admin/job`}
                                className="w-full flex items-center">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                応募者一覧を表示
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              編集
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
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{job.title}</p>
                        {job.newMessages > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-800 hover:bg-red-100">
                            新着 {job.newMessages}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {job.date} {job.time}
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
                          <Link
                            href={`/admin/job`}
                            className="w-full flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            応募者一覧を表示
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          編集
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">ステータス</p>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          job.status === "公開中"
                            ? "bg-green-100 text-green-800"
                            : job.status === "下書き"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {job.status}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">応募者</p>
                      <p>{job.applicants}人</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link href={`/admin/job`}>
                      <Button variant="outline" size="sm" className="w-full">
                        応募者一覧を表示
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">スタッフ一覧</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              スタッフを追加
            </Button>
          </div>

          {/* Desktop View */}
          <Card className="hidden md:block">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名前</TableHead>
                    <TableHead>役割</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>入社日</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {person.name.charAt(0)}
                            </span>
                          </div>
                          {person.name}
                        </div>
                      </TableCell>
                      <TableCell>{person.role}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            person.status === "アクティブ"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {person.status}
                        </div>
                      </TableCell>
                      <TableCell>{person.joinedDate}</TableCell>
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
                              <Edit className="h-4 w-4 mr-2" />
                              編集
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
            {staff.map((person) => (
              <Card key={person.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {person.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {person.role}
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
                          <Edit className="h-4 w-4 mr-2" />
                          編集
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">ステータス</p>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          person.status === "アクティブ"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {person.status}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">入社日</p>
                      <p>{person.joinedDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
