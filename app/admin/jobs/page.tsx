"use client";

import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  ExternalLink,
  MoreHorizontal,
  Plus,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useGetJobsByCompanyId } from "@/hooks/api/companyuser/jobs/useGetJobsByCompanyId";
import { useGetMultipleWorksessionsByJobId } from "@/hooks/api/companyuser/worksessions/useGetMultipleWorksessionsByJobId";
import { JobsListData } from "@/api/__generated__/base/data-contracts";

interface JobWithWorkSessions
  extends Omit<JobsListData["jobs"][number], "workSessionCount"> {
  workSessionCount: number;
}

export default function JobsPage() {
  const { user } = useCompanyAuth();
  const {
    data: jobData,
    isLoading,
    error,
  } = useGetJobsByCompanyId({ companyId: user?.companies_id ?? undefined });
  const { data: worksessionsbyJob } = useGetMultipleWorksessionsByJobId({
    jobIds: jobData?.jobs.map((job) => job.id) || [],
  });

  const jobWithWorkSessions: JobWithWorkSessions[] | undefined =
    jobData?.jobs.map((job) => {
      const workSessionCount =
        worksessionsbyJob?.find((workSessions) =>
          workSessions.some((workSession) => workSession.job_id === job.id)
        )?.length || 0;
      return {
        ...job,
        workSessionCount,
      };
    });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(jobWithWorkSessions)) {
    console.error("Jobs is not an array:", jobWithWorkSessions);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>データの形式が正しくありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">求人管理</h2>
          <p className="text-muted-foreground">
            求人の編集、公開状態の管理を行えます
          </p>
        </div>
        {/* <Button asChild>
          <Link href="/admin/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            求人を追加
          </Link>
        </Button> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総求人数</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobWithWorkSessions.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">公開中の求人</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                jobWithWorkSessions.filter((job) => job.status === "PUBLISHED")
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop View */}
      <Tabs defaultValue="published" className="w-full">
        <TabsList>
          <TabsTrigger value="published">公開中</TabsTrigger>
          <TabsTrigger value="draft">下書き</TabsTrigger>
          <TabsTrigger value="pending">一時停止中</TabsTrigger>
          <TabsTrigger value="expired">募集終了</TabsTrigger>
        </TabsList>

        <TabsContent value="published">
          <div className="grid gap-4">
            {jobWithWorkSessions
              .filter(
                (job) =>
                  job.status === "PUBLISHED" &&
                  (!job.expiry_date || job.expiry_date > Date.now())
              )
              .map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-500"></p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="default">公開中</Badge>
                      <span className="text-sm text-gray-500">
                        勤務日:{" "}
                        {format(new Date(job.work_date), "yyyy年MM月dd日", {
                          locale: ja,
                        })}
                      </span>
                      <span className="text-sm text-gray-500">
                        勤務時間: {format(new Date(job.start_time), "HH:mm")} 〜{" "}
                        {format(new Date(job.end_time), "HH:mm")}
                      </span>
                      <span className="text-sm text-gray-500">
                        報酬: {job.fee}円
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium text-gray-500">
                        応募状況
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-lg font-bold ${
                            job.workSessionCount >= job.number_of_spots
                              ? "text-primary"
                              : ""
                          }`}>
                          {job.workSessionCount || 0}
                        </span>
                        <span className="text-gray-500">/</span>
                        <span className="text-lg font-bold">
                          {job.number_of_spots}
                        </span>
                        <span className="text-sm text-gray-500">人</span>
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full ${
                            (job.workSessionCount || 0) >= job.number_of_spots
                              ? "bg-primary"
                              : "bg-blue-400"
                          }`}
                          style={{
                            width: `${Math.min(
                              ((job.workSessionCount || 0) /
                                job.number_of_spots) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/job/${job.id}`}>詳細を見る</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/job/${job.id}/edit`}>編集</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="grid gap-4">
            {jobWithWorkSessions
              .filter((job) => job.status === "DRAFT")
              .map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-500"></p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">下書き</Badge>
                      <span className="text-sm text-gray-500">
                        勤務日:{" "}
                        {format(new Date(job.work_date), "yyyy年MM月dd日", {
                          locale: ja,
                        })}
                      </span>
                      <span className="text-sm text-gray-500">
                        勤務時間: {format(new Date(job.start_time), "HH:mm")} 〜{" "}
                        {format(new Date(job.end_time), "HH:mm")}
                      </span>
                      <span className="text-sm text-gray-500">
                        報酬: {job.fee}円
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium text-gray-500">
                        応募状況
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-lg font-bold ${
                            (job.workSessionCount || 0) >= job.number_of_spots
                              ? "text-primary"
                              : ""
                          }`}>
                          {job.workSessionCount || 0}
                        </span>
                        <span className="text-gray-500">/</span>
                        <span className="text-lg font-bold">
                          {job.number_of_spots}
                        </span>
                        <span className="text-sm text-gray-500">人</span>
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full ${
                            (job.workSessionCount || 0) >= job.number_of_spots
                              ? "bg-primary"
                              : "bg-blue-400"
                          }`}
                          style={{
                            width: `${Math.min(
                              ((job.workSessionCount || 0) /
                                job.number_of_spots) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/job/${job.id}`}>詳細を見る</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/job/${job.id}/edit`}>編集</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid gap-4">
            {jobWithWorkSessions
              .filter((job) => job.status === "PENDING")
              .map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-500"></p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">一時停止中</Badge>
                      <span className="text-sm text-gray-500">
                        勤務日:{" "}
                        {format(new Date(job.work_date), "yyyy年MM月dd日", {
                          locale: ja,
                        })}
                      </span>
                      <span className="text-sm text-gray-500">
                        勤務時間: {format(new Date(job.start_time), "HH:mm")} 〜{" "}
                        {format(new Date(job.end_time), "HH:mm")}
                      </span>
                      <span className="text-sm text-gray-500">
                        報酬: {job.fee}円
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium text-gray-500">
                        応募状況
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-lg font-bold ${
                            (job.workSessionCount || 0) >= job.number_of_spots
                              ? "text-primary"
                              : ""
                          }`}>
                          {job.workSessionCount || 0}
                        </span>
                        <span className="text-gray-500">/</span>
                        <span className="text-lg font-bold">
                          {job.number_of_spots}
                        </span>
                        <span className="text-sm text-gray-500">人</span>
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full ${
                            (job.workSessionCount || 0) >= job.number_of_spots
                              ? "bg-primary"
                              : "bg-blue-400"
                          }`}
                          style={{
                            width: `${Math.min(
                              ((job.workSessionCount || 0) /
                                job.number_of_spots) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/job/${job.id}`}>詳細を見る</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/job/${job.id}/edit`}>編集</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="expired">
          <div className="grid gap-4">
            {jobWithWorkSessions
              .filter((job) => job.expiry_date && job.expiry_date <= Date.now())
              .map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-500"></p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="destructive">募集終了</Badge>
                      <span className="text-sm text-gray-500">
                        勤務日:{" "}
                        {format(new Date(job.work_date), "yyyy年MM月dd日", {
                          locale: ja,
                        })}
                      </span>
                      <span className="text-sm text-gray-500">
                        勤務時間: {format(new Date(job.start_time), "HH:mm")} 〜{" "}
                        {format(new Date(job.end_time), "HH:mm")}
                      </span>
                      <span className="text-sm text-gray-500">
                        報酬: {job.fee}円
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium text-gray-500">
                        応募状況
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-lg font-bold ${
                            (job.workSessionCount || 0) >= job.number_of_spots
                              ? "text-primary"
                              : ""
                          }`}>
                          {job.workSessionCount || 0}
                        </span>
                        <span className="text-gray-500">/</span>
                        <span className="text-lg font-bold">
                          {job.number_of_spots}
                        </span>
                        <span className="text-sm text-gray-500">人</span>
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full ${
                            (job.workSessionCount || 0) >= job.number_of_spots
                              ? "bg-primary"
                              : "bg-blue-400"
                          }`}
                          style={{
                            width: `${Math.min(
                              ((job.workSessionCount || 0) /
                                job.number_of_spots) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/job/${job.id}`}>詳細を見る</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/job/${job.id}/edit`}>編集</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {jobWithWorkSessions.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <Link
                      href={`/admin/job/${job.id}`}
                      className="font-medium hover:underline">
                      {job.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {job.restaurant_id}
                    </p>
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
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/admin/job/${job.id}`}
                        className="w-full flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        詳細を表示
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/admin/job/${job.id}/edit`}
                        className="w-full flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        編集
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">勤務日</p>
                  <p>
                    {job.work_date
                      ? new Date(job.work_date).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">時給</p>
                  <p>¥{job.fee.toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      job.status === "PUBLISHED"
                        ? "bg-green-100 text-green-800"
                        : job.status === "DRAFT"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {job.status === "PUBLISHED"
                      ? "公開中"
                      : job.status === "DRAFT"
                      ? "下書き"
                      : "終了"}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link href={`/admin/job/${job.id}`}>
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
  );
}
