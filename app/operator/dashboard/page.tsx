"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building,
  CreditCard,
  FileText,
  Store,
  User,
  Users,
  AlertTriangle,
  TrendingUp,
  Activity,
  DollarSign,
} from "lucide-react";

export default function OperatorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            運営ダッシュボード
          </h2>
          <p className="text-muted-foreground">
            CookChefプラットフォームの管理画面へようこそ
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥4,550,000</div>
            <p className="text-xs text-muted-foreground">先月比 +12.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">登録会社数</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">先月比 +3社</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">登録シェフ数</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">358</div>
            <p className="text-xs text-muted-foreground">先月比 +24人</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">先月比 +15件</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>会社管理</CardTitle>
            <CardDescription>登録会社の管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">会社一覧</h3>
                <p className="text-sm text-muted-foreground">
                  登録会社の一覧と管理
                </p>
              </div>
            </div>
            <Link href="/operator/companies">
              <Button variant="outline" className="w-full">
                会社一覧を表示
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>シェフ管理</CardTitle>
            <CardDescription>登録シェフの管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">シェフ一覧</h3>
                <p className="text-sm text-muted-foreground">
                  登録シェフの一覧と管理
                </p>
              </div>
            </div>
            <Link href="/operator/chefs">
              <Button variant="outline" className="w-full">
                シェフ一覧を表示
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>求人管理</CardTitle>
            <CardDescription>掲載求人の管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">求人一覧</h3>
                <p className="text-sm text-muted-foreground">
                  掲載中の求人を管理
                </p>
              </div>
            </div>
            <Link href="/operator/jobs">
              <Button variant="outline" className="w-full">
                求人一覧を表示
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>店舗管理</CardTitle>
            <CardDescription>登録店舗の管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">店舗一覧</h3>
                <p className="text-sm text-muted-foreground">
                  登録店舗の一覧と管理
                </p>
              </div>
            </div>
            <Link href="/operator/stores">
              <Button variant="outline" className="w-full">
                店舗一覧を表示
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
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">請求一覧</h3>
                <p className="text-sm text-muted-foreground">
                  請求情報の一覧と管理
                </p>
              </div>
            </div>
            <Link href="/operator/billing">
              <Button variant="outline" className="w-full">
                請求一覧を表示
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>運営スタッフ管理</CardTitle>
            <CardDescription>運営スタッフの管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">スタッフ一覧</h3>
                <p className="text-sm text-muted-foreground">
                  運営スタッフの一覧と管理
                </p>
              </div>
            </div>
            <Link href="/operator/staff">
              <Button variant="outline" className="w-full">
                スタッフ一覧を表示
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>注意が必要な項目</CardTitle>
            <CardDescription>対応が必要な項目</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">
                    未承認の会社が3社あります
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    2024/03/30に登録
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  確認
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">
                    報告された求人が2件あります
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    2024/03/31に報告
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  確認
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">
                    支払い期限切れの会社が1社あります
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    2024/03/25期限
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  確認
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>プラットフォーム統計</CardTitle>
            <CardDescription>過去30日間の統計</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">新規シェフ登録</h3>
                  <p className="text-sm">
                    24人 <span className="text-green-500 text-xs">+15%</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">求人応募数</h3>
                  <p className="text-sm">
                    156件 <span className="text-green-500 text-xs">+22%</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">月間売上</h3>
                  <p className="text-sm">
                    ¥1,250,000{" "}
                    <span className="text-green-500 text-xs">+8%</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
