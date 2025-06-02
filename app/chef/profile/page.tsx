"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ChefProfileEditModal } from "@/components/modals/ChefProfileEditModal";
import { useGetReviewsByUserId } from "@/hooks/api/user/reviews/useGetReviewsByUserId";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EXPERIENCE_LEVELS, POSITION_LEVEL } from "@/lib/const/chef-profile";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useGetRestaurantCuisines } from "@/hooks/api/all/restaurantCuisines/useGetRestaurantCuisines";

export default function ChefProfile() {
  const { user, logout } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    data: cuisinesData,
    isLoading: isCuisinesLoading,
    error: cuisinesError,
  } = useGetRestaurantCuisines();

  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useGetReviewsByUserId({
    userId: user?.id ?? undefined,
  });
  console.log("reviewsData", reviewsData);

  const handleLogout = () => {
    logout();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-md">
        <p className="text-center text-red-500">ユーザーが見つかりません</p>
      </div>
    );
  }

  if (cuisinesError || reviewsError) {
    return (
      <div className="flex px-4">
        <ErrorPage />
      </div>
    );
  }

  if (isCuisinesLoading || isReviewsLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="スタッフ情報を読み込んでいます..."
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">プロフィール</h1>
        <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
          <Edit className="w-4 h-4 mr-2" />
          編集
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="reviews">レビュー</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profile_image} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="text-sm font-normal text-gray-600">{`${user.last_name_kana}${user.given_name_kana}`}</span>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">電話番号</p>
                  <p className="mt-1">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">生年月日</p>
                  <p className="mt-1">
                    {user.dateofbirth
                      ? format(new Date(user.dateofbirth), "yyyy/MM/dd", {
                          locale: ja,
                        })
                      : "未設定"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">住所</p>
                  <p className="mt-1">〒{user.postal_code}</p>
                  <p>{`${user.prefecture}${user.city}${user.town}${user.street}${user.address2}`}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* スキルセクション */}
          <Card>
            <CardHeader>
              <CardTitle>スキル・経験</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">スキル</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">調理経験年数</p>
                <p className="mt-1">{EXPERIENCE_LEVELS.find(level => level.value === user.experience_level)?.label}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">経験ポジション</p>
                <p className="mt-1">{POSITION_LEVEL.find(level => level.value === user.position_level)?.label}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">保有資格</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.certifications?.map((ertification, index) => (
                    <Badge key={index} variant="secondary">
                      {ertification}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ジャンル・自己紹介</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">ジャンル</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {cuisinesData?.filter(c => user.categories?.includes(c.id)).map(c => (
                    <Badge key={c.id} variant="secondary">
                      {c.category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">自己紹介</p>
                <p className="whitespace-pre-line mt-1">{user.bio}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          {reviewsData && reviewsData.length > 0 ? (
            <>
              {/* 平均評価 */}
              <Card>
                <CardHeader>
                  <CardTitle>評価の概要</CardTitle>
                  <CardDescription>
                    {reviewsData.length}件の評価
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i <
                                reviewsData.reduce(
                                  (acc, review) => acc + review.rating,
                                  0
                                ) /
                                  reviewsData.length
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div>
                          <span className="text-2xl font-bold">
                            {(
                              reviewsData.reduce(
                                (acc, review) => acc + review.rating,
                                0
                              ) / reviewsData.length
                            ).toFixed(1)}
                          </span>
                          <span className="text-muted-foreground ml-1">
                            / 5.0
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        全{reviewsData.length}件の平均
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* レビュー一覧 */}
              <Card>
                <CardHeader>
                  <CardTitle>レビュー一覧</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {reviewsData.map((review) => (
                      <div
                        key={review.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>
                            {format(
                              new Date(review.created_at),
                              "yyyy年MM月dd日",
                              { locale: ja }
                            )}
                          </span>
                          <span className="bg-gray-100 px-2 py-1 rounded-full">
                            {review.restaurant?.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Star className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    まだレビューがありません
                  </h3>
                  <p className="text-muted-foreground">
                    お仕事を完了すると、店舗からの評価が表示されます
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          ログアウト
        </Button>
      </div>

      <ChefProfileEditModal
        isOpen={isEditModalOpen}
        onCloseAction={handleEditModalClose}
        user={user}
        cuisinesData={cuisinesData}
      />
    </div>
  );
}
