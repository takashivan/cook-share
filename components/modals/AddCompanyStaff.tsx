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

interface AddCompanyStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  companyName: string;
}

export function AddCompanyStaffModal({
  isOpen,
  onClose,
  onSubmit,
  companyName,
}: AddCompanyStaffModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(email);
      setEmail("");
      onClose();
    } catch (error) {
      console.error("Error adding staff:", error);
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
            スタッフを追加
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@cookchef.jp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Card>
              <CardContent className="p-4 flex items-start gap-2 bg-amber-50">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p>
                    {companyName}
                    にスタッフを追加すると、会社に属する店舗全ての権限を持ちます。
                    店舗を限定したい場合は、店舗 &gt;
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
