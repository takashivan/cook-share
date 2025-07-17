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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EXPERIENCE_LEVELS } from "@/lib/const/chef-profile";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function ChefsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const chefs = useSelector((state: RootState) => state.operator.chefs.data);
  const loading = useSelector((state: RootState) => state.operator.chefs.loading);
  const error = useSelector((state: RootState) => state.operator.chefs.error);

  const [selectedChef, setSelectedChef] = useState<UsersListResponse | null>(null);
  const [reason, setReason] = useState("");
  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof typeof chefs[0] | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [worksessionCountMin, setWorksessionCountMin] = useState("");
  const [worksessionCountMax, setWorksessionCountMax] = useState("");
  const [canceledCountMin, setCanceledCountMin] = useState("");
  const [canceledCountMax, setCanceledCountMax] = useState("");
  const [ratingMin, setRatingMin] = useState("");
  const [ratingMax, setRatingMax] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>(["approved", "banned"]);
  const [stripeFilter, setStripeFilter] = useState<string[]>(["linked", "not_linked"]);

  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchChefs());
  }, [dispatch]);

  const handleBan = async (chef: UsersListResponse) => {
    if (!reason) return;

    try {
      await dispatch(
        banChef({ id: chef.id, reason })
      ).unwrap();
      toast({
        title: "シェフをBANしました",
        description: `${chef.name}をBANしました。`,
      });
      setSelectedChef(null);
      setReason("");
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
    if (!reason) return;

    try {
      await dispatch(approveChef({ id: chef.id, reason })).unwrap();
      toast({
        title: "シェフを承認しました",
        description: `${chef.name}を承認しました。`,
      });
      setSelectedChef(null);
      setReason("");
      dispatch(fetchChefs());
    } catch (error) {
      toast({
        title: "エラー",
        description: "承認に失敗しました。",
        variant: "destructive",
      });
    }
  };

  // ソート関数
  const handleSort = (key: keyof typeof chefs[0]) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // ソートアイコン
  const renderSortIcon = (key: keyof typeof chefs[0]) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? "▲" : "▼";
  };

  // フィルタリング
  const filteredChefs = chefs.filter((chef) => {
    const query = searchQuery.trim().toLowerCase();
    if (
      query &&
      !(
        chef.id.toString().includes(query) ||
        chef.name.toLowerCase().includes(query) ||
        chef.email.toLowerCase().includes(query)
      )
    ) {
      return false;
    }
    // マッチング数
    if (
      (worksessionCountMin && chef.worksessionCount < Number(worksessionCountMin)) ||
      (worksessionCountMax && chef.worksessionCount > Number(worksessionCountMax))
    ) {
      return false;
    }
    // キャンセル数
    if (
      (canceledCountMin && chef.worksessionCanceledByChefCount < Number(canceledCountMin)) ||
      (canceledCountMax && chef.worksessionCanceledByChefCount > Number(canceledCountMax))
    ) {
      return false;
    }
    // 点数
    if (
      (ratingMin && chef.rating < Number(ratingMin)) ||
      (ratingMax && chef.rating > Number(ratingMax))
    ) {
      return false;
    }
    // ステータス
    const status = chef.is_approved ? "approved" : "banned";
    if (statusFilter.length === 0 || !statusFilter.includes(status)) {
      return false;
    }
    // Stripe連携
    const stripe = chef.stripe_verified ? "linked" : "not_linked";
    if (stripeFilter.length === 0 || !stripeFilter.includes(stripe)) {
      return false;
    }
    return true;
  });

  // ソート済みデータ
  const sortedChefs = [...filteredChefs].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      return sortOrder === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }
    return 0;
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
          </div>
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ID・名前・メールで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              フィルター
            </Button>
          </div>
        </div>

        {/* フィルターダイアログ */}
        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>シェフフィルター</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>マッチング数（最小）</Label>
                <Input
                  type="number"
                  value={worksessionCountMin}
                  onChange={e => setWorksessionCountMin(e.target.value)}
                />
              </div>
              <div>
                <Label>マッチング数（最大）</Label>
                <Input
                  type="number"
                  value={worksessionCountMax}
                  onChange={e => setWorksessionCountMax(e.target.value)}
                />
              </div>
              <div>
                <Label>キャンセル数（最小）</Label>
                <Input
                  type="number"
                  value={canceledCountMin}
                  onChange={e => setCanceledCountMin(e.target.value)}
                />
              </div>
              <div>
                <Label>キャンセル数（最大）</Label>
                <Input
                  type="number"
                  value={canceledCountMax}
                  onChange={e => setCanceledCountMax(e.target.value)}
                />
              </div>
              <div>
                <Label>点数（最小）</Label>
                <Input
                  type="number"
                  value={ratingMin}
                  onChange={e => setRatingMin(e.target.value)}
                />
              </div>
              <div>
                <Label>点数（最大）</Label>
                <Input
                  type="number"
                  value={ratingMax}
                  onChange={e => setRatingMax(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <Label>ステータス</Label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-1">
                    <Checkbox
                      checked={statusFilter.includes("approved")}
                      onCheckedChange={checked => {
                        setStatusFilter(prev =>
                          checked
                            ? [...prev, "approved"]
                            : prev.filter(v => v !== "approved")
                        );
                      }}
                    />
                    承認済み
                  </label>
                  <label className="flex items-center gap-1">
                    <Checkbox
                      checked={statusFilter.includes("banned")}
                      onCheckedChange={checked => {
                        setStatusFilter(prev =>
                          checked
                            ? [...prev, "banned"]
                            : prev.filter(v => v !== "banned")
                        );
                      }}
                    />
                    一時停止中
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <Label>Stripe連携状況</Label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-1">
                    <Checkbox
                      checked={stripeFilter.includes("linked")}
                      onCheckedChange={checked => {
                        setStripeFilter(prev =>
                          checked
                            ? [...prev, "linked"]
                            : prev.filter(v => v !== "linked")
                        );
                      }}
                    />
                    連携済み
                  </label>
                  <label className="flex items-center gap-1">
                    <Checkbox
                      checked={stripeFilter.includes("not_linked")}
                      onCheckedChange={checked => {
                        setStripeFilter(prev =>
                          checked
                            ? [...prev, "not_linked"]
                            : prev.filter(v => v !== "not_linked")
                        );
                      }}
                    />
                    未連携
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFilterOpen(false)}>
                閉じる
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
                    ID {renderSortIcon("id")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                    名前 {renderSortIcon("name")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("email")} className="cursor-pointer">
                    メール {renderSortIcon("email")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("worksessionCount")} className="cursor-pointer">
                    マッチング数 {renderSortIcon("worksessionCount")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("worksessionCanceledByChefCount")} className="cursor-pointer">
                    キャンセル数 {renderSortIcon("worksessionCanceledByChefCount")}
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    キャンセル率
                  </TableHead>
                  <TableHead onClick={() => handleSort("stripe_verified")} className="cursor-pointer">
                    Stripe連携状況 {renderSortIcon("stripe_verified")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("is_approved")} className="cursor-pointer">
                    ステータス {renderSortIcon("is_approved")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("rating")} className="cursor-pointer">
                    点数 {renderSortIcon("rating")}
                  </TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedChefs.map((chef) => (
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
                  <Input
                    placeholder="承認理由を入力"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <Button
                    variant="default"
                    className="mt-2 w-full"
                    onClick={() => handleApprove(selectedChef)}>
                    承認する
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold mb-2">BAN</h3>
                  <Input
                    placeholder="BAN理由を入力"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
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
