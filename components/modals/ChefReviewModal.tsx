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

interface ChefReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  storeName: string;
  jobTitle: string;
  jobDate: string;
}

export function ChefReviewModal({
  isOpen,
  onClose,
  onSubmit,
  storeName,
  jobTitle,
  jobDate,
}: ChefReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(rating, comment);
    setRating(0);
    setComment("");
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
            72時間以内に完了報告を行なってください。
          </p>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <h3 className="font-medium">{storeName}</h3>
            <p className="text-sm text-gray-500">{jobTitle}</p>
            <p className="text-sm text-gray-500">{jobDate}</p>
          </div>

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
            disabled={rating === 0}
            className="w-full sm:w-auto"
            style={{ backgroundColor: "#DB3F1C", color: "white" }}>
            送信する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
