"use client";

import { useState, useEffect, useRef } from "react";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Job } from "@/types";
import {
  formatToJapanDate,
  formatToJapanTime,
  formatJapanHHMM,
  formatWorkSessionJapaneseStatus,
  formatJobPostingJapaneseStatus,
} from "@/lib/functions";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  ExternalLink,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Store,
  User,
  QrCode,
  CheckCircle,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import useSWR from "swr";
import { jobApi } from "@/lib/api/job";
import { applicationApi } from "@/lib/api/application";
import { workSessionApi } from "@/lib/api/workSession";
import { messageApi, CreateMessageParams } from "@/lib/api/message";
import { QRCodeSVG } from "qrcode.react";
import { RestaurantReviewModal } from "@/components/modals/RestaurantReviewModal";
import { chefReviewApi } from "@/lib/api/chefReview";
import { FaStar } from "react-icons/fa";
import { EditJobModal } from "@/components/modals/EditJobModal";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetJob } from "@/hooks/api/jobs/useGetJob";
import { useUserCancelWorksessionByRestaurant } from "@/hooks/api/worksessions/userCancelWorksessionByRestaurant";
import { useGetWorksessionsByJobId } from "@/hooks/api/worksessions/useGetWorksessionsByJobId";
import { JobsDetailData, JobsPartialUpdatePayload, WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { useVerifyWorksession } from "@/hooks/api/worksessions/useVerifyWorksession";
import { useUpdateJob } from "@/hooks/api/jobs/useUpdateJob";
import { getApi } from "@/api/api-factory";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
import { useSubscriptionMessagesByCompanyUserId } from "@/hooks/api/messages/useSubscriptionMessagesByCompanyUserId";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useUpdateReadMessageByCompanyUser } from "@/hooks/api/messages/useUpdateReadMessageByCompanyUser";
import { useSubscriptionUnreadMessagesByRestaurantId } from "@/hooks/api/messages/useSubscriptionUnreadMessagesByRestaurantId";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { differenceInDays, differenceInHours } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: number;
  content: string;
  sender_type: string;
  created_at: string;
}

interface PageParams {
  params: Promise<{ id: string }>;
}

export default function JobDetail({ params }: PageParams) {
  const { id: jobId } = use(params);
  const { user } = useCompanyAuth();
  const router = useRouter();

  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(
    null
  );
  const [messageInput, setMessageInput] = useState("");
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedWorkSession, setSelectedWorkSession] = useState<WorksessionsRestaurantTodosListData[number] | null>(null);
  const [isChefReviewModalOpen, setIsChefReviewModalOpen] = useState(false);
  const [chefReview, setChefReview] = useState<any>(null);
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellationPenalty, setCancellationPenalty] = useState<{
    penalty: number;
    message: string;
    status: string;
  } | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const { data: jobData, error: jobError } = useGetJob({ jobId: Number(jobId) });
  const { data: workSessions, error: workSessionsError } = useGetWorksessionsByJobId({ jobId: Number(jobId) });

  const job = jobData?.job;
  const restaurant = jobData?.restaurant;

  const { trigger: updateJobTrigger } = useUpdateJob({ jobId: Number(jobId), companyId: restaurant?.companies_id ?? undefined, restaurantId: restaurant?.id ?? undefined});
  const { trigger: verifyWorksessionTrigger } = useVerifyWorksession({ worksessionId: selectedWorkSession?.id || 0, jobId: Number(jobId) });
  const { trigger: cancelWorksessionTrigger } = useUserCancelWorksessionByRestaurant({
    worksession_id: selectedWorkSession?.id || 0,
    reason: cancelReason
  });
  // メッセージの取得
  const { messagesData, sendMessage } = useSubscriptionMessagesByCompanyUserId({
    companyUserId: user?.id,
    workSessionId: selectedWorkSession?.id,
    applicationId: selectedWorkSession?.application_id,
  })

  // 未読メッセージの取得
  const { unreadMessagesData } = useSubscriptionUnreadMessagesByRestaurantId({
    restaurantId: restaurant?.id,
  });

  const { trigger: updateReadMessageTrigger } = useUpdateReadMessageByCompanyUser({
    companyUserId: user?.id,
    workSessionId: selectedWorkSession?.id,
    restaurantId: restaurant?.id,
  })

  const handleSendMessage = async () => {
    try {
      sendMessage(messageInput)
      setMessageInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleReviewSubmit = async (
    rating: number,
    comment: string,
    approved: boolean
  ) => {
    if (!selectedWorkSession) return;

    try {
      await verifyWorksessionTrigger({
        rating,
        feedback: comment
      })

      const worksessionsClient = getApi(Worksessions);
      const review = await worksessionsClient.chefReviewList(
        selectedWorkSession.id
      );
      setChefReview(review);
      setIsChefReviewModalOpen(true);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // メッセージが更新されたらスクロール
    scrollToBottom();

    if (!messagesData || !messagesData.messages || messagesData.messages.length === 0) {
      return;
    }

    // 最新のメッセージを取得（message_seqが最大のもの）
    let latestMessage = null;
    for (const message of messagesData.messages) {
      if (!latestMessage || message.message_seq > latestMessage.message_seq) {
        latestMessage = message;
      }
    }

    console.log('latestMessage', latestMessage)

    if (!latestMessage || !selectedWorkSession) return;
    // 既読情報が最新のメッセージと同じ場合は何もしない
    if (latestMessage.message_seq === messagesData.restaurant_last_read?.last_read_message_seq) return;

    // 既読情報更新
    updateReadMessageTrigger({
      worksession_id: selectedWorkSession.id,
      last_read_message_seq: latestMessage.message_seq,
    });
  }, [messagesData, selectedWorkSession, scrollToBottom, updateReadMessageTrigger]);

  // 型チェックとデータ変換
  const formattedJob: JobsDetailData['job'] | null = job
    ? {
        id: job.id || 0,
        created_at: job.created_at ? Number(job.created_at) : 0,
        title: job.title || "",
        description: job.description || "",
        work_date: job.work_date || "",
        start_time: job.start_time ? Number(job.start_time) : 0,
        end_time: job.end_time ? Number(job.end_time) : 0,
        hourly_rate: job.hourly_rate || 0,
        required_skills: job.required_skills || [],
        status: job.status || "",
        updated_at: job.updated_at ? Number(job.updated_at) : 0,
        restaurant_id: job.restaurant_id || 0,
        image: job.image || "",
        task: job.task || "",
        skill: job.skill || "",
        whattotake: job.whattotake || "",
        note: job.note || "",
        point: job.point || "",
        transportation: job.transportation || "",
        is_approved: job.is_approved || false,
        number_of_spots: job.number_of_spots || 1,
        fee: job.fee || 12000,
        expiry_date: job.expiry_date ? Number(job.expiry_date) : 0,
      }
    : null;

  const handleEditJobSubmit = async (data: JobsPartialUpdatePayload) => {
    try {
      await updateJobTrigger(data);
      setIsEditJobModalOpen(false);
      toast({
        title: "求人を更新しました",
        description: "求人の情報が更新されました。",
      });
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "求人の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  const calculateCancellationPenalty = () => {
    if (!job) return null;
    
    const now = new Date();
    console.log("job.work_date:", job.work_date);
    console.log("job.start_time:", job.start_time);
    
    // work_dateをDateオブジェクトに変換
    const workDate = new Date(job.work_date);
    // start_timeをDateオブジェクトに変換
    const startTime = new Date(job.start_time);
    
    // 仕事の開始日時を設定
    workDate.setHours(startTime.getHours());
    workDate.setMinutes(startTime.getMinutes());
    
    console.log("現在時刻:", now);
    console.log("仕事開始時刻:", workDate);
    console.log("workDate.getTime():", workDate.getTime());
    
    // 時間差を計算
    const hoursDifference = differenceInHours(workDate, now);
    console.log("時間差:", hoursDifference, "時間");

    if (hoursDifference >= 24) {
      console.log("24時間以上前のキャンセル");
      return {
        penalty: 0,
        message: "2日以上前のキャンセルは違約金なしで可能です。",
        status: "cancelled_by_restaurant"
      };
    } else {
      console.log("24時間以内のキャンセル");
      return {
        penalty: job.fee,
        message: "1日前以降のキャンセルは報酬予定額の100%の違約金とキャンセル手数料が発生します。",
        status: "cancelled_by_restaurant_late"
      };
    }
  };

  const handleCancelClick = () => {
    if (!job) return;
    setCancellationPenalty(calculateCancellationPenalty());
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!cancellationPenalty || !job || !isConfirmed || !cancelReason) return;

    try {
      // TODO: APIを呼び出してキャンセル処理を実行
      await cancelWorksessionTrigger();
      toast({
        title: "キャンセル完了",
        description: "お仕事のキャンセルが完了しました。",
      });
      setIsCancelModalOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "エラー",
        description: "キャンセル処理に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/stores/${restaurant?.id}`}
              className="text-sm text-blue-600 hover:underline flex items-center">
              <Store className="h-4 w-4 mr-1" />
              {restaurant?.name}
            </Link>
          </div>

          <h1 className="text-2xl font-bold mt-1">{job?.title}</h1>

          <div className="flex items-center gap-3 mt-1 text-muted-foreground text-sm">
            <Badge className="bg-green-100 text-sm text-green-800 hover:bg-green-100">
              {formatJobPostingJapaneseStatus(job?.status || "")}
            </Badge>
            <Badge variant="outline" className="text-sm bg-white py-1">
              {job?.work_date
                ? format(new Date(job.work_date), "MM/dd")
                : "未定"}
              &nbsp;&nbsp;
              {job?.start_time && job?.end_time ? (
                <>
                  {formatJapanHHMM(job.start_time)}〜
                  {formatJapanHHMM(job.end_time)}
                </>
              ) : (
                "未定"
              )}
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditJobModalOpen(true)}
                      disabled={workSessions && workSessions.length > 0}>
                      <Edit className="h-4 w-4" />
                      編集
                    </Button>
                  </span>
                </TooltipTrigger>
                {workSessions && workSessions.length > 0 && (
                  <TooltipContent>
                    <p>応募があるため編集できません</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <Button asChild size="sm">
              <Link href={`/job/${jobId}`} target="_blank">
                <ExternalLink className="h-4 w-4 " />
                表示
              </Link>
            </Button>
          </div>
        </div>
        <div className="ml-auto"></div>
      </div>

      {/* メインコンテンツ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム - 求人概要とシェフリスト */}
        <div className="lg:col-span-1 space-y-6">
          {/* 求人概要カード */}

          {/* シェフリスト */}
          <Card>
            {/* <CardHeader className="pb-3">
              <CardTitle className="text-lg">シェフ一覧</CardTitle>
              <CardDescription>
                全 {workSessions?.length || 0} 名
              </CardDescription>
            </CardHeader> */}
            <CardContent className="p-0">
              <div className="divide-y">
                {workSessions?.map((session) => {
                  const unreadMessageData = unreadMessagesData?.find(
                    (unreadMessageData) => unreadMessageData.unread_messages.some((message) => message.worksession_id === session.id)
                  );
                  const unreadMessageCount = unreadMessageData
                    ? unreadMessageData.unread_messages.length
                    : 0;

                  return (
                    <div
                      key={session.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors relative ${
                        selectedApplicant === session.id ? "bg-gray-50" : ""
                      }`}
                      onClick={() => {
                        setSelectedApplicant(session.id);
                        setSelectedWorkSession(session);
                      }}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={session.user.profile_image || "/chef-logo.png"}
                            alt={session.user.name.charAt(0)}
                          />
                          <AvatarFallback>
                            {session.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">
                              {session.user.name}
                              &nbsp;
                              <span className="text-xs text-muted-foreground">
                                シェフ
                              </span>
                            </p>
                            <Badge variant="outline" className=" text-xs">
                              {formatWorkSessionJapaneseStatus(session.status)}
                            </Badge>
                            {unreadMessageCount > 0 && (
                              <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white">
                                {unreadMessageCount}
                              </Badge>
                            )}
                            {/* <p className="text-xs text-muted-foreground">
                              {format(new Date(session.created_at), "MM/dd")}
                            </p> */}
                          </div>

                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {session.user.skills?.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">求人概要</CardTitle>
              <CardDescription>
                採用状況: {workSessions?.length || 0}/
                {job?.number_of_spots || 0}名
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-40 w-full overflow-hidden rounded-md">
                <Image
                  src={job?.image || "/placeholder.svg"}
                  alt={job?.title || ""}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm">{job?.description}</p>

                <div>
                  <h4 className="text-sm font-medium mb-1">
                    必要なスキル・経験
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {job?.required_skills?.map((skill: string, i: number) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">業務内容</h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {job?.task
                      ?.split("\n")
                      .map((task: string, i: number) => (
                        <li key={i}>{task}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* 右カラム - シェフとのチャット */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {selectedWorkSession ? (
              <>
                <CardHeader className="pb-3 flex-row items-center justify-between space-y-0 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={
                          selectedWorkSession.user.profile_image ||
                          "/chef-logo.png"
                        }
                        alt={selectedWorkSession.user.name}
                      />
                      <AvatarFallback>
                        {selectedWorkSession.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {selectedWorkSession.user.name}
                        &nbsp;
                        <span className="text-xs text-muted-foreground">
                          シェフ
                        </span>
                        <Badge variant="outline" className="ml-2 text-sm">
                          {formatWorkSessionJapaneseStatus(
                            selectedWorkSession.status
                          )}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        応募日:{" "}
                        {format(
                          new Date(selectedWorkSession.created_at),
                          "yyyy/MM/dd HH:mm"
                        )}
                      </p>
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
                          <DialogTitle>シェフプロフィール</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage
                                src={
                                  selectedWorkSession.user.profile_image ||
                                  "/chef-logo.png"
                                }
                                alt={selectedWorkSession.user.name}
                              />
                              <AvatarFallback>
                                {selectedWorkSession.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-medium">
                                {selectedWorkSession.user.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {selectedWorkSession.user.experience_level}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-1">
                                経歴・スキル
                              </h4>
                              <p className="text-sm">
                                {selectedWorkSession.user.bio}
                              </p>
                            </div>
                            {selectedWorkSession.user.skills?.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-1">
                                  スキル
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {selectedWorkSession.user.skills.map(
                                    (skill: string, index: number) => (
                                      <Badge key={index} variant="secondary">
                                        {skill}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                            {selectedWorkSession.user.certifications?.length >
                              0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-1">
                                  資格
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {selectedWorkSession.user.certifications.map(
                                    (cert: string, index: number) => (
                                      <Badge key={index} variant="secondary">
                                        {cert}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {selectedWorkSession.status === "SCHEDULED" && (
                      <>
                        <Dialog
                          open={isQrDialogOpen}
                          onOpenChange={setIsQrDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <QrCode className="h-4 w-4 mr-2" />
                              チェックインQR
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>チェックインQRコード</DialogTitle>
                              <DialogDescription>
                                シェフにこのQRコードを提示してください
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center justify-center p-4">
                              <div className="bg-white p-4 rounded-lg shadow-md">
                                <QRCodeSVG
                                  value={selectedWorkSession.application_id}
                                  size={200}
                                  level="H"
                                  includeMargin={true}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedWorkSession(selectedWorkSession);
                                handleCancelClick();
                              }}
                              className="text-red-600 focus:text-red-600 focus:bg-red-50">
                              <XCircle className="h-4 w-4 mr-2" />
                              キャンセル
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}

                    {selectedWorkSession.status === "COMPLETED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedWorkSession(selectedWorkSession);
                          setIsReviewModalOpen(true);
                        }}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        完了報告を確認
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                  {/* <TabsList className="mx-4 mt-2">
                    <TabsTrigger value="chat" className="flex-1">
                      チャット
                    </TabsTrigger>
                    <TabsTrigger value="details" className="flex-1">
                      詳細情報
                    </TabsTrigger>
                  </TabsList> */}

                  <TabsContent
                    value="chat"
                    className="flex-1 flex flex-col p-4 overflow-hidden">
                    <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[calc(100vh-400px)]">
                      {messagesData?.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender_type === "restaurant" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.sender_type === "restaurant"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}>
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender_type === "restaurant"
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}>
                              {format(
                                new Date(message.created_at),
                                "MM/dd HH:mm"
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Textarea
                        placeholder="メッセージを入力..."
                        className="flex-1 resize-none"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            !e.nativeEvent.isComposing
                          ) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        rows={1}
                      />
                      <Button size="icon" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">送信</span>
                      </Button>
                    </div>
                  </TabsContent>

                  {/* <TabsContent value="details" className="p-4 overflow-y-auto">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">勤務情報</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              勤務日
                            </p>
                            <p className="text-sm">
                              {format(
                                new Date(selectedWorkSession.job.work_date),
                                "yyyy/MM/dd"
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              勤務時間
                            </p>
                            <p className="text-sm">
                              {format(
                                new Date(selectedWorkSession.check_in_time),
                                "HH:mm"
                              )}
                              〜
                              {format(
                                new Date(selectedWorkSession.check_out_time),
                                "HH:mm"
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              ステータス
                            </p>
                            <p className="text-sm">
                              {selectedWorkSession.status === "SCHEDULED"
                                ? "お仕事開始前"
                                : selectedWorkSession.status === "IN_PROGRESS"
                                  ? "勤務中"
                                  : selectedWorkSession.status === "COMPLETED"
                                    ? "勤務完了"
                                    : selectedWorkSession.status}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">シェフ情報</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              名前
                            </p>
                            <p className="text-sm">
                              {selectedWorkSession.user.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              スキル
                            </p>
                            <p className="text-sm">
                              {selectedWorkSession.user.skills?.join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent> */}
                </Tabs>
              </>
            ) : (
              <CardContent className="p-8 flex flex-col items-center justify-center h-[500px] text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  シェフを選択してください
                </h3>
                <p className="text-muted-foreground">
                  左側のリストからシェフを選択すると、詳細情報とチャットが表示されます。
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      <RestaurantReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        chefName={selectedWorkSession?.user.name || ""}
        chefImage={selectedWorkSession?.user.profile_image}
        jobTitle={selectedWorkSession?.job.title || ""}
        jobDate={
          selectedWorkSession?.job.work_date
            ? format(new Date(selectedWorkSession.job.work_date), "yyyy/MM/dd")
            : "未定"
        }
        jobTime={
          selectedWorkSession?.job.start_time &&
          selectedWorkSession?.job.end_time
            ? `${format(new Date(selectedWorkSession.job.start_time), "HH:mm")}〜${format(new Date(selectedWorkSession.job.end_time), "HH:mm")}`
            : "未定"
        }
      />

      <Dialog
        open={isChefReviewModalOpen}
        onOpenChange={setIsChefReviewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>お疲れ様でした！</DialogTitle>
            <DialogDescription>
              シェフからの評価が届いています
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {chefReview ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-5 w-5 ${
                          i < chefReview.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ({chefReview.rating}点)
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">シェフからのコメント</h3>
                  <p className="text-sm">{chefReview.comment}</p>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                シェフからの評価はまだありません
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsChefReviewModalOpen(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {formattedJob && 
        <EditJobModal
          isOpen={isEditJobModalOpen}
          onClose={() => setIsEditJobModalOpen(false)}
          onSubmit={handleEditJobSubmit}
          job={formattedJob}
        />
      }

      <AlertDialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              お仕事のキャンセル確認
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-800 font-medium">
                  {cancellationPenalty?.message}
                </p>
                {cancellationPenalty?.penalty !== undefined && cancellationPenalty.penalty > 0 && (
                  <div className="mt-2">
                    <p className="text-red-800 font-semibold">
                      違約金: ¥{cancellationPenalty.penalty.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ※ 度重なるキャンセルや不当な理由でのキャンセルは、今後のご利用停止となる可能性があります。
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="cancel-reason" className="block text-sm font-medium text-gray-700">
                  キャンセル理由
                </label>
                <textarea
                  id="cancel-reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full h-24 p-2 border rounded-md text-sm bg-white"
                  placeholder="キャンセルの理由を具体的にご記入ください"
                  required
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="confirm-cancel"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="confirm-cancel" className="text-sm text-gray-600">
                  上記の内容を確認し、キャンセルに同意します
                </label>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setIsCancelModalOpen(false)}>
              閉じる
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelConfirm}
              disabled={!isConfirmed || !cancelReason}
              className="bg-red-600 hover:bg-red-700"
            >
              キャンセルを確定
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
