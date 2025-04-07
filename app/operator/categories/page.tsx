"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/lib/api/user";
import { fetchCuisines } from "@/lib/redux/slices/operatorSlice";
import { Cuisine } from "@/lib/api/cuisines";

export default function CategoriesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { cuisines, loading, error } = useSelector((state: RootState) => ({
    cuisines: state.operator.cuisines,
    loading: state.operator.loading.cuisines,
    error: state.operator.error.cuisines,
  }));

  useEffect(() => {
    dispatch(fetchCuisines());
  }, [dispatch]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">カテゴリ一覧</h1>
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
