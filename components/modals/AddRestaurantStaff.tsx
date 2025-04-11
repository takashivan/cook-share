"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { restaurantStaffInvite } from "@/lib/api/restaurant";

interface AddRestaurantStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    email: string,
    permissions: { canManageJobs: boolean; canEdit: boolean }
  ) => void;
  restaurantName: string;
}

export function AddRestaurantStaffModal({
  isOpen,
  onClose,
  onSubmit,
  restaurantName,
}: AddRestaurantStaffModalProps) {
  const [email, setEmail] = useState("");
  const [canManageJobs, setCanManageJobs] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(email, { canManageJobs, canEdit });
      setEmail("");
      setCanManageJobs(true);
      setCanEdit(false);
      onClose();
    } catch (error) {
      console.error("Error adding store staff:", error);
      // エラー処理をここに追加
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            店舗スタッフを追加
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-email">メールアドレス</Label>
              <Input
                id="store-email"
                type="email"
                placeholder="example@cookchef.jp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base">権限設定</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can-manage-jobs"
                    checked={canManageJobs}
                    onCheckedChange={(checked) =>
                      setCanManageJobs(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="can-manage-jobs"
                    className="text-sm font-normal">
                    求人の投稿・管理 (can_manage_jobs)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can-edit"
                    checked={canEdit}
                    onCheckedChange={(checked) =>
                      setCanEdit(checked as boolean)
                    }
                  />
                  <Label htmlFor="can-edit" className="text-sm font-normal">
                    店舗情報の編集 (can_edit)
                  </Label>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-4 flex items-start gap-2 bg-amber-50">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p>
                    {restaurantName}
                    の店舗スタッフとして招待されたユーザーは、設定した権限に基づいて店舗の管理ができます。
                    会社全体の管理権限が必要な場合は、会社 &gt;
                    スタッフ管理から招待してください。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting || !email.trim()}>
              {isSubmitting ? "送信中..." : "招待を送信"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
