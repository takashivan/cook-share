"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchJobById, fetchApplicationsByJob } from "@/lib/store/jobSlice";
import type { Job } from "@/lib/api/job";
import type { Application } from "@/types";
import { jobApi } from "@/lib/api/job";
import { applicationApi } from "@/lib/api/application";
import useSWR from "swr";
import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  Phone,
  Send,
  User,
  MessageSquare,
  Store,
  Edit,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function JobDetailPage() {
  const params = useParams();
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(
    null
  );

  const { data: job, error: jobError } = useSWR<Job>(
    params.id ? [`job`, params.id] : null,
    async ([_, id]) => {
      const result = await jobApi.getJob(id as string);
      return result;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  const { data: applications, error: applicationsError } = useSWR<
    Application[]
  >(
    params.id ? [`applications`, params.id] : null,
    async ([_, id]) => {
      const result = await applicationApi.getApplicationsByJob(Number(id));
      return result;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (jobError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{jobError.message}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>求人が見つかりません</p>
        </div>
      </div>
    );
  }

  const selectedApplicantData =
    applications?.find((a) => a.id === selectedApplicant) || null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/jobs">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{job.title}</h2>
            <p className="text-muted-foreground">求人の詳細情報</p>
          </div>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          編集
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">求人タイトル</h3>
              <p>{job.title}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">店舗ID</h3>
              <p>{job.restaurant_id}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">勤務日</h3>
              <p>{new Date(job.work_date).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">勤務時間</h3>
              <p>
                {new Date(job.start_time).toLocaleTimeString()} 〜{" "}
                {new Date(job.end_time).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">時給</h3>
              <p>¥{job.hourly_rate?.toLocaleString() ?? "0"}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">ステータス</h3>
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  job.status === "published"
                    ? "bg-green-100 text-green-800"
                    : job.status === "draft"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                {job.status === "published"
                  ? "公開中"
                  : job.status === "draft"
                  ? "下書き"
                  : "終了"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>業務内容</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">業務内容</h3>
              <p className="whitespace-pre-wrap">{job.task}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">必要なスキル</h3>
              <p className="whitespace-pre-wrap">{job.skill}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">持ち物</h3>
              <p className="whitespace-pre-wrap">{job.whattotake}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">注意事項</h3>
              <p className="whitespace-pre-wrap">{job.note}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>その他</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">アピールポイント</h3>
              <p className="whitespace-pre-wrap">{job.point}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">交通費</h3>
              <p>{job.transportation}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicants List */}
        <Card className="lg:col-span-1">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-lg">応募者一覧</CardTitle>
            <CardDescription>全 {applications?.length ?? 0} 名</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {applications?.map((applicant) => (
                <div
                  key={applicant.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedApplicant === applicant.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedApplicant(applicant.id)}>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={
                          applicant.user?.profile_image ||
                          "/placeholder.svg?height=40&width=40"
                        }
                        alt={applicant.user?.name || "応募者"}
                      />
                      <AvatarFallback>
                        {(applicant.user?.name || "応募者").charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {applicant.user?.name || "応募者"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            applicant.application_date
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`
                          ${
                            applicant.status === "pending"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                          }
                          ${
                            applicant.status === "interview"
                              ? "bg-purple-100 text-purple-800"
                              : ""
                          }
                          ${
                            applicant.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                          ${
                            applicant.status === "rejected"
                              ? "bg-gray-100 text-gray-800"
                              : ""
                          }
                        `}>
                          {applicant.status === "pending"
                            ? "応募済み"
                            : applicant.status === "interview"
                            ? "面接調整中"
                            : applicant.status === "accepted"
                            ? "採用決定"
                            : "不採用"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {applicant.message || "メッセージはありません"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedApplicantData ? (
            <>
              <CardHeader className="px-4 py-3 flex-row items-center justify-between space-y-0 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        selectedApplicantData.user?.profile_image ||
                        "/placeholder.svg?height=40&width=40"
                      }
                      alt={selectedApplicantData.user?.name || "応募者"}
                    />
                    <AvatarFallback>
                      {(selectedApplicantData.user?.name || "応募者").charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {selectedApplicantData.user?.name || "応募者"}
                    </CardTitle>
                    <Badge
                      className={`
                      ${
                        selectedApplicantData.status === "pending"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        selectedApplicantData.status === "interview"
                          ? "bg-purple-100 text-purple-800"
                          : ""
                      }
                      ${
                        selectedApplicantData.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        selectedApplicantData.status === "rejected"
                          ? "bg-gray-100 text-gray-800"
                          : ""
                      }
                    `}>
                      {selectedApplicantData.status === "pending"
                        ? "応募済み"
                        : selectedApplicantData.status === "interview"
                        ? "面接調整中"
                        : selectedApplicantData.status === "accepted"
                        ? "採用決定"
                        : "不採用"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        プロフィール
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>応募者プロフィール</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={
                                selectedApplicantData.user?.profile_image ||
                                "/placeholder.svg?height=40&width=40"
                              }
                              alt={selectedApplicantData.user?.name || "応募者"}
                            />
                            <AvatarFallback>
                              {(
                                selectedApplicantData.user?.name || "応募者"
                              ).charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-medium">
                              {selectedApplicantData.user?.name || "応募者"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              30歳・男性
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">連絡先</h4>
                            <div className="text-sm flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              090-1234-5678
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              希望勤務日
                            </h4>
                            <div className="text-sm flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              月・水・金
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              希望勤務時間
                            </h4>
                            <div className="text-sm flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              11:00〜15:00
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">居住地</h4>
                            <div className="text-sm flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              東京都台東区
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              経歴・スキル
                            </h4>
                            <p className="text-sm">
                              洋食店で2年ほど調理補助として勤務。ハンバーグやオムライスなどの基本的な調理が可能。接客経験もあり。
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">メニューを開く</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>面接を設定</DropdownMenuItem>
                      <DropdownMenuItem>採用する</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        不採用にする
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 h-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {/* Chat messages would be populated here */}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="メッセージを入力..." className="flex-1" />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">送信</span>
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-8 flex flex-col items-center justify-center h-[500px] text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                応募者を選択してください
              </h3>
              <p className="text-muted-foreground">
                左側のリストから応募者を選択すると、チャット履歴が表示されます。
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
