"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building,
  CreditCard,
  DollarSign,
  Edit,
  ExternalLink,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Store,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRestaurants, CreateRestaurantData } from "@/lib/api/restaurant";
import type { Restaurant } from "@/lib/api/restaurant";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { getCompany, type Company } from "@/lib/api/company";
import type { Job } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchRestaurantsByCompanyId } from "@/lib/store/restaurantSlice";
import { fetchJobsByCompanyId } from "@/lib/store/jobSlice";
import { CreateRestaurantModal } from "@/components/modals/CreateRestaurantModal";
import { createRestaurant } from "@/lib/api/restaurant";
import {
  getCompanyUserByCompanyId,
  type CompanyUser,
} from "@/lib/api/companyUser";
import { toast } from "@/hooks/use-toast";

export function CompanyDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCompanyAuth();
  const {
    restaurants,
    loading: restaurantsLoading,
    error: restaurantsError,
  } = useSelector((state: RootState) => state.restaurants);
  const {
    jobs,
    loading: jobsLoading,
    error: jobsError,
  } = useSelector((state: RootState) => state.jobs);
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [isCreateRestaurantModalOpen, setIsCreateRestaurantModalOpen] =
    useState(false);
  const [companyUsers, setCompanyUsers] = useState<CompanyUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.companies_id) {
        console.log("Fetching data for company ID:", user.companies_id);

        // まず会社情報を取得
        const companyData = await getCompany(user.companies_id);
        console.log("Fetched company data:", companyData);
        setCompanyInfo(companyData);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user?.companies_id) {
      dispatch(fetchRestaurantsByCompanyId(user.companies_id));
      dispatch(fetchJobsByCompanyId(user.companies_id));
    }
  }, [dispatch, user?.companies_id]);

  useEffect(() => {
    const fetchCompanyUsers = async () => {
      if (user?.companies_id) {
        try {
          setIsLoadingUsers(true);
          const response = await getCompanyUserByCompanyId(user.companies_id);
          const validUsers = Array.isArray(response)
            ? response.filter(
                (user): user is CompanyUser =>
                  user !== null && typeof user === "object"
              )
            : [];
          setCompanyUsers(validUsers);
        } catch (error) {
          console.error("Failed to fetch company users:", error);
          setError(
            error instanceof Error
              ? error.message
              : "スタッフ情報の取得に失敗しました"
          );
        } finally {
          setIsLoadingUsers(false);
        }
      }
    };

    fetchCompanyUsers();
  }, [user?.companies_id]);

  // データが更新されたときのログ
  useEffect(() => {
    console.log("Company info updated:", companyInfo);
    console.log("Restaurants updated:", restaurants);
  }, [companyInfo, restaurants]);

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

  if (restaurantsLoading) {
    return <div>Loading...</div>;
  }

  if (restaurantsError) {
    return <div>Error: {restaurantsError}</div>;
  }

  const recentJobs = [
    {
      id: 1,
      title: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
      store: "洋食 黒船亭 上野店",
      date: "2024/04/01",
      applicants: 5,
      status: "公開中",
    },
    {
      id: 2,
      title: "【週末限定】ランチタイムのホールスタッフ募集",
      store: "和食 さくら 新宿店",
      date: "2024/04/02",
      applicants: 3,
      status: "公開中",
    },
    {
      id: 3,
      title: "【経験者優遇】ディナータイムの調理補助スタッフ",
      store: "イタリアン ベラ 渋谷店",
      date: "2024/04/03",
      applicants: 2,
      status: "公開中",
    },
  ];

  const recentStaff = [
    {
      id: 1,
      name: "山田 太郎",
      email: "yamada@example.com",
      role: "管理者",
      department: "経営企画部",
    },
    {
      id: 2,
      name: "佐藤 花子",
      email: "sato@example.com",
      role: "一般ユーザー",
      department: "人事部",
    },
    {
      id: 3,
      name: "鈴木 一郎",
      email: "suzuki@example.com",
      role: "一般ユーザー",
      department: "マーケティング部",
    },
  ];

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 mb-4 rounded">{error}</div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              会社ダッシュボード
            </h2>
            <p className="text-muted-foreground">
              {companyInfo?.name || "読み込み中..."}の管理画面へようこそ
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
              <div className="text-2xl font-bold">{restaurants.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">スタッフ</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companyUsers.length}</div>
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
