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
import Link from "next/link";

interface ChefForgotPasswordModalProps {
  trigger?: React.ReactNode;
  onSubmit?: (email: string) => void;
}

export function ChefForgotPasswordModal({
  trigger,
  onSubmit,
}: ChefForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);

    // バリデーション
    if (!email) {
      setError("メールアドレスを入力してください");
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
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="link">パスワードをお忘れの方</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                パスワードをリセット
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                登録したメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。
              </p>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="登録したメールアドレスを入力"
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
                onClick={() => setEmail("")}
                className="w-full sm:w-auto">
                キャンセル
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto">
                {isSubmitting ? "送信中..." : "リセットリンクを送信"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-center mb-2">
              メールを送信しました
            </h3>
            <p className="text-muted-foreground text-center text-sm mb-4">
              {email}{" "}
              宛にパスワードリセット用のリンクを送信しました。メールをご確認ください。
            </p>
            <Link
              href="/reset-password"
              className="text-sm text-primary hover:underline">
              リセットページに移動
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
