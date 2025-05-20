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
import { Star, Clock, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface RestaurantReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string, approved: boolean) => void;
  chefName: string;
  chefImage?: string;
  jobTitle: string;
  jobDate: string;
  jobTime: string;
  chefComment?: string;
  chefRating?: number;
}

export function RestaurantReviewModal({
  isOpen,
  onClose,
  onSubmit,
  chefName,
  chefImage,
  jobTitle,
  jobDate,
  jobTime,
  chefComment,
  chefRating,
}: RestaurantReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [approved, setApproved] = useState(true);

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(rating, comment, approved);
    setRating(0);
    setComment("");
    setApproved(true);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            シェフの勤務確認・評価
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={chefImage} alt={chefName} />
              <AvatarFallback>{chefName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{chefName}</h3>
              <p className="text-sm text-muted-foreground">{jobTitle}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {jobDate}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {jobTime}
                </div>
              </div>
            </div>
          </div>

          {chefRating && chefComment && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <p className="text-sm font-medium mb-2">シェフからの評価</p>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= chefRating
                          ? "fill-current text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm">{chefComment}</p>
              </CardContent>
            </Card>
          )}

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">シェフの評価</p>
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
            <p className="text-center text-sm text-muted-foreground">
              {rating === 0 ? "評価してください" : `${rating}点を選択中`}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">コメント</p>
            <Textarea
              placeholder="シェフへのフィードバックを入力してください"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="approve-work"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="approve-work" className="text-sm font-medium">
              勤務を承認する（報酬が支払われます）
            </label>
          </div>

          <Card className="mb-4">
            <CardContent className="p-4 bg-amber-50">
              <p className="text-sm text-gray-500">
                72時間以内に完了報告を行なってください。72時間を経過すると、自動で承認されます。
              </p>
              <p className="text-sm text-amber-800">
                勤務を承認すると、シェフに報酬が支払われます。問題がある場合は、チェックを外してください。
              </p>
            </CardContent>
          </Card>
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
            disabled={rating === 0 || !approved}
            className="w-full sm:w-auto">
            送信する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
