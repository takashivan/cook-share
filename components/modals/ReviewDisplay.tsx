import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewDisplayProps {
  storeReview?: {
    rating: number;
    comment: string;
    date: string;
  };
  chefReview?: {
    rating: number;
    comment: string;
    date: string;
  };
  storeName: string;
  storeImage?: string;
  chefName: string;
  chefImage?: string;
}

export function ReviewDisplay({
  storeReview,
  chefReview,
  storeName,
  storeImage,
  chefName,
  chefImage,
}: ReviewDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4" style={{ color: "#DB3F1C" }}>
        レビュー
      </h2>

      {chefReview && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={chefImage} alt={chefName} />
              <AvatarFallback>{chefName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{chefName}さんの評価</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= chefReview.rating
                        ? "fill-current text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="ml-13 pl-13">
            <p className="text-sm ml-13">{chefReview.comment}</p>
            <p className="text-xs text-gray-500 mt-1">{chefReview.date}</p>
          </div>
        </div>
      )}

      {storeReview && (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={storeImage} alt={storeName} />
              <AvatarFallback>{storeName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{storeName}の評価</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= storeReview.rating
                        ? "fill-current text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="ml-13 pl-13">
            <p className="text-sm">{storeReview.comment}</p>
            <p className="text-xs text-gray-500 mt-1">{storeReview.date}</p>
          </div>
        </div>
      )}

      {!chefReview && !storeReview && (
        <div className="text-center py-4 text-gray-500">
          <p>まだレビューはありません</p>
        </div>
      )}
    </div>
  );
}
