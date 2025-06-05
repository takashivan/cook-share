"use client";

import { useState, useCallback } from "react";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { CreateRestaurantModal } from "@/components/modals/CreateRestaurantModal";
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
import { useCreateRestaurant } from "@/hooks/api/companyuser/restaurants/useCreateRestaurant";
import { RestaurantsCreatePayload } from "@/api/__generated__/base/data-contracts";
import { useGetRestaurantsByCompanyUserId } from "@/hooks/api/companyuser/restaurants/useGetRestaurantsByCompanyUserId";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { useGetRestaurantCuisines } from "@/hooks/api/all/restaurantCuisines/useGetRestaurantCuisines";
import { Badge } from "@/components/ui/badge";
import { RestaurantStatusBadgeForAdmin } from "@/components/badge/RestaurantStatusBadgeForAdmin";

export default function StoresPage() {
  const { user } = useCompanyAuth();

  const [isCreateRestaurantModalOpen, setIsCreateRestaurantModalOpen] =
    useState(false);

  const { data: cuisines, error: errorGetCuisines, isLoading: isCuisinesLoading } = useGetRestaurantCuisines();

  const {
    data: restaurants,
    isLoading,
    error,
  } = useGetRestaurantsByCompanyUserId({ companyuserId: user?.id });

  const { trigger: createRestaurantTrigger } = useCreateRestaurant({
    companyId: user?.companies_id ?? undefined,
    companyUserId: user?.id ?? undefined,
    handleSuccess: () => {
      toast({
        title: "店舗を追加しました",
        description: "新しい店舗の登録が完了しました。",
      });
      handleCloseRestaurantModal();
    },
    handleError: (error) => {
      toast({
        title: "エラーが発生しました",
        description:
          error instanceof Error
            ? error.message
            : "店舗の追加に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    },
  });

  const handleCreateRestaurantModal = useCallback(() => {
    setIsCreateRestaurantModalOpen(true);
  }, [setIsCreateRestaurantModalOpen]);

  const handleCloseRestaurantModal = useCallback(() => {
    setIsCreateRestaurantModalOpen(false);
  }, [setIsCreateRestaurantModalOpen]);

  const handleCreateRestaurant = useCallback(
    async (data: RestaurantsCreatePayload) => {
      if (!user?.companies_id) return;

      await createRestaurantTrigger(data);
    },
    [user?.companies_id, createRestaurantTrigger]
  );

  if (error || errorGetCuisines) {
    return (
      <ErrorPage />
    );
  }
  
  if (isLoading || !restaurants || isCuisinesLoading) {
    return (
      <LoadingScreen
        fullScreen={false}
        message="店舗一覧を読み込んでいます..."
      />
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
            <div className="text-2xl font-bold">{restaurants.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">公開中の店舗</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {restaurants.filter((r) => r.status === "APPROVED").length}
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
                <TableHead className="w-24">ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurants.length > 0 ?
                restaurants.map((restaurant) => (
                  <TableRow 
                    key={restaurant.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.location.href = `/admin/stores/${restaurant.id}`}
                  >
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
                      <div className="flex flex-wrap gap-2">
                        {cuisines?.filter((cuisine) => restaurant.restaurant_cuisine_id.includes(cuisine.id)).map((cuisine) => (
                          <Badge key={cuisine.id} variant="secondary">
                            {cuisine.category}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <RestaurantStatusBadgeForAdmin
                        status={restaurant.status}
                      />
                    </TableCell>
                  </TableRow>
                ))
                : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      店舗はありません
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {restaurants.length > 0 ?
          restaurants.map((restaurant) => (
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
                    <div className="flex flex-wrap gap-2">
                      {cuisines?.filter((cuisine) => restaurant.restaurant_cuisine_id.includes(cuisine.id)).map((cuisine) => (
                        <Badge key={cuisine.id} variant="secondary">
                          {cuisine.category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ステータス</p>
                    <RestaurantStatusBadgeForAdmin
                      status={restaurant.status}
                    />
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
          ))
          : (
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-muted-foreground">
                  店舗はありません
                </p>
              </CardContent>
            </Card>
          )
        }
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
