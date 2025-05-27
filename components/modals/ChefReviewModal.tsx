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
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChefReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    rating: number,
    comment: string,
    transportation_expenses: number | null
  ) => void;
  storeName: string;
  jobTitle: string;
  jobDate: string;
  transportation_type: "NONE" | "MAX" | "FIXED";
  transportation_amount: number;
  transportation_expenses?: number | null;
  workSessionStart: number;
  workSessionEnd: number;
  jobFee: number;
}

export function ChefReviewModal({
  isOpen,
  onClose,
  onSubmit,
  storeName,
  jobTitle,
  jobDate,
  workSessionStart,
  jobFee,
  workSessionEnd,
  transportation_type,
  transportation_amount,
  transportation_expenses: initialExpenses = null,
}: ChefReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [transportationExpenses, setTransportationExpenses] = useState<
    number | ""
  >(initialExpenses ?? "");
  const [expenseError, setExpenseError] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>(
    workSessionEnd.toString()
  );

  // 入力時バリデーション
  const handleExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setTransportationExpenses(value);
    if (value === "" || isNaN(Number(value))) {
      setExpenseError("交通費を入力してください");
      return;
    }
    if (
      transportation_type === "MAX" &&
      Number(value) > transportation_amount
    ) {
      setExpenseError(
        `交通費は上限${transportation_amount.toLocaleString()}円までです`
      );
      return;
    }
    if (
      transportation_type === "FIXED" &&
      Number(value) !== transportation_amount
    ) {
      setExpenseError(
        `交通費は${transportation_amount.toLocaleString()}円で入力してください`
      );
      return;
    }
    setExpenseError("");
  };

  // 時間選択肢の生成（30分間隔）
  const generateTimeOptions = (
    workSessionStart: number,
    workSessionEnd: number,
  ): string[] => {
    const options: string[] = [];

    const startDate = new Date(workSessionStart);
    const endDate = new Date(workSessionEnd);

    // 入力チェック：無効な日付、逆転している日付を除外
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
      return options;
    }

    console.log("Generating time options from", startDate, "to", endDate);

    let time = new Date(startDate);
    while (time <= endDate) {
      options.push(format(time, "HH:mm"));
      time = new Date(time.getTime() + 30 * 60 * 1000); // 30分加算（ミリ秒単位）
    }

    return options;
  };

  const handleSubmit = () => {
    if (rating === 0) return;
    if (transportation_type !== "NONE") {
      onSubmit(rating, comment, Number(transportationExpenses));
    } else {
      onSubmit(rating, comment, null);
    }
    setRating(0);
    setComment("");
    setTransportationExpenses(initialExpenses ?? "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              <span className="font-semibold">勤務開始時間：</span>
              {workSessionStart}
            </div>
            <div className="mt-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold">勤務終了時間：</span>
                <Select
                  value={selectedEndTime}
                  onValueChange={setSelectedEndTime}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="時間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeOptions(workSessionStart, workSessionEnd).map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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

          {typeof transportation_type === "string" &&
            (transportation_type === "MAX" ||
              transportation_type === "FIXED") && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">実際にかかった交通費</p>
                <input
                  type="number"
                  min={0}
                  max={
                    transportation_type === "MAX"
                      ? transportation_amount
                      : undefined
                  }
                  value={transportationExpenses}
                  onChange={handleExpensesChange}
                  className="w-full border rounded-md p-2 text-sm bg-white"
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
                {expenseError && (
                  <p className="text-red-500 text-xs mt-1">{expenseError}</p>
                )}
              </div>
            )}

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">お店の評価</p>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1">
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
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">コメント</p>
            <Textarea
              placeholder="お店への感想やフィードバックを入力してください"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
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
            onClick={onClose}
            className="w-full sm:w-auto">
            キャンセル
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              rating === 0 ||
              (transportation_type !== "NONE" && transportationExpenses === "")
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
