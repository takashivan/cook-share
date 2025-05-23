"use client";

import React from "react";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
  Star,
  Store,
  Users,
  AlertCircle,
  CheckSquare,
  XCircle,
  PieChart,
  FileText,
  ClipboardCheck,
  X,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useGetDashboardList } from "@/hooks/api/companyuser/dashboard/userGetDashboardList";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { CheckInQRModal } from "@/components/modals/CheckInQRModal";
import { DashboardListData } from "@/api/__generated__/base/data-contracts";
import { RestaurantReviewModal } from "@/components/modals/RestaurantReviewModal";
import { RestaurantReviewCompleteModal } from "@/components/modals/RestaurantReviewCompleteModal";
import { useGetCompany } from "@/hooks/api/companyuser/companies/useGetCompany";

interface DisplayWorksession {
  id: string;
  name: string;
  store: string;
  time: string;
  status: "IN_PROGRESS" | "COMPLETED" | "SCHEDULED";
  reportSubmitted?: boolean;
  reportTime?: string;
  reportDetails?: {
    startTime: string;
    endTime: string;
    tasks: string[];
    notes: string;
    images?: string[];
  };
  check_in_code?: number | null;
}

interface DisplayReview {
  id: number;
  name: string;
  store: string;
  time: string;
  rating: number;
  comment: string;
  reportTime: string;
}

export default function AdminDashboard() {
  const { user } = useCompanyAuth();

  const { data: company } = useGetCompany({ companyId: user?.companies_id ?? undefined });

  const { data: dashboardData, error: dashboardError } = useGetDashboardList({
    companyuserId: user?.id,
  });

  // 現在の日付
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy年M月d日（E）", {
    locale: ja,
  });

  // 求人関連のデータ
  const jobStats = {
    totalJobs: dashboardData?.job_all_publised ?? 0,
    matched: dashboardData?.job_filled ?? 0,
    unmatched: dashboardData?.job_now_published ?? 0,
    fillRate:
      dashboardData?.job_filled && dashboardData?.job_all_publised
        ? Math.round(
            (dashboardData.job_filled / dashboardData.job_all_publised) * 100
          )
        : 0,
    averageRating: dashboardData?.chef_review?.chef_review_rating ?? 0,
  };

  // 勤務者一覧データの変換
  const todayWorkers: DisplayWorksession[] = (
    dashboardData?.worksessions_today ?? []
  ).map((session) => ({
    id: session.id.toString(),
    name: session.user?.name ?? "未設定",
    store: session.restaurant?.name ?? "未設定",
    time:
      format(
        new Date(session?.job?.start_time ?? session.check_in_time),
        "HH:mm"
      ) +
      " ~ " +
      format(
        new Date(session?.job?.end_time ?? session.job?.end_time ?? ""),
        "HH:mm"
      ),
    status:
      session.status === "IN_PROGRESS"
        ? "IN_PROGRESS"
        : session.status === "COMPLETED"
        ? "COMPLETED"
        : "SCHEDULED",
    reportSubmitted: session.status === "COMPLETED",
    reportTime: session.job?.end_time
      ? format(new Date(session.job.end_time), "HH:mm")
      : undefined,
    reportDetails:
      session.status === "COMPLETED"
        ? {
            startTime: format(new Date(session.check_in_time), "HH:mm"),
            endTime: session.job?.end_time
              ? format(new Date(session.job.end_time), "HH:mm")
              : "未設定",
            tasks: [], // APIから取得できないため空配列
            notes: "", // APIから取得できないため空文字
            images: [], // APIから取得できないため空配列
          }
        : undefined,
    check_in_code: session.check_in_code,
  }));

  // 承認待ちのworksessionのリスト
  const pendingWorksessions = dashboardData?.to_be_verified_worksessions ?? [];
  
  // ソート関連の状態
  const [sortField, setSortField] = useState<string>("store");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // モーダル関連の状態
  const [selectedPendingWorksession, setSelectedPendingWorksession] = useState<DashboardListData['to_be_verified_worksessions'][number] | null>(
    null
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChefReviewModalOpen, setIsChefReviewModalOpen] = useState(false);
  const [selectedWorksession, setSelectedWorksession] =
    useState<DisplayWorksession | null>(null);
  const [isWorksessionModalOpen, setIsWorksessionModalOpen] = useState(false);
  const [isCheckInCodeModalOpen, setIsCheckInCodeModalOpen] = useState(false);
  const [selectedCheckInCode, setSelectedCheckInCode] = useState<string | null>(
    null
  );

  // レビュー詳細を表示
  const showPendingWorksessionDetails = (worksession: DashboardListData['to_be_verified_worksessions'][number]) => {
    setSelectedPendingWorksession(worksession);
    setIsReviewModalOpen(true);
  };

  // 勤務詳細を表示
  const showWorksessionDetails = (worksession: DisplayWorksession) => {
    setSelectedWorksession(worksession);
    setIsWorksessionModalOpen(true);
  };

  // チェックインコードを表示
  const showCheckInCode = (worksession: DisplayWorksession) => {
    setSelectedWorksession(worksession);
    setSelectedCheckInCode(worksession.check_in_code?.toString() ?? null);
    setIsCheckInCodeModalOpen(true);
  };

  // ソート関数
  const handleSort = (field: string) => {
    if (sortField === field) {
      // 同じフィールドをクリックした場合は方向を反転
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // 新しいフィールドをクリックした場合はそのフィールドで昇順ソート
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // ソートされた勤務者リスト
  const sortedWorkers = useMemo(() => {
    return [...todayWorkers].sort((a, b) => {
      let comparison = 0;

      if (sortField === "store") {
        comparison = a.store.localeCompare(b.store, "ja");
      } else if (sortField === "name") {
        comparison = a.name.localeCompare(b.name, "ja");
      } else if (sortField === "time") {
        // 時間の比較（簡易的な実装）
        comparison = a.time.localeCompare(b.time);
      } else if (sortField === "status") {
        // ステータスの比較（completed > checked-in > not-checked-in の順）
        const statusOrder = {
          completed: 0,
          "checked-in": 1,
          "not-checked-in": 2,
        };
        comparison =
          statusOrder[a.status as keyof typeof statusOrder] -
          statusOrder[b.status as keyof typeof statusOrder];
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [todayWorkers, sortField, sortDirection]);

  // 勤務者のステータス集計
  const totalWorkers = todayWorkers.length;
  const checkedInWorkers = todayWorkers.filter(
    (worker) => worker.status === "IN_PROGRESS"
  ).length;
  const completedWorkers = todayWorkers.filter(
    (worker) => worker.status === "COMPLETED"
  ).length;
  const notCheckedInWorkers = todayWorkers.filter(
    (worker) => worker.status === "SCHEDULED"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ダッシュボード</h2>
          <p className="text-muted-foreground">
            {company?.name || "読み込み中..."}の管理画面へようこそ
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-800">{formattedDate}</span>
        </div>
      </div>

      {/* 求人統計カード - モバイル対応 */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-white to-gray-50 col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobStats.totalJobs}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">マッチング済</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobStats.matched}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">未マッチング</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobStats.unmatched}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">求人充足率</CardTitle>
            <PieChart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{jobStats.fillRate}%</div>
              {/* <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5%
              </Badge> */}
            </div>
            <Progress value={jobStats.fillRate} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均評価</CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{Math.round(jobStats.averageRating * 10) / 10}</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(jobStats.averageRating)
                        ? "text-yellow-500 fill-yellow-500"
                        : i < jobStats.averageRating
                        ? "text-yellow-500 fill-yellow-500 opacity-50"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">シェフ満足度</p>
          </CardContent>
        </Card>
      </div>

      {/* PC表示では左右に並べる、モバイルでは縦に並べる */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 本日の勤務予定セクション - 左側（PC表示時） */}
        <Card className="bg-gradient-to-br from-white to-gray-50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-700" />
              本日勤務予定
            </CardTitle>
            <CardDescription>勤務者一覧</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">
                    チェックイン済: {checkedInWorkers}名
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    勤務完了: {completedWorkers}名
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800">
                    未チェックイン: {notCheckedInWorkers}名
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    合計: {totalWorkers}名
                  </span>
                </div>
              </div>

              {/* デスクトップ表示 */}
              <div className="hidden md:block border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b grid grid-cols-12 gap-1 text-sm font-medium text-gray-500">
                  <div
                    className="col-span-3 flex items-center gap-1 cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort("name")}>
                    名前{/* ...sort icon... */}
                  </div>
                  <div
                    className="col-span-3 flex items-center gap-1 cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort("store")}>
                    店舗{/* ...sort icon... */}
                  </div>
                  <div
                    className="col-span-3 flex items-center gap-1 cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort("time")}>
                    時間{/* ...sort icon... */}
                  </div>
                  <div
                    className="col-span-3 flex items-center justify-end cursor-pointer hover:text-gray-700 pr-0"
                    onClick={() => handleSort("status")}>
                    ステータス{/* ...sort icon... */}
                  </div>
                </div>

                <div className="divide-y max-h-[500px] overflow-y-auto">
                  {sortedWorkers.map((worker) => {
                    // ステータスに応じたバッジの色とアイコンを設定
                    let statusColor = "bg-gray-100 text-gray-800";
                    let StatusIcon = XCircle;
                    let statusText = "未チェックイン";

                    if (worker.status === "IN_PROGRESS") {
                      statusColor = "bg-green-100 text-green-800";
                      StatusIcon = CheckCircle;
                      statusText = "チェックイン済";
                    } else if (worker.status === "COMPLETED") {
                      statusColor = "bg-blue-100 text-blue-800";
                      StatusIcon = CheckSquare;
                      statusText = "勤務完了";
                    }

                    return (
                      <div
                        key={worker.id}
                        className="p-3 grid grid-cols-12 gap-1 items-center hover:bg-gray-50">
                        <div className="col-span-3 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {worker.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{worker.name}</span>
                        </div>
                        <div className="col-span-3 flex items-center gap-2">
                          <Store className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate text-xs text-gray-600 max-w-[90px]">
                            {worker.store}
                          </span>
                        </div>
                        <div className="col-span-3 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-xs">{worker.time}</span>
                        </div>
                        <div className="col-span-3">
                          <div className="flex justify-end pr-0">
                            {worker.status === "SCHEDULED" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 px-1 text-[11px] text-blue-600 whitespace-nowrap min-w-0 w-auto"
                                onClick={() => showCheckInCode(worker)}>
                                <ClipboardCheck className="h-3 w-3 mr-1" />
                                チェックインコード
                              </Button>
                            ) : (
                              <Badge className={statusColor}>
                                {React.createElement(StatusIcon, {
                                  className: "h-3 w-3 mr-1",
                                })}
                                {statusText}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* モバイル表示 - カード形式 */}
              <div className="md:hidden space-y-3">
                {sortedWorkers.map((worker) => {
                  // ステータスに応じたバッジの色とアイコンを設定
                  let statusColor = "bg-gray-100 text-gray-800";
                  let StatusIcon = XCircle;
                  let statusText = "未チェックイン";

                  if (worker.status === "IN_PROGRESS") {
                    statusColor = "bg-green-100 text-green-800";
                    StatusIcon = CheckCircle;
                    statusText = "チェックイン済";
                  } else if (worker.status === "COMPLETED") {
                    statusColor = "bg-blue-100 text-blue-800";
                    StatusIcon = CheckSquare;
                    statusText = "勤務完了";
                  }

                  return (
                    <div
                      key={worker.id}
                      className="border rounded-lg p-3 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {worker.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{worker.name}</span>
                        </div>
                        {/* ステータスバッジのみ表示。ボタンは下部に移動 */}
                        <Badge className={statusColor}>
                          {React.createElement(StatusIcon, {
                            className: "h-3 w-3 mr-1",
                          })}
                          {statusText}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Store className="h-3.5 w-3.5 text-gray-400" />
                          <span className="truncate text-gray-600 max-w-[160px] text-xs">
                            {worker.store}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          <Clock className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-gray-600 text-xs">
                            {worker.time}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        {worker.status === "SCHEDULED" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-xs text-blue-600 whitespace-nowrap"
                            onClick={() => showCheckInCode(worker)}>
                            <ClipboardCheck className="h-3 w-3 mr-1" />
                            チェックインコード
                          </Button>
                        ) : (
                          <Badge className={statusColor}>
                            {React.createElement(StatusIcon, {
                              className: "h-3 w-3 mr-1",
                            })}
                            {statusText}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 承認待ちセクション - 右側（PC表示時） */}
        <Card className="bg-gradient-to-br from-white to-gray-50 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-amber-500" />
              承認待ち
            </CardTitle>
            <CardDescription>シェフからの完了報告</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800">
                    承認待ち: {pendingWorksessions.length}件
                  </Badge>
                </div>
              </div>

              {pendingWorksessions.length > 0 ? (
                <>
                  {/* デスクトップ表示 */}
                  <div className="hidden md:block border rounded-lg overflow-hidden">
                    <div className="divide-y max-h-[500px] overflow-y-auto">
                      {pendingWorksessions.map((worksession) => (
                        <div
                          key={worksession.id}
                          className="p-3 hover:bg-gray-50 cursor-pointer"
                          onClick={() => showPendingWorksessionDetails(worksession)}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-medium">
                                {worksession.user?.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium">{worksession.user?.name}</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1 truncate">
                            {worksession.restaurant?.name}
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">{format(new Date(worksession.check_in_time), "HH:mm")}</span>
                            <span className="text-gray-500">
                              報告: {worksession.chef_review ? format(new Date(worksession.chef_review.updated_at), "HH:mm") : '未'}
                            </span>
                          </div>
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full h-8 px-2 text-blue-600"
                              onClick={() => showPendingWorksessionDetails(worksession)}>
                              <FileText className="h-4 w-4 mr-1" />
                              詳細を見る
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* モバイル表示 - カード形式 */}
                  <div className="md:hidden space-y-3">
                    {pendingWorksessions.map((worksession) => (
                      <div
                        key={worksession.id}
                        className="border rounded-lg p-3 bg-white hover:bg-gray-50"
                        onClick={() => showPendingWorksessionDetails(worksession)}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-medium">
                                {worksession.user?.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium">{worksession.user?.name}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Store className="h-3.5 w-3.5 text-gray-400" />
                            <span className="truncate text-gray-600">
                              {worksession.restaurant?.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-gray-600">{worksession.check_in_time}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                          <span>報告時刻: {worksession.chef_review?.updated_at}</span>
                          <Badge className="bg-amber-100 text-amber-800 text-xs">
                            承認待ち
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ClipboardCheck className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>承認待ちのレビューはありません</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* レビュー詳細モーダル */}
      {selectedPendingWorksession &&
        selectedPendingWorksession.user && selectedPendingWorksession.job && selectedPendingWorksession.restaurant &&  (
        <>
          <RestaurantReviewModal
            isOpen={isReviewModalOpen}
            onCloseAction={() => setIsReviewModalOpen(false)}
            worksessionData={{
              id: selectedPendingWorksession.id,
              user: {
                name: selectedPendingWorksession.user.name,
                profile_image: selectedPendingWorksession.user.profile_image
              },
              job: {
                id: selectedPendingWorksession.job.id,
                title: selectedPendingWorksession.job.title,
                restaurant_id: selectedPendingWorksession.job.restaurant_id,
                work_date: selectedPendingWorksession.job.work_date,
                start_time: selectedPendingWorksession.job.start_time,
                end_time: selectedPendingWorksession.job.end_time,
              },
              restaurant: {
                name: selectedPendingWorksession.restaurant?.name || "",
              },
            }}
            handleSuccessAction={() => {
              setIsChefReviewModalOpen(true);
            }}
          />
          <RestaurantReviewCompleteModal
            isOpen={isChefReviewModalOpen}
            onCloseAction={() => {
              setIsChefReviewModalOpen(false)
              setSelectedPendingWorksession(null)
            }}
            worksessionId={selectedPendingWorksession?.id}
          />
        </>
      )}
      

      {/* チェックインコードモーダル */}
      {selectedWorksession && (
        <CheckInQRModal
          isOpen={isCheckInCodeModalOpen}
          onCloseAction={() => { setIsCheckInCodeModalOpen(false) }}
          workSessionData={{
            id: selectedWorksession.id,
            check_in_code: selectedWorksession.check_in_code ?? null,
            chefName: selectedWorksession.name,
            restaurantName: selectedWorksession.store,
          }}
        />
      )}

      {/* 勤務詳細モーダル */}
      <Dialog
        open={isWorksessionModalOpen}
        onOpenChange={setIsWorksessionModalOpen}>
        <DialogContent className="sm:max-w-lg max-w-[95vw] rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              勤務詳細
            </DialogTitle>
            <DialogDescription>
              {selectedWorksession && (
                <span className="line-clamp-1">
                  {selectedWorksession.name} - {selectedWorksession.store}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedWorksession && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">勤務日</p>
                  <p className="mt-1">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">勤務時間</p>
                  <p className="mt-1">{selectedWorksession.time}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">ステータス</p>
                <div className="mt-1">
                  {selectedWorksession.status === "SCHEDULED" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs text-blue-600"
                      onClick={() => showCheckInCode(selectedWorksession)}>
                      <ClipboardCheck className="h-3 w-3 mr-1" />
                      チェックインコード
                    </Button>
                  ) : (
                    <Badge
                      className={
                        selectedWorksession.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-800"
                          : selectedWorksession.status === "IN_PROGRESS"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }>
                      {selectedWorksession.status === "COMPLETED"
                        ? "勤務完了"
                        : selectedWorksession.status === "IN_PROGRESS"
                        ? "チェックイン済"
                        : "未チェックイン"}
                    </Badge>
                  )}
                </div>
              </div>

              {selectedWorksession.reportDetails && (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      報告内容
                    </p>
                    <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                      {selectedWorksession.reportDetails.notes}
                    </p>
                  </div>

                  {selectedWorksession.reportDetails.tasks.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        担当業務
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedWorksession.reportDetails.tasks.map(
                          (task: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-50">
                              {task}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsWorksessionModalOpen(false)}
              className="w-full sm:w-auto">
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
