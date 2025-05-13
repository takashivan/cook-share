"use client";

import { useState, useEffect } from "react";
import { Edit, CreditCard, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ChefProfileEditModal } from "@/components/modals/ChefProfileEditModal";
import { useGetReviewsByUserId } from "@/hooks/api/user/reviews/useGetReviewsByUserId";
import { getUserProfile, UserProfile } from "@/lib/api/user";
import { createStripeAccountLink } from "@/lib/api/user";
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
import { motion } from "framer-motion";
import Image from "next/image";

export default function ChefProfile() {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(authUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  const { data: reviewsData } = useGetReviewsByUserId({
    userId: authUser?.id || "",
  });
  console.log("reviewsData", reviewsData);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authUser?.id) {
        try {
          const fullProfile = await getUserProfile(authUser.id);
          setUser(fullProfile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [authUser?.id]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-md">
        <p className="text-center text-red-500">ユーザーが見つかりません</p>
      </div>
    );
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = async (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
  };

  const handleStripeAccountLink = async () => {
    if (user.id) {
      try {
        const res = await createStripeAccountLink(user.id);
        if (res.response.result.url) {
          window.location.href = res.response.result.url;
        }
      } catch (error) {
        console.error("Error creating Stripe account link:", error);
      }
    }
  };

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
                  <AvatarImage src={authUser?.profile_image} />
                  <AvatarFallback>{authUser?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{authUser?.name}</h2>
                  <p className="text-muted-foreground">
                    {authUser?.experience_level}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    メールアドレス
                  </p>
                  <p>{authUser?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">電話番号</p>
                  <p>{authUser?.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* スキルセクション */}
          <Card>
            <CardHeader>
              <CardTitle>スキル</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {authUser?.skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <div>
                <p className="text-sm text-muted-foreground">自己紹介</p>
                <p>{authUser?.bio}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">誕生日</p>
                <p>{authUser?.dateofbirth}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">資格</p>
                <p>{authUser?.certifications}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">経験レベル</p>
                <p>{authUser?.experience_level}</p>
              </div>
            </CardContent>
          </Card>

          {/* 支払い情報 */}
          <Card>
            <CardHeader>
              <CardTitle>連携設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stripe連携カード */}
              <motion.div
                whileHover={{
                  y: -4,
                  boxShadow: "0 8px 32px rgba(80,80,200,0.10)",
                }}
                className="flex items-center bg-white rounded-lg shadow p-4 mb-2 transition">
                <div className="flex-shrink-0 mr-4">
                  <Image
                    src="/logos/Stripe.png"
                    alt="Stripe"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    Stripe連携
                  </div>
                  <div className="text-gray-500 text-sm mb-2">
                    {user.stripe_verified
                      ? "Stripeアカウントが登録されています。"
                      : "報酬受取にはStripe連携が必須です。"}
                  </div>
                  <Button
                    variant="outline"
                    className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    onClick={handleStripeAccountLink}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    {user.stripe_verified ? "連携済み" : "連携する"}
                  </Button>
                </div>
              </motion.div>
              {/* LINE連携カード */}
              <motion.div
                whileHover={{
                  y: -4,
                  boxShadow: "0 8px 32px rgba(0,200,100,0.10)",
                }}
                className="flex items-center bg-white rounded-lg shadow p-4 mb-2 transition">
                <div className="flex-shrink-0 mr-4">
                  <Image
                    src="/logos/LINE.png"
                    alt="LINE"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    LINE連携
                  </div>
                  <div className="text-gray-500 text-sm mb-2">
                    {user.line_user_id
                      ? "LINEと連携済みです。"
                      : "LINE連携でお仕事の通知が届きます。"}
                  </div>
                  <Button
                    variant="outline"
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
                    onClick={() => router.push("/chef/line-connect/liff")}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {user.line_user_id ? "連携済み" : "連携する"}
                  </Button>
                </div>
              </motion.div>
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
        onClose={handleEditModalClose}
        onSave={handleSave}
        user={user}
      />
    </div>
  );
}
