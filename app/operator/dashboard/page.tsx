"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchDashboardQuery } from "@/lib/redux/slices/operatorSlice";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  UserCheck,
  UserCog,
  UserRound,
  Wallet,
  PiggyBank,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function OperatorDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: dashboardData,
    loading,
    error,
  } = useSelector((state: RootState) => state.operator.dashboardQuery);

  useEffect(() => {
    dispatch(fetchDashboardQuery());
  }, [dispatch]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="p-4">No data available</div>;
  }

  const fillRate = (dashboardData.filled_jobs / dashboardData.total_jobs) * 100;
  const verifiedRate =
    (dashboardData.verified_users_count / dashboardData.total_users_count) *
    100;
  const profileCompletedRate =
    (dashboardData.profile_completed_users_count /
      dashboardData.total_users_count) *
    100;
  const activeRate =
    (dashboardData.active_user_count / dashboardData.total_users_count) * 100;

  // ステータス間の遷移率を計算
  const verifiedToProfileRate =
    (dashboardData.profile_completed_users_count /
      dashboardData.verified_users_count) *
    100;
  const profileToActiveRate =
    (dashboardData.active_user_count /
      dashboardData.profile_completed_users_count) *
    100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            運営ダッシュボード
          </h2>
          <p className="text-muted-foreground">
            CHEFDOMプラットフォームの管理画面へようこそ
          </p>
        </div>
      </div>

      {/* ユーザーコンバージョンと主要指標 */}
      <div className="grid gap-4 md:grid-cols-10">
        {/* ユーザーコンバージョン - 2列分 */}
        <Card className="hover:shadow-lg transition-shadow md:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-500" />
              ユーザーコンバージョン
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <UserRound className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">登録ユーザー</p>
                  <p className="text-lg font-bold">
                    {dashboardData.total_users_count}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {dashboardData.new_chefs > 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    前日比 +{dashboardData.new_chefs}人
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <UserCheck className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">認証済み</p>
                  <p className="text-lg font-bold">
                    {dashboardData.verified_users_count}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {verifiedRate.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <UserCog className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">プロフィール完了</p>
                  <p className="text-lg font-bold">
                    {dashboardData.profile_completed_users_count}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {profileCompletedRate.toFixed(1)}% (認証済みから{" "}
                    {verifiedToProfileRate.toFixed(1)}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">アクティブユーザー</p>
                  <p className="text-lg font-bold">
                    {dashboardData.active_user_count}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activeRate.toFixed(1)}% (プロフィール完了から{" "}
                    {profileToActiveRate.toFixed(1)}%)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 主要指標 - 6カードを2x3グリッドで */}
        <div className="md:col-span-6 grid gap-4 grid-cols-2 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総売上</CardTitle>
              <PiggyBank className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">
                ¥{dashboardData.total_fee.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">手数料総額</CardTitle>
              <Wallet className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">
                ¥{(dashboardData.total_fee * 0.3).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">登録店舗数</CardTitle>
              <Building className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">
                {dashboardData.total_restaurants}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {dashboardData.new_restaurants > 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                前日比 +{dashboardData.new_restaurants}社
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
              <FileText className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">
                {dashboardData.total_jobs}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {dashboardData.new_jobs > 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                前日比 +{dashboardData.new_jobs}件
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 求人成約率 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-gray-500" />
              求人成約率
            </CardTitle>
            <CardDescription>求人の成約状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">成約率</p>
                  <p className="text-3xl font-bold">{fillRate.toFixed(1)}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">成約済み</p>
                  <p className="text-2xl font-bold">
                    {dashboardData.filled_jobs}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    / {dashboardData.total_jobs}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${fillRate}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">成約済み</p>
                  <p className="text-2xl font-bold">
                    {dashboardData.filled_jobs}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">未成約</p>
                  <p className="text-2xl font-bold">
                    {dashboardData.total_jobs - dashboardData.filled_jobs}
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
