"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchChefs,
  banChef,
  approveChef,
  UsersListResponse,
} from "@/lib/redux/slices/operatorSlice";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EXPERIENCE_LEVELS } from "@/lib/const/chef-profile";
import { Badge } from "@/components/ui/badge";

export default function ChefsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const chefs = useSelector((state: RootState) => state.operator.chefs.data);
  const loading = useSelector((state: RootState) => state.operator.chefs.loading);
  const error = useSelector((state: RootState) => state.operator.chefs.error);

  const [selectedChef, setSelectedChef] = useState<UsersListResponse | null>(null);
  const [banReason, setBanReason] = useState("");
  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchChefs());
  }, [dispatch]);

  const handleBan = async (chef: UsersListResponse) => {
    if (!banReason) return;

    try {
      await dispatch(
        banChef({ id: chef.id, reason: banReason })
      ).unwrap();
      toast({
        title: "シェフをBANしました",
        description: `${chef.name}をBANしました。`,
      });
      setSelectedChef(null);
      setBanReason("");
      dispatch(fetchChefs());
    } catch (error) {
      toast({
        title: "エラー",
        description: "BANに失敗しました。",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (chef: UsersListResponse) => {
    try {
      await dispatch(approveChef(chef.id)).unwrap();
      toast({
        title: "シェフを承認しました",
        description: `${chef.name}を承認しました。`,
      });
      setSelectedChef(null);
      dispatch(fetchChefs());
    } catch (error) {
      toast({
        title: "エラー",
        description: "承認に失敗しました。",
        variant: "destructive",
      });
    }
  };

  const filteredChefs = chefs.filter((chef) => {
    // フィルター条件を組み合わせる
    const matchesSearch =
      searchQuery === "" ||
      chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !showSuspendedOnly || !chef.is_approved;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
     <>
      <div className="p-4">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">シェフ一覧</h1>
            <div className="flex items-center space-x-2">
              <Switch
                id="suspended-filter"
                checked={showSuspendedOnly}
                onCheckedChange={setShowSuspendedOnly}
              />
              <Label htmlFor="suspended-filter">一時停止中のみ表示</Label>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="名前やメールアドレスで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>名前</TableHead>
                  <TableHead>メール</TableHead>
                  <TableHead>マッチング数</TableHead>
                  <TableHead>キャンセル数</TableHead>
                  <TableHead>キャンセル率</TableHead>
                  <TableHead>Stripe連携状況</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>点数</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChefs.map((chef) => (
                  <TableRow key={chef.id}>
                    <TableCell>{chef.id}</TableCell>
                    <TableCell>{chef.name}</TableCell>
                    <TableCell>{chef.email}</TableCell>
                    <TableCell>{chef.worksessionCount}</TableCell>
                    <TableCell>{chef.worksessionCanceledByChefCount}</TableCell>
                    <TableCell>
                      {chef.worksessionCanceledByChefCount > 0
                        ? `${(
                            (chef.worksessionCanceledByChefCount /
                              chef.worksessionCount) *
                            100
                          ).toFixed(2)}%`
                        : "0%"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`whitespace-nowrap ${
                          chef.stripe_verified
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {chef.stripe_verified ? "連携済み" : "未連携"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`whitespace-nowrap ${
                          chef.is_approved
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {chef.is_approved ? "承認済み" : "一時停止中"}
                      </Badge>
                    </TableCell>
                    <TableCell>{chef.rating}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedChef(chef)}>
                        詳細
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {selectedChef && (
        <Dialog open={!!selectedChef} onOpenChange={() => setSelectedChef(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>シェフ詳細</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">基本情報</h3>
                <p>ID: {selectedChef.id}</p>
                <p>名前: {selectedChef.name}</p>
                <p>メール: {selectedChef.email}</p>
                <p>
                  Stripe連携状況:{" "}
                  {selectedChef.stripe_verified ? "連携済み" : "未連携"}
                </p>
                <p>
                  ステータス:{" "}
                  {selectedChef.is_approved ? "承認済み" : "一時停止中"}
                </p>
                <p>
                  インボイス番号の有無:{" "}
                  {selectedChef.invoice_number ? "あり" : "なし"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">スキル・経験</h3>
                <p>スキル:</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedChef.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="whitespace-nowrap">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p>経験レベル: {EXPERIENCE_LEVELS.find(level => level.value === selectedChef.experience_level)?.label}</p>
              </div>
              <div>
                <h3 className="font-semibold">マッチング情報</h3>
                <p>マッチング数: {selectedChef.worksessionCount}</p>
                <p>
                  キャンセル数: {selectedChef.worksessionCanceledByChefCount}
                </p>
                <p>
                  キャンセル率:{" "}
                  {selectedChef.worksessionCount > 0
                    ? `${
                        (
                          (selectedChef.worksessionCanceledByChefCount /
                            selectedChef.worksessionCount) *
                          100
                        ).toFixed(2)
                      }%`
                    : "0%"}
                </p>
                <p>点数: {selectedChef.rating}</p>
              </div>
              {!selectedChef.is_approved ? (
                <div>
                  <h3 className="font-semibold mb-2">承認</h3>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleApprove(selectedChef)}>
                    承認する
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold mb-2">BAN</h3>
                  <Input
                    placeholder="BAN理由を入力"
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                  />
                  <Button
                    variant="destructive"
                    className="mt-2 w-full"
                    onClick={() => handleBan(selectedChef)}>
                    BANする
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
