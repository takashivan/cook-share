"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  MapPin,
  Calendar,
  ArrowRight,
  PartyPopper,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { ApplyJobModal } from "@/components/modals/ApplyJobModal";
import { applicationApi } from "@/lib/api/application";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  business_hours: string;
  contact_info: string;
  profile_image: string;
  station: string;
  access: string;
}

interface JobDetail {
  job: {
    id: number;
    title: string;
    description: string;
    work_date: string;
    start_time: number;
    end_time: number;
    hourly_rate: number;
    status: string;
    image: string;
    task: string;
    skill: string;
    whattotake: string;
    note: string;
    point: string;
    transportation: string;
    number_of_spots: number;
    fee: number;
  };
  restaurant: Restaurant;
}

interface CreateApplicationParams {
  job_id: number;
  status: string;
  user_id: string;
  application_date: string;
}

// 時間のフォーマット関数を追加
const formatTime = (timestamp: number) => {
  return format(new Date(timestamp * 1000), "HH:mm");
};

export function JobDetailClient({ jobDetail }: { jobDetail: JobDetail }) {
  const [activeTab, setActiveTab] = useState<"details" | "store" | "access">(
    "details"
  );
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMobile();
  const router = useRouter();
  const { user } = useAuth();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { toast } = useToast();

  const applyToJob = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        description: "ログインしてください",
      });
      return;
    }

    const applicationData: CreateApplicationParams = {
      job_id: jobDetail.job.id,
      status: "ACCEPTED",
      user_id: user.id.toString(),
      application_date: new Date().toISOString(),
    };

    try {
      const response = await applicationApi.createApplication(applicationData);
      console.log("response", response);
      setApplicationId(response.id.toString());
      setIsApplyModalOpen(false);
      toast({
        description: "応募が完了しました",
      });
    } catch (error) {
      console.error("Error applying to job:", error);
      toast({
        variant: "destructive",
        description: "応募に失敗しました",
      });
    }
  };

  const handleApply = async () => {
    try {
      await applyToJob();

      // カレンダーイベントのデータを作成
      const eventData = {
        text: `${jobDetail.job.title} @ ${jobDetail.restaurant.name}`,
        dates: jobDetail.job.work_date,
        details: `勤務時間: ${formatTime(jobDetail.job.start_time)} - ${formatTime(jobDetail.job.end_time)}\n場所: ${jobDetail.restaurant.address}`,
      };

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to apply:", error);
      toast({
        title: "エラーが発生しました",
        description: "応募に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  const generateGoogleCalendarUrl = (event: {
    text: string;
    dates: string;
    details: string;
  }) => {
    const startDate = new Date(event.dates);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 8); // 仮で8時間の勤務時間を設定

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.text,
      details: event.details,
      dates: `${startDate.toISOString().replace(/-|:|\.\d+/g, "")}/${endDate.toISOString().replace(/-|:|\.\d+/g, "")}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

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
              {/* Date and Time */}
              <div className="inline-block border rounded-md mb-4">
                <div className="flex items-center">
                  <div className="px-4 py-2 border-r">
                    <span className="font-medium">
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
                  <div className="px-4 py-2">
                    <span>
                      {new Date(
                        jobDetail.job.start_time * 1000
                      ).toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      〜{" "}
                      {new Date(
                        jobDetail.job.end_time * 1000
                      ).toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Title */}
              <h1 className="text-xl font-bold mb-4">
                {jobDetail.restaurant.name}
              </h1>

              {/* Job Image */}
              <div className="mb-6">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={jobDetail.job.image || "/placeholder.svg"}
                    alt={jobDetail.job.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">
                  {jobDetail.job.title}
                </h2>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {jobDetail.job.description}
                </p>
                <Badge
                  variant="secondary"
                  className="bg-black text-white text-sm mb-0">
                  残り{jobDetail.job.number_of_spots}名募集中
                </Badge>
                <div className="flex justify-center mt-3">
                  <Button
                    onClick={() => setIsApplyModalOpen(true)}
                    disabled={!user}
                    className={`w-full rounded-md py-2 flex items-center justify-center gap-2 ${
                      user
                        ? "bg-orange-600 hover:bg-orange-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}>
                    {user ? "応募する" : "シェフとしてログインして応募する"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Tabs */}
              {isMobile && (
                <div className="mb-4 border-t pt-4">
                  <div className="flex border rounded-md overflow-hidden">
                    <button
                      className={`flex-1 py-2 text-center text-sm ${
                        activeTab === "details"
                          ? "bg-gray-100 font-medium"
                          : "bg-white"
                      }`}
                      onClick={() => setActiveTab("details")}>
                      募集要項
                    </button>
                    <button
                      className={`flex-1 py-2 text-center text-sm ${
                        activeTab === "store"
                          ? "bg-gray-100 font-medium"
                          : "bg-white"
                      }`}
                      onClick={() => setActiveTab("store")}>
                      店舗情報
                    </button>
                    <button
                      className={`flex-1 py-2 text-center text-sm ${
                        activeTab === "access"
                          ? "bg-gray-100 font-medium"
                          : "bg-white"
                      }`}
                      onClick={() => setActiveTab("access")}>
                      アクセス
                    </button>
                  </div>
                </div>
              )}

              {/* Job Details - Desktop or Mobile with active tab */}
              {(!isMobile || (isMobile && activeTab === "details")) && (
                <>
                  <hr className="my-8" />
                  <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">募集要項</h2>

                    <div className="space-y-6">
                      {/* Working Hours */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">勤務時間</h3>
                          <p className="text-sm">
                            {" "}
                            <span>
                              {new Date(
                                jobDetail.job.start_time * 1000
                              ).toLocaleTimeString("ja-JP", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              〜{" "}
                              {new Date(
                                jobDetail.job.end_time * 1000
                              ).toLocaleTimeString("ja-JP", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Specific Shift */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">
                            想定の勤務時間・終了時間
                          </h3>
                          <p className="text-sm">
                            <span>
                              {new Date(
                                jobDetail.job.start_time * 1000
                              ).toLocaleTimeString("ja-JP", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              〜{" "}
                              {new Date(
                                jobDetail.job.end_time * 1000
                              ).toLocaleTimeString("ja-JP", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Specific Shift */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">報酬額</h3>
                          <p className="text-sm">
                            <span>{jobDetail.job.fee.toLocaleString()}円</span>
                          </p>
                        </div>
                      </div>
                      {/* Hourly Wage
                      <div className="border border-red-500 p-4 rounded-md">
                        <div className="flex">
                          <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                          <div>
                            <h3 className="font-medium mb-1">
                              時間あたりの報酬額
                            </h3>
                            <p className="text-sm">****円</p>
                          </div>
                        </div>

                        <div className="flex mt-4">
                          <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                          <div>
                            <h3 className="font-medium mb-1">
                              時間あたりの店舗報酬額
                            </h3>
                            <p className="text-sm">****円</p>
                          </div>
                        </div>

                        <div className="flex mt-4">
                          <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                          <div>
                            <h3 className="font-medium mb-1">想定報酬総額</h3>
                            <p className="text-sm">****円</p>
                          </div>
                        </div>

                        <div className="flex justify-center mt-4">
                          <div className="text-center">
                            <p className="text-sm mb-2">
                              アカウント登録後に確認できます。
                            </p>
                            <div className="flex justify-center mb-2">
                              <Button className="bg-white border border-red-500 text-red-500 hover:bg-red-50 rounded-md px-4 py-2 flex items-center gap-2">
                                シェフの皆様にご登録
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <Link
                              href="#"
                              className="text-sm text-gray-500 flex items-center justify-center gap-1">
                              ログインはこちら
                            </Link>
                          </div>
                        </div>
                      </div> */}

                      {/* Transportation */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">交通費</h3>
                          <p className="text-sm">
                            {" "}
                            {jobDetail.job.transportation}
                          </p>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">
                            想定の業務委託内容
                          </h3>
                          <div className="text-sm space-y-1 whitespace-pre-wrap">
                            {jobDetail.job.task}
                          </div>
                        </div>
                      </div>

                      {/* Appeal Points */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">アピールポイント</h3>
                          <div className="text-sm space-y-1 whitespace-pre-wrap">
                            {jobDetail.job.point}
                          </div>
                        </div>
                      </div>

                      {/* Required Skills */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">
                            必要なスキル・経験
                          </h3>
                          <div className="text-sm space-y-1 whitespace-pre-wrap">
                            {jobDetail.job.skill}
                          </div>
                        </div>
                      </div>

                      {/* Dress Code */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">持ち物</h3>
                          <div className="text-sm space-y-1">
                            {jobDetail.job.whattotake}
                          </div>
                        </div>
                      </div>

                      {/* Dress Regulations */}
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">服装規定</h3>
                          <div className="text-sm space-y-1">
                            {jobDetail.job.note}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Store Information - Desktop or Mobile with active tab */}
              {(!isMobile || (isMobile && activeTab === "store")) && (
                <>
                  {!isMobile && <hr className="my-8" />}
                  <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">店舗情報</h2>

                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">店舗名</h3>
                          <p className="text-sm">{jobDetail.restaurant.name}</p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">住所</h3>
                          <p className="text-sm">
                            {jobDetail.restaurant.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">営業時間</h3>
                          <p className="text-sm">
                            {jobDetail.restaurant.business_hours}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Access Information - Desktop or Mobile with active tab */}
              {(!isMobile || (isMobile && activeTab === "access")) && (
                <>
                  {!isMobile && <hr className="my-8" />}
                  <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">アクセス</h2>

                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">最寄り駅</h3>
                          <p className="text-sm">
                            {jobDetail.restaurant.station}
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0 w-3 h-3 rounded-sm bg-red-500 mr-2 mt-1.5"></div>
                        <div>
                          <h3 className="font-medium mb-1">アクセス方法</h3>
                          <p className="text-sm">
                            {jobDetail.restaurant.access}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="bg-gray-200 h-64 w-full rounded-md flex items-center justify-center">
                          <p className="text-gray-500">地図が表示されます</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar - Desktop only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="border rounded-md p-4 bg-white sticky top-4">
                <div className="text-center py-2 border-b mb-2">
                  <h3 className="font-medium">募集要項</h3>
                </div>
                <div className="text-center py-2 border-b mb-2">
                  <h3 className="font-medium">店舗情報</h3>
                </div>
                <div className="text-center py-2 border-b mb-4">
                  <h3 className="font-medium">アクセス</h3>
                </div>

                <Button
                  onClick={() => setIsApplyModalOpen(true)}
                  disabled={!user}
                  className={`w-full rounded-md py-2 flex items-center justify-center gap-2 ${
                    user
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  {user ? "応募する" : "シェフとしてログインして応募する"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Image
                src="/chef_illust/chef_logo.png"
                alt="CookChef Logo"
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
            <Link href="#" className="hover:underline">
              シェフ向け利用規約
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              飲食業社向け利用規約
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              プライバシーポリシー
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              お問い合わせ
            </Link>
          </div>

          <div className="text-center text-xs text-gray-400">
            © cookchef Co.,Ltd.
          </div>
        </div>
      </footer>

      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={jobDetail.job}
        onSubmit={handleApply}
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
                  details: `勤務時間: ${formatTime(jobDetail.job.start_time)} - ${formatTime(jobDetail.job.end_time)}\n場所: ${jobDetail.restaurant.address}`,
                })}
                target="_blank"
                rel="noopener noreferrer">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  カレンダーに追加
                </Button>
              </a>

              <Button
                onClick={() => router.push(`/chef/job/${applicationId}`)}
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
