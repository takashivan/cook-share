import { CreditCard, Download, MoreHorizontal, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"

export default function BillingList() {
  const billings = [
    {
      id: "INV-2024-001",
      date: "2024/03/01",
      amount: "¥45,000",
      status: "支払済",
      paymentMethod: "クレジットカード",
      period: "2024年3月分",
    },
    {
      id: "INV-2024-002",
      date: "2024/02/01",
      amount: "¥42,500",
      status: "支払済",
      paymentMethod: "クレジットカード",
      period: "2024年2月分",
    },
    {
      id: "INV-2024-003",
      date: "2024/01/01",
      amount: "¥42,500",
      status: "支払済",
      paymentMethod: "銀行振込",
      period: "2024年1月分",
    },
    {
      id: "INV-2023-012",
      date: "2023/12/01",
      amount: "¥40,000",
      status: "支払済",
      paymentMethod: "クレジットカード",
      period: "2023年12月分",
    },
    {
      id: "INV-2023-011",
      date: "2023/11/01",
      amount: "¥40,000",
      status: "支払済",
      paymentMethod: "クレジットカード",
      period: "2023年11月分",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">請求一覧</h2>
          <p className="text-muted-foreground">会社の請求履歴一覧です</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            支払い方法を変更
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="請求を検索..." className="w-full pl-8" />
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
                <TableHead>日付</TableHead>
                <TableHead>期間</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>支払い方法</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billings.map((billing) => (
                <TableRow key={billing.id}>
                  <TableCell className="font-medium">{billing.id}</TableCell>
                  <TableCell>{billing.date}</TableCell>
                  <TableCell>{billing.period}</TableCell>
                  <TableCell>{billing.amount}</TableCell>
                  <TableCell>{billing.paymentMethod}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        billing.status === "支払済"
                          ? "bg-green-100 text-green-800"
                          : billing.status === "未払い"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {billing.status}
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
                        <DropdownMenuItem>領収書をダウンロード</DropdownMenuItem>
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
                  <p className="text-sm text-muted-foreground">{billing.date}</p>
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
                    <DropdownMenuItem>領収書をダウンロード</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">期間</p>
                  <p>{billing.period}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">金額</p>
                  <p className="font-medium">{billing.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">支払い方法</p>
                  <p>{billing.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      billing.status === "支払済"
                        ? "bg-green-100 text-green-800"
                        : billing.status === "未払い"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {billing.status}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  領収書をダウンロード
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

