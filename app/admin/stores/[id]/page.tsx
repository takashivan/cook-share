"use client";

import { use } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, ChevronRight, Store, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useGetRestaurant } from "@/hooks/api/companyuser/restaurants/useGetRestaurant";
import { CompanyusersListOutput } from "@/api/__generated__/base/data-contracts";
import Image from "next/image";
import { useGetRestaurantReviewByRestaurantId } from "@/hooks/api/companyuser/reviews/useGetRestaurantReviewByRestaurantId";
import { MessageList } from "./components/MessageList";
import { RestaurantDetail } from "./components/RestaurantDetail";
import { ReviewList } from "./components/ReviewList";
import { StaffList } from "./components/StaffList";
import { JobContent } from "./components/JobContent";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingScreen } from "@/components/LoadingScreen";

interface EditStaffPermissions {
  canEdit: boolean;
  canManageJobs: boolean;
}

export default function RestaurantDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);

  // const [editTargetStaff, setEditTargetStaff] = useState<
  //   CompanyusersListOutput["admin"][number] | null
  // >(null);
  // const [editPermissions, setEditPermissions] = useState<EditStaffPermissions>({
  //   canEdit: false,
  //   canManageJobs: false,
  // });

  // レストラン情報の取得
  const {
    data: restaurant,
    error: restaurantError,
    isLoading: restaurantLoading,
  } = useGetRestaurant({
    restaurantId: Number(params.id),
  });

  // シェフからのレビュー取得
  const {
    data: restaurantReview,
    error: reviewError,
    isLoading: reviewLoading,
  } = useGetRestaurantReviewByRestaurantId({
    restaurantId: Number(params.id),
  });

  // const handleEditStaff = async () => {
  //   if (!editTargetStaff) return;

  //   try {
  //     // TODO: Add API call to update staff permissions
  //     // await updateRestaurantStaffPermissions(restaurant?.id, editTargetStaff.id, editPermissions);

  //     toast({
  //       title: "権限を更新しました",
  //       description: `${
  //         editTargetStaff.name || editTargetStaff.email
  //       }の権限を更新しました。`,
  //     });
  //   } catch (error) {
  //     console.error("Failed to update staff permissions:", error);
  //     toast({
  //       title: "エラーが発生しました",
  //       description: "権限の更新に失敗しました。もう一度お試しください。",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setEditTargetStaff(null);
  //   }
  // };

  if (restaurantError || reviewError) {
    return (
      <ErrorPage />
    );
  }

  if (restaurantLoading || reviewLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="店舗情報を読み込んでいます..."
      />
    );
  }

  return (
    <div className="container mx-auto py-1">
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
                  {restaurant?.cuisine_type &&
                    <Badge
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm text-white border-white/40">
                      {restaurant?.cuisine_type}
                    </Badge>
                  }
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

        <Tabs defaultValue="messages" className="mt-1">
          <TabsList>
            <TabsTrigger value="messages">メッセージ</TabsTrigger>
            <TabsTrigger value="jobs">求人</TabsTrigger>
            <TabsTrigger value="info">店舗詳細</TabsTrigger>
            <TabsTrigger value="staff">管理スタッフ</TabsTrigger>
          </TabsList>
          <TabsContent value="messages">
            <MessageList restaurantId={Number(params.id)} />
          </TabsContent>

          <TabsContent value="info">
            <div className="grid gap-4">
              <RestaurantDetail
                restaurantId={Number(params.id)}
              />
              <ReviewList
                restaurantId={Number(params.id)}
              />
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <JobContent
              restaurantId={Number(params.id)}
            />
          </TabsContent>

          <TabsContent value="staff">
            <StaffList
              restaurantId={restaurant?.id}
              restaurantName={restaurant?.name}
              companyId={restaurant?.companies_id ?? undefined}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Staff Permissions Modal */}
      {/* <Dialog
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
      </Dialog> */}
    </div>
  );
}
