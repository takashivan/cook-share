"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchCuisines } from "@/lib/redux/slices/operatorSlice";
import { Cuisine } from "@/lib/api/cuisines";

export default function CategoriesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cuisines = useSelector((state: RootState) => state.operator.cuisines);
  const loading = useSelector((state: RootState) => state.operator.loading.cuisines);
  const error = useSelector((state: RootState) => state.operator.error.cuisines);

  useEffect(() => {
    dispatch(fetchCuisines());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">エラーが発生しました: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">カテゴリ一覧</h2>
        <p className="text-muted-foreground">登録されているカテゴリの一覧です</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cuisines.map((cuisine: Cuisine) => (
          <Card key={cuisine.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold">{cuisine.category}</h3>
                  <p className="text-sm text-gray-500">{cuisine.is_primary}</p>


                  <div className="mt-2 flex flex-wrap gap-2">
                    {cuisine.is_primary && (
                      <Badge variant="default">プライマリー</Badge>
                    )}
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
