"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Edit,
  MoreHorizontal,
  Plus,
  Users,
  MapPin,
  Phone,
  Clock,
  ChevronLeft,
  ChevronRight,
  List,
  Store,
  Calendar,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Job } from "@/lib/api/job";
import { CreateJobModal } from "@/components/modals/CreateJobModal";
import { toast } from "@/hooks/use-toast";
import { AddRestaurantStaffModal } from "@/components/modals/AddRestaurantStaff";
import { EditRestaurantModal } from "@/components/modals/EditRestaurantModal";
import { useGetRestaurant } from "@/hooks/api/companyuser/restaurants/useGetRestaurant";
import { useGetJobsByRestaurantId } from "@/hooks/api/companyuser/jobs/useGetJobsByRestaurantId";
import { useGetMultipleWorksessionsByJobId } from "@/hooks/api/companyuser/worksessions/useGetMultipleWorksessionsByJobId";
import {
  CompanyusersCreateInput,
  CompanyusersListOutput,
  JobsCreatePayload,
  JobsListOutput,
  RestaurantsPartialUpdatePayload,
} from "@/api/__generated__/base/data-contracts";
import { useGetCompanyUsersByRestaurantId } from "@/hooks/api/companyuser/companyUsers/useGetCompanyUsersByRestaurantId";
import { useCreateJob } from "@/hooks/api/companyuser/jobs/useCreateJob";
import Image from "next/image";
import { useCreateCompanyUserByRestaurantId } from "@/hooks/api/companyuser/companyUsers/useCreateCompanyUserByRestaurantId";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DeleteRestaurantStaffModal } from "@/components/modals/DeleteRestaurantStaffModal";
import { useGetRestaurantReviewByRestaurantId } from "@/hooks/api/companyuser/reviews/useGetRestaurantReviewByRestaurantId";
import { useUpdateRestaurant } from "@/hooks/api/companyuser/restaurants/useUpdateRestaurant";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useDeleteCompanyUserByRestaurantId } from "@/hooks/api/companyuser/companyUsers/useDeleteCompanyUserByRestaurantId";

interface JobWithWorkSessions
  extends Omit<JobsListOutput[number], "workSessionCount"> {
  formattedWorkDate: string;
  formattedTime: string;
  workSessionCount: number;
}

interface EditStaffPermissions {
  canEdit: boolean;
  canManageJobs: boolean;
}

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

export default function RestaurantDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useCompanyAuth();
  const router = useRouter();
  const params = use(props.params);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const [deleteTargetStaff, setDeleteTargetStaff] = useState<{
    id: string;
    companyuser: { name: string; email: string };
  } | null>(null);
  const [editTargetStaff, setEditTargetStaff] = useState<
    CompanyusersListOutput["admin"][number] | null
  >(null);
  const [editPermissions, setEditPermissions] = useState<EditStaffPermissions>({
    canEdit: false,
    canManageJobs: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [copiedJob, setCopiedJob] = useState<Partial<Job> | null>(null);

  // レストラン情報の取得
  const {
    data: restaurant,
    error: restaurantError,
  } = useGetRestaurant({ restaurantId: Number(params.id) });
  const { data: jobs, error: jobsError } = useGetJobsByRestaurantId({
    restaurantId: Number(params.id),
  });
  const { data: worksessionsbyJob } = useGetMultipleWorksessionsByJobId({
    jobIds: jobs?.map((job) => job.id) || [],
  });
  const { data: staffData } = useGetCompanyUsersByRestaurantId({
    restaurantId: Number(params.id),
  });
  const { data: restaurantReview } = useGetRestaurantReviewByRestaurantId({
    restaurantId: Number(params.id),
  });

  // 求人の取得
  const jobWithWorkSessions: JobWithWorkSessions[] | undefined =
    jobs?.map((job) => {
      const workSessionCount =
        worksessionsbyJob?.find((workSessions) =>
          workSessions.some((workSession) => workSession.job_id === job.id)
        )?.length || 0;
      return {
        ...job,
        formattedWorkDate: format(new Date(job.work_date), "yyyy年MM月dd日", {
          locale: ja,
        }),
        formattedTime: `${format(
          new Date(job.start_time),
          "HH:mm"
        )} 〜 ${format(new Date(job.end_time), "HH:mm")}`,
        workSessionCount,
      };
    }) ?? [];

  // 求人の追加
  const { trigger: createJobTrigger } = useCreateJob({
    companyId: restaurant?.companies_id ?? undefined,
    restaurantId: restaurant?.id,
    handleSuccess: () => {
      setIsCreateJobModalOpen(false);
      setCopiedJob(null);
      toast({
        title: "求人を追加しました",
        description: "新しい求人の登録が完了しました。",
      });
    },
    handleError: (error) => {
      console.error("Failed to create job:", error);
      toast({
        title: "エラーが発生しました",
        description: "求人の追加に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  });

  // レストランの更新
  const { trigger: updateRestaurantTrriger } = useUpdateRestaurant({
    restaurantId: Number(params.id),
    companyId: restaurant?.companies_id ?? undefined,
    companyuserId: user?.id,
    handleSuccess: () => {
      setIsEditModalOpen(false);
      toast({
        title: "更新成功",
        description: "レストラン情報が更新されました",
      });
    },
    handleError: () => {
      console.error("更新エラー:", error);
      toast({
        title: "更新エラー",
        description: "レストラン情報の更新に失敗しました",
        variant: "destructive",
      });
    }
  })

  // スタッフの招待
  const { trigger: createCompanyUserTrigger } =
    useCreateCompanyUserByRestaurantId({
      restaurantId: restaurant?.id,
      companyId: restaurant?.companies_id ?? undefined,
    });

  // スタッフの削除
  const { trigger: deleteRestaurantStaffTrigger } = useDeleteCompanyUserByRestaurantId({
    restaurantId: restaurant?.id,
    companyId: restaurant?.companies_id ?? undefined,
    companyUserId: deleteTargetStaff?.id,
    handleSuccess: () => {
      toast({
        title: "スタッフを削除しました",
        description: `${
          deleteTargetStaff?.companyuser.name ||
          deleteTargetStaff?.companyuser.email
        }をスタッフから削除しました。`,
      });
    },
    handleError: (error) => {
      console.error("Failed to delete staff:", error);
      toast({
        title: "エラーが発生しました",
        description: "スタッフの削除に失敗しました。",
        variant: "destructive",
      });
    },
    hadnleFinally: () => {
      setIsDeleting(false);
      setDeleteTargetStaff(null);
    }
  });

  console.log("restaurant", restaurant);

  const handleSubmit = async (data: RestaurantsPartialUpdatePayload) => {
    await updateRestaurantTrriger(data);
  };

  console.log("Restaurant data:", restaurant);
  console.log("Raw jobs response:", jobs);
  console.log("Errors:", { restaurantError, jobsError });

  const error = restaurantError || jobsError;
  const isLoading = !restaurant && !error;

  const handleCreateJob = async (data: JobsCreatePayload) => {
    await createJobTrigger(data);
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
      console.log("permissions.canEdit", permissions.canEdit);
      console.log("permissions.canManageJobs", permissions.canManageJobs);
      console.log("restaurant.name", restaurant.name);
      const data: CompanyusersCreateInput = {
        companies_id: restaurant.companies_id ?? "",
        email,
        can_edit: permissions.canEdit,
        can_manage_jobs: permissions.canManageJobs,
        restaurant_name: restaurant.name,
      };
      await createCompanyUserTrigger(data);
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

  const handleCopyJob = (job: any) => {
    const { id, ...jobWithoutId } = job;
    const jobData = {
      ...jobWithoutId,
      title: `${job.title} (コピー)`,
      status: "DRAFT",
      start_time: new Date(job.start_time).toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      end_time: new Date(job.end_time).toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      expiry_date: new Date(job.expiry_date).toISOString().split("T")[0],
    };
    setCopiedJob(jobData);
    setIsCreateJobModalOpen(true);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getJobsForDate = (date: Date) => {
    return jobWithWorkSessions.filter((job) => {
      const jobDate = new Date(job.work_date);
      return (
        jobDate.getFullYear() === date.getFullYear() &&
        jobDate.getMonth() === date.getMonth() &&
        jobDate.getDate() === date.getDate()
      );
    });
  };

  const calculateProgress = (applicants: number, required: number) => {
    return Math.min(Math.round((applicants / required) * 100), 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800";
      case "DRAFT":
        return "bg-gray-100 text-gray-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsCreateJobModalOpen(true);
  };

  const handleDeleteStaff = async () => {
    if (!deleteTargetStaff) return;

    setIsDeleting(true);
    deleteRestaurantStaffTrigger();
  };

  const handleEditStaff = async () => {
    if (!editTargetStaff) return;

    try {
      // TODO: Add API call to update staff permissions
      // await updateRestaurantStaffPermissions(restaurant?.id, editTargetStaff.id, editPermissions);

      toast({
        title: "権限を更新しました",
        description: `${
          editTargetStaff.name || editTargetStaff.email
        }の権限を更新しました。`,
      });
    } catch (error) {
      console.error("Failed to update staff permissions:", error);
      toast({
        title: "エラーが発生しました",
        description: "権限の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setEditTargetStaff(null);
    }
  };

  return (
    <div className="container mx-auto py-1">
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
          <div className="flex items-center gap-1 mb-6">
            <Link
              href="/admin/stores"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
              <Store className="h-4 w-4" />
              店舗一覧
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium">{restaurant?.name}</span>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <div className="h-64 w-full relative">
              <Image
                src={restaurant?.profile_image || "/placeholder.svg"}
                alt={restaurant?.name || ""}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-end gap-6">
                {/* <div className="relative h-24 w-24 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-white">
                  <Image
                    src={restaurant?.profile_image || "/placeholder.svg"}
                    alt={restaurant?.name || ""}
                    fill
                    className="object-cover"
                  />
                </div> */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {restaurant?.is_active ? "公開中" : "非公開"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm text-white border-white/40">
                      {restaurant?.cuisine_type}
                    </Badge>
                    {restaurantReview && restaurantReview.length > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-white/20 backdrop-blur-sm text-white border-white/40">
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i <
                                  Math.round(
                                    restaurantReview.reduce(
                                      (acc, review) => acc + review.rating,
                                      0
                                    ) / restaurantReview.length
                                  )
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">
                            {(
                              restaurantReview.reduce(
                                (acc, review) => acc + review.rating,
                                0
                              ) / restaurantReview.length
                            ).toFixed(1)}
                            <span className="text-xs ml-1">
                              ({restaurantReview.length}件)
                            </span>
                          </span>
                        </div>
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold">{restaurant?.name}</h1>
                  <div className="flex flex-col items-start gap-4 mt-2 text-white/90">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{restaurant?.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">
                        {restaurant?.contact_info}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {restaurant?.business_hours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  掲載求人数
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobWithWorkSessions.length}</div>
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
                <div className="text-2xl font-bold">{staffs?.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">応募者数</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {jobWithWorkSessions.reduce(
                    (sum, job) => sum + job.workSessionCount,
                    0
                  )}
                </div>
              </CardContent>
            </Card>
          </div> */}

          <Tabs defaultValue="jobs" className="mt-1">
            <TabsList>
              <TabsTrigger value="jobs">求人</TabsTrigger>
              <TabsTrigger value="info">店舗詳細</TabsTrigger>
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
                          {restaurant?.contact_info}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium">ジャンル</h4>
                        <p className="text-sm text-gray-500">
                          {restaurant?.cuisine_type}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">説明文</h4>
                        <p className="text-sm text-gray-500">
                          {restaurant?.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">営業時間</h4>
                        <p className="text-sm text-gray-500">
                          {restaurant?.business_hours}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">アクセス</h4>
                        <p className="text-sm text-gray-500">
                          {restaurant?.access}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">最寄り駅</h4>
                        <p className="text-sm text-gray-500">
                          {restaurant?.station}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            setIsEditModalOpen(true);
                            console.log("restaurant", restaurant);
                          }}>
                          <Edit className="mr-2 h-4 w-4" />
                          店舗情報を編集
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {restaurantReview && restaurantReview.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>シェフからのレビュー</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {restaurantReview.map((review) => (
                          <div
                            key={review.id}
                            className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium">
                                {review.rating.toFixed(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              {review.comment}
                            </p>
                            <div className="text-xs text-gray-500">
                              {format(
                                new Date(review.created_at),
                                "yyyy年MM月dd日",
                                { locale: ja }
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    title="リスト表示">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "calendar" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("calendar")}
                    title="カレンダー表示">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="sm" onClick={() => setIsCreateJobModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  求人を追加
                </Button>
              </div>

              {viewMode === "calendar" ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-medium">
                        {format(currentDate, "yyyy年M月", { locale: ja })}
                      </h3>
                      <div className="flex items-center gap-4">
                        {/* <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>公開中</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            <span>下書き</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <span>一時停止中</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <span>応募あり</span>
                          </div>
                        </div> */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={goToPreviousMonth}>
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={goToNextMonth}>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {weekDays.map((day, i) => (
                        <div
                          key={i}
                          className={`text-center text-sm font-medium py-2 ${
                            i === 0
                              ? "text-red-500"
                              : i === 6
                              ? "text-blue-500"
                              : ""
                          }`}>
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 42 }, (_, i) => {
                        const date = new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          i -
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              1
                            ).getDay() +
                            1
                        );
                        const dayJobs = getJobsForDate(date);
                        const isToday =
                          format(date, "yyyy-MM-dd") ===
                          format(new Date(), "yyyy-MM-dd");
                        const isCurrentMonth =
                          date.getMonth() === currentDate.getMonth();
                        const hasApplicants = dayJobs.some(
                          (job) => job.workSessionCount > 0
                        );
                        const dayOfWeek = date.getDay();

                        return (
                          <div
                            key={i}
                            className={`min-h-[120px] border rounded-lg p-2 transition-all hover:shadow-md relative ${
                              isToday
                                ? "bg-blue-50 border-blue-200"
                                : !isCurrentMonth
                                ? "bg-gray-50 text-gray-400"
                                : ""
                            } ${
                              dayOfWeek === 0
                                ? "border-l-red-200"
                                : dayOfWeek === 6
                                ? "border-l-blue-200"
                                : ""
                            }`}>
                            <div className="flex justify-between items-center mb-1">
                              <div
                                className={`text-sm font-medium ${
                                  dayOfWeek === 0
                                    ? "text-red-500"
                                    : dayOfWeek === 6
                                    ? "text-blue-500"
                                    : ""
                                } ${!isCurrentMonth ? "opacity-50" : ""}`}>
                                {format(date, "d")}
                              </div>
                              {isCurrentMonth && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5 rounded-full hover:bg-gray-200"
                                  onClick={() => handleDateClick(date)}>
                                  <Plus className="h-3 w-3" />
                                </Button>
                              )}
                            </div>

                            <div className="space-y-1 overflow-y-auto max-h-[80px]">
                              {dayJobs.map((job) => {
                                const progress = calculateProgress(
                                  job.workSessionCount,
                                  job.number_of_spots
                                );
                                const progressColor =
                                  getProgressColor(progress);

                                return (
                                  <div
                                    key={job.id}
                                    className={`text-xs p-1.5 rounded border ${
                                      job.status === "PUBLISHED"
                                        ? "bg-green-100 border-green-300"
                                        : job.status === "DRAFT"
                                        ? "bg-gray-100 border-gray-300"
                                        : "bg-yellow-100 border-yellow-300"
                                    } cursor-pointer hover:shadow-sm transition-all relative group`}
                                    onClick={() =>
                                      router.push(`/admin/job/${job.id}`)
                                    }>
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">
                                        {format(
                                          new Date(job.start_time),
                                          "HH:mm"
                                        )}
                                      </span>
                                    </div>
                                    <div className="truncate">{job.title}</div>
                                    <div className="mt-1 flex items-center gap-1">
                                      <div className="w-full bg-gray-200 rounded-full h-1">
                                        <div
                                          className={`h-1 rounded-full ${progressColor}`}
                                          style={{
                                            width: `${progress}%`,
                                          }}></div>
                                      </div>
                                      {/* <span className="text-[10px] whitespace-nowrap">
                                        {job.workSessionCount}/
                                        {job.number_of_spots}
                                      </span> */}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Tabs defaultValue="published" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
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
                            className="items-center justify-between p-3 border rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
                            onClick={() => router.push(`/admin/job/${job.id}`)}>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {job.status === "PUBLISHED" && (
                                    <Badge className="bg-green-500 hover:bg-green-600">
                                      公開中
                                    </Badge>
                                  )}
                                  {job.status === "DRAFT" && (
                                    <Badge className="bg-gray-500 hover:bg-gray-600">
                                      下書き
                                    </Badge>
                                  )}
                                  {job.status === "PENDING" && (
                                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                                      一時停止中
                                    </Badge>
                                  )}
                                  {job.expiry_date &&
                                    job.expiry_date <= Date.now() && (
                                      <Badge className="bg-red-500 hover:bg-red-600">
                                        募集終了
                                      </Badge>
                                    )}
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/job/${job.id}`}>
                                        詳細を見る
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleCopyJob(job)}>
                                      コピーして新規作成
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-sm">
                                  {job.title}
                                </h3>
                              </div>

                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {job.formattedWorkDate}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {job.formattedTime}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {job.fee}円
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {job.workSessionCount > 0 ? (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">応募あり</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">応募なし</span>
                                  </div>
                                )}
                              </div>
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
                            className="items-center justify-between p-3 border rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
                            onClick={() => router.push(`/admin/job/${job.id}`)}>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {job.status === "DRAFT" && (
                                    <Badge className="bg-gray-500 hover:bg-gray-600">
                                      下書き
                                    </Badge>
                                  )}
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/job/${job.id}`}>
                                        詳細を見る
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleCopyJob(job)}>
                                      コピーして新規作成
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-sm">
                                  {job.title}
                                </h3>
                              </div>

                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {job.formattedWorkDate}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {job.formattedTime}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {job.fee}円
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {job.workSessionCount > 0 ? (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">応募あり</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">応募なし</span>
                                  </div>
                                )}
                              </div>
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
                            className="items-center justify-between p-3 border rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
                            onClick={() => router.push(`/admin/job/${job.id}`)}>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {job.status === "PENDING" && (
                                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                                      一時停止中
                                    </Badge>
                                  )}
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/job/${job.id}`}>
                                        詳細を見る
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleCopyJob(job)}>
                                      コピーして新規作成
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-sm">
                                  {job.title}
                                </h3>
                              </div>

                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {job.formattedWorkDate}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {job.formattedTime}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {job.fee}円
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {job.workSessionCount > 0 ? (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">応募あり</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">応募なし</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="expired">
                    <div className="grid gap-4">
                      {jobWithWorkSessions
                        .filter(
                          (job) =>
                            job.expiry_date && job.expiry_date <= Date.now()
                        )
                        .map((job) => (
                          <div
                            key={job.id}
                            className="items-center justify-between p-3 border rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
                            onClick={() => router.push(`/admin/job/${job.id}`)}>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {job.status === "PUBLISHED" && (
                                    <Badge className="bg-green-500 hover:bg-green-600">
                                      公開中
                                    </Badge>
                                  )}
                                  {job.expiry_date &&
                                    job.expiry_date <= Date.now() && (
                                      <Badge className="bg-red-500 hover:bg-red-600">
                                        募集終了
                                      </Badge>
                                    )}
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/job/${job.id}`}>
                                        詳細を見る
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleCopyJob(job)}>
                                      コピーして新規作成
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-sm">
                                  {job.title}
                                </h3>
                              </div>

                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {job.formattedWorkDate}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {job.formattedTime}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {job.fee}円
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {job.workSessionCount > 0 ? (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">応募あり</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">応募なし</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </TabsContent>

            <TabsContent value="staff">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium"></h3>
                <Button size="sm" onClick={() => setIsAddStaffModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  スタッフを追加
                </Button>
              </div>

              <div className="space-y-6">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead colSpan={3}>一般スタッフ</TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead>名前</TableHead>
                        <TableHead>メールアドレス</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffData?.admin
                        ?.filter((staff) => !staff.is_admin)
                        .map((staff) => (
                          <TableRow key={`staff-${staff.id}`}>
                            <TableCell className="font-medium">
                              {staff.name}
                            </TableCell>
                            <TableCell>{staff.email}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() =>
                                      setDeleteTargetStaff({
                                        id: staff.id,
                                        companyuser: {
                                          name: staff.name,
                                          email: staff.email,
                                        },
                                      })
                                    }>
                                    削除
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead colSpan={3}>管理者</TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead>名前</TableHead>
                        <TableHead>メールアドレス</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffData?.admin
                        ?.filter((staff) => staff.is_admin)
                        .map((staff) => (
                          <TableRow key={`staff-${staff.id}`}>
                            <TableCell className="font-medium">
                              {staff.name}
                            </TableCell>
                            <TableCell>{staff.email}</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <CreateJobModal
        isOpen={isCreateJobModalOpen}
        onClose={() => {
          setIsCreateJobModalOpen(false);
          setCopiedJob(null);
          setSelectedDate(null);
        }}
        onSubmit={handleCreateJob}
        restaurantId={parseInt(params.id)}
        initialData={{
          ...copiedJob,
          work_date: selectedDate
            ? format(selectedDate, "yyyy-MM-dd")
            : undefined,
        }}
      />
      <EditRestaurantModal
        isOpen={isEditModalOpen && !!restaurant}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmit}
        restaurant={
          restaurant || {
            id: 0,
            name: "",
            description: "",
            address: "",
            contact_info: "",
            cuisine_type: "",
            is_active: true,
            is_approved: false,
            profile_image: "",
            restaurant_cuisine_id: [],
            business_hours: "",
            station: "",
            access: "",
          }
        }
      />

      <AddRestaurantStaffModal
        isOpen={isAddStaffModalOpen}
        onClose={() => setIsAddStaffModalOpen(false)}
        onSubmit={handleAddStaff}
        restaurantName={restaurant?.name ?? ""}
      />

      <DeleteRestaurantStaffModal
        isOpen={!!deleteTargetStaff}
        onClose={() => setDeleteTargetStaff(null)}
        onConfirm={handleDeleteStaff}
        staffName={
          deleteTargetStaff?.companyuser.name ||
          deleteTargetStaff?.companyuser.email ||
          ""
        }
        isLoading={isDeleting}
      />

      {/* Edit Staff Permissions Modal */}
      <Dialog
        open={!!editTargetStaff}
        onOpenChange={() => setEditTargetStaff(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>スタッフ権限の編集</DialogTitle>
            <DialogDescription>
              {editTargetStaff?.name || editTargetStaff?.email}
              の権限を編集します。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="canEdit"
                checked={editPermissions.canEdit}
                onCheckedChange={(checked) =>
                  setEditPermissions((prev) => ({
                    ...prev,
                    canEdit: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="canEdit">店舗情報の編集</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="canManageJobs"
                checked={editPermissions.canManageJobs}
                onCheckedChange={(checked) =>
                  setEditPermissions((prev) => ({
                    ...prev,
                    canManageJobs: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="canManageJobs">求人の管理</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTargetStaff(null)}>
              キャンセル
            </Button>
            <Button onClick={handleEditStaff}>保存する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
