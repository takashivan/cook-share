import { Download, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function StaffList() {
  const staff = [
    {
      id: 1,
      name: "山田 太郎",
      email: "yamada@example.com",
      role: "管理者",
      department: "経営企画部",
      status: "アクティブ",
    },
    {
      id: 2,
      name: "佐藤 花子",
      email: "sato@example.com",
      role: "一般ユーザー",
      department: "人事部",
      status: "アクティブ",
    },
    {
      id: 3,
      name: "鈴木 一郎",
      email: "suzuki@example.com",
      role: "一般ユーザー",
      department: "マーケティング部",
      status: "アクティブ",
    },
    {
      id: 4,
      name: "田中 次郎",
      email: "tanaka@example.com",
      role: "一般ユーザー",
      department: "営業部",
      status: "休止中",
    },
    {
      id: 5,
      name: "高橋 三郎",
      email: "takahashi@example.com",
      role: "一般ユーザー",
      department: "IT部",
      status: "アクティブ",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">スタッフ一覧</h2>
          <p className="text-muted-foreground">会社に登録されているスタッフの一覧です</p>
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
          <Input type="search" placeholder="スタッフを検索..." className="w-full pl-8" />
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
                <TableHead>部署</TableHead>
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
                          src={`/placeholder.svg?height=32&width=32&text=${person.name.charAt(0)}`}
                          alt={person.name}
                        />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {person.name}
                    </div>
                  </TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.role}</TableCell>
                  <TableCell>{person.department}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        person.status === "アクティブ" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
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
                        <DropdownMenuItem>詳細を表示</DropdownMenuItem>
                        <DropdownMenuItem>編集</DropdownMenuItem>
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
        {staff.map((person) => (
          <Card key={person.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&text=${person.name.charAt(0)}`}
                      alt={person.name}
                    />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-muted-foreground">{person.email}</p>
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
                    <DropdownMenuItem>詳細を表示</DropdownMenuItem>
                    <DropdownMenuItem>編集</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">役割</p>
                  <p>{person.role}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">部署</p>
                  <p>{person.department}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      person.status === "アクティブ" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {person.status}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

