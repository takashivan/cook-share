import Link from "next/link"
import { Download, MoreHorizontal, Plus, Search, SlidersHorizontal, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"

export default function StoresList() {
  const stores = [
    {
      id: 1,
      name: "洋食 黒船亭 上野店",
      address: "東京都台東区上野",
      type: "洋食",
      status: "営業中",
      jobCount: 5,
    },
    {
      id: 2,
      name: "和食 さくら 新宿店",
      address: "東京都新宿区新宿",
      type: "和食",
      status: "営業中",
      jobCount: 3,
    },
    {
      id: 3,
      name: "イタリアン ベラ 渋谷店",
      address: "東京都渋谷区渋谷",
      type: "イタリアン",
      status: "営業中",
      jobCount: 4,
    },
    {
      id: 4,
      name: "中華料理 龍門 池袋店",
      address: "東京都豊島区池袋",
      type: "中華",
      status: "一時休業",
      jobCount: 0,
    },
    {
      id: 5,
      name: "カフェ モーニング 銀座店",
      address: "東京都中央区銀座",
      type: "カフェ",
      status: "営業中",
      jobCount: 2,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">店舗一覧</h2>
          <p className="text-muted-foreground">登録されている店舗の一覧です</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            店舗を追加
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="店舗を検索..." className="w-full pl-8" />
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
                <TableHead>店舗名</TableHead>
                <TableHead>住所</TableHead>
                <TableHead>ジャンル</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>求人数</TableHead>
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
                          <Link href={`/admin/stores/${store.id}`} className="w-full">
                            詳細を表示
                          </Link>
                        </DropdownMenuItem>
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
                      <Link href={`/admin/stores/${store.id}`} className="w-full">
                        詳細を表示
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>編集</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">ジャンル</p>
                  <p>{store.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">求人数</p>
                  <p>{store.jobCount}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      store.status === "営業中" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {store.status}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link href={`/admin/stores/${store.id}`}>
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
  )
}

