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
  ArrowRight,
  CheckCircle,
  CreditCard,
  DollarSign,
  Shield,
  ChevronDown,
  Send,
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
import { Html5QrcodeScanner } from "html5-qrcode";
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
  const [isQrScanned, setIsQrScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsQrScanned(false);
    setScannedData(null);
    if (scanner) {
      scanner.clear();
    }
  };

  const handleStartWork = () => {
    console.log("handleStartWork called");
    setIsDialogOpen(true);
  };

  useEffect(() => {
    let currentScanner: Html5QrcodeScanner | null = null;

    if (isDialogOpen && !isQrScanned) {
      // ダイアログが開いてから少し待ってから初期化する
      const timer = setTimeout(() => {
        const qrReaderElement = document.getElementById("qr-reader");
        if (!qrReaderElement) {
          console.error("QR reader element not found");
          return;
        }

        currentScanner = new Html5QrcodeScanner(
          "qr-reader",
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            showTorchButtonIfSupported: false,
            showZoomSliderIfSupported: false,
            defaultZoomValueIfSupported: 1,
            useBarCodeDetectorIfSupported: false,
            rememberLastUsedCamera: true,
            html5qrcode: {
              formatsToSupport: ["QR_CODE"],
            },
          } as any,
          false
        );

        // カスタムUIを追加
        const scannerElement = document.getElementById("qr-reader");
        if (scannerElement) {
          // スキャナーのデフォルトUIを非表示
          const header = scannerElement.querySelector(
            "div[style*='border-top']"
          );
          if (header) {
            header.remove();
          }

          // ファイルスキャンのリンクを非表示
          const links = scannerElement.getElementsByTagName("a");
          for (const link of links) {
            if (link.textContent?.includes("Scan an Image File")) {
              link.style.display = "none";
            }
          }

          // Start/Stopボタンのテキストを変更
          const buttons = scannerElement.getElementsByTagName("button");
          for (const button of buttons) {
            if (button.textContent?.includes("Start Scanning")) {
              button.textContent = "スキャンを開始";
            } else if (button.textContent?.includes("Stop Scanning")) {
              button.textContent = "スキャンを停止";
            }
          }

          // MutationObserverを設定して動的に追加される要素も監視
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node) => {
                  if (node instanceof HTMLElement) {
                    // ボタンのテキストを変更
                    const buttons = node.getElementsByTagName("button");
                    for (const button of buttons) {
                      if (button.textContent?.includes("Start Scanning")) {
                        button.textContent = "スキャンを開始";
                      } else if (
                        button.textContent?.includes("Stop Scanning")
                      ) {
                        button.textContent = "スキャンを停止";
                      }
                    }

                    // リンクを非表示
                    const links = node.getElementsByTagName("a");
                    for (const link of links) {
                      if (link.textContent?.includes("Scan an Image File")) {
                        link.style.display = "none";
                      }
                    }
                  }
                });
              }
            });
          });

          observer.observe(scannerElement, {
            childList: true,
            subtree: true,
          });
        }

        currentScanner.render(
          (decodedText: string) => {
            if (application?.id.toString() === decodedText) {
              setIsQrScanned(true);
              setScannedData(decodedText);
              currentScanner?.clear();
            } else {
              toast({
                title: "エラー",
                description:
                  "無効なQRコードです。正しいQRコードをスキャンしてください。",
                variant: "destructive",
              });
            }
          },
          (errorMessage: string) => {
            console.log("QRスキャンエラー:", errorMessage);
          }
        );

        setScanner(currentScanner);
      }, 100); // 100ms待機

      return () => {
        clearTimeout(timer);
        if (currentScanner) {
          currentScanner.clear();
        }
      };
    }
  }, [isDialogOpen, isQrScanned, application?.id]);

  const handleSuccessfulScan = async () => {
    if (!workSession) return;

    try {
      console.log("チェックイン処理を開始します");
      await updateWorkSessionToCheckIn(workSession.id);
      console.log("チェックインが完了しました");

      const updatedWorkSession = {
        ...workSession,
        status: "IN_PROGRESS",
        check_in_time: new Date().toISOString(),
      };

      await mutate(`workSession-${application?.id}`, updatedWorkSession, false);
      router.refresh();
    } catch (error) {
      console.error("チェックイン処理に失敗しました:", error);
      alert("チェックイン処理に失敗しました。もう一度お試しください。");
      setIsQrScanned(false);
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

  const handleQrCodeScan = (decodedText: string) => {
    setScannedData(decodedText);
    setIsQrScanned(true);
    setIsDialogOpen(true);
    if (scanner) {
      scanner.clear();
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
        <div className="space-y-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>報酬</span>
            <span>¥{job.fee.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>勤務開始確認</AlertDialogTitle>
            <AlertDialogDescription>
              お店のQRコードをスキャンしてください
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            <div className="border p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500 mb-4">
                {isQrScanned ? (
                  <span className="text-green-600">
                    QRコードの検証が完了しました
                  </span>
                ) : (
                  "カメラをQRコードに向けてください"
                )}
              </p>
              <div className="flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
                {!isQrScanned ? (
                  <div id="qr-reader" className="w-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8">
                    <QrCode className="h-12 w-12 text-green-500 mb-2" />
                    <span className="text-sm text-gray-600">スキャン完了</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>
              キャンセル
            </Button>
            {!isQrScanned ? (
              <Button
                onClick={() => {
                  const qrReaderElement = document.getElementById("qr-reader");
                  if (qrReaderElement) {
                    const buttons =
                      qrReaderElement.getElementsByTagName("button");
                    for (let i = 0; i < buttons.length; i++) {
                      if (buttons[i].textContent?.includes("Start")) {
                        buttons[i].click();
                        break;
                      }
                    }
                  }
                }}>
                スキャンを開始
              </Button>
            ) : (
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
      />

      {workSession && (
        <ChatSheet
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          messages={messages}
          onSendMessage={async (message) => {
            try {
              const messageParams = {
                content: message,
                worksession_id: workSession.id,
                application_id: application?.id.toString() || "",
                sender_type: "chef" as const,
              };
              await messageApi.createMessage(messageParams);
              mutate(`messages-${workSession.id}`);
            } catch (error) {
              console.error("Failed to send message:", error);
            }
          }}
          restaurantName={restaurant?.name || ""}
          restaurantImage={restaurant?.profile_image}
          workDate={job?.work_date || ""}
          startTime={job?.start_time || 0}
          workSessionId={workSession.id}
          mutateMessages={() => mutate(`messages-${workSession.id}`)}
        />
      )}
    </div>
  );
}
