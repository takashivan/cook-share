"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetChefReviewsByRestaurantId } from "@/hooks/api/companyuser/chefReviews/useGetChefReviewsByRestaurantId";

interface ReviewListProps {
  restaurantId: number;
}

export function ReviewList({
  restaurantId,
}: ReviewListProps) {
  const {
    data: restaurantReviews,
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useGetChefReviewsByRestaurantId({
    restaurantId,
  });

  if (restaurantReviews?.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>シェフからのレビュー</CardTitle>
      </CardHeader>
      <CardContent>
        {reviewsError ? (
          <ErrorPage />
        ) : (isReviewsLoading || !restaurantReviews) ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-4">
            {restaurantReviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
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
                <p className="text-sm text-gray-700 mb-2">
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
        )}
      </CardContent>
    </Card>
  )
};
