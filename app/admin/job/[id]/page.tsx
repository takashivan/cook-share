"use client";

import { useState, useEffect, useRef } from "react";
import { use } from "react";
import Link from "next/link";
import {
  formatJapanHHMM,
  formatWorkSessionJapaneseStatus,
  formatJobPostingJapaneseStatus,
} from "@/lib/functions";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  MessageSquare,
  QrCode,
  CheckCircle,
  MoreHorizontal,
  AlertCircle,
  XCircle,
  Users,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import TextareaAutosize from "react-textarea-autosize";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { QRCodeSVG } from "qrcode.react";
import { RestaurantReviewModal } from "@/components/modals/RestaurantReviewModal";
import { FaStar } from "react-icons/fa";
import { EditJobModal } from "@/components/modals/EditJobModal";
import { useUserCancelWorksessionByRestaurant } from "@/hooks/api/companyuser/worksessions/useCancelWorksessionByRestaurant";
import { useNoShowWorksessionByRestaurant } from "@/hooks/api/companyuser/worksessions/useNoShowWorksessionByRestaurant";
import { toast } from "@/hooks/use-toast";
import { useGetReviewsByUserId } from "@/hooks/api/user/reviews/useGetReviewsByUserId";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetJob } from "@/hooks/api/companyuser/jobs/useGetJob";
import { useGetWorksessionsByJobId } from "@/hooks/api/companyuser/worksessions/useGetWorksessionsByJobId";
import {
  JobsDetailData,
  JobsPartialUpdatePayload,
  WorksessionsRestaurantTodosListData,
} from "@/api/__generated__/base/data-contracts";
import { useVerifyWorksession } from "@/hooks/api/companyuser/worksessions/useVerifyWorksession";
import { useUpdateJob } from "@/hooks/api/companyuser/jobs/useUpdateJob";
import { getApi } from "@/api/api-factory";
import { Worksessions } from "@/api/__generated__/base/Worksessions";
import { useSubscriptionMessagesByCompanyUserId } from "@/hooks/api/companyuser/messages/useSubscriptionMessagesByCompanyUserId";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useUpdateReadMessageByCompanyUser } from "@/hooks/api/companyuser/messages/useUpdateReadMessageByCompanyUser";
import { useSubscriptionUnreadMessagesByRestaurantId } from "@/hooks/api/companyuser/messages/useSubscriptionUnreadMessagesByRestaurantId";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { differenceInDays } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateJobChangeRequest } from "@/hooks/api/companyuser/jobChengeRequests/useCreateJobChangeRequest";
import { useGetJobChangeRequestByWorksessionId } from "@/hooks/api/companyuser/jobChengeRequests/useGetJobChangeRequestByWorksessionId";
import { useDeleteJobChangeRequest } from "@/hooks/api/companyuser/jobChengeRequests/useDeleteJobChangeRequest";

interface PageParams {
  params: Promise<{ id: string }>;
}

// モバイル判定関数
function isMobile() {
  if (typeof window === "undefined") return false;
  return /iPhone|Android.+Mobile|iPad|iPod/.test(navigator.userAgent);
}

export default function JobDetail({ params }: PageParams) {
  const { id: jobId } = use(params);
  const { user } = useCompanyAuth();
  const router = useRouter();

  const { data: jobData, error: jobError } = useGetJob({
    jobId: Number(jobId),
  });
  const { data: workSessions, error: workSessionsError } =
    useGetWorksessionsByJobId({ jobId: Number(jobId) });

  const job = jobData?.job;
  const restaurant = jobData?.restaurant;

  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(
    null
  );
  const [messageInput, setMessageInput] = useState("");
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedWorkSession, setSelectedWorkSession] = useState<
    WorksessionsRestaurantTodosListData[number] | null
  >(null);
  const { data: reviewsData } = useGetReviewsByUserId({
    userId: selectedWorkSession?.user_id || "",
  });
  console.log("reviewsData", reviewsData);
  const [isChefReviewModalOpen, setIsChefReviewModalOpen] = useState(false);
  const [chefReview, setChefReview] = useState<any>(null);
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellationPenalty, setCancellationPenalty] = useState<{
    penalty: number;
    message: string;
    status: string;
  } | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isNoShowModalOpen, setIsNoShowModalOpen] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isChangeRequestModalOpen, setIsChangeRequestModalOpen] =
    useState(false);
  const [changeRequest, setChangeRequest] = useState({
    work_date: "",
    start_time: "",
    end_time: "",
    task: "",
    fee: "",
    reason: "",
  });

  const { trigger: updateJobTrigger } = useUpdateJob({
    jobId: Number(jobId),
    companyId: restaurant?.companies_id ?? undefined,
    restaurantId: restaurant?.id ?? undefined,
  });
  const { trigger: verifyWorksessionTrigger } = useVerifyWorksession({
    worksessionId: selectedWorkSession?.id || 0,
    jobId: Number(jobId),
  });

  const { trigger: cancelWorksessionTrigger } =
    useUserCancelWorksessionByRestaurant({
      worksession_id: selectedWorkSession?.id || 0,
      reason: cancelReason,
    });
  const { trigger: noShowWorksessionTrigger } =
    useNoShowWorksessionByRestaurant({
      worksession_id: selectedWorkSession?.id || 0,
    });

  // メッセージの取得
  const { messagesData, sendMessage } = useSubscriptionMessagesByCompanyUserId({
    companyUserId: user?.id,
    workSessionId: selectedWorkSession?.id,
    applicationId: selectedWorkSession?.application_id ?? undefined,
  });

  // 未読メッセージの取得
  const { unreadMessagesData } = useSubscriptionUnreadMessagesByRestaurantId({
    restaurantId: restaurant?.id,
  });

  const { trigger: updateReadMessageTrigger } =
    useUpdateReadMessageByCompanyUser({
      companyUserId: user?.id,
      workSessionId: selectedWorkSession?.id,
      restaurantId: restaurant?.id,
    });

  const { trigger: createJobChangeRequest } = useCreateJobChangeRequest({
    jobChangeRequestId: jobId,
    job_id: Number(jobId),
    user_id: selectedWorkSession?.user_id || "",
    requested_by: selectedWorkSession?.restaurant_id || 0,
    proposed_changes: JSON.stringify(changeRequest),
    status: "PENDING",
    reason: changeRequest.reason,
    worksession_id: selectedWorkSession?.id || 0,
  });

  const { data: existingChangeRequest } = useGetJobChangeRequestByWorksessionId(
    {
      worksessionId: selectedWorkSession?.id,
    }
  );

  const { trigger: deleteJobChangeRequest } = useDeleteJobChangeRequest({
    jobChangeRequestId: existingChangeRequest?.[0]?.id?.toString() || "",
    job_id: job?.id || 0,
    user_id: selectedWorkSession?.user_id || "",
    requested_by: user?.id ? Number(user.id) : 0,
    proposed_changes: "",
    status: "PENDING",
    reason: "",
    worksession_id: selectedWorkSession?.id || 0,
  });

  // シェフが応募している場合は自動的に選択
  useEffect(() => {
    if (workSessions && workSessions.length > 0) {
      setSelectedWorkSession(workSessions[0]);
      setSelectedApplicant(workSessions[0].id);
    }
  }, [workSessions]);

  useEffect(() => {
    if (messagesData?.messages && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesData?.messages]);

  useEffect(() => {
    if (
      !messagesData?.messages ||
      messagesData.messages.length === 0 ||
      !selectedWorkSession
    ) {
      return;
    }

    // 最新のメッセージを取得（message_seqが最大のもの）
    let latestMessage = null;
    for (const message of messagesData.messages) {
      if (!latestMessage || message.message_seq > latestMessage.message_seq) {
        latestMessage = message;
      }
    }

    if (!latestMessage) return;
    // 既読情報が最新のメッセージと同じ場合は何もしない
    if (
      latestMessage.message_seq ===
      messagesData.restaurant_last_read?.last_read_message_seq
    )
      return;

    // 既読情報更新
    updateReadMessageTrigger({
      worksession_id: selectedWorkSession.id,
      last_read_message_seq: latestMessage.message_seq,
    });
  }, [messagesData?.messages, selectedWorkSession, updateReadMessageTrigger]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() || !selectedWorkSession) return;

    try {
      await sendMessage(messageInput);
      setMessageInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "エラー",
        description: "メッセージの送信に失敗しました。",
        variant: "destructive",
      });
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
        feedback: comment,
      });

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

  // 型チェックとデータ変換
  const formattedJob: JobsDetailData["job"] | null = job
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
    const workDate = new Date(job.work_date);
    const daysDifference = differenceInDays(workDate, now);

    if (daysDifference >= 2) {
      return {
        penalty: 0,
        message: "2日以上前のキャンセルは違約金なしで可能です。",
        status: "cancelled_by_restaurant",
      };
    } else {
      return {
        penalty: job.fee,
        message:
          "1日前以降のキャンセルは報酬予定額の100%の違約金とキャンセル手数料が発生します。",
        status: "cancelled_by_restaurant_late",
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
      // await cancelJob(job.id, cancellationPenalty.status, cancelReason);
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

  const handleNoShowClick = () => {
    setIsNoShowModalOpen(true);
  };

  const handleNoShowConfirm = async () => {
    if (!selectedWorkSession) return;

    try {
      await noShowWorksessionTrigger();
      toast({
        title: "ノーショー報告完了",
        description: "シェフのノーショーを報告しました。",
      });
      setIsNoShowModalOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "エラー",
        description: "ノーショー報告に失敗しました。",
        variant: "destructive",
      });
    }
  };

  const shouldShowNoShowOption = (workSession: any) => {
    if (!workSession || !job) return false;
    const now = new Date();
    const startTime = new Date(job.start_time);
    return now > startTime;
  };

  const handleOpenChangeRequestModal = (
    workSession: WorksessionsRestaurantTodosListData[number]
  ) => {
    if (!job) return;

    // 既存の変更リクエストがある場合は、削除オプション付きのモーダルを表示
    if (existingChangeRequest && existingChangeRequest.length > 0) {
      setSelectedWorkSession(workSession);
      setIsChangeRequestModalOpen(true);
      return;
    }

    // 現在のジョブデータを初期値として設定
    setChangeRequest({
      work_date: job.work_date || "",
      start_time: job.start_time
        ? format(new Date(job.start_time), "HH:mm")
        : "",
      end_time: job.end_time ? format(new Date(job.end_time), "HH:mm") : "",
      task: job.task || "",
      fee: job.fee?.toString() || "",
      reason: "",
    });
    setSelectedWorkSession(workSession);
    setIsChangeRequestModalOpen(true);
  };

  const handleChangeRequestSubmit = async () => {
    if (!selectedWorkSession || !job) return;

    // 既存の変更リクエストがある場合は、処理を中止
    if (existingChangeRequest && existingChangeRequest.length > 0) {
      toast({
        title: "変更リクエストが既に存在します",
        description:
          "既存の変更リクエストが承認または拒否されるまで、新しいリクエストを作成できません。",
        variant: "destructive",
      });
      return;
    }

    try {
      // 変更リクエストのデータ構造を作成
      const changeRequestData = {
        job_id: job.id,
        user_id: selectedWorkSession.user_id,
        requested_by: selectedWorkSession.restaurant_id,
        proposed_changes: {
          work_date: changeRequest.work_date,
          start_time: new Date(
            changeRequest.work_date + "T" + changeRequest.start_time
          ).getTime(),
          end_time: new Date(
            changeRequest.work_date + "T" + changeRequest.end_time
          ).getTime(),
          task: changeRequest.task,
          fee: parseInt(changeRequest.fee, 10),
        },
        status: "PENDING" as const,
        reason: changeRequest.reason,
        worksession_id: selectedWorkSession.id,
        as_is: {
          work_date: job.work_date,
          start_time: job.start_time,
          end_time: job.end_time,
          task: job.task,
          fee: job.fee,
        },
        updated_at: new Date().getTime(),
      };

      // 変更リクエストを作成
      await createJobChangeRequest(changeRequestData);

      // メッセージとして変更リクエストを送信
      const message = `【業務内容変更リクエスト】
日付: ${changeRequest.work_date}
時間: ${changeRequest.start_time}〜${changeRequest.end_time}
業務内容: ${changeRequest.task}
報酬: ¥${changeRequest.fee}

変更理由:
${changeRequest.reason}

※この変更はシェフの承認が必要です。`;

      await sendMessage(message);

      toast({
        title: "変更リクエストを送信しました",
        description: "シェフの承認をお待ちください。",
      });

      setIsChangeRequestModalOpen(false);
      setChangeRequest({
        work_date: "",
        start_time: "",
        end_time: "",
        task: "",
        fee: "",
        reason: "",
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "変更リクエストの送信に失敗しました。",
        variant: "destructive",
      });
    }
  };

  const handleDeleteChangeRequest = async () => {
    try {
      await deleteJobChangeRequest();

      // 変更リクエストの詳細を取得
      if (!existingChangeRequest?.[0]?.proposed_changes) {
        throw new Error("変更リクエストの詳細が見つかりません");
      }

      const changes = existingChangeRequest[0].proposed_changes as {
        work_date: string;
        start_time: number;
        end_time: number;
        task: string;
        fee: number;
      };

      // メッセージとして変更リクエストのキャンセルを送信
      const message = `【変更リクエストのキャンセル】
以下の変更リクエストをキャンセルしました：

日付: ${changes.work_date}
時間: ${format(new Date(changes.start_time), "HH:mm")}〜${format(
        new Date(changes.end_time),
        "HH:mm"
      )}
業務内容: ${changes.task}
報酬: ¥${changes.fee}`;

      await sendMessage(message);

      toast({
        title: "変更リクエストを削除しました",
        description: "新しい変更リクエストを作成できます。",
      });
      setIsChangeRequestModalOpen(false);
    } catch (error) {
      toast({
        title: "エラー",
        description: "変更リクエストの削除に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="space-y-3">
        <nav className="flex items-center justify-between gap-2">
          <Button asChild variant="link" className="p-0 h-auto">
            <Link
              href={`/admin/stores/${restaurant?.id}`}
              className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm text-blue-600 hover:underline line-clamp-1">
                {restaurant?.name}の求人一覧
              </span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
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
                      <span className="hidden sm:inline ml-2">編集</span>
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
            <Button asChild size="sm" variant="outline">
              <Link href={`/job/${jobId}`} target="_blank">
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">求人を表示</span>
              </Link>
            </Button>
          </div>
        </nav>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold line-clamp-2">
            {job?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge className="bg-green-100 text-sm text-green-800 hover:bg-green-100">
              {formatJobPostingJapaneseStatus(job?.status || "")}
            </Badge>
            <Badge variant="outline" className="text-sm bg-white">
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
          </div>
        </div>
      </div>
      {/* メインコンテンツ */}{" "}
      <div className="grid grid-cols-1 gap-6">
        {/* シェフとのチャット */}
        <Card className="h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)] flex flex-col">
          {selectedWorkSession ? (
            <>
              <CardHeader className="pb-3 flex-row items-center justify-between space-y-0 border-b">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="hover:opacity-80 transition-opacity">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
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
                      </button>
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
                              <h4 className="text-sm font-medium mb-1">資格</h4>
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
                          {reviewsData && reviewsData.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">
                                店舗からの評価
                              </h4>
                              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                {reviewsData.map((review) => (
                                  <div
                                    key={review.id}
                                    className="border rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <FaStar
                                            key={i}
                                            className={`h-3 w-3 ${
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
                                    <p className="text-sm text-gray-700 mb-1">
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
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2 flex-wrap">
                      <span className="truncate">
                        {selectedWorkSession.user.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        シェフ
                      </span>
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {formatWorkSessionJapaneseStatus(
                          selectedWorkSession.status
                        )}
                      </Badge>
                    </CardTitle>
                    {/* <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      応募日:{" "}
                      {format(
                        new Date(selectedWorkSession.created_at),
                        "yyyy/MM/dd HH:mm"
                      )}
                    </p> */}
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 ml-2 flex-shrink-0">
                  {selectedWorkSession.status === "SCHEDULED" && (
                    <>
                      <Dialog
                        open={isQrDialogOpen}
                        onOpenChange={setIsQrDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 p-0">
                            <QrCode className="h-4 w-4" />
                            <span className="hidden sm:inline ml-2">
                              チェックインQR
                            </span>
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
                                value={selectedWorkSession.id.toString()}
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 sm:h-9 sm:w-9 p-0">
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
                          <DropdownMenuItem
                            onClick={() => {
                              if (selectedWorkSession) {
                                handleOpenChangeRequestModal(
                                  selectedWorkSession
                                );
                              }
                            }}
                            className="text-black-600 focus:text-black-600 focus:bg-black-50">
                            <Pencil className="h-4 w-4 mr-2" />
                            シェフに業務内容の変更を依頼する
                          </DropdownMenuItem>
                          {shouldShowNoShowOption(selectedWorkSession) && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedWorkSession(selectedWorkSession);
                                handleNoShowClick();
                              }}
                              className="text-red-600 focus:text-red-600 focus:bg-red-50">
                              <XCircle className="h-4 w-4 mr-2" />
                              ノーショー報告
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}

                  {selectedWorkSession.status === "COMPLETED" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 p-0"
                      onClick={() => {
                        setSelectedWorkSession(selectedWorkSession);
                        setIsReviewModalOpen(true);
                      }}>
                      <CheckCircle className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">
                        完了報告を確認
                      </span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <div className="flex-1 flex flex-col min-h-0">
                <CardContent
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4 scroll-smooth">
                  <div className="space-y-4">
                    {selectedWorkSession.status === "CANCELED_BY_CHEF" ? (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                        <XCircle className="h-12 w-12 text-red-400 mx-auto" />
                        <h3 className="text-lg font-medium text-red-600">
                          シェフからキャンセルされました
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          このお仕事のチャットはできません
                        </p>
                      </div>
                    ) : selectedWorkSession.status ===
                      "CANCELED_BY_RESTAURANT" ? (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                        <XCircle className="h-12 w-12 text-red-400 mx-auto" />
                        <h3 className="text-lg font-medium text-red-600">
                          キャンセルしました
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          このお仕事のチャットはできません
                        </p>
                      </div>
                    ) : (
                      <div>
                        {messagesData?.messages?.length ? (
                          <div>
                            {messagesData.messages.map((message) => (
                              <div
                                key={message.id}
                                className={`flex ${
                                  message.sender_type === "restaurant"
                                    ? "justify-end"
                                    : "justify-start"
                                } mb-4`}>
                                <div
                                  className={`max-w-[80%] rounded-lg p-3 ${
                                    message.sender_type === "restaurant"
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted"
                                  }`}>
                                  <p className="text-sm whitespace-pre-wrap">
                                    {message.content}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {format(
                                      new Date(message.created_at),
                                      "yyyy/MM/dd HH:mm"
                                    )}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                            <div className="space-y-2">
                              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                              <h3 className="text-lg font-medium">
                                まだメッセージがありません
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                シェフとのチャットを始めましょう
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
                {selectedWorkSession.status !== "CANCELED_BY_CHEF" &&
                  selectedWorkSession.status !== "CANCELED_BY_RESTAURANT" && (
                    <div className="border-t bg-background">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm text-muted-foreground mb-2">
                          クイックメッセージ
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setMessageInput(
                                "はじめまして！ご応募ありがとうございます。"
                              )
                            }>
                            👋 はじめまして
                          </Button>
                          {job?.whattotake && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setMessageInput(
                                  `当日の持ち物について確認させていただきます。\n\n以下の持ち物をご準備ください：\n${job.whattotake}`
                                )
                              }>
                              📋 持ち物の確認
                            </Button>
                          )}
                          {job?.work_date && job?.start_time && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setMessageInput(
                                  `当日の集合時間と場所の確認をさせていただきます。\n\n日時：${format(
                                    new Date(job.work_date),
                                    "MM月dd日"
                                  )} ${formatJapanHHMM(
                                    job.start_time
                                  )}\n場所：${restaurant?.address || ""}`
                                )
                              }>
                              🕒 集合時間の確認
                            </Button>
                          )}
                          {job?.note && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setMessageInput(
                                  `その他の注意事項について確認させていただきます。\n\n${job.note}`
                                )
                              }>
                              ℹ️ 注意事項の確認
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardFooter className="p-4">
                        <form
                          onSubmit={handleSendMessage}
                          className="flex w-full gap-2">
                          <TextareaAutosize
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="メッセージを入力..."
                            minRows={1}
                            maxRows={6}
                            className="flex-1 resize-none bg-white px-3 py-2 border rounded-md text-base focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition"
                            onKeyDown={(
                              e: React.KeyboardEvent<HTMLTextAreaElement>
                            ) => {
                              // PC: Enterで送信、Shift+Enterで改行
                              if (
                                e.key === "Enter" &&
                                !e.shiftKey &&
                                !e.nativeEvent.isComposing &&
                                !isMobile()
                              ) {
                                e.preventDefault();
                                const form = (e.target as HTMLTextAreaElement)
                                  .form;
                                if (form) form.requestSubmit();
                              }
                              // Shift+Enterで改行
                              if (e.key === "Enter" && e.shiftKey) {
                                setMessageInput((prev) => prev + "\n");
                              }
                              // モバイル: Enterは常に改行
                              if (e.key === "Enter" && isMobile()) {
                                setMessageInput((prev) => prev + "\n");
                              }
                            }}
                          />
                          <Button type="submit" disabled={!messageInput.trim()}>
                            送信
                          </Button>
                        </form>
                      </CardFooter>
                    </div>
                  )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">まだ応募がありません</h3>
              <p className="text-sm text-muted-foreground mt-2">
                シェフが応募すると、ここにチャットが表示されます
              </p>
            </div>
          )}
        </Card>
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
            ? `${format(
                new Date(selectedWorkSession.job.start_time),
                "HH:mm"
              )}〜${format(
                new Date(selectedWorkSession.job.end_time),
                "HH:mm"
              )}`
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
      {formattedJob && (
        <EditJobModal
          isOpen={isEditJobModalOpen}
          onClose={() => setIsEditJobModalOpen(false)}
          onSubmit={handleEditJobSubmit}
          job={formattedJob}
        />
      )}
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
                {cancellationPenalty?.penalty !== undefined &&
                  cancellationPenalty.penalty > 0 && (
                    <div className="mt-2">
                      <p className="text-red-800 font-semibold">
                        違約金: ¥{cancellationPenalty.penalty.toLocaleString()}
                      </p>
                    </div>
                  )}
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ※
                  度重なるキャンセルや不当な理由でのキャンセルは、今後のご利用停止となる可能性があります。
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="cancel-reason"
                  className="block text-sm font-medium text-gray-700">
                  キャンセル理由
                </label>
                <textarea
                  id="cancel-reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="キャンセルの理由を具体的にご記入ください"
                  required
                  className="w-full h-24 p-2 border rounded-md text-sm bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition"
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
                <label
                  htmlFor="confirm-cancel"
                  className="text-sm text-gray-600">
                  上記の内容を確認し、キャンセルに同意します
                </label>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsCancelModalOpen(false)}>
              閉じる
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelConfirm}
              disabled={!isConfirmed || !cancelReason}
              className="bg-red-600 hover:bg-red-700">
              キャンセルを確定
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isNoShowModalOpen} onOpenChange={setIsNoShowModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ノーショー報告</AlertDialogTitle>
            <AlertDialogDescription>
              シェフが来ませんでした。報告しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsNoShowModalOpen(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={handleNoShowConfirm}>
              報告する
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {/* 変更リクエストモーダル */}
      <Dialog
        open={isChangeRequestModalOpen}
        onOpenChange={setIsChangeRequestModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {existingChangeRequest && existingChangeRequest.length > 0
                ? "変更リクエストの管理"
                : "業務内容変更リクエスト"}
            </DialogTitle>
            <DialogDescription>
              {existingChangeRequest && existingChangeRequest.length > 0
                ? existingChangeRequest[0].status === "REJECTED"
                  ? "変更リクエストが拒否されました。新しいリクエストを作成するには、既存のリクエストを削除してください。"
                  : existingChangeRequest[0].status === "APPROVED"
                  ? "変更リクエストが承認されています。新しいリクエストを作成するには、既存のリクエストを削除してください。"
                  : "既存の変更リクエストが存在します。新しいリクエストを作成するには、既存のリクエストを削除してください。"
                : "シェフに業務内容の変更をリクエストします。変更はシェフの承認が必要です。"}
            </DialogDescription>
          </DialogHeader>
          {existingChangeRequest && existingChangeRequest.length > 0 ? (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">現在の変更リクエスト</h4>
                <div className="space-y-2 text-sm">
                  {(() => {
                    const changes = existingChangeRequest[0]
                      .proposed_changes as {
                      work_date: string;
                      start_time: number;
                      end_time: number;
                      task: string;
                      fee: number;
                    };
                    return (
                      <>
                        <p>日付: {changes.work_date}</p>
                        <p>
                          時間: {format(new Date(changes.start_time), "HH:mm")}
                          〜{format(new Date(changes.end_time), "HH:mm")}
                        </p>
                        <p>業務内容: {changes.task}</p>
                        <p>報酬: ¥{changes.fee}</p>
                        <p>
                          ステータス:{" "}
                          {existingChangeRequest[0].status === "PENDING"
                            ? "承認待ち"
                            : existingChangeRequest[0].status === "APPROVED"
                            ? "承認済み"
                            : "拒否済み"}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsChangeRequestModalOpen(false)}>
                  閉じる
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteChangeRequest}
                  disabled={existingChangeRequest[0].status === "PENDING"}>
                  {existingChangeRequest[0].status === "PENDING"
                    ? "変更リクエストを削除"
                    : "既存のリクエストを削除して新規作成"}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="work_date">作業日</Label>
                    <Input
                      id="work_date"
                      type="date"
                      value={changeRequest.work_date}
                      onChange={(e) =>
                        setChangeRequest({
                          ...changeRequest,
                          work_date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fee">報酬</Label>
                    <Input
                      id="fee"
                      type="number"
                      placeholder="例: 12000"
                      value={changeRequest.fee}
                      onChange={(e) =>
                        setChangeRequest({
                          ...changeRequest,
                          fee: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_time">開始時間</Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={changeRequest.start_time}
                      onChange={(e) =>
                        setChangeRequest({
                          ...changeRequest,
                          start_time: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_time">終了時間</Label>
                    <Input
                      id="end_time"
                      type="time"
                      value={changeRequest.end_time}
                      onChange={(e) =>
                        setChangeRequest({
                          ...changeRequest,
                          end_time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task">業務内容</Label>
                  <TextareaAutosize
                    id="task"
                    placeholder="変更後の業務内容を入力してください"
                    value={changeRequest.task}
                    onChange={(e) =>
                      setChangeRequest({
                        ...changeRequest,
                        task: e.target.value,
                      })
                    }
                    minRows={2}
                    className="w-full px-3 py-2 border rounded-md text-sm bg-white resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">変更理由</Label>
                  <TextareaAutosize
                    id="reason"
                    placeholder="変更理由を入力してください"
                    value={changeRequest.reason}
                    onChange={(e) =>
                      setChangeRequest({
                        ...changeRequest,
                        reason: e.target.value,
                      })
                    }
                    minRows={2}
                    className="w-full px-3 py-2 border rounded-md text-sm bg-white resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsChangeRequestModalOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={handleChangeRequestSubmit}>
                  リクエストを送信
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
