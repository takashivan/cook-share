"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, use, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  MapPinIcon,
  QrCode,
} from "lucide-react";
import { jobApi, getJobDetails } from "@/lib/api/job";
import {
  workSessionApi,
  updateWorkSessionToCheckIn,
  updateWorkSessionToCheckOut,
} from "@/lib/api/workSession";
import { messageApi } from "@/lib/api/message";
import { applicationApi } from "@/lib/api/application";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import useSWR, { mutate } from "swr";
import type { Job, WorkSession, Message, Application } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { BrowserQRCodeReader } from "@zxing/browser";
import { Result } from "@zxing/library";
import { ChefReviewModal } from "@/components/modals/ChefReviewModal";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") || "schedule";
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isQrScanned, setIsQrScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [scanningPromise, setScanningPromise] = useState<Promise<void> | null>(
    null
  );
  const isMounted = useRef(true);
  const streamRef = useRef<MediaStream | null>(null);
  const hasScanned = useRef(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // 応募情報の取得
  const { data: application } = useSWR<Application>(
    id ? `application-${id}` : null,
    () => applicationApi.getApplication(id)
  );

  // ジョブ詳細の取得
  const { data: jobDetail } = useSWR<JobDetail>(
    application?.job_id ? `job-${application.job_id}` : null,
    () => getJobDetails(application!.job_id.toString())
  );

  const job = jobDetail?.job;
  const restaurant = jobDetail?.restaurant;

  // ワークセッションの取得
  const { data: workSession } = useSWR<WorkSession | null>(
    application?.id ? `workSession-${application.id}` : null,
    async () => {
      const sessions = await workSessionApi.getWorkSessions();
      const matchingSession = (sessions as WorkSession[]).find(
        (ws) => ws.application_id === application?.id.toString()
      );
      return matchingSession || null;
    }
  );

  // メッセージの取得
  const { data: messages } = useSWR<Message[]>(
    workSession?.id ? `messages-${workSession.id}` : null,
    async () => {
      const result = await messageApi.getMessagesByWorkSessionId(
        workSession!.id
      );
      return result as Message[];
    }
  );

  // 未読メッセージのカウント
  const unreadCount =
    messages?.filter((msg) => msg.sender_type === "restaurant" && !msg.is_read)
      .length || 0;

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      stopScanning();
    };
  }, []);

  const stopScanning = () => {
    console.log("スキャン停止処理を開始します");

    if (scanningPromise) {
      console.log("スキャン処理を停止します");
      scanningPromise.catch(() => {}); // エラーを無視
      setScanningPromise(null);
    }

    if (codeReaderRef.current) {
      console.log("QRコードリーダーを停止します");
      try {
        // @ts-ignore - stopメソッドは存在するが型定義に含まれていない
        codeReaderRef.current.stop();
      } catch (error) {
        console.error("QRコードリーダーの停止に失敗しました:", error);
      }
      codeReaderRef.current = null;
    }

    if (streamRef.current) {
      console.log("カメラストリームを停止します");
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => {
        track.stop();
        console.log(`トラック ${track.kind} を停止しました`);
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      console.log("ビデオ要素のソースをクリアします");
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => {
          track.stop();
          console.log(`ビデオ要素のトラック ${track.kind} を停止しました`);
        });
      }
      videoRef.current.srcObject = null;
      videoRef.current.pause();
      console.log("ビデオ要素を停止しました");
    }

    setIsScanning(false);
    console.log("スキャン停止処理が完了しました");
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    console.log("ダイアログを閉じます");
    setIsDialogOpen(false);
    setIsQrScanned(false);
    setScannedData(null);
    setCameraError(null);
    hasScanned.current = false;
    stopScanning();
  };

  const handleQrScan = async (decodedText: string) => {
    try {
      // すでにスキャン済みの場合は処理をスキップ
      if (hasScanned.current) {
        console.log("すでにスキャン済みです");
        return;
      }

      // QRコードからアプリケーションIDを取得
      const scannedApplicationId = decodedText;
      console.log("スキャンされたアプリケーションID:", scannedApplicationId);
      console.log("現在のアプリケーションID:", application?.id);

      // 現在のアプリケーションIDと一致するか確認
      if (application?.id.toString() === scannedApplicationId) {
        hasScanned.current = true;
        setIsQrScanned(true);
        setScannedData(decodedText);
        // スキャンを停止
        stopScanning();
        // ワークセッションのステータスを更新
        if (workSession) {
          try {
            console.log("チェックイン処理を開始します");
            await updateWorkSessionToCheckIn(workSession.id.toString());
            console.log("チェックインが完了しました");

            // ワークセッションのデータを更新
            const updatedWorkSession = {
              ...workSession,
              status: "IN_PROGRESS",
              check_in_time: new Date().toISOString(),
            };

            // SWRのキャッシュを更新
            await mutate(
              `workSession-${application.id}`,
              updatedWorkSession,
              false
            );

            // ページをリロードして状態を更新
            router.refresh();
          } catch (error) {
            console.error("チェックイン処理に失敗しました:", error);
            alert("チェックイン処理に失敗しました。もう一度お試しください。");
            // エラーが発生した場合はスキャン状態をリセット
            hasScanned.current = false;
            setIsQrScanned(false);
          }
        }
      } else {
        console.log("無効なQRコードです");
        alert("無効なQRコードです。正しいQRコードをスキャンしてください。");
        // スキャンを停止
        stopScanning();
      }
    } catch (error) {
      console.error("QRコードの検証に失敗しました:", error);
      alert("QRコードの検証に失敗しました。");
      // スキャンを停止
      stopScanning();
    }
  };

  const handleCheckOut = async (rating: number, comment: string) => {
    if (!workSession) return;

    try {
      console.log("チェックアウト処理を開始します");
      await updateWorkSessionToCheckOut(
        workSession.id.toString(),
        comment,
        rating
      );
      console.log("チェックアウトが完了しました");

      // ワークセッションのデータを更新
      const updatedWorkSession = {
        ...workSession,
        status: "COMPLETED",
        check_out_time: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
      };

      // SWRのキャッシュを更新
      await mutate(`workSession-${application?.id}`, updatedWorkSession, false);

      // ページをリロードして状態を更新
      router.refresh();
    } catch (error) {
      console.error("チェックアウト処理に失敗しました:", error);
      alert("チェックアウト処理に失敗しました。もう一度お試しください。");
    }
  };

  useEffect(() => {
    if (
      isDialogOpen &&
      !hasScanned.current &&
      !isScanning &&
      isMounted.current
    ) {
      console.log("カメラの初期化を開始します...");
      setIsScanning(true);

      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
        .then((stream) => {
          if (!isMounted.current) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }

          console.log("カメラのアクセス許可が得られました");
          streamRef.current = stream;

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current
              .play()
              .then(() => {
                if (!isMounted.current) return;

                console.log("ビデオの再生を開始しました");

                // QRコードリーダーの初期化
                codeReaderRef.current = new BrowserQRCodeReader();
                console.log("QRコードリーダーを初期化しました");

                if (videoRef.current) {
                  const promise = codeReaderRef.current
                    .decodeFromVideoDevice(
                      undefined,
                      videoRef.current,
                      (result, error) => {
                        if (!isMounted.current) return;
                        if (hasScanned.current) return; // すでにスキャン済みの場合は処理をスキップ

                        if (result) {
                          console.log(
                            "QRコードを検出しました:",
                            result.getText()
                          );
                          handleQrScan(result.getText());
                        }
                        if (error) {
                          const errorMessage =
                            error.message || error.toString();
                          if (
                            !errorMessage.includes("No QR code found") &&
                            !errorMessage.includes("NotFoundException")
                          ) {
                            console.error(
                              "QRコードのスキャンに失敗しました:",
                              error
                            );
                            setCameraError("QRコードのスキャンに失敗しました");
                          }
                        }
                      }
                    )
                    .catch((error) => {
                      if (!isMounted.current) return;
                      console.error(
                        "QRコードリーダーの初期化に失敗しました:",
                        error
                      );
                      setCameraError("QRコードリーダーの初期化に失敗しました");
                    });
                  setScanningPromise(promise);
                }
              })
              .catch((error) => {
                if (!isMounted.current) return;
                console.error("ビデオの再生に失敗しました:", error);
                setCameraError("カメラの初期化に失敗しました");
                stopScanning();
              });
          }
        })
        .catch((error) => {
          if (!isMounted.current) return;
          console.error("カメラへのアクセスが拒否されました:", error);
          setCameraError("カメラへのアクセスが拒否されました");
          stopScanning();
        });
    }

    return () => {
      if (!isDialogOpen || hasScanned.current) {
        stopScanning();
      }
    };
  }, [isDialogOpen]);

  const handleStartWork = () => {
    handleOpenDialog();
  };

  const renderWorkStatusButton = () => {
    if (!workSession) return null;

    switch (workSession.status) {
      case "SCHEDULED":
        return (
          <Button
            className="w-full"
            onClick={handleStartWork}
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

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  const startTime = format(new Date(job.start_time * 1000), "HH:mm");
  const endTime = format(new Date(job.end_time * 1000), "HH:mm");
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
          {workSession?.status === "SCHEDULED" && (
            <Link href={`/chef/messages/${workSession.id}`}>
              <div className="relative">
                <MessageSquare className="h-6 w-6 text-gray-700" />
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </div>
                )}
              </div>
            </Link>
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
                {startTime} 〜 {endTime}（休憩あり）
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium">勤務場所</h4>
              <p className="text-sm">{restaurant?.address}</p>
              <p className="text-sm">{job.transportation}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">報酬</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <span>時給</span>
            <span className="font-bold">
              ¥{job.hourly_rate.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span>勤務時間</span>
            <span>{hours}時間</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span>交通費</span>
            <span>¥{(job.transportation || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>合計</span>
            <span>¥{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>勤務開始確認</DialogTitle>
            <DialogDescription>
              お店のQRコードをスキャンしてください
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500 mb-4">
                {cameraError ? (
                  <span className="text-red-600">{cameraError}</span>
                ) : isQrScanned ? (
                  <span className="text-green-600">
                    QRコードの検証が完了しました
                  </span>
                ) : (
                  "カメラをQRコードに向けてください"
                )}
              </p>
              <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg overflow-hidden">
                {!isQrScanned && !cameraError && (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    autoPlay
                    muted
                  />
                )}
                {isQrScanned && (
                  <div className="flex flex-col items-center justify-center">
                    <QrCode className="h-12 w-12 text-green-500 mb-2" />
                    <span className="text-sm text-gray-600">スキャン完了</span>
                  </div>
                )}
                {cameraError && (
                  <div className="flex flex-col items-center justify-center">
                    <QrCode className="h-12 w-12 text-red-500 mb-2" />
                    <span className="text-sm text-red-600">{cameraError}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              キャンセル
            </Button>
            <Button onClick={handleCloseDialog} disabled={!isQrScanned}>
              勤務開始
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
      />
    </div>
  );
}
