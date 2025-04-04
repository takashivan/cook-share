"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BarChart3,
  Calendar,
  Edit,
  ExternalLink,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Store,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchRestaurantsByCompanyId } from "@/lib/store/restaurantSlice";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { getRestaurant } from "@/lib/api/restaurant";
import type { Restaurant } from "@/lib/api/restaurant";
import { EditStoreModal } from "@/components/modals/EditStoreModal";
import { getRestaurantById } from "@/lib/api/restaurant";
import { jobApi } from "@/lib/api/job";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Job } from "@/lib/api/job";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("APIリクエストに失敗しました");
  return res.json();
};

export default function RestaurantDetailPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = use(props.params);
  const { data: restaurant, error: restaurantError } = useSWR(
    [`restaurant`, params.id],
    ([_, id]) => getRestaurantById(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  const { data: jobs, error: jobsError } = useSWR(
    restaurant ? [`jobs`, params.id] : null,
    ([_, id]) => jobApi.getJobsByRestaurant(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  console.log("Restaurant data:", restaurant);
  console.log("Jobs data:", jobs);
  console.log("Errors:", { restaurantError, jobsError });

  const error = restaurantError || jobsError;
  const isLoading = !restaurant && !error;

  return (
    <div className="container mx-auto py-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : error ? (
        <div className="text-red-500 p-4">
          データの取得に失敗しました。しばらく待ってから再度お試しください。
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {restaurant?.name || "店舗情報"}
              </h2>
              <p className="text-muted-foreground">
                {restaurant?.address || ""}{" "}
                {restaurant?.cuisine_type ? `- ${restaurant.cuisine_type}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                店舗情報を編集
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  掲載求人数
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  スタッフ数
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">応募者数</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="jobs" className="mt-8">
            <TabsList>
              <TabsTrigger value="jobs">求人情報</TabsTrigger>
              <TabsTrigger value="info">店舗情報</TabsTrigger>
              <TabsTrigger value="staff">管理スタッフ</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>店舗詳細</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">住所</h4>
                        <p className="text-sm text-gray-500">
                          {restaurant?.address}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">電話番号</h4>
                        <p className="text-sm text-gray-500">
                          {restaurant?.phone}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">営業時間</h4>
                        <p className="text-sm text-gray-500"></p>
                      </div>
                      <div>
                        <h4 className="font-medium">ジャンル</h4>
                        <p className="text-sm text-gray-500">
                          {restaurant?.cuisine_type}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">掲載中の求人</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  求人を追加
                </Button>
              </div>

              <div className="grid gap-4">
                {Array.isArray(jobs) &&
                  jobs.map((job: Job) => (
                    <Link
                      href={`/admin/job/${job.id}`}
                      key={job.id}
                      className="block">
                      <Card className="transition-colors hover:bg-gray-50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {job.title}
                            </CardTitle>
                            <Badge
                              variant={
                                job.status === "公開中"
                                  ? "default"
                                  : "secondary"
                              }>
                              {job.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="mr-4">
                                勤務日:{" "}
                                {format(
                                  new Date(job.work_date),
                                  "yyyy年MM月dd日",
                                  { locale: ja }
                                )}
                              </span>
                              <span>時給: {job.hourly_rate}円</span>
                            </div>
                            <div className="text-sm">
                              勤務時間:{" "}
                              {format(new Date(job.start_time), "HH:mm")} 〜{" "}
                              {format(new Date(job.end_time), "HH:mm")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
