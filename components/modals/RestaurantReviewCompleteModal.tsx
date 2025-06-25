"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { useGetChefReviewByWorksessionId } from "@/hooks/api/companyuser/chefReviews/useGetChefReviewByWorksessionId";

interface RestaurantReviewCompleteModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  worksessionId: number;
  restaurantId?: number;
}

export function RestaurantReviewCompleteModal({
  isOpen,
  onCloseAction,
  worksessionId,
  restaurantId,
}: RestaurantReviewCompleteModalProps) {
  // シェフからのレビューを取得
  const { data: restaurantReview, isLoading: restaurantReviewLoading } = useGetChefReviewByWorksessionId({
    worksessionId,
    restaurantId,
    enabled: true,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onCloseAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>お疲れ様でした！</DialogTitle>
          <DialogDescription>
            シェフからの評価が届いています
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {restaurantReviewLoading && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          )}
          {restaurantReview ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < restaurantReview.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  ({restaurantReview.rating}点)
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">シェフからのコメント</h3>
                <p className="text-sm">{restaurantReview.comment}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              シェフからの評価はまだありません
            </p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onCloseAction}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
