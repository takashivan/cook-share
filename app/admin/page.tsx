import Link from "next/link";
import {
  Building,
  CreditCard,
  DollarSign,
  MessageSquare,
  Store,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ダッシュボード</h2>
          <p className="text-muted-foreground">管理画面へようこそ</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">先月比 +8件</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>会社管理</CardTitle>
            <CardDescription>会社情報とスタッフの管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                <Building className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">会社情報</h3>
                <p className="text-sm text-muted-foreground">
                  会社の基本情報を管理します
                </p>
              </div>
            </div>
            <Link href="/admin/company">
              <Button variant="outline" className="w-full">
                会社情報を管理
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>店舗管理</CardTitle>
            <CardDescription>店舗情報の管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                <Store className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">店舗一覧</h3>
                <p className="text-sm text-muted-foreground">
                  登録されている店舗を管理します
                </p>
              </div>
            </div>
            <Link href="/admin/stores">
              <Button variant="outline" className="w-full">
                店舗一覧を表示
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>求人管理</CardTitle>
            <CardDescription>求人情報と応募者の管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">求人一覧</h3>
                <p className="text-sm text-muted-foreground">
                  掲載中の求人を管理します
                </p>
              </div>
            </div>
            <Link href="/admin/jobs">
              <Button variant="outline" className="w-full">
                求人一覧を表示
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>請求管理</CardTitle>
            <CardDescription>請求情報の管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">請求一覧</h3>
                <p className="text-sm text-muted-foreground">
                  請求履歴を確認します
                </p>
              </div>
            </div>
            <Link href="/admin/company/billing">
              <Button variant="outline" className="w-full">
                請求一覧を表示
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
