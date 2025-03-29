import Link from "next/link"
import {
  Building,
  CreditCard,
  DollarSign,
  Edit,
  ExternalLink,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Store,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CompanyDashboard() {
  const stores = [
    {
      id: 1,
      name: "洋食 黒船亭 上野店",
      address: "東京都台東区上野",
      type: "洋食",
      status: "営業中",
      jobCount: 5,
      staffCount: 8,
    },
    {
      id: 2,
      name: "和食 さくら 新宿店",
      address: "東京都新宿区新宿",
      type: "和食",
      status: "営業中",
      jobCount: 3,
      staffCount: 6,
    },
    {
      id: 3,
      name: "イタリアン ベラ 渋谷店",
      address: "東京都渋谷区渋谷",
      type: "イタリアン",
      status: "営業中",
      jobCount: 4,
      staffCount: 7,
    },
  ]

  const recentJobs = [
    {
      id: 1,
      title: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
      store: "洋食 黒船亭 上野店",
      date: "2024/04/01",
      applicants: 5,
      status: "公開中",
    },
    {
      id: 2,
      title: "【週末限定】ランチタイムのホールスタッフ募集",
      store: "和食 さくら 新宿店",
      date: "2024/04/02",
      applicants: 3,
      status: "公開中",
    },
    {
      id: 3,
      title: "【経験者優遇】ディナータイムの調理補助スタッフ",
      store: "イタリアン ベラ 渋谷店",
      date: "2024/04/03",
      applicants: 2,
      status: "公開中",
    },
  ]

  const recentStaff = [
    {
      id: 1,
      name: "山田 太郎",
      email: "yamada@example.com",
      role: "管理者",
      department: "経営企画部",
    },
    {
      id: 2,
      name: "佐藤 花子",
      email: "sato@example.com",
      role: "一般ユーザー",
      department: "人事部",
    },
    {
      id: 3,
      name: "鈴木 一郎",
      email: "suzuki@example.com",
      role: "一般ユーザー",
      department: "マーケティング部",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">会社ダッシュボード</h2>
          <p className="text-muted-foreground">株式会社サンプルの管理画面へようこそ</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Building className="mr-2 h-4 w-4" />
            会社情報を編集
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥450,000</div>
            <p className="text-xs text-muted-foreground">先月比 +20.1%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">店舗数</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">先月比 +2店舗</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">スタッフ数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">先月比 +3人</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">先月比 +8件</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stores" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stores">店舗一覧</TabsTrigger>
          <TabsTrigger value="jobs">求人一覧</TabsTrigger>
          <TabsTrigger value="staff">スタッフ一覧</TabsTrigger>
        </TabsList>

        <TabsContent value="stores" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">登録店舗</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              店舗を追加
            </Button>
          </div>

          {/* Desktop View */}
          <Card className="hidden md:block">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>店舗名</TableHead>
                    <TableHead>住所</TableHead>
                    <TableHead>ジャンル</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>求人数</TableHead>
                    <TableHead>スタッフ数</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stores.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                            <Store className="h-4 w-4 text-gray-500" />
                          </div>
                          {store.name}
                        </div>
                      </TableCell>
                      <TableCell>{store.address}</TableCell>
                      <TableCell>{store.type}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            store.status === "営業中" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {store.status}
                        </div>
                      </TableCell>
                      <TableCell>{store.jobCount}</TableCell>
                      <TableCell>{store.staffCount}</TableCell>
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
                              <Link href={`/admin/company/stores`} className="w-full flex items-center">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                詳細を表示
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
            {stores.map((store) => (
              <Card key={store.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <Store className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{store.name}</p>
                        <p className="text-sm text-muted-foreground">{store.address}</p>
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
                          <Link href={`/admin/company/stores`} className="w-full flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            詳細を表示
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
                      <p className="text-muted-foreground">ジャンル</p>
                      <p>{store.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ステータス</p>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          store.status === "営業中" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {store.status}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">求人数</p>
                      <p>{store.jobCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">スタッフ数</p>
                      <p>{store.staffCount}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link href={`/admin/company/stores`}>
                      <Button variant="outline" size="sm" className="w-full">
                        詳細を表示
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/admin/company/stores">
              <Button variant="outline">すべての店舗を表示</Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">最近の求人</h3>
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
                    <TableHead>店舗</TableHead>
                    <TableHead>日付</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>応募者数</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.store}</TableCell>
                      <TableCell>{job.date}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            job.status === "公開中"
                              ? "bg-green-100 text-green-800"
                              : job.status === "下書き"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
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
                              <Link href={`/admin/job`} className="w-full flex items-center">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                詳細を表示
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
            {recentJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.store}</p>
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
                          <Link href={`/admin/job`} className="w-full flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            詳細を表示
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
                      <p className="text-muted-foreground">日付</p>
                      <p>{job.date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ステータス</p>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          job.status === "公開中"
                            ? "bg-green-100 text-green-800"
                            : job.status === "下書き"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {job.status}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">応募者数</p>
                      <p>{job.applicants}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link href={`/admin/job`}>
                      <Button variant="outline" size="sm" className="w-full">
                        詳細を表示
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/admin/store/jobs">
              <Button variant="outline">すべての求人を表示</Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">最近のスタッフ</h3>
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
                    <TableHead>メールアドレス</TableHead>
                    <TableHead>役割</TableHead>
                    <TableHead>部署</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-sm font-medium">{staff.name.charAt(0)}</span>
                          </div>
                          {staff.name}
                        </div>
                      </TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.department}</TableCell>
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
                              <Link href={`/admin/company/staff`} className="w-full flex items-center">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                詳細を表示
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
            {recentStaff.map((staff) => (
              <Card key={staff.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium">{staff.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-muted-foreground">{staff.email}</p>
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
                          <Link href={`/admin/company/staff`} className="w-full flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            詳細を表示
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
                      <p className="text-muted-foreground">役割</p>
                      <p>{staff.role}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">部署</p>
                      <p>{staff.department}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link href={`/admin/company/staff`}>
                      <Button variant="outline" size="sm" className="w-full">
                        詳細を表示
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/admin/company/staff">
              <Button variant="outline">すべてのスタッフを表示</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近の請求</CardTitle>
            <CardDescription>最近の請求情報</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">請求 #{202400 + i}</p>
                    <p className="text-sm text-muted-foreground">
                      ¥{45000 + i * 5000} - 2024/0{i}/01
                    </p>
                  </div>
                  <div className="rounded-full px-2 py-1 text-xs bg-green-100 text-green-800">支払済</div>
                </div>
              ))}
              <div className="mt-4">
                <Link href="/admin/company/billing">
                  <Button variant="outline" className="w-full">
                    すべての請求を表示
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最近のアクティビティ</CardTitle>
            <CardDescription>システム上の最近のアクティビティ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "求人を追加しました",
                  target: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
                  user: "山田 太郎",
                  time: "1時間前",
                },
                {
                  action: "応募者とチャットしました",
                  target: "佐藤 健太",
                  user: "佐藤 花子",
                  time: "3時間前",
                },
                {
                  action: "店舗情報を更新しました",
                  target: "洋食 黒船亭 上野店",
                  user: "鈴木 一郎",
                  time: "昨日",
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium">{activity.user.charAt(0)}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.target}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} - {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

