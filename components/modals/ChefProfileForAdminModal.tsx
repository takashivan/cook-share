"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EXPERIENCE_LEVELS } from "@/lib/const/chef-profile";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { Button } from "@/components/ui/button";
import { useGetRestaurantReviewsByUserId } from "@/hooks/api/companyuser/restaurantReviews/useGetRestaurantReviewsByUserId";

interface ChefProfileForAdminModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  worksession: WorksessionsRestaurantTodosListData[number];
}

export function ChefProfileForAdminModal({
  isOpen,
  onCloseAction,
  worksession,
}: ChefProfileForAdminModalProps) {
  // シェフのこれまでのレビュー一覧を取得
  const { data: reviewsData } = useGetRestaurantReviewsByUserId({
    userId: worksession.user_id ?? undefined,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>シェフプロフィール</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  worksession.user.profile_image ||
                  "/chef-logo.png"
                }
                alt={worksession.user.name}
              />
              <AvatarFallback>
                {worksession.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">
                {worksession.user.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {EXPERIENCE_LEVELS.find(
                  (level) =>
                    level.value ===
                    worksession.user.experience_level
                )?.label || ""}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">
                経歴・自己紹介
              </h4>
              <p className="text-sm">
                {worksession.user.bio}
              </p>
            </div>
            {worksession.user.skills?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-1">
                  スキル
                </h4>
                <div className="flex flex-wrap gap-1">
                  {worksession.user.skills.map(
                    (skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}
            {worksession.user.certifications?.length >
              0 && (
              <div>
                <h4 className="text-sm font-medium mb-1">資格</h4>
                <div className="flex flex-wrap gap-1">
                  {worksession.user.certifications.map(
                    (cert: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}
            {reviewsData && reviewsData.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-1">
                  店舗からの評価
                </h4>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {reviewsData.map((review) => (
                      <div
                        key={review.id}
                        className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          {review.comment}
                        </p>
                        <div className="text-xs text-gray-500">
                          {format(
                            new Date(review.created_at),
                            "yyyy年MM月dd日",
                            { locale: ja }
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCloseAction}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
