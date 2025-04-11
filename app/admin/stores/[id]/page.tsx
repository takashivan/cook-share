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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { getRestaurantStaff } from "@/lib/api/company";
import { jobApi } from "@/lib/api/job";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Job } from "@/lib/api/job";
import useSWR from "swr";
import { CreateJobModal } from "@/components/modals/CreateJobModal";
import { toast } from "@/hooks/use-toast";
import { AddRestaurantStaffModal } from "@/components/modals/AddRestaurantStaff";
import { restaurantStaffInvite } from "@/lib/api/restaurant";
import { StaffsListData } from "@/api/__generated__/company/data-contracts";
import { apiRequest } from "@/lib/api/config";
import { Staff } from "@/types/staff";

interface StaffData {
  id: string;
  companyuser_id: string | null;
  companyuser: {
    name: string;
    email: string;
    is_active: boolean;
  };
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("APIリクエストに失敗しました");
  return res.json();
};

export default function RestaurantDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const [formattedJobs, setFormattedJobs] = useState<
    (Job & { formattedWorkDate: string; formattedTime: string })[]
  >([]);
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
    restaurant ? `/api/restaurants/${params.id}/jobs` : null,
    () => jobApi.getJobsByRestaurant(params.id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  const { data: staffs, mutate: mutateStaffs } = useSWR<StaffData[]>(
    [`restaurant-staff`, params.id],
    async ([_, id]: [string, string]) => {
      const response = await getRestaurantStaff(parseInt(id));
      return response.admin.map((staff) => ({
        id: staff.id,
        companyuser_id: staff.companies_id,
        companyuser: {
          name: staff.name,
          email: staff.email,
          is_active: true, // APIレスポンスにis_activeが含まれていないため、デフォルトでtrueとする
        },
      }));
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  useEffect(() => {
    if (jobs && Array.isArray(jobs)) {
      const formatted = jobs.map((job: Job) => ({
        ...job,
        formattedWorkDate: format(new Date(job.work_date), "yyyy年MM月dd日", {
          locale: ja,
        }),
        formattedTime: `${format(
          new Date(job.start_time * 1000),
          "HH:mm"
        )} 〜 ${format(new Date(job.end_time * 1000), "HH:mm")}`,
      }));
      setFormattedJobs(formatted);
    }
  }, [jobs]);

  console.log("Restaurant data:", restaurant);
  console.log("Raw jobs response:", jobs);
  console.log("Formatted jobs:", formattedJobs);
  console.log("Errors:", { restaurantError, jobsError });

  const error = restaurantError || jobsError;
  const isLoading = !restaurant && !error;

  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

  const handleCreateJob = async (data: FormData) => {
    try {
      await jobApi.createJob(data);
      // 求人リストを更新
      // TODO: 求人リストの更新処理を追加
      setIsCreateJobModalOpen(false);
      toast({
        title: "求人を追加しました",
        description: "新しい求人の登録が完了しました。",
      });
    } catch (error) {
      console.error("Failed to create job:", error);
      toast({
        title: "エラーが発生しました",
        description: "求人の追加に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  const handleAddStaff = async (
    email: string,
    permissions: { canEdit: boolean; canManageJobs: boolean }
  ) => {
    if (!restaurant?.id) {
      toast({
        title: "エラーが発生しました",
        description: "店舗情報が見つかりません。",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("restaurant", restaurant);
      console.log("email", email);
      console.log("restaurant.id", restaurant.id);
      console.log("restaurant.companies_id", restaurant.companies_id);
      console.log("permissions.canEdit", permissions.canEdit);
      console.log("permissions.canManageJobs", permissions.canManageJobs);
      console.log("restaurant.name", restaurant.name);
      await restaurantStaffInvite(
        email,
        restaurant.id as unknown as number,
        restaurant.companies_id,
        permissions.canEdit,
        permissions.canManageJobs,
        restaurant.name
      );
      toast({
        title: "招待を送信しました",
        description: `${email}に招待メールを送信しました。`,
      });
    } catch (error) {
      console.error("Failed to invite staff:", error);
      toast({
        title: "エラーが発生しました",
        description: "招待の送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

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
                <Button size="sm" onClick={() => setIsCreateJobModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  求人を追加
                </Button>
              </div>

              <div className="grid gap-4">
                {Array.isArray(formattedJobs) &&
                  formattedJobs.map((job) => (
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
                                勤務日: {job.formattedWorkDate}
                              </span>
                              <span>時給: {job.hourly_rate}円</span>
                            </div>
                            <div className="text-sm">
                              勤務時間: {job.formattedTime}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="staff">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">スタッフ一覧</h3>
                <Button onClick={() => setIsAddStaffModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  スタッフを追加
                </Button>
              </div>

              <div className="space-y-4">
                {staffs?.map((staff: StaffData) => (
                  <Card key={staff.companyuser_id || staff.id}>
                    <CardHeader>
                      <CardTitle>{staff.companyuser.name}</CardTitle>
                      <CardDescription>
                        {staff.companyuser.email}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge
                        variant={
                          staff.companyuser.is_active ? "default" : "secondary"
                        }>
                        {staff.companyuser.is_active
                          ? "アクティブ"
                          : "非アクティブ"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <CreateJobModal
        isOpen={isCreateJobModalOpen}
        onClose={() => setIsCreateJobModalOpen(false)}
        onSubmit={handleCreateJob}
        restaurantId={parseInt(params.id)}
      />

      <AddRestaurantStaffModal
        isOpen={isAddStaffModalOpen}
        onClose={() => setIsAddStaffModalOpen(false)}
        onSubmit={handleAddStaff}
        restaurantName={restaurant?.name ?? ""}
      />
    </div>
  );
}
