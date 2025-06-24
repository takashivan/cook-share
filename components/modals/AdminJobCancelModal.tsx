"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, differenceInDays } from "date-fns";
import { JobsDetailData, WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { useState } from "react";
import { useUserCancelWorksessionByRestaurant } from "@/hooks/api/companyuser/worksessions/useCancelWorksessionByRestaurant";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { AdminJobActionsMenuProps } from "../dropdownMenu/AdminJobActionsMenu";

interface CancellationPenalty {
  isOpen: boolean;
  onCloseAction: () => void;
  job: JobsDetailData["job"];
  workSession: WorksessionsRestaurantTodosListData[number];
  sendMessageAction: AdminJobActionsMenuProps["sendMessageAction"];
}

export function AdminJobCancelModal({
  isOpen,
  onCloseAction,
  job,
  workSession,
  sendMessageAction,
}: CancellationPenalty) {
  const router = useRouter();

  const [cancelReason, setCancelReason] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { trigger: cancelWorksessionTrigger } =
    useUserCancelWorksessionByRestaurant({
      worksession_id: workSession.id,
      jobId: job.id,
    });

  // キャンセル時のペナルティ計算
  const calculateCancellationPenalty = () => {
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

  const cancellationPenalty = calculateCancellationPenalty();

  const handleCancelConfirm = async () => {
    if (!cancellationPenalty || !isConfirmed || !cancelReason) return;

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
      
      await sendMessageAction({
        message,
        // このチャットのnotificationは不要
        shouldNotify: false,
      });

      toast({
        title: "キャンセル完了",
        description: "お仕事のキャンセルが完了しました。",
      });

      router.refresh();
      onCloseAction();
    } catch (error) {
      toast({
        title: "エラー",
        description: "キャンセル処理に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            お仕事のキャンセル確認
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <span className="text-red-800 font-medium">
              {cancellationPenalty?.message}
            </span>
            {cancellationPenalty?.penalty !== undefined &&
              cancellationPenalty.penalty > 0 && (
                <div className="mt-2">
                  <span className="text-red-800 font-semibold">
                    違約金: ¥{cancellationPenalty.penalty.toLocaleString()}
                  </span>
                </div>
              )}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <span className="text-yellow-800 text-sm">
              ※
              度重なるキャンセルや不当な理由でのキャンセルは、今後のご利用停止となる可能性があります。
            </span>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="cancel-reason"
              className="block text-sm font-medium text-gray-700">
              キャンセル理由
            </label>
            <Textarea
              id="cancel-reason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="キャンセルの理由を具体的にご記入ください"
              required
              className="w-full h-24 p-2 border rounded-md bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition"
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
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={onCloseAction}>
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
      </DialogContent>
    </Dialog>
  )
};