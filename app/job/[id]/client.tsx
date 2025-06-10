"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Calendar,
  ArrowRight,
  Building2,
  Train,
  ScrollText,
  Star,
  PartyPopper,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApplyJobModal } from "@/components/modals/ApplyJobModal";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { GoogleMap } from "@/components/maps/GoogleMap";
import { useGetRestaurantReviewByRestaurantId } from "@/hooks/api/companyuser/reviews/useGetRestaurantReviewByRestaurantId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ja } from "date-fns/locale";
import { useGetWorksessionsByUserId } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserId";
import {
  ApplyCreatePayload,
  JobsDetailData,
} from "@/api/__generated__/base/data-contracts";
import { formatJapanHHMM } from "@/lib/functions";
import { useApplyJob } from "@/hooks/api/user/jobs/useApplyJob";
import { LoadingScreen } from "@/components/LoadingScreen";
import { getApi } from "@/api/api-factory";
import { Users } from "@/api/__generated__/base/Users";

// 時間のフォーマット関数を追加
const formatTime = (timestamp: number) => {
  return formatJapanHHMM(timestamp);
};

export function JobDetailClient({ jobDetail }: { jobDetail: JobsDetailData }) {
  const { toast } = useToast();
  const router = useRouter();
  const { user: authUser, loading } = useAuth();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(authUser);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data: workSessions } = useGetWorksessionsByUserId({
    userId: user?.id,
  });

  const { data: restaurantReview } = useGetRestaurantReviewByRestaurantId({
    restaurantId: Number(jobDetail.restaurant.id),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authUser?.id) {
        try {
          const userApi = getApi(Users);
          const { data } = await userApi.usersDetail(authUser.id, {
            headers: {
              "X-User-Type": "chef",
            }
          });
          setUser(data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
      }
    };

    fetchUserProfile();
  }, [authUser?.id]);

  const { trigger: applyJobTrigger } = useApplyJob({
    jobId: jobDetail.job.id,
    userId: user?.id,
  });

  // 重複している仕事の情報があれば取得
  const overlappingJob = workSessions?.find((session) => {
    if (session.status === "CANCELED_BY_CHEF" || session.status === "CANCELED_BY_RESTAURANT") {
      return false; // キャンセルされた仕事は無視
    }

    const targetDate = new Date(jobDetail.job.work_date);
    const sessionDate = new Date(session.job.work_date);
    if (targetDate.toDateString() !== sessionDate.toDateString()) {
      return false;
    }

    const targetStartTime = new Date(targetDate);
    targetStartTime.setHours(
      new Date(jobDetail.job.start_time * 1000).getHours(),
      new Date(jobDetail.job.start_time * 1000).getMinutes()
    );
    const targetEndTime = new Date(targetDate);
    targetEndTime.setHours(
      new Date(jobDetail.job.end_time * 1000).getHours(),
      new Date(jobDetail.job.end_time * 1000).getMinutes()
    );

    const sessionStartTime = new Date(sessionDate);
    sessionStartTime.setHours(
      new Date(session.job.start_time * 1000).getHours(),
      new Date(session.job.start_time * 1000).getMinutes()
    );
    const sessionEndTime = new Date(sessionDate);
    sessionEndTime.setHours(
      new Date(session.job.end_time * 1000).getHours(),
      new Date(session.job.end_time * 1000).getMinutes()
    );

    return (
      (targetStartTime >= sessionStartTime &&
        targetStartTime < sessionEndTime) ||
      (targetEndTime > sessionStartTime && targetEndTime <= sessionEndTime) ||
      (targetStartTime <= sessionStartTime && targetEndTime >= sessionEndTime)
    );
  });

  console.log("Overlapping Job:", overlappingJob);

  const applyToJob = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        description: "ログインしてください",
      });
      return;
    }

    if (!user.is_approved) {
      toast({
        variant: "destructive",
        description:
          "シェフとしての審査が完了していません。審査完了までお待ちください。",
      });
      return;
    }

    const workSession = workSessions?.find(
      (session) => session.job_id === jobDetail.job.id
    );

    if (workSession) {
      toast({
        variant: "destructive",
        description: "すでに応募済みです",
      });
      return;
    }

    if (overlappingJob) {
      toast({
        variant: "destructive",
        description: "この時間帯にはすでに他の仕事が入っています",
      });
      return;
    }

    const applicationData: ApplyCreatePayload = {
      user_id: user.id.toString(),
    };

    try {
      await applyJobTrigger(applicationData);
      setIsApplyModalOpen(false);
      setShowSuccessModal(true);

      // // カレンダーイベントのデータを作成
      // const eventData = {
      //   text: `${jobDetail.job.title} @ ${jobDetail.restaurant.name}`,
      //   dates: jobDetail.job.work_date,
      //   details: `勤務時間: ${formatTime(
      //     jobDetail.job.start_time
      //   )} - ${formatTime(jobDetail.job.end_time)}\n場所: ${
      //     jobDetail.restaurant.address
      //   }`,
      // };
    } catch (error) {
      if ((error as any).response?.data?.payload?.code === "already_applied") {
        toast({
            title: "エラーが発生しました",
            variant: "destructive",
            description: "応募が締め切られているため、応募できません",
        });

        // 応募モーダルを閉じて画面をリフレッシュする
        setIsApplyModalOpen(false);
        router.refresh();

        return;
      }

      toast({
        title: "エラーが発生しました",
        variant: "destructive",
        description: "応募に失敗しました。もう一度お試しください。",
      });
    }
  };

  const generateGoogleCalendarUrl = (event: {
    text: string;
    dates: string;
    details: string;
    startTime: number;
    endTime: number;
  }) => {
    // Create dates directly from timestamps and add 7 hours for JST
    const startDate = new Date(event.startTime);
    startDate.setTime(startDate.getTime());
    const endDate = new Date(event.endTime);
    endDate.setTime(endDate.getTime());

    // Format dates for Google Calendar
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.text,
      details: event.details,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  if (loading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <Header />
      </header>

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-4">
            <Link href="/" className="text-gray-500 hover:underline">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
            <span className="text-gray-500">{jobDetail.job.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Key Information Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md p-6">
                  {/* Date and Fee Banner */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">
                          {new Date(jobDetail.job.work_date).toLocaleDateString(
                            "ja-JP",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              weekday: "short",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {formatTime(jobDetail.job.start_time)} 〜{" "}
                          {formatTime(jobDetail.job.end_time)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Restaurant Name and Job Title */}
                  <div className="mb-6">
                    <h1 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                      {jobDetail.restaurant.name}
                    </h1>
                    <h2 className="text-lg text-gray-700">
                      {jobDetail.job.title}
                    </h2>
                  </div>

                  {/* Main Image */}
                  <div className="relative aspect-[16/9] mb-6">
                    <Image
                      src={jobDetail.job.image || "/placeholder.svg"}
                      alt={jobDetail.job.title}
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
                  </div>

                  {/* Status Badge and Apply Button */}
                  <div className="space-y-4">
                    <Badge
                      variant="secondary"
                      className={`text-sm ${
                        jobDetail.job.number_of_spots > 0 &&
                        !workSessions?.some(
                          (session) => session.job_id === jobDetail.job.id
                        ) &&
                        jobDetail.job.expiry_date &&
                        new Date(jobDetail.job.expiry_date) > new Date()
                          ? "bg-black text-white"
                          : "bg-gray-500 text-white"
                      }`}>
                      {jobDetail.job.number_of_spots > 0 &&
                      !workSessions?.some(
                        (session) => session.job_id === jobDetail.job.id
                      ) &&
                      jobDetail.job.expiry_date &&
                      new Date(jobDetail.job.expiry_date) > new Date()
                        ? `募集中`
                        : "締め切りました"}
                    </Badge>

                    {/* Job Description */}
                    <div className="pt-2">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {jobDetail.job.description}
                      </p>
                    </div>

                    {/* Reward Display for Mobile */}
                    <div className="flex items-center justify-between py-3 px-4 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">
                        報酬
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        {jobDetail.job.fee.toLocaleString()}円
                      </span>
                    </div>

                    <Button
                      onClick={() => setIsApplyModalOpen(true)}
                      disabled={
                        !user ||
                        !user.is_approved ||
                        jobDetail.job.number_of_spots === 0 ||
                        workSessions?.some(
                          (session) => session.job_id === jobDetail.job.id
                        ) ||
                        (jobDetail.job.expiry_date != null &&
                          new Date(jobDetail.job.expiry_date) <= new Date()) ||
                        overlappingJob != null
                      }
                      className={`w-full py-2 text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                        user &&
                        jobDetail.job.number_of_spots > 0 &&
                        !workSessions?.some(
                          (session) => session.job_id === jobDetail.job.id
                        ) &&
                        jobDetail.job.expiry_date != null &&
                        new Date(jobDetail.job.expiry_date) > new Date() &&
                        overlappingJob == null
                          ? "bg-orange-600 hover:bg-orange-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}>
                      {!user
                        ? "シェフとしてログインして応募する"
                        : !user.is_approved
                        ? "シェフとしての審査が完了していません"
                        : workSessions?.some(
                            (session) => session.job_id === jobDetail.job.id
                          )
                        ? "応募済み"
                        : jobDetail.job.number_of_spots === 0
                        ? "募集人数が上限に達しました"
                        : jobDetail.job.expiry_date != null &&
                          new Date(jobDetail.job.expiry_date) <= new Date()
                        ? "募集期間が終了しました"
                        : overlappingJob != null
                        ? `この時間帯には${overlappingJob.job.restaurant.name}の仕事が入っています`
                        : "応募する"}
                    </Button>
                  </div>
                </motion.div>

                {/* Tabbed Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-lg shadow-md p-6">
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="w-full mb-6">
                      <TabsTrigger value="details" className="flex-1">
                        募集要項
                      </TabsTrigger>
                      <TabsTrigger value="store" className="flex-1">
                        店舗情報
                      </TabsTrigger>
                      <TabsTrigger value="access" className="flex-1">
                        アクセス
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-8">
                      <div>
                        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                          <ScrollText className="h-4 w-4" />
                          業務内容
                        </h3>
                        <div className="text-sm space-y-1 whitespace-pre-wrap text-gray-700 leading-relaxed">
                          {jobDetail.job.task}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          アピールポイント
                        </h3>
                        <div className="text-sm space-y-1 whitespace-pre-wrap text-gray-700 leading-relaxed">
                          {jobDetail.job.point}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold mb-3">
                          必要なスキル・経験
                        </h3>
                        <div className="text-sm space-y-1 whitespace-pre-wrap text-gray-700 leading-relaxed">
                          {jobDetail.job.skill}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-base font-bold mb-3">持ち物</h3>
                          <div className="text-sm text-gray-700">
                            {jobDetail.job.whattotake}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-bold mb-3">服装規定</h3>
                          <div className="text-sm text-gray-700">
                            {jobDetail.job.note}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold mb-3">交通費</h3>
                        <div className="text-sm text-gray-700">
                          {jobDetail.job.transportation_type === "NONE"
                            ? "交通費なし"
                            : jobDetail.job.transportation_type === "MAX"
                            ? `上限${jobDetail.job.transportation_amount.toLocaleString()}円`
                            : `${jobDetail.job.transportation_amount.toLocaleString()}円`}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="store" className="space-y-6">
                      <div>
                        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          店舗情報
                        </h3>
                        {restaurantReview && restaurantReview.length > 0 && (
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-5 w-5 ${
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
                              <span className="text-lg font-bold">
                                {(
                                  restaurantReview.reduce(
                                    (acc, review) => acc + review.rating,
                                    0
                                  ) / restaurantReview.length
                                ).toFixed(1)}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({restaurantReview.length}件のレビュー)
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="space-y-4 text-sm text-gray-700">
                          <div>
                            <h4 className="font-medium mb-1">店舗名</h4>
                            <p>{jobDetail.restaurant.name}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">住所</h4>
                            <p>{jobDetail.restaurant.address}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">営業時間</h4>
                            <p>{jobDetail.restaurant.business_hours}</p>
                          </div>
                        </div>
                      </div>

                      {/* Reviews Section */}
                      <div>
                        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          シェフからのレビュー
                        </h3>
                        {restaurantReview && restaurantReview.length > 0 ? (
                          <div className="space-y-4">
                            {restaurantReview.map((review) => (
                              <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-50 rounded-lg p-4 shadow-sm">
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
                                  <span className="text-sm text-gray-500">
                                    {format(
                                      new Date(review.created_at),
                                      "yyyy/MM/dd",
                                      { locale: ja }
                                    )}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {review.comment}
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-xs font-medium text-gray-600">
                                      {review.user?.name?.[0] || "?"}
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {review.user?.name || "匿名のシェフ"}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            まだレビューがありません
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="access" className="space-y-6">
                      <div>
                        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                          <Train className="h-4 w-4" />
                          アクセス情報
                        </h3>
                        <div className="space-y-4 text-sm text-gray-700">
                          <div>
                            <h4 className="font-medium mb-1">最寄り駅</h4>
                            <p>{jobDetail.restaurant.station}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">アクセス方法</h4>
                            <p>{jobDetail.restaurant.access}</p>
                          </div>
                          <div className="mt-4">
                            <GoogleMap
                              address={jobDetail.restaurant.address}
                              className="h-48 sm:h-64 w-full rounded-lg shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </div>
            </div>

            {/* Sidebar - Desktop only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block lg:col-span-1">
              <div className="border rounded-lg p-6 bg-white sticky top-4 space-y-6 shadow-md">
                {/* Quick Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="text-sm text-gray-500">募集状況</div>
                    <Badge
                      variant="secondary"
                      className={`${
                        jobDetail.job.number_of_spots > 0 &&
                        !workSessions?.some(
                          (session) => session.job_id === jobDetail.job.id
                        ) &&
                        jobDetail.job.expiry_date &&
                        new Date(jobDetail.job.expiry_date) > new Date()
                          ? "bg-black text-white"
                          : "bg-gray-500 text-white"
                      }`}>
                      {jobDetail.job.number_of_spots > 0 &&
                      !workSessions?.some(
                        (session) => session.job_id === jobDetail.job.id
                      ) &&
                      jobDetail.job.expiry_date &&
                      new Date(jobDetail.job.expiry_date) > new Date()
                        ? `募集中`
                        : "締め切り"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="text-sm text-gray-500">勤務日</div>
                    <div className="text-sm font-medium">
                      {new Date(jobDetail.job.work_date).toLocaleDateString(
                        "ja-JP",
                        {
                          month: "2-digit",
                          day: "2-digit",
                          weekday: "short",
                        }
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="text-sm text-gray-500">時間</div>
                    <div className="text-sm font-medium">
                      {formatTime(jobDetail.job.start_time)} 〜{" "}
                      {formatTime(jobDetail.job.end_time)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="text-sm text-gray-500">報酬</div>
                    <div className="text-lg font-bold text-orange-600">
                      {jobDetail.job.fee.toLocaleString()}円
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <Button
                  onClick={() => setIsApplyModalOpen(true)}
                  disabled={
                    !user ||
                    !user.is_approved ||
                    jobDetail.job.number_of_spots === 0 ||
                    workSessions?.some(
                      (session) => session.job_id === jobDetail.job.id
                    ) ||
                    (jobDetail.job.expiry_date != null &&
                      new Date(jobDetail.job.expiry_date) <= new Date()) ||
                    overlappingJob != null
                  }
                  className={`w-full py-2 text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                    user &&
                    jobDetail.job.number_of_spots > 0 &&
                    !workSessions?.some(
                      (session) => session.job_id === jobDetail.job.id
                    ) &&
                    jobDetail.job.expiry_date &&
                    new Date(jobDetail.job.expiry_date) > new Date() &&
                    overlappingJob == null
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  {!user
                    ? "シェフとしてログインして応募する"
                    : !user.is_approved
                    ? "シェフとしての審査が完了していません"
                    : workSessions?.some(
                        (session) => session.job_id === jobDetail.job.id
                      )
                    ? "応募済み"
                    : jobDetail.job.number_of_spots === 0
                    ? "募集人数が上限に達しました"
                    : jobDetail.job.expiry_date != null &&
                      new Date(jobDetail.job.expiry_date) <= new Date()
                    ? "募集期間が終了しました"
                    : overlappingJob != null
                    ? `この時間帯には${overlappingJob.job.restaurant.name}の仕事が入っています`
                    : "応募する"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Image
                src="/chef_illust/chef_logo.png"
                alt="CHEFDOM Logo"
                width={120}
                height={30}
                className="text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400 mb-4">
            <Link href="#" className="hover:underline">
              運営会社
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:underline">
              利用規約
            </Link>

            <span>|</span>
            <Link
              href="https://corp.cookbiz.co.jp/privacy-policy/"
              className="hover:underline">
              プライバシーポリシー
            </Link>
            <span>|</span>
            <Link
              href="https://corp.cookbiz.co.jp/privacy-policy-treatment/"
              className="hover:underline">
              個人情報保護方針
            </Link>
            <span>|</span>
            <Link
              href="https://corp.cookbiz.co.jp/privacy-policy-treatment/"
              className="hover:underline">
              個人情報の取扱いについて
            </Link>
            <span>|</span>
            <Link
              href="https://corp.cookbiz.co.jp/tokushoho"
              className="hover:underline">
              特定商取引法に基づく表記
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:underline">
              お問い合わせ
            </Link>
          </div>

          <div className="text-center text-xs text-gray-400">
            © CHEFDOM Co.,Ltd.
          </div>
        </div>
      </footer>

      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={jobDetail.job}
        onSubmit={applyToJob}
        isSubmitting={isSubmitting}
      />

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <PartyPopper className="w-8 h-8 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">
                おめでとうございます！
              </h3>
              <p className="text-gray-600">仕事がマッチしました！</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 w-full">
              <a
                href={generateGoogleCalendarUrl({
                  text: `${jobDetail.job.title} @ ${jobDetail.restaurant.name}`,
                  dates: jobDetail.job.work_date,
                  details: `勤務時間: ${formatTime(
                    jobDetail.job.start_time
                  )} - ${formatTime(jobDetail.job.end_time)}\n場所: ${
                    jobDetail.restaurant.address
                  }`,
                  startTime: jobDetail.job.start_time,
                  endTime: jobDetail.job.end_time,
                })}
                target="_blank"
                rel="noopener noreferrer">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  カレンダーに追加
                </Button>
              </a>

              <Button
                onClick={() => router.push(`/chef/job/${jobDetail.job.id}`)}
                className="w-full flex items-center justify-center gap-2"
                style={{ backgroundColor: "#DB3F1C" }}>
                <ArrowRight className="w-4 h-4" />
                仕事の詳細を確認
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
