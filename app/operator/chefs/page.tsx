"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchChefs } from "@/lib/redux/slices/operatorSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/lib/api/user";

export default function ChefsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { chefs, loading, error } = useSelector((state: RootState) => ({
    chefs: state.operator.chefs,
    loading: state.operator.loading.chefs,
    error: state.operator.error.chefs,
  }));

  useEffect(() => {
    dispatch(fetchChefs());
  }, [dispatch]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">シェフ一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chefs.map((chef: UserProfile) => (
          <Card key={chef.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  {chef.avatar_url ? (
                    <AvatarImage src={chef.avatar_url} alt={chef.name} />
                  ) : (
                    <AvatarFallback>{chef.name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{chef.name}</h2>
                  <p className="text-sm text-gray-500">{chef.email}</p>
                  {chef.experience_level && (
                    <p className="text-sm text-gray-500">
                      経験: {chef.experience_level}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="default">
                      {chef.status || "ステータスなし"}
                    </Badge>
                    {chef.skills?.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
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
