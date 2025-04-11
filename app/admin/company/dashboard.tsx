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

        <Tabs defaultValue="stores" className="space-y-4">
          <TabsList>
            <TabsTrigger value="stores">店舗一覧</TabsTrigger>
            <TabsTrigger value="jobs">求人一覧</TabsTrigger>
            <TabsTrigger value="staff">スタッフ一覧</TabsTrigger>
          </TabsList>

          <TabsContent value="stores" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">登録店舗</h3>
              <Button
                size="sm"
                onClick={() => setIsCreateRestaurantModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                店舗を追加
              </Button>
            </div>

            {/* Desktop View */}
            <Card className="hidden md:block">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>店舗名</TableHead>
                      <TableHead>住所</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restaurants.map((restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                              <Store className="h-4 w-4 text-gray-500" />
                            </div>
                            {restaurant.name}
                          </div>
                        </TableCell>
                        <TableCell>{restaurant.address}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              restaurant.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {restaurant.is_active ? "営業中" : "準備中"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">メニューを開く</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Link
                                  href={`/admin/stores/${restaurant.id}`}
                                  className="w-full flex items-center">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  詳細を表示
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                編集
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Mobile View */}
            <div className="grid gap-4 md:hidden">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                          <Store className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{restaurant.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {restaurant.address}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">メニューを開く</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              href={`/admin/stores/${restaurant.id}`}
                              className="w-full flex items-center">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              詳細を表示
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            編集
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">ジャンル</p>
                        <p>{restaurant.cuisine_type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ステータス</p>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            restaurant.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {restaurant.is_active ? "営業中" : "準備中"}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Link href={`/admin/company/stores/${restaurant.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          詳細を表示
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Link href="/admin/company/stores">
                <Button variant="outline">すべての店舗を表示</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">最近の求人</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                求人を追加
              </Button>
            </div>

            {jobsLoading ? (
              <div>Loading...</div>
            ) : jobsError ? (
              <div>Error: {jobsError}</div>
            ) : (
              <>
                {/* Desktop View */}
                <Card className="hidden md:block">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>求人タイトル</TableHead>
                          <TableHead>店舗</TableHead>
                          <TableHead>日付</TableHead>
                          <TableHead>ステータス</TableHead>
                          <TableHead>応募者数</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobs.map((job) => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">
                              {job.title}
                            </TableCell>
                            <TableCell>{job.restaurant_id}</TableCell>
                            <TableCell>
                              {job.work_date
                                ? new Date(job.work_date).toLocaleDateString()
                                : "-"}
                            </TableCell>
                            <TableCell>
                              <div
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  job.status === "published"
                                    ? "bg-green-100 text-green-800"
                                    : job.status === "draft"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}>
                                {job.status === "published"
                                  ? "公開中"
                                  : job.status === "draft"
                                    ? "下書き"
                                    : "終了"}
                              </div>
                            </TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">
                                      メニューを開く
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Link
                                      href={`/admin/job/${job.id}`}
                                      className="w-full flex items-center">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      詳細を表示
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    編集
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Mobile View */}
                <div className="grid gap-4 md:hidden">
                  {jobs.map((job) => (
                    <Card key={job.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {job.restaurant_id}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">メニューを開く</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Link
                                  href={`/admin/job/${job.id}`}
                                  className="w-full flex items-center">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  詳細を表示
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                編集
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">日付</p>
                            <p>
                              {job.work_date
                                ? new Date(job.work_date).toLocaleDateString()
                                : "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">ステータス</p>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                job.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : job.status === "draft"
                                    ? "bg-gray-100 text-gray-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}>
                              {job.status === "published"
                                ? "公開中"
                                : job.status === "draft"
                                  ? "下書き"
                                  : "終了"}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Link href={`/admin/job/${job.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full">
                              詳細を表示
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-center">
              <Link href="/admin/store/jobs">
                <Button variant="outline">すべての求人を表示</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            {isLoadingUsers ? (
              <div className="flex items-center justify-center p-4">
                <p>Loading...</p>
              </div>
            ) : companyUsers.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">　</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    スタッフを追加
                  </Button>
                </div>

                {/* Desktop View */}
                <Card className="hidden md:block">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>名前</TableHead>
                          <TableHead>メールアドレス</TableHead>
                          <TableHead>役割</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companyUsers
                          .filter((staff) => staff)
                          .map((staff) => (
                            <TableRow key={staff?.id || "unknown"}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-sm font-medium">
                                      {staff?.name ? staff.name.charAt(0) : "?"}
                                    </span>
                                  </div>
                                  {staff?.name || "名前なし"}
                                </div>
                              </TableCell>
                              <TableCell>{staff?.email || "-"}</TableCell>
                              <TableCell>
                                {staff?.is_admin ? "管理者" : "一般"}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">
                                        メニューを開く
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Link
                                        href={`/admin/company/staff`}
                                        className="w-full flex items-center">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        詳細を表示
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      編集
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Mobile View */}
                <div className="grid gap-4 md:hidden">
                  {companyUsers
                    .filter((staff) => staff)
                    .map((staff) => (
                      <Card key={staff?.id || "unknown"}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-sm font-medium">
                                  {staff?.name ? staff.name.charAt(0) : "?"}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">
                                  {staff?.name || "名前なし"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {staff?.email || "-"}
                                </p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">
                                    メニューを開く
                                  </span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Link
                                    href={`/admin/company/staff`}
                                    className="w-full flex items-center">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    詳細を表示
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  編集
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">役割</p>
                              <p>{staff?.is_admin ? "管理者" : "一般"}</p>
                            </div>
                            <div>
                              <p>-</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Link href={`/admin/company/staff`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full">
                                詳細を表示
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center p-4">
                <p>スタッフが見つかりません</p>
              </div>
            )}

            <div className="flex justify-center">
              <Link href="/admin/company/staff">
                <Button variant="outline">すべてのスタッフを表示</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2">
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

          <Card>
            <CardHeader>
              <CardTitle>最近のアクティビティ</CardTitle>
              <CardDescription>
                システム上の最近のアクティビティ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "求人を追加しました",
                    target: "【明治創業】上野駅徒歩5分、老舗洋食店での勤務",
                    user: "山田 太郎",
                    time: "1時間前",
                  },
                  {
                    action: "応募者とチャットしました",
                    target: "佐藤 健太",
                    user: "佐藤 花子",
                    time: "3時間前",
                  },
                  {
                    action: "店舗情報を更新しました",
                    target: "洋食 黒船亭 上野店",
                    user: "鈴木 一郎",
                    time: "昨日",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.target}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} - {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
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
