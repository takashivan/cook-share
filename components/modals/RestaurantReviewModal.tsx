"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Clock, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { useVerifyWorksession } from "@/hooks/api/companyuser/worksessions/useVerifyWorksession";
import { toast } from "@/hooks/use-toast";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useRejectWorksession } from "@/hooks/api/companyuser/worksessions/useRejectWorksession";
import { WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { useSendMessageByCompanyUserId } from "@/hooks/api/companyuser/messages/useSendMessageByCompanyUserId";

interface RestaurantReviewModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  worksessionData: {
    id: number;
    user: {
      name: string;
      profile_image: string | null;
    };
    job: {
      id: number;
      title: string;
      restaurant_id: number;
      work_date: string;
      start_time: number;
      end_time: number;
      fee: number;
    };
    restaurant: {
      name: string;
    };
    transportation_type: WorksessionsRestaurantTodosListData[number]["transportation_type"];
    transportation_expenses?: number;
  };
  handleSuccessAction: (status: 'verify' | 'reject') => void;
}

export function RestaurantReviewModal({
  isOpen,
  onCloseAction,
  worksessionData,
  handleSuccessAction,
}: RestaurantReviewModalProps) {
  const initialRating = 5;
  const { user } = useCompanyAuth();
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [approved, setApproved] = useState(true);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const { trigger: verifyWorksessionTrigger } = useVerifyWorksession({
    worksessionId: worksessionData?.id,
    jobId: Number(worksessionData?.job.id),
    restaurantId: Number(worksessionData?.job.restaurant_id),
    executedCompanyuserId: user?.id,
  });

  const { trigger: rejectWorksessionTrigger } = useRejectWorksession({
    worksessionId: worksessionData?.id,
    jobId: worksessionData?.job.id,
  });

  const { trigger: sendMessageTrigger } = useSendMessageByCompanyUserId({
    companyUserId: user?.id,
    workSessionId: worksessionData?.id,
  });

  const handleClose = () => {
    setRating(initialRating);
    setComment("");
    setApproved(true);
    onCloseAction();
  };

  const handleSubmit = async () => {
    if (rating === 0) return;

    try {
      await verifyWorksessionTrigger({
        rating,
        feedback: comment,
      });

      handleClose();
      handleSuccessAction('verify');
      toast({
        title: "シェフの評価を送信しました",
        description: "シェフの勤怠確認・評価を送信しました",
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "勤務確認・評価の送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {

    try {
      await rejectWorksessionTrigger({
        reason: rejectReason,
      });

      // メッセージとして変更リクエストのキャンセルを送信
      const message = `【差し戻し】
以下の完了報告を差し戻しました：

日付: ${worksessionData.job.work_date}
時間: ${format(new Date(worksessionData.job.start_time), "HH:mm")}〜${format(
        new Date(worksessionData.job.end_time),
        "HH:mm"
      )}
業務内容: ${worksessionData.job.title}
報酬: ¥${worksessionData.job.fee}
${worksessionData.transportation_type !== "NONE" ? `実際にかかった交通費: ¥${worksessionData.transportation_expenses || 0}` : ""}
差し戻し理由: ${rejectReason}`;

      await sendMessageTrigger({
        content: message,
        worksession_id: worksessionData.id,
        // このチャットのnotificationは不要
        shouldNotify: false,
      });

      setIsRejectModalOpen(false);
      setRejectReason("");

      handleClose();
      handleSuccessAction('reject');
      toast({
        title: "差し戻しを送信しました",
        description: "シェフに差し戻し理由を通知しました。",
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "差し戻しの送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            シェフの勤務確認・評価
          </DialogTitle>
          <DialogDescription>
            <span className="line-clamp-1">
              {worksessionData.restaurant.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={worksessionData.user.profile_image || "/chef-logo.png"}
                alt={worksessionData.user.name}
              />
              <AvatarFallback>
                {worksessionData.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{worksessionData.user.name}</h3>
              <p className="text-sm text-muted-foreground">
                {worksessionData.job.title}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {worksessionData.job.work_date
                    ? format(
                        new Date(worksessionData.job.work_date),
                        "yyyy/MM/dd"
                      )
                    : "未定"}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {worksessionData?.job.start_time &&
                  worksessionData?.job.end_time
                    ? `${format(
                        new Date(worksessionData.job.start_time),
                        "HH:mm"
                      )}〜${format(
                        new Date(worksessionData.job.end_time),
                        "HH:mm"
                      )}`
                    : "未定"}
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

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">申請された交通費</p>
            <p className="text-base text-gray-700 font-bold">
              {typeof worksessionData.transportation_expenses === "number"
                ? `${worksessionData.transportation_expenses.toLocaleString()}円`
                : "-"}
            </p>
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
            variant="destructive"
            onClick={() => setIsRejectModalOpen(true)}
            className="w-full sm:w-auto">
            差し戻し
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || !approved}
            className="w-full sm:w-auto">
            送信する
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* 差し戻し理由入力モーダル */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>差し戻し理由</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <Textarea
              placeholder="差し戻し理由を入力してください"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectModalOpen(false)}>
              キャンセル
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim()}>
              差し戻しを送信
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
