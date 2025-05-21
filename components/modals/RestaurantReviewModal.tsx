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
import { WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { format } from "date-fns";
import { useVerifyWorksession } from "@/hooks/api/companyuser/worksessions/useVerifyWorksession";
import { toast } from "@/hooks/use-toast";

interface RestaurantReviewModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  worksession: WorksessionsRestaurantTodosListData[number];
  handleSuccessAction: () => void;
}

export function RestaurantReviewModal({
  isOpen,
  onCloseAction,
  worksession,
  handleSuccessAction,
}: RestaurantReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [approved, setApproved] = useState(true);

  const { trigger: verifyWorksessionTrigger } = useVerifyWorksession({
    worksessionId: worksession?.id,
    jobId: Number(worksession?.job.id),
    restaurantId: Number(worksession?.job.restaurant_id),
    handleSuccess: () => {
      toast({
        title: "シェフの評価を送信しました",
        description: "シェフの勤怠確認・評価を送信しました",
      });
      setRating(0);
      setComment("");
      setApproved(true);
      onCloseAction();
      handleSuccessAction();
    },
    handleError: () => {
      toast({
        title: "エラー",
        description: "勤務確認・評価の送信に失敗しました。もう一度お試しください",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (rating === 0) return;

    verifyWorksessionTrigger({
      rating,
      feedback: comment,
    });
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    setApproved(true);
    onCloseAction();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            シェフの勤務確認・評価
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={worksession.user.profile_image || "/chef-logo.png"}
                alt={worksession.user.name}
              />
              <AvatarFallback>{worksession.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{worksession.user.name}</h3>
              <p className="text-sm text-muted-foreground">{worksession.job.title}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {worksession.job.work_date
                    ? format(new Date(worksession.job.work_date), "yyyy/MM/dd")
                    : "未定"
                  }
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {worksession?.job.start_time &&
                    worksession?.job.end_time
                      ? `${format(
                          new Date(worksession.job.start_time),
                          "HH:mm"
                        )}〜${format(
                          new Date(worksession.job.end_time),
                          "HH:mm"
                        )}`
                      : "未定"
                  }
                </div>
              </div>
            </div>
          </div>

          {/* {chefRating && chefComment && (
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
          )} */}

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
            onClick={handleClose}
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
