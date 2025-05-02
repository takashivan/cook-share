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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OperatorDashboard() {
  const chartData = [
    { name: "1月", value: 120 },
    { name: "2月", value: 150 },
    { name: "3月", value: 180 },
    { name: "4月", value: 200 },
    { name: "5月", value: 250 },
    { name: "6月", value: 300 },
  ];

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
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上</CardTitle>
            <DollarSign className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">¥4,550,000</div>
            <p className="text-xs text-muted-foreground">先月比 +12.5%</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">登録会社数</CardTitle>
            <Building className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">先月比 +3社</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">登録シェフ数</CardTitle>
            <User className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">358</div>
            <p className="text-xs text-muted-foreground">先月比 +24人</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
            <FileText className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">先月比 +15件</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gray-500" />
              注意が必要な項目
            </CardTitle>
            <CardDescription>対応が必要な項目</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-gray-500" />
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
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-gray-500" />
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
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-gray-500" />
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

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-500" />
              プラットフォーム統計
            </CardTitle>
            <CardDescription>過去30日間の統計</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">新規シェフ登録</h3>
                  <p className="text-sm">
                    24人{" "}
                    <span className="text-muted-foreground text-xs">+15%</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">求人応募数</h3>
                  <p className="text-sm">
                    156件{" "}
                    <span className="text-muted-foreground text-xs">+22%</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">月間売上</h3>
                  <p className="text-sm">
                    ¥1,250,000{" "}
                    <span className="text-muted-foreground text-xs">+8%</span>
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
