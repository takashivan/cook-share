"use client";

import Image from "next/image";
import { useEffect, use, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  QrCode,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { CameraDevice, Html5Qrcode } from "html5-qrcode";
import { ChefReviewModal } from "@/components/modals/ChefReviewModal";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChatSheet } from "@/components/chat/ChatSheet";
import { useSubscriptionMessagesByUserId } from "@/hooks/api/user/messages/useSubscriptionMessagesByUserId";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useStartWorksession } from "@/hooks/api/user/worksessions/useStartWorksession";
import { useGetJob } from "@/hooks/api/all/jobs/useGetJob";
import { useCancelWorksessionByChef } from "@/hooks/api/user/worksessions/useCancelWorksessionByChef";
import { useGetWorksessionsByUserId } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserId";
import { useSubscriptionUnreadMessagesByUser } from "@/hooks/api/user/messages/useSubscriptionUnreadMessagesByUser";
import { useGetJobChangeRequest } from "@/hooks/api/user/jobChangeRequests/useGetJobChangeRequest";
import { useAcceptJobChangeRequest } from "@/hooks/api/user/jobChangeRequests/useAcceptJobChangeRequest";
import { useRejectJobChangeRequest } from "@/hooks/api/user/jobChangeRequests/useRejectJobChangeRequest";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import styles from "./styles.module.css";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingScreen } from "@/components/LoadingScreen";
import Link from "next/link";
import { ChefJobCancelModal } from "@/components/modals/ChefJobCancelModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function JobDetail({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const [isQrScanned, setIsQrScanned] = useState(false);
  const [checkInCode, setCheckInCode] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<Html5Qrcode>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isChangeRequestModalOpen, setIsChangeRequestModalOpen] =
    useState(false);

  // ジョブ詳細の取得
  const {
    data: jobDetail,
    isLoading: isJobDetailLoading,
    error: jobDetailError,
  } = useGetJob({ jobId: Number(id) });

  const job = jobDetail?.job;
  const restaurant = jobDetail?.restaurant;

  // ワークセッションの取得
  const {
    data: workSessions,
    isLoading: isWorkSessionsLoading,
    error: workSessionsError,
  } = useGetWorksessionsByUserId({
    userId: user?.id,
  });

  const workSession = workSessions?.find(
    (session) => session.job_id === job?.id
  );

  const { trigger: startWorksessionTrigger } = useStartWorksession({
    worksessionId: workSession?.id,
    userId: user?.id,
  });

  const { trigger: cancelWorksessionTrigger } = useCancelWorksessionByChef({
    worksessionId: workSession?.id,
    userId: user?.id,
  });

  // メッセージの取得
  const {
    messagesData,
    sendMessage,
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useSubscriptionMessagesByUserId({
    userId: user?.id,
    workSessionId: workSession?.id,
  });

  // 未読メッセージの取得
  const {
    unreadMessagesData,
    isLoading: isUnreadMessagesLoading,
    error: unreadMessagesError,
  } = useSubscriptionUnreadMessagesByUser({
    userId: user?.id,
  });

  // 未読メッセージのカウント
  const unreadCount =
    unreadMessagesData?.find(
      (messageData) => messageData.worksession.id === workSession?.id
    )?.unread_message_count || 0;

  // 変更リクエストの取得
  const {
    data: changeRequest,
    isLoading: ischangeRequestLoading,
    error: changeRequestError,
  } = useGetJobChangeRequest({
    worksessionsId: workSession?.id,
  });

  const pendingRequest = changeRequest?.status === "PENDING" ? changeRequest : null;

  const isTodayOrBefore = (targetDate: string) => {
    const today = new Date();
    // 時刻を無視して「日付だけ」で比較するために00:00:00にリセット
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(targetDate);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate <= today;
  }
  // work_dateの日付が、今日か今日より前の場合のみtrueになるようにする
  const canStartWork = job?.work_date && isTodayOrBefore(job.work_date);

  const { trigger: acceptJobChangeRequest } = useAcceptJobChangeRequest({
    jobChangeRequestId: pendingRequest?.id,
    userId: user?.id,
    workSessionId: workSession?.id,
  });

  const { trigger: rejectJobChangeRequest } = useRejectJobChangeRequest({
    jobChangeRequestId: pendingRequest?.id,
    workSessionId: workSession?.id,
  });

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsQrScanned(false);
    setCheckInCode(null);
  };

  const handleStartWork = () => {
    setIsDialogOpen(true);
  };

  const LOCAL_STORAGE_KEY = "qr-camera-config";

  type CameraConfig = {
    lastUsedCameraId?: string;
  };

  const getStoredCameraConfig = (): CameraConfig | null => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const saveCameraConfig = (config: CameraConfig) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  };

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const initCamera = async () => {
    setError(null);
    try {
      const devices = await Html5Qrcode.getCameras();

      if (!devices?.length) {
        throw new Error("カメラデバイスが見つかりません");
      }

      const storedConfig = getStoredCameraConfig();
      let selectedCamera: CameraDevice | null = null;

      if (storedConfig?.lastUsedCameraId) {
        const matched = devices.find(
          (d) => d.id === storedConfig.lastUsedCameraId
        );
        if (matched) selectedCamera = matched;
      }

      if (!ref.current) {
        console.error("QRコードリーダーの要素が見つかりません");
        return;
      }

      scannerRef.current = new Html5Qrcode(ref.current?.id);

      await scannerRef.current.start(
        // 一度承認したカメラがあればそれを、なければ背面カメラを使用
        selectedCamera?.id ?? {
          facingMode: "environment",
        },
        {
          fps: 5,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          if (workSession?.id.toString() === decodedText) {
            setIsQrScanned(true);
          } else {
            toast({
              title: "エラー",
              description:
                "無効なQRコードです。正しいQRコードをスキャンしてください。",
              variant: "destructive",
            });
          }
        },
        (errorMessage) => {
          console.log("QRスキャンエラー:", errorMessage);
        }
      );

      const newCameraId = scannerRef.current.getRunningTrackSettings().deviceId;
      saveCameraConfig({ lastUsedCameraId: newCameraId });
      setHasPermission(true);
    } catch (err) {
      console.error("カメラアクセスに失敗しました", err);
      setError("カメラアクセスが拒否されました。許可してください。");
      setHasPermission(false);
    }
  };

  useEffect(() => {
    if (isDialogOpen && !isQrScanned && hasPermission !== false) {
      // ダイアログが開いてから少し待ってから初期化する
      const timer = setTimeout(async () => {
        initCamera();
      }, 100); // 100ms待機

      return () => {
        clearTimeout(timer);
        if (scannerRef.current) {
          scannerRef.current.stop().then(() => scannerRef.current?.clear());
        }
      };
    }
  }, [isDialogOpen, isQrScanned, workSession, initCamera, hasPermission]);

  const handleCheckInCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCheckInCode(value);
    if (value.length === 6) {
      if (
        workSession?.check_in_code &&
        workSession.check_in_code.toString() === value
      ) {
        setIsQrScanned(true);
      } else {
        toast({
          title: "エラー",
          description:
            "無効なチェックインコードです。正しいチェックインコードを入力してください。",
          variant: "destructive",
        });
      }
    }
  };

  const renderWorkStatusButton = () => {
    if (!workSession) return null;

    if (pendingRequest) {
      return (
        <Button
          className="w-full bg-chefdom-orange hover:bg-chefdom-orange-dark"
          onClick={() => {
            setIsChangeRequestModalOpen(true);
          }}
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          変更リクエスト
        </Button>
      )
    }

    switch (workSession.status) {
      case "SCHEDULED":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    className="w-full bg-chefdom-orange hover:bg-chefdom-orange-dark"
                    onClick={handleStartWork}
                    disabled={!canStartWork}
                  >
                    勤務開始
                  </Button>
                </span>
              </TooltipTrigger>
              {!canStartWork ? (
                <TooltipContent>
                  <p>
                    勤務開始は当日から可能です
                  </p>
                </TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
        );
      case "IN_PROGRESS":
        return (
          <Button className="w-full" onClick={() => setIsReviewModalOpen(true)}>
            勤務終了・完了報告
          </Button>
        );
      case "VERIFY_REJECTED":
        return (
          <Button
            className="w-full bg-chefdom-orange hover:bg-chefdom-orange-dark"
            onClick={() => setIsReviewModalOpen(true)}
          >
            再申請
          </Button>
        );
      case "COMPLETED":
        return (
          <Button className="w-full" disabled>
            {restaurant?.name}さんの確認をお待ちください
          </Button>
        );
      default:
        return null;
    }
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = async (cancelReason: string) => {
    if (!job) return;

    try {
      await cancelWorksessionTrigger({
        reason: cancelReason,
      });

      // メッセージとして変更リクエストの承認/拒否を送信
      const message = `【お仕事のキャンセル】
以下の求人がキャンセルになりました：

日付: ${job.work_date}
時間: ${format(
        new Date(job.start_time),
        "HH:mm"
      )}〜${format(
        new Date(job.end_time),
        "HH:mm"
      )}
業務内容: ${job.title}
報酬: ¥${job.fee}

キャンセル理由:
${cancelReason}`;

      await sendMessage(message);

      toast({
        title: "キャンセル完了",
        description: "お仕事のキャンセルが完了しました。",
      });
      setIsCancelModalOpen(false);
      router.push("/chef/schedule");
    } catch (error) {
      toast({
        title: "エラー",
        description: "キャンセル処理に失敗しました。",
        variant: "destructive",
      });
    }
  };

  const handleChangeRequestResponse = async (
    status: "APPROVED" | "REJECTED"
  ) => {
    if (!pendingRequest || !workSession) return;

    try {
      if (status === "APPROVED") {
        await acceptJobChangeRequest();
      } else {
        await rejectJobChangeRequest();
      }

      // メッセージとして変更リクエストの承認/拒否を送信
      const message = `【変更リクエストの${
        status === "APPROVED" ? "承認" : "拒否"
      }】
以下の変更リクエストを${status === "APPROVED" ? "承認" : "拒否"}しました：

日付: ${pendingRequest.proposed_changes.work_date}
時間: ${format(
        new Date(pendingRequest.proposed_changes.start_time),
        "HH:mm"
      )}〜${format(
        new Date(pendingRequest.proposed_changes.end_time),
        "HH:mm"
      )}
業務内容: ${pendingRequest.proposed_changes.task}
報酬: ¥${pendingRequest.proposed_changes.fee}`;

      await sendMessage(message);

      toast({
        title: `変更リクエストを${
          status === "APPROVED" ? "承認" : "拒否"
        }しました`,
        description:
          status === "APPROVED"
            ? "変更内容が適用されました。"
            : "変更は適用されませんでした。",
      });

      setIsChangeRequestModalOpen(false);
    } catch (error) {
      toast({
        title: "エラー",
        description: "変更リクエストの処理に失敗しました。",
        variant: "destructive",
      });
    }
  };

  if (jobDetailError || workSessionsError || unreadMessagesError || changeRequestError) {
    return (
      <div className="flex px-4">
        <ErrorPage />
      </div>
    );
  }

  if (isJobDetailLoading || isWorkSessionsLoading || isUnreadMessagesLoading || ischangeRequestLoading
    || !job || !workSessions || !unreadMessagesData
  ) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="お仕事詳細を読み込んでいます..."
      />
    );
  }

  const startTime = format(new Date(job.start_time), "HH:mm");
  const endTime = format(new Date(job.end_time), "HH:mm");
  const workDate = format(new Date(job.work_date), "yyyy年MM月dd日 (E)", {
    locale: ja,
  });
  const shortWorkDate = format(new Date(job.work_date), "MM/dd (E)", {
    locale: ja,
  });

  // 勤務時間の計算（時間）
  const hours =
    (new Date(job.end_time * 1000).getTime() -
      new Date(job.start_time * 1000).getTime()) /
    (1000 * 60 * 60);

  // 合計金額の計算
  const totalAmount = job.hourly_rate * hours + Number(job.transportation || 0);

  const handleCheckIn = async () => {
    try {
      await startWorksessionTrigger({
        check_in_time: Date.now(),
      });
      setIsDialogOpen(false);
      toast({
        title: "チェックインしました",
        description: "チェックインが完了しました。",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "チェックイン処理に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
      setIsQrScanned(false);
      setCheckInCode(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">お仕事詳細</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4 gap-3">
          <div className="w-full">
            {renderWorkStatusButton()}
          </div>
          {workSession && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(true)}
              className="relative">
              <MessageSquare className="h-6 w-6 text-gray-700" />
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </div>
              )}
            </Button>
          )}
        </div>

        <h2 className="text-lg font-bold mb-4">{restaurant?.name}</h2>

        {job.image && (
          <Image
            src={job.image}
            alt="Job Image"
            width={400}
            height={200}
            className="w-full h-auto rounded-md mb-4"
          />
        )}

        <h3 className="font-bold mb-2">{job.title}</h3>
       
        <Link href={`/job/${job.id}`} className="block mb-5">
          <Button type="button" variant="outline" className="w-full">
          求人の詳細はこちら<ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>
        </Link>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium">勤務日</h4>
              <p className="text-sm">{workDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium">勤務時間</h4>
              <p className="text-sm">
                {startTime} 〜 {endTime}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium">勤務場所</h4>
              <p className="text-sm">{restaurant?.address}</p>
              <p className="text-sm">
                {job.transportation_type === "NONE"
                  ? "交通費なし"
                  : job.transportation_type === "MAX"
                  ? `上限${job.transportation_amount.toLocaleString()}円`
                  : `${job.transportation_amount.toLocaleString()}円`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>報酬</span>
            <span>¥{job.fee.toLocaleString()}</span>
          </div>
          {workSession?.status == "SCHEDULED" && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCancelClick}>
              お仕事をキャンセルする
            </Button>
          )}
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>勤務開始確認</AlertDialogTitle>
            <AlertDialogDescription>
              お店のQRコードをスキャンするか、チェックインコードを入力してください
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            <div className="border p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500 mb-4">
                {!isQrScanned && "カメラをQRコードに向けてください"}
              </p>
              <div className="flex justify-center items-center overflow-hidden">
                {!isQrScanned ? (
                  <div className="flex flex-col items-center justify-center gap-3 w-full">
                    {error && (
                      <div className="text-red-600 border border-red-300 bg-red-50 p-3 rounded w-full max-w-sm text-center">
                        {error}
                      </div>
                    )}
                    {!hasPermission && (
                      <Button variant="outline" onClick={initCamera}>
                        カメラアクセスを許可してスキャンする
                      </Button>
                    )}
                    <div
                      className={`flex justify-center items-center flex-col overflow-hidden ${styles.qr_container}`}>
                      <div className={styles.qr_reader_wrapper}>
                        <div
                          id="qr-reader"
                          ref={ref}
                          className={
                            hasPermission ? styles.qr_reader : undefined
                          }
                        />
                      </div>

                      <Input
                        type="text"
                        placeholder="または、コードを入力してください"
                        value={checkInCode || ""}
                        onChange={handleCheckInCodeChange}
                        className={`mt-4 ${styles.input}`}
                        maxLength={6}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8">
                    <QrCode className="h-12 w-12 text-green-500 mb-2" />
                    <span className="text-green-600">
                      コードの検証が完了しました
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>
              キャンセル
            </Button>
            {isQrScanned && (
              <Button onClick={handleCheckIn} disabled={!isQrScanned}>
                勤務開始
              </Button>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {workSession && job && workSession.check_in_time !== 0 && job.end_time !== 0 && (
        <ChefReviewModal
          isOpen={isReviewModalOpen}
          workSessionId={workSession.id}
          workSessionStart={workSession.check_in_time}
          workSessionEnd={job.end_time}
          jobFee={job.fee || 0}
          onCloseAction={() => setIsReviewModalOpen(false)}
          storeName={restaurant?.name || ""}
          jobTitle={job.title || ""}
          jobDate={
            job.work_date
              ? format(new Date(job.work_date), "yyyy年MM月dd日", { locale: ja })
              : ""
          }
          transportation_type={job.transportation_type || "NONE"}
          transportation_amount={job.transportation_amount || 0}
          transportation_expenses={workSession.transportation_expenses ?? null}
        />
      )}

      {workSession && (
        <ChatSheet
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          worksession={workSession}
          messagesData={messagesData}
          isMessagesDataLoading={isMessagesLoading}
          messagesDataError={messagesError}
          onSendMessage={sendMessage}
          restaurantName={restaurant?.name || ""}
          restaurantImage={restaurant?.profile_image}
          workDate={job?.work_date || ""}
          startTime={job?.start_time || 0}
          endTime={job?.end_time || 0}
          jobId={job?.id || 0}
          jobTitle={job?.title || ""}
        />
      )}

      <ChefJobCancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        job={job}
        onSubmit={handleCancelConfirm}
      />

      {/* 変更リクエストモーダル */}
      <Dialog
        open={isChangeRequestModalOpen}
        onOpenChange={setIsChangeRequestModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>変更リクエストの確認</DialogTitle>
            <DialogDescription>
              以下の変更リクエストを承認または拒否してください。
            </DialogDescription>
          </DialogHeader>
          {pendingRequest && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">変更内容</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    日付: {pendingRequest.proposed_changes.work_date}
                  </p>
                  <p>
                    時間:{" "}
                    {format(
                      new Date(
                        pendingRequest.proposed_changes.start_time
                      ),
                      "HH:mm"
                    )}
                    〜
                    {format(
                      new Date(pendingRequest.proposed_changes.end_time),
                      "HH:mm"
                    )}
                  </p>
                  <p>業務内容: {pendingRequest.proposed_changes.task}</p>
                  <p>報酬: ¥{pendingRequest.proposed_changes.fee}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">変更理由</h4>
                <p className="text-sm">{pendingRequest.reason}</p>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsChangeRequestModalOpen(false)}>
                  閉じる
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleChangeRequestResponse("REJECTED")}
                  className="bg-red-600 hover:bg-red-700">
                  <XCircle className="h-4 w-4 mr-2" />
                  拒否
                </Button>
                <Button
                  onClick={() => handleChangeRequestResponse("APPROVED")}
                  className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  承認
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
