"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BarChart3,
  Calendar,
  Edit,
  ExternalLink,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Store,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchRestaurantsByCompanyId } from "@/lib/store/restaurantSlice";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { getRestaurant } from "@/lib/api/restaurant";
import type { Restaurant } from "@/lib/api/restaurant";
import { EditStoreModal } from "@/components/modals/EditStoreModal";

export default function StoreDetail() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCompanyAuth();
  const [store, setStore] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      if (!params.id || typeof params.id !== "string") return;

      try {
        setIsLoading(true);
        const storeData = await getRestaurant(params.id);
        setStore(storeData);
      } catch (error) {
        console.error("Failed to fetch store data:", error);
        setError("店舗情報の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, [params.id]);

  const handleEditStore = async (data: Partial<Restaurant>) => {
    try {
      if (!store?.id) return;

      // TODO: Implement updateRestaurant API call
      // await updateRestaurant(store.id, data);

      // Refresh store data
      const updatedStore = await getRestaurant(store.id);
      setStore(updatedStore);

      // Refresh restaurants list
      if (user?.companies_id) {
        dispatch(fetchRestaurantsByCompanyId(user.companies_id));
      }

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update store:", error);
      throw error;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !store) {
    return <div>Error: {error || "店舗が見つかりません"}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{store.name}</h2>
          <p className="text-muted-foreground">
            {store.address} - {store.cuisine_type}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsEditModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            店舗情報を編集
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日の予約</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">先週同日比 +3件</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">掲載求人数</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">先月比 +2件</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">スタッフ数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">先月比 +1人</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">応募者数</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">先月比 +5人</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>店舗情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  店舗名
                </h3>
                <p>{store.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  住所
                </h3>
                <p>{store.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  電話番号
                </h3>
                <p>{store.phone || "-"}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  ジャンル
                </h3>
                <p>{store.cuisine_type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  ステータス
                </h3>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    store.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {store.is_active ? "営業中" : "準備中"}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              店舗説明
            </h3>
            <p>{store.description || "-"}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">求人一覧</TabsTrigger>
          <TabsTrigger value="staff">スタッフ一覧</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">掲載中の求人</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              求人を追加
            </Button>
          </div>

          {/* Desktop View */}
          <Card className="hidden md:block">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>求人タイトル</TableHead>
                    <TableHead>日付</TableHead>
                    <TableHead>時間</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>応募者</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{/* TODO: Implement jobs list */}</TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Mobile View */}
          <div className="grid gap-4 md:hidden">
            {/* TODO: Implement mobile jobs list */}
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">スタッフ一覧</h3>
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
                    <TableHead>役割</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>入社日</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{/* TODO: Implement staff list */}</TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Mobile View */}
          <div className="grid gap-4 md:hidden">
            {/* TODO: Implement mobile staff list */}
          </div>
        </TabsContent>
      </Tabs>

      <EditStoreModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditStore}
        store={store}
      />
    </div>
  );
}
