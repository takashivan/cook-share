"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, use, useState } from "react";
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
import { workSessionApi } from "@/lib/api/workSession";
import { messageApi } from "@/lib/api/message";
import { applicationApi } from "@/lib/api/application";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import useSWR from "swr";
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
import QrScanner from "react-qr-scanner";

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

  const handleStartWork = () => {
    setIsCheckInDialogOpen(true);
  };

  const handleQrScan = async (data: string) => {
    try {
      // QRコードからアプリケーションIDを取得
      const scannedApplicationId = parseInt(data);

      // 現在のアプリケーションIDと一致するか確認
      if (application?.id === scannedApplicationId) {
        setIsQrScanned(true);
        setScannedData(data);
        // ワークセッションのステータスを更新
        if (workSession) {
          // ワークセッションの更新処理を実装
          // TODO: workSessionApiにupdateWorkSessionStatusメソッドを追加する必要があります
          console.log("ワークセッションの更新が必要です");
          // ページをリロードして状態を更新
          router.refresh();
        }
      } else {
        alert("無効なQRコードです。正しいQRコードをスキャンしてください。");
      }
    } catch (error) {
      console.error("QRコードの検証に失敗しました:", error);
      alert("QRコードの検証に失敗しました。");
    }
  };

  const renderWorkStatusButton = () => {
    if (!workSession) return null;

    switch (workSession.status) {
      case "SCHEDULED":
        return (
          <Button className="w-full" onClick={handleStartWork}>
            勤務開始
          </Button>
        );
      case "IN_PROGRESS":
        return (
          <Button className="w-full" onClick={() => {}}>
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

      {renderWorkStatusButton()}

      <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
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
                {isQrScanned ? (
                  <span className="text-green-600">
                    QRコードの検証が完了しました
                  </span>
                ) : (
                  "カメラをQRコードに向けてください"
                )}
              </p>
              <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg overflow-hidden">
                {!isQrScanned && (
                  <QrScanner
                    onResult={(result: { getText: () => string }) => {
                      if (result) {
                        handleQrScan(result.getText());
                      }
                    }}
                    onError={(error: Error) => {
                      console.error("QRコードのスキャンに失敗しました:", error);
                    }}
                    constraints={{
                      facingMode: "environment",
                    }}
                    className="w-full h-full object-cover"
                  />
                )}
                {isQrScanned && (
                  <div className="flex flex-col items-center justify-center">
                    <QrCode className="h-12 w-12 text-green-500 mb-2" />
                    <span className="text-sm text-gray-600">スキャン完了</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCheckInDialogOpen(false);
                setIsQrScanned(false);
                setScannedData(null);
              }}>
              キャンセル
            </Button>
            <Button
              onClick={() => {
                setIsCheckInDialogOpen(false);
              }}
              disabled={!isQrScanned}>
              勤務開始
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
