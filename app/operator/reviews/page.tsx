"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchChefsToBeReviewed,
  banChef,
  approveChef,
} from "@/lib/redux/slices/operatorSlice";
import { UserProfile } from "@/types/user";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

export default function ChefsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: chefs,
    loading,
    error,
  } = useSelector((state: RootState) => state.operator.chefsToBeReviewed);
  const [selectedChef, setSelectedChef] = useState<UserProfile | null>(null);
  const [banReason, setBanReason] = useState("");
  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchChefsToBeReviewed());
  }, [dispatch]);

  const handleBan = async () => {
    if (!selectedChef || !banReason) return;

    try {
      await dispatch(
        banChef({ id: selectedChef.id, reason: banReason })
      ).unwrap();
      toast({
        title: "シェフをBANしました",
        description: `${selectedChef.name}をBANしました。`,
      });
      setSelectedChef(null);
      setBanReason("");
      dispatch(fetchChefsToBeReviewed());
    } catch (error) {
      toast({
        title: "エラー",
        description: "BANに失敗しました。",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (chef: UserProfile) => {
    try {
      await dispatch(approveChef(chef.id)).unwrap();
      toast({
        title: "シェフを承認しました",
        description: `${chef.name}を承認しました。`,
      });
      dispatch(fetchChefsToBeReviewed());
    } catch (error) {
      toast({
        title: "エラー",
        description: "承認に失敗しました。",
        variant: "destructive",
      });
    }
  };

  const filteredChefs =
    chefs?.filter((chef) => {
      // フィルター条件を組み合わせる
      const matchesSearch =
        searchQuery === "" ||
        chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chef.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !showSuspendedOnly || !chef.is_approved;
      return matchesSearch && matchesStatus;
    }) || [];

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>メール</TableHead>
              <TableHead>経験レベル</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChefs.map((chef: UserProfile) => (
              <TableRow key={chef.id}>
                <TableCell>{chef.name}</TableCell>
                <TableCell>{chef.email}</TableCell>
                <TableCell>{chef.experience_level || "-"}</TableCell>
                <TableCell>
                  {chef.is_approved ? (
                    <Badge variant="default">承認済み</Badge>
                  ) : (
                    <Badge variant="destructive">一時停止中</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedChef(chef)}>
                        詳細
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>シェフ詳細</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold">基本情報</h3>
                          <p>名前: {chef.name}</p>
                          <p>メール: {chef.email}</p>
                          <p>経験レベル: {chef.experience_level || "-"}</p>
                          <p>
                            ステータス:{" "}
                            {chef.is_approved ? "承認済み" : "一時停止中"}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">スキル</h3>
                          <div className="flex flex-wrap gap-2">
                            {chef.skills?.map((skill: string) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        {!chef.is_approved ? (
                          <div>
                            <h3 className="font-semibold mb-2">承認</h3>
                            <Button
                              variant="default"
                              className="w-full"
                              onClick={() => handleApprove(chef)}>
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
                              onClick={handleBan}>
                              BANする
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
