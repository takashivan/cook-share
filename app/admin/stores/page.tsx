"use client";

import { useEffect, useState, useCallback } from "react";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { CreateRestaurantModal } from "@/components/modals/CreateRestaurantModal";
import { createRestaurant } from "@/lib/api/restaurant";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  ExternalLink,
  MoreHorizontal,
  Plus,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useGetRestaurantsByCompanyId } from "@/hooks/api/restaurants/useGetRestaurantsByCompanyId";
import { useCreateRestaurant } from "@/hooks/api/restaurants/useCreateRestaurant";
import { RestaurantsCreatePayload } from "@/api/__generated__/base/data-contracts";

export default function StoresPage() {
  const { user } = useCompanyAuth();
  const {
    data: restaurants,
    isLoading,
    error,
    mutate,
  } = useGetRestaurantsByCompanyId({ companyId: user?.companies_id });
  const [isCreateRestaurantModalOpen, setIsCreateRestaurantModalOpen] =
    useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const { trigger: createRestaurantTrigger } = useCreateRestaurant({
    companyId: user?.companies_id ?? undefined,
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleCreateRestaurantModal = useCallback(() => {
    if (!hasMounted) return;
    setIsCreateRestaurantModalOpen(true);
  }, [hasMounted]);

  const handleCloseRestaurantModal = useCallback(() => {
    if (!hasMounted) return;
    setIsCreateRestaurantModalOpen(false);
  }, [hasMounted]);

  const handleCreateRestaurant = useCallback(
    async (data: RestaurantsCreatePayload) => {
      if (!hasMounted || !user?.companies_id) return;

      try {
        const companyId = user.companies_id;
        if (
          !companyId.match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          )
        ) {
          throw new Error("会社IDの形式が正しくありません");
        }

        const result = await createRestaurantTrigger(data);
        if (!result) {
          throw new Error("店舗の作成に失敗しました");
        }

        handleCloseRestaurantModal();
        toast({
          title: "店舗を追加しました",
          description: "新しい店舗の登録が完了しました。",
        });
      } catch (error) {
        console.error("Failed to create restaurant:", error);
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
    },
    [hasMounted, user?.companies_id, mutate, handleCloseRestaurantModal]
  );

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">店舗管理</h2>
          <p className="text-muted-foreground">
            店舗の追加、編集、情報管理を行えます
          </p>
        </div>
        <Button onClick={handleCreateRestaurantModal}>
          <Plus className="mr-2 h-4 w-4" />
          店舗を追加
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総店舗数</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{restaurants?.length ?? ''}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">営業中の店舗</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {restaurants?.filter((r) => r.is_active).length  ?? ''}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop View */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>店舗名</TableHead>
                <TableHead>住所</TableHead>
                <TableHead>ジャンル</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurants?.map((restaurant) => (
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
                  <TableCell>{restaurant.cuisine_type}</TableCell>
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
        {restaurants?.map((restaurant) => (
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
                <Link href={`/admin/stores/${restaurant.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    詳細を表示
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateRestaurantModal
        isOpen={isCreateRestaurantModalOpen}
        onClose={handleCloseRestaurantModal}
        onSubmit={handleCreateRestaurant}
        companyId={user?.companies_id || ""}
      />
    </div>
  );
}
