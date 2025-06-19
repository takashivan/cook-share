"use client";

import { useState, useEffect, useRef } from "react";
import { use } from "react";
import Link from "next/link";
import {
  formatJapanHHMM,
  formatSlashDateTime,
} from "@/lib/functions";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  MessageSquare,
  QrCode,
  CheckCircle,
  XCircle,
  Users,
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
import TextareaAutosize from "react-textarea-autosize";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { RestaurantReviewModal } from "@/components/modals/RestaurantReviewModal";
import { FaStar } from "react-icons/fa";
import { EditJobModal } from "@/components/modals/EditJobModal";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetJob } from "@/hooks/api/all/jobs/useGetJob";
import { useGetWorksessionsByJobId } from "@/hooks/api/companyuser/worksessions/useGetWorksessionsByJobId";
import {
  JobsPartialUpdatePayload,
  WorksessionsRestaurantTodosListData,
} from "@/api/__generated__/base/data-contracts";
import { useUpdateJob } from "@/hooks/api/companyuser/jobs/useUpdateJob";
import { useSubscriptionMessagesByCompanyUserId } from "@/hooks/api/companyuser/messages/useSubscriptionMessagesByCompanyUserId";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useUpdateReadMessageByCompanyUser } from "@/hooks/api/companyuser/messages/useUpdateReadMessageByCompanyUser";
import { useGetRestaurantReviewByWorksessionId } from "@/hooks/api/companyuser/reviews/useGetRestaurantReviewByWorksessionId";
import { useMarkReadMultipleCompanyUserNotifications } from "@/hooks/api/companyuser/companyUserNotifications/useMarkReadMultipleCompanyUserNotifications";
import { useGetCompanyUserNotificationsByUserId } from "@/hooks/api/companyuser/companyUserNotifications/useGetCompanyUserNotificationsByUserId";
import { RestaurantReviewCompleteModal } from "@/components/modals/RestaurantReviewCompleteModal";
import { CheckInQRModal } from "@/components/modals/CheckInQRModal";
import { JobStatusBadgeForAdmin } from "@/components/badge/JobStatusBadgeForAdmin";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { AdminJobActionsMenu } from "@/components/dropdownMenu/AdminJobActionsMenu";
import { ChefProfileForAdminModal } from "@/components/modals/ChefProfileForAdminModal";
import { RestaurantRejectWorksessionModal } from "@/components/modals/RestaurantRejectWorksessionModal";

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

  const [selectedWorkSession, setSelectedWorkSession] = useState<
    WorksessionsRestaurantTodosListData[number] | null
  >(null);

  const [messageInput, setMessageInput] = useState("");

  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChefProfileForAdminModalOpen, setIsChefProfileForAdminModalOpen] = useState(false);

  const [isChefReviewModalOpen, setIsChefReviewModalOpen] = useState(false);
  const [isRestaurantRejectWorksessionModalOpen, setIsRestaurantRejectWorksessionModalOpen] = useState(false);
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { data: jobData, error: jobError, isLoading: jobLoading } = useGetJob({
    jobId: Number(jobId),
  });

  const { data: workSessions, error: workSessionsError, isLoading: workSessionsLoading } =
    useGetWorksessionsByJobId({ jobId: Number(jobId) });

  const job = jobData?.job;
  const restaurant = jobData?.restaurant;

  // この求人に対する、シェフからのレビューを取得
  const {
    data: restaurantReview,
    error: restaurantReviewError,
    isLoading: restaurantReviewLoading,
  } = useGetRestaurantReviewByWorksessionId({
    worksessionId: selectedWorkSession?.id,
  });

  // メッセージの取得
  const {
    messagesData,
    isLoading: messagesLoading,
    error: messagesError,
    sendMessage
  } = useSubscriptionMessagesByCompanyUserId({
    companyUserId: user?.id,
    workSessionId: selectedWorkSession?.id,
  });

  // 既読対象の通知を取得
  const {
    data: notifications,
    error: notificationsError,
    isLoading: notificationsLoading,
  } = useGetCompanyUserNotificationsByUserId({
    userId: user?.id,
  });
  const targetNotificationIds =
    notifications
      ?.filter(
        (notification) =>
          notification.job_id === job?.id && !notification.is_read
      )
      .map((notification) => notification.id) ?? [];

  const { trigger: updateJobTrigger } = useUpdateJob({
    jobId: Number(jobId),
    companyId: restaurant?.companies_id ?? undefined,
    restaurantId: restaurant?.id ?? undefined,
  });

  // メッセージの既読処理
  const { trigger: updateReadMessageTrigger } =
    useUpdateReadMessageByCompanyUser({
      companyUserId: user?.id,
      workSessionId: selectedWorkSession?.id,
      restaurantId: restaurant?.id,
    });

  // 通知の既読処理
  const { trigger: markReadMultipleCompanyUserNotificationsTrigger } =
    useMarkReadMultipleCompanyUserNotifications({
      companyUserNotificationIds: targetNotificationIds,
      userId: user?.id,
    });

  // シェフが応募している場合は自動的に選択
  useEffect(() => {
    if (workSessions && workSessions.length > 0) {
      setSelectedWorkSession(workSessions[0]);
    } else {
      setSelectedWorkSession(null);
    }
  }, [workSessions]);

  useEffect(() => {
    // このJobに関する通知を既読にする
    if (targetNotificationIds && targetNotificationIds.length > 0) {
      const markRead = async () => {
        try {
          await markReadMultipleCompanyUserNotificationsTrigger();
        } catch (error) {
          toast({
            title: "エラー",
            description: "通知の既読処理に失敗しました。",
            variant: "destructive",
          });
        }
      };
      markRead();
    }
  }, [targetNotificationIds, markReadMultipleCompanyUserNotificationsTrigger]);

  useEffect(() => {
    if (messagesData?.messages && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesData?.messages]);

  useEffect(() => {
    const updateReadStatus = async () => {
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
      try {
        await updateReadMessageTrigger({
          worksession_id: selectedWorkSession.id,
          last_read_message_seq: latestMessage.message_seq,
        });
      } catch (error) {
        toast({
          title: "エラー",
          description: "メッセージの既読更新に失敗しました。",
          variant: "destructive",
        });
      }
    };

    updateReadStatus();
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

  const handleEditJobSubmit = async (data: JobsPartialUpdatePayload) => {
    try {
      await updateJobTrigger(data);
    } catch (error) {
      throw error;
    }
  };

  if (jobError || workSessionsError
    || restaurantReviewError || messagesError || notificationsError) {
    return (
      <ErrorPage />
    );
  }

  if (jobLoading || !workSessions || workSessionsLoading
    || restaurantReviewLoading || messagesLoading || notificationsLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="求人情報を読み込んでいます..."
      />
    );
  }

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
                      disabled={
                        (workSessions && workSessions.length > 0) ||
                        (job?.status === "PUBLISHED" &&
                          job.expiry_date != null &&
                          job.expiry_date <= Date.now())
                      }>
                      <Edit className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">編集</span>
                    </Button>
                  </span>
                </TooltipTrigger>
                {(job?.status === "FILLED" &&
                  selectedWorkSession?.status === "CANCELED_BY_CHEF") ||
                (job?.status === "FILLED" &&
                  selectedWorkSession?.status === "CANCELED_BY_RESTAURANT") ||
                (job?.status === "PUBLISHED" &&
                  job.expiry_date != null &&
                  job.expiry_date <= Date.now()) ? (
                  <TooltipContent>
                    <p>募集が終了しているため編集できません</p>
                  </TooltipContent>
                ) : workSessions && workSessions.length > 0 ? (
                  <TooltipContent>
                    <p>応募があるため編集できません</p>
                  </TooltipContent>
                ) : null}
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

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="md:w-1/2 w-full">
            <h1 className="text-xl sm:text-2xl font-bold truncate">
              {job?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              {job != null && (
                <JobStatusBadgeForAdmin
                  job={job}
                  lastWorksession={selectedWorkSession}
                />
              )}
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

          {restaurantReview && (
            <div className="md:w-1/2 w-full border rounded-lg py-2 px-3 bg-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">
                  シェフからのレビュー
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-3 w-3 ${
                        i < restaurantReview.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {restaurantReview.rating.toFixed(1)}
                </span>
                <div className="text-xs text-gray-500 ml-auto">
                  {format(
                    new Date(restaurantReview.created_at),
                    "yyyy年MM月dd日",
                    { locale: ja }
                  )}
                </div>
              </div>
              <p
                className="text-sm text-gray-700 mb-1 truncate"
                title={restaurantReview.comment}>
                {restaurantReview.comment}
              </p>
            </div>
          )}
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
                  <button
                    className="hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setIsChefProfileForAdminModalOpen(true);
                    }}
                  >
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
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2 flex-wrap">
                      <span className="truncate">
                        {selectedWorkSession.user.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        シェフ
                      </span>
                      {/* <Badge variant="outline" className="text-xs sm:text-sm">
                        {formatWorkSessionJapaneseStatus(
                          selectedWorkSession.status
                        )}
                      </Badge> */}
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 p-0"
                        onClick={() => {
                          setIsQrDialogOpen(true);
                        }}>
                        <QrCode className="h-4 w-4" />
                        <span className="hidden sm:inline ml-2">
                          チェックインQR
                        </span>
                      </Button>
                      <CheckInQRModal
                        isOpen={isQrDialogOpen}
                        onCloseAction={() => {
                          setIsQrDialogOpen(false);
                        }}
                        workSessionData={{
                          id: selectedWorkSession.id.toString(),
                          check_in_code: selectedWorkSession.check_in_code,
                          chefName: selectedWorkSession.user.name,
                          restaurantName: restaurant?.name ?? "",
                        }}
                      />
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

                  {job && ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "VERIFY_REJECTED"].includes(selectedWorkSession.status) && (
                    <AdminJobActionsMenu
                      job={job}
                      workSession={selectedWorkSession}
                      sendMessageAction={sendMessage}
                    />
                  )}
                </div>
              </CardHeader>
              <div className="flex-1 flex flex-col min-h-0">
                <CardContent
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4 scroll-smooth">
                  <div className="space-y-4">
                    {selectedWorkSession.status === "CANCELED_BY_CHEF" ? (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-6">
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
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-6">
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
                                    {formatSlashDateTime(message.created_at)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-6">
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
      {selectedWorkSession && (
        <>
          <RestaurantReviewModal
            isOpen={isReviewModalOpen}
            onCloseAction={() => setIsReviewModalOpen(false)}
            worksessionData={{
              id: selectedWorkSession.id,
              transportation_expenses:
                selectedWorkSession.transportation_expenses ?? undefined,
              user: {
                name: selectedWorkSession.user.name,
                profile_image: selectedWorkSession.user.profile_image,
              },
              job: {
                id: selectedWorkSession.job.id,
                title: selectedWorkSession.job.title,
                restaurant_id: selectedWorkSession.job.restaurant_id,
                work_date: selectedWorkSession.job.work_date,
                start_time: selectedWorkSession.job.start_time,
                end_time: selectedWorkSession.job.end_time,
              },
              restaurant: {
                name: restaurant?.name || "",
              },
            }}
            handleSuccessAction={(status) => {
              if (status === 'reject') {
                setIsRestaurantRejectWorksessionModalOpen(true);
              } else {
                setIsChefReviewModalOpen(true);
              }
            }}
          />
          <RestaurantReviewCompleteModal
            isOpen={isChefReviewModalOpen}
            onCloseAction={() => {
              setIsChefReviewModalOpen(false)
            }}
            worksessionId={selectedWorkSession?.id}
          />
          <RestaurantRejectWorksessionModal
            isOpen={isRestaurantRejectWorksessionModalOpen}
            onCloseAction={() => {
              setIsRestaurantRejectWorksessionModalOpen(false)
            }}
          />
          <ChefProfileForAdminModal
            isOpen={isChefProfileForAdminModalOpen}
            onCloseAction={() => setIsChefProfileForAdminModalOpen(false)}
            worksession={selectedWorkSession}
          />
        </>
      )}
      {job && (
        <EditJobModal
          isOpen={isEditJobModalOpen}
          onClose={() => setIsEditJobModalOpen(false)}
          onSubmit={handleEditJobSubmit}
          job={job}
        />
      )}
    </div>
  );
}
