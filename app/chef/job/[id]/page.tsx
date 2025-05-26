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
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
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
import { useFinishWorksession } from "@/hooks/api/user/worksessions/useFinishWorksession";
import { useGetJob } from "@/hooks/api/companyuser/jobs/useGetJob";
import { useCancelWorksessionByChef } from "@/hooks/api/user/worksessions/useCancelWorksessionByChef";
import { useGetWorksessionsByUserId } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserId";
import { useSubscriptionUnreadMessagesByUser } from "@/hooks/api/user/messages/useSubscriptionUnreadMessagesByUser";
import { useGetJobChangeRequests } from "@/hooks/api/user/jobChangeRequests/useGetJobChangeRequests";
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
import { JobChangeRequest } from "@/hooks/api/companyuser/jobChangeRequests/useGetJobChangeRequests";
import { Input } from "@/components/ui/input";
import styles from "./styles.module.css";

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
    fee: number;
    transportation_type: string;
    transportation_amount: number;
  };
  restaurant: {
    id: string;
    name: string;
    address: string;
    business_hours: string;
    contact_info: string;
    profile_image: string;
    station: string;
    access: string;
  };
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function JobDetail({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const { user } = useAuth();

  const [isQrScanned, setIsQrScanned] = useState(false);
  const [checkInCode, setCheckInCode] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<Html5Qrcode>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellationPenalty, setCancellationPenalty] = useState<{
    penalty: number;
    message: string;
    status: string;
  } | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isChangeRequestModalOpen, setIsChangeRequestModalOpen] =
    useState(false);
  const [selectedChangeRequest, setSelectedChangeRequest] =
    useState<JobChangeRequest | null>(null);

  // ジョブ詳細の取得
  const { data: jobDetail } = useGetJob({ jobId: Number(id) });

  const job = jobDetail?.job;
  const restaurant = jobDetail?.restaurant;

  // ワークセッションの取得
  const { data: workSessions } = useGetWorksessionsByUserId({
    userId: user?.id,
  });

  const workSession = workSessions?.find(
    (session) => session.job_id === job?.id
  );

  const { trigger: startWorksessionTrigger } = useStartWorksession({
    worksessionId: workSession?.id,
    userId: user?.id,
  });

  const { trigger: finishWorksessionTrigger } = useFinishWorksession({
    worksessionId: workSession?.id,
    userId: user?.id,
  });

  const { trigger: cancelWorksessionTrigger } = useCancelWorksessionByChef({
    worksessionId: workSession?.id,
  });

  // メッセージの取得
  const { messagesData, sendMessage } = useSubscriptionMessagesByUserId({
    userId: user?.id,
    workSessionId: workSession?.id,
  });

  // 未読メッセージの取得
  const { unreadMessagesData } = useSubscriptionUnreadMessagesByUser({
    userId: user?.id,
  });

  // 未読メッセージのカウント
  const unreadCount =
    unreadMessagesData?.find(
      (messageData) => messageData.worksession.id === workSession?.id
    )?.unread_message_count || 0;

  // 変更リクエストの取得
  const { data: changeRequests } = useGetJobChangeRequests();
  const pendingRequest = changeRequests?.find(
    (req) => req.worksession_id === workSession?.id && req.status === "PENDING"
  );

  const { trigger: acceptJobChangeRequest } = useAcceptJobChangeRequest({
    jobChangeRequestId: selectedChangeRequest?.id,
  });

  const { trigger: rejectJobChangeRequest } = useRejectJobChangeRequest({
    jobChangeRequestId: selectedChangeRequest?.id,
  });

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsQrScanned(false);
    setCheckInCode(null);
  };

  const handleStartWork = () => {
    console.log("handleStartWork called");
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

  const [error, setError] = useState<string | null>(null);
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

  const handleSuccessfulScan = async () => {
    if (!workSession) return;

    try {
      console.log("チェックイン処理を開始します");
      await startWorksessionTrigger({
        check_in_time: Date.now(),
      });
      console.log("チェックインが完了しました");
      router.refresh();
    } catch (error) {
      console.error("チェックイン処理に失敗しました:", error);
      alert("チェックイン処理に失敗しました。もう一度お試しください。");
      setIsQrScanned(false);
      setCheckInCode(null);
    }
  };

  const handleCheckOut = async (
    rating: number,
    comment: string,
    transportation_expenses: number | null
  ) => {
    if (!workSession) return;
    try {
      console.log("チェックアウト処理を開始します");
      await finishWorksessionTrigger({
        check_out_time: Date.now(),
        rating,
        feedback: comment,
        transportation_expenses,
      });
      console.log("チェックアウトが完了しました");
      router.refresh();
    } catch (error) {
      console.error("チェックアウト処理に失敗しました:", error);
      alert("チェックアウト処理に失敗しました。もう一度お試しください。");
    }
  };

  const renderWorkStatusButton = () => {
    if (!workSession) return null;

    switch (workSession.status) {
      case "SCHEDULED":
        return (
          <Button
            className="w-full"
            onClick={() => {
              console.log("Button clicked");
              handleStartWork();
            }}
            style={{ backgroundColor: "#DB3F1C" }}>
            勤務開始
          </Button>
        );
      case "IN_PROGRESS":
        return (
          <Button className="w-full" onClick={() => setIsReviewModalOpen(true)}>
            勤務終了・完了報告
          </Button>
        );
      case "VERIFY_REJECTED":
        return (
          <Button className="w-full" onClick={() => setIsReviewModalOpen(true)}>
            差し戻し
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

  const calculateCancellationPenalty = () => {
    if (!job) return null;

    const now = new Date();
    const workDate = new Date(job.work_date);
    const daysDifference = differenceInDays(workDate, now);

    if (daysDifference >= 2) {
      return {
        penalty: 0,
        message: "2日以上前のキャンセルは違約金なしで可能です。",
        status: "cancelled_by_chef",
      };
    } else if (daysDifference >= 1) {
      return {
        penalty: job.fee * 0.8,
        message:
          "2日前〜前日のキャンセルは報酬予定額の80%の違約金が発生します。",
        status: "cancelled_by_chef_late",
      };
    } else {
      return {
        penalty: job.fee,
        message: "当日のキャンセルは報酬予定額の100%の違約金が発生します。",
        status: "cancelled_by_chef_same_day",
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
      await cancelWorksessionTrigger({
        reason: cancelReason,
      });
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
    if (!selectedChangeRequest || !workSession) return;

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

日付: ${selectedChangeRequest.proposed_changes.work_date}
時間: ${format(
        new Date(selectedChangeRequest.proposed_changes.start_time),
        "HH:mm"
      )}〜${format(
        new Date(selectedChangeRequest.proposed_changes.end_time),
        "HH:mm"
      )}
業務内容: ${selectedChangeRequest.proposed_changes.task}
報酬: ¥${selectedChangeRequest.proposed_changes.fee}`;

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
      setSelectedChangeRequest(null);
    } catch (error) {
      toast({
        title: "エラー",
        description: "変更リクエストの処理に失敗しました。",
        variant: "destructive",
      });
    }
  };

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="text-center">読み込み中...</div>
      </div>
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
      await handleSuccessfulScan();
      setIsDialogOpen(false);
      toast({
        title: "チェックインしました",
        description: "チェックインが完了しました。",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to check in:", error);
      toast({
        title: "エラーが発生しました",
        description:
          error instanceof Error
            ? error.message
            : "チェックインに失敗しました。",
        variant: "destructive",
      });
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
        <div className="flex justify-between items-center mb-4">
          <div className="inline-block border rounded-md">
            <div className="flex items-center">
              <div className="px-4 py-2 border-r">
                <span className="font-medium">{shortWorkDate}</span>
              </div>
              <div className="px-4 py-2">
                <span>
                  {startTime} 〜 {endTime}
                </span>
              </div>
            </div>
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

        {pendingRequest && (
          <div className="mb-6">
            <Button
              variant="outline"
              className="w-full bg-red-50 text-red-800 border-red-200 hover:bg-red-100"
              onClick={() => {
                setSelectedChangeRequest(pendingRequest);
                setIsChangeRequestModalOpen(true);
              }}>
              <AlertCircle className="h-4 w-4 mr-2" />
              変更リクエスト
            </Button>
          </div>
        )}

        {job.image && (
          <Image
            src={job.image}
            alt="Job Image"
            width={400}
            height={200}
            className="w-full h-auto rounded-md mb-4"
          />
        )}

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

        <div className="px-2 py-4 border-r">{renderWorkStatusButton()}</div>

        <h3 className="text-lg font-bold mb-2">{job.title}</h3>
        <p className="text-sm text-gray-700 mb-6">{job.description}</p>

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
            <button
              onClick={handleCancelClick}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors">
              お仕事をキャンセルする
            </button>
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

      <ChefReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleCheckOut}
        storeName={restaurant?.name || ""}
        jobTitle={job?.title || ""}
        jobDate={
          job?.work_date
            ? format(new Date(job.work_date), "yyyy年MM月dd日", { locale: ja })
            : ""
        }
        transportation_type={job?.transportation_type || "NONE"}
        transportation_amount={job?.transportation_amount || 0}
        transportation_expenses={workSession?.transportation_expenses ?? null}
      />

      {workSession && (
        <ChatSheet
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          worksessionId={workSession.id}
          messagesData={messagesData}
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
          {selectedChangeRequest && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">変更内容</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    日付: {selectedChangeRequest.proposed_changes.work_date}
                  </p>
                  <p>
                    時間:{" "}
                    {format(
                      new Date(
                        selectedChangeRequest.proposed_changes.start_time
                      ),
                      "HH:mm"
                    )}
                    〜
                    {format(
                      new Date(selectedChangeRequest.proposed_changes.end_time),
                      "HH:mm"
                    )}
                  </p>
                  <p>業務内容: {selectedChangeRequest.proposed_changes.task}</p>
                  <p>報酬: ¥{selectedChangeRequest.proposed_changes.fee}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">変更理由</h4>
                <p className="text-sm">{selectedChangeRequest.reason}</p>
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
