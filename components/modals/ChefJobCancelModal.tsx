import { JobsDetailData } from "@/api/__generated__/base/data-contracts";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { differenceInDays } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChefJobCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobsDetailData["job"];
  onSubmit: (reason: string) => void;
}

export function ChefJobCancelModal({
  isOpen,
  onClose,
  job,
  onSubmit,
}: ChefJobCancelModalProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

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
  const cancellationPenalty = calculateCancellationPenalty();

  const handleClose = () => {
    setIsConfirmed(false);
    setCancelReason("");
    onClose();
  };

  const handleCancelConfirm = () => {
    if (!cancellationPenalty || !isConfirmed || !cancelReason) return;

    onSubmit(cancelReason);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
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
              <Textarea
                id="cancel-reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full h-24 p-2 border rounded-md bg-white"
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
            onClick={handleClose}>
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
  )
};
