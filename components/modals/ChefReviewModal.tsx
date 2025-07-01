"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useFinishWorksession } from "@/hooks/api/user/worksessions/useFinishWorksession";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Controller, useForm } from "react-hook-form";
import { FinishPartialUpdateBody } from "@/api/__generated__/base/data-contracts";
import { Input } from "@/components/ui/input";
import { useGetChefReviewByWorksessionId } from "@/hooks/api/user/chefReviews/useGetChefReviewByWorksessionId";

type ChefReviewForm = Omit<FinishPartialUpdateBody, 'transportation_expenses' | 'check_out_time'> & {
  transportation_expenses: number | "" | null;
};
interface ChefReviewModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  storeName: string;
  jobTitle: string;
  jobDate: string;
  transportation_type: "NONE" | "MAX" | "FIXED";
  transportation_amount: number;
  transportation_expenses?: number | null;
  workSessionId: number;
  jobFee: number;
}

export function ChefReviewModal({
  isOpen,
  onCloseAction,
  storeName,
  jobTitle,
  jobDate,
  workSessionId,
  jobFee,
  transportation_type,
  transportation_amount,
  transportation_expenses: initialExpenses = null,
}: ChefReviewModalProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [hoverRating, setHoverRating] = useState(0);
  const {
    data: review,
  } = useGetChefReviewByWorksessionId({
    userId: user?.id,
    worksessionId: workSessionId,
  });

  const hasReviewed = review != null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm<ChefReviewForm>({
    defaultValues: {
      rating: review?.rating || 5,
      feedback: review?.comment || "",
      transportation_expenses: initialExpenses ?? "",
    },
    values: {
      rating: review?.rating || 5,
      feedback: review?.comment || "",
      transportation_expenses: initialExpenses ?? "",
    }
  });

  const handleClose = () => {
    reset();
    onCloseAction();
  }

  const { trigger: finishWorksessionTrigger } = useFinishWorksession({
    worksessionId: workSessionId,
    userId: user?.id,
  });

  const submit = async (data: ChefReviewForm) => {
    if (data.rating === 0 || (transportation_type !== "NONE" && data.transportation_expenses === "")) return;

    const submitData: FinishPartialUpdateBody = {
      ...data,
      check_out_time: Date.now(),
      transportation_expenses:
        // 型変換: transportation_expensesが空文字の場合はnull、そうでなければnumber型に変換
        (data.transportation_expenses === "" ? null : Number(data.transportation_expenses)),
    };

    try {
      await finishWorksessionTrigger(submitData);
      router.refresh();
      handleClose();
    } catch (error) {
      toast({
        title: "エラー",
        description:
          "チェックアウト処理に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            完了報告・レビュー
          </DialogTitle>
          <p className="text-sm text-gray-500">
            お仕事の終了予定時間から72時間以内に完了報告を行なってください。
          </p>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <h3 className="font-medium">{storeName}</h3>
            <p className="text-sm text-gray-500">{jobTitle}</p>
            <p className="text-sm text-gray-500">{jobDate}</p>
            <div className="mt-2 text-sm">
              <span className="font-semibold">交通費設定：</span>
              {transportation_type === "NONE"
                ? "交通費なし"
                : transportation_type === "MAX"
                ? `上限${transportation_amount.toLocaleString()}円`
                : `${transportation_amount.toLocaleString()}円`}
            </div>
            <div className="mt-2 text-sm">
              <span className="font-semibold">チェックイン：</span>
              済
            </div>
            <div className="mt-2 text-sm">
              <span className="font-semibold">報酬：</span>
              {jobFee.toLocaleString()}円
            </div>
            <div className="mt-2 text-xs text-gray-500">
              ※
              勤務時間の変更により報酬の変更が必要な場合は、お店にチャットでご相談ください。
            </div>
          </div>

          {(transportation_type === "MAX" ||
              transportation_type === "FIXED") && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">実際にかかった交通費</p>
                <Input
                  {...register("transportation_expenses", {
                    required: "交通費を入力してください",
                    validate: (value) => {
                      if (value == null || value === "" || isNaN(Number(value))) {
                        return "交通費を入力してください";
                      }
                      if (transportation_type === "MAX" && Number(value) > transportation_amount) {
                        return `交通費は上限${transportation_amount.toLocaleString()}円までです`;
                      }
                      if (transportation_type === "FIXED" && Number(value) !== transportation_amount) {
                        return `交通費は${transportation_amount.toLocaleString()}円で入力してください`;
                      }
                      return true;
                    },
                  })}
                  type="number"
                  min={0}
                  max={
                    transportation_type === "MAX"
                      ? transportation_amount
                      : undefined
                  }
                  className="w-full border rounded-md p-2 bg-white"
                  placeholder={
                    transportation_type === "FIXED"
                      ? `${transportation_amount.toLocaleString()}円で入力してください`
                      : "金額を入力してください"
                  }
                />
                {/* 上限・固定金額の表示 */}
                {transportation_type === "MAX" && (
                  <p className="text-xs text-gray-500 mt-1">
                    上限 {transportation_amount.toLocaleString()}円
                  </p>
                )}
                {transportation_type === "FIXED" && (
                  <p className="text-xs text-gray-500 mt-1">
                    固定 {transportation_amount.toLocaleString()}円
                  </p>
                )}
                {errors.transportation_expenses?.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.transportation_expenses.message}</p>
                )}
              </div>
            )}

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">お店の評価</p>
            <Controller
              name="rating"
              control={control}
              rules={{ required: "評価を選択してください。" }}
              render={({ field }) => {
                const rating = field.value;

                return (
                  <>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          disabled={hasReviewed}
                          className="p-1"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= (hoverRating || rating)
                                ? "fill-current text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-center text-sm text-gray-500">
                      {rating === 0 ? "評価してください" : `${rating}点を選択中`}
                    </p>
                  </>
                );
              }}
            />
            {errors.rating && (
             <p className="text-red-500 text-xs mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">コメント</p>
            <Textarea
              {...register("feedback", {
                required: "コメントは必須です",
              })}
              disabled={hasReviewed}
              placeholder="お店への感想やフィードバックを入力してください"
              className="min-h-[100px]"
            />
            {errors.feedback && (
              <p className="text-red-500 text-xs mt-1">
                {errors.feedback.message}
              </p>
            )}
          </div>

          <div className="bg-amber-50 p-3 rounded-md mb-4">
            <p className="text-sm text-amber-800">
              完了報告を送信すると、お店側の承認後に報酬が確定します。正確な情報を入力してください。
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto">
            キャンセル
          </Button>
          <Button
            onClick={handleSubmit(submit)}
            disabled={
              watch("rating") === 0 ||
              (transportation_type !== "NONE" && watch("transportation_expenses") === "")
            }
            className="w-full sm:w-auto"
            style={{ backgroundColor: "#DB3F1C", color: "white" }}>
            送信する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
