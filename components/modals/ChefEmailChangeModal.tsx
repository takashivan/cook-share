"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChefEmailChangeModalProps {
  currentEmail: string;
  trigger?: React.ReactNode;
  onSubmit?: (email: string) => void;
}

export function ChefEmailChangeModal({
  currentEmail,
  trigger,
  onSubmit,
}: ChefEmailChangeModalProps) {
  const [email, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);

    // バリデーション
    if (!email || !confirmEmail) {
      setError("すべての項目を入力してください");
      return;
    }

    if (email !== confirmEmail) {
      setError("メールアドレスが一致しません");
      return;
    }

    if (email === currentEmail) {
      setError("現在のメールアドレスと同じです");
      return;
    }

    // メールアドレス形式の簡易チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("有効なメールアドレスを入力してください");
      return;
    }

    setIsSubmitting(true);

    // API呼び出しをシミュレート
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      if (onSubmit) {
        onSubmit(email);
      }

      // 成功メッセージを表示した後、フォームをリセット
      setTimeout(() => {
        setNewEmail("");
        setConfirmEmail("");
        setPassword("");
      }, 2000);
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">メールアドレスを変更</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                メールアドレスの変更
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current-email">現在のメールアドレス</Label>
                <Input
                  id="current-email"
                  value={currentEmail}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-email">新しいメールアドレス</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={email}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="新しいメールアドレスを入力"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-email">
                  新しいメールアドレス（確認）
                </Label>
                <Input
                  id="confirm-email"
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="新しいメールアドレスを再入力"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setNewEmail("")}
                className="w-full sm:w-auto">
                キャンセル
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto">
                {isSubmitting ? "送信中..." : "変更を保存"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-center mb-2">
              メールアドレスの変更が完了しました
            </h3>
            <p className="text-muted-foreground text-center text-sm">
              新しいメールアドレス宛に確認メールを送信しました
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
