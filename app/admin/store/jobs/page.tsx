import Link from "next/link"
import {
  Bell,
  Calendar,
  Download,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function JobsList() {
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
    {
      id: 4,
      title: "【GW限定】繁忙期の臨時スタッフ募集",
      date: "2024/04/29",
      time: "10:00〜22:00",
      status: "下書き",
      applicants: 0,
      newMessages: 0,
    },
    {
      id: 5,
      title: "【夏季限定】テラス席担当スタッフ",
      date: "2024/07/01",
      time: "17:00〜22:00",
      status: "終了",
      applicants: 8,
      newMessages: 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">求人一覧</h2>
          <p className="text-muted-foreground">店舗に掲載されているスポット求人の一覧です</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            求人を追加
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="求人を検索..." className="w-full pl-8" />
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
                        <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                          <Bell className="h-3 w-3 mr-1" />
                          新着 {job.newMessages}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {job.date}
                    </div>
                  </TableCell>
                  <TableCell>{job.time}</TableCell>
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {job.applicants}
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
                          <Link href="/admin/job" className="w-full">
                            応募者一覧を表示
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>編集</DropdownMenuItem>
                        <DropdownMenuItem>複製</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
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
                      <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                        <Bell className="h-3 w-3 mr-1" />
                        新着 {job.newMessages}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    {job.date} {job.time}
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
                      <Link href="/admin/job" className="w-full">
                        応募者一覧を表示
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>編集</DropdownMenuItem>
                    <DropdownMenuItem>複製</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
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
                    }`}
                  >
                    {job.status}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">応募者</p>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    {job.applicants}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link href="/admin/job">
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    応募者とのチャットを表示
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

