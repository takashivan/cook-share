"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building,
  CreditCard,
  MessageSquare,
  Store,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/store";
import { fetchRestaurantsByCompanyId } from "@/lib/store/restaurantSlice";
import { CreateRestaurantModal } from "@/components/modals/CreateRestaurantModal";
import { createRestaurant } from "@/lib/api/restaurant";
import { toast } from "@/hooks/use-toast";
import { useGetCompany } from "@/hooks/api/companies/useGetCompany";
import { useGetRestaurantsByCompanyId } from "@/hooks/api/restaurants/useGetRestaurantsByCompanyId";
import { useGetJobsByCompanyId } from "@/hooks/api/jobs/useGetJobsByCompanyId";
import { useGetCompanyUsersByCompanyId } from "@/hooks/api/companyUsers/useGetCompanyUsersByCompanyId";

export function CompanyDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCompanyAuth();

  const { data: company } = useGetCompany({ companyId: user?.companies_id });
  const { data: restaurants, isLoading: restaurantsLoading, error: restaurantsError } = useGetRestaurantsByCompanyId({ companyId: user?.companies_id });
  const { data: jobs, isLoading: jobsLoading, error: jobsError } = useGetJobsByCompanyId({ companyId: user?.companies_id });
  const { data: companyUsers, isLoading: companyUsersLoading, error: companyUsersError } = useGetCompanyUsersByCompanyId({ companyId: user?.companies_id });

  const [isCreateRestaurantModalOpen, setIsCreateRestaurantModalOpen] =
    useState(false);

  // データが更新されたときのログ
  useEffect(() => {
    console.log("Company info updated:", company);
    console.log("Restaurants updated:", restaurants);
  }, [company, restaurants]);

  const handleCreateRestaurant = async (data: FormData) => {
    try {
      if (!user?.companies_id) {
        throw new Error("会社IDが見つかりません");
      }

      // UUIDの形式を確認
      if (
        !user.companies_id.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        )
      ) {
        throw new Error("会社IDの形式が正しくありません");
      }

      // FormDataの内容を確認（デバッグ用）
      console.log("Submitting FormData:");
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }

      // レストラン作成APIを呼び出し
      const response = await createRestaurant(data);

      if (!response) {
        throw new Error("店舗の作成に失敗しました");
      }

      // 店舗一覧を再取得
      await dispatch(fetchRestaurantsByCompanyId(user.companies_id));

      // モーダルを閉じる
      setIsCreateRestaurantModalOpen(false);

      // 成功通知
      toast({
        title: "店舗を追加しました",
        description: "新しい店舗の登録が完了しました。",
      });
    } catch (error) {
      console.error("Failed to create restaurant:", error);

      // エラー通知
      toast({
        title: "エラーが発生しました",
        description:
          error instanceof Error
            ? error.message
            : "店舗の追加に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });

      throw error;
    }
  };

  if (restaurantsLoading || jobsLoading || companyUsersLoading) {
    return <div>Loading...</div>;
  }

  if (restaurantsError || jobsError) {
    return <div>Error: {restaurantsError}</div>;
  }

  return (
    <>
      {companyUsersError && (
        <div className="bg-red-50 text-red-600 p-4 mb-4 rounded">{companyUsersError}</div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              会社ダッシュボード
            </h2>
            <p className="text-muted-foreground">
              {company?.name || "読み込み中..."}の管理画面へようこそ
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Building className="mr-2 h-4 w-4" />
              会社情報を編集
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">店舗数</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{restaurants?.length ?? ''}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs?.job.length ?? ''}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">スタッフ</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companyUsers?.length ?? ''}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>最近の請求</CardTitle>
              <CardDescription>最近の請求情報</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        請求 #{202400 + i}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ¥{45000 + i * 5000} - 2024/0{i}/01
                      </p>
                    </div>
                    <div className="rounded-full px-2 py-1 text-xs bg-green-100 text-green-800">
                      支払済
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <Link href="/admin/company/billing">
                    <Button variant="outline" className="w-full">
                      すべての請求を表示
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateRestaurantModal
        isOpen={isCreateRestaurantModalOpen}
        onClose={() => setIsCreateRestaurantModalOpen(false)}
        onSubmit={handleCreateRestaurant}
        companyId={user?.companies_id || ""}
      />
    </>
  );
}
