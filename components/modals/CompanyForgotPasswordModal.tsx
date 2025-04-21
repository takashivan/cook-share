"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { requestPasswordReset } from "@/lib/api/companyUser";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CompanyForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyForgotPasswordModal({
  isOpen,
  onClose,
}: CompanyForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await requestPasswordReset(email);
      setIsSuccess(true);
      toast({
        title: "パスワードリセットメールを送信しました",
        description: "メールボックスを確認してください。",
      });
    } catch (err) {
      setError("メールアドレスが見つかりませんでした。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>パスワードをリセット</DialogTitle>
          <DialogDescription>
            登録したメールアドレスを入力してください。パスワードリセット用のリンクを送信します。
          </DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@company.jp"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "送信中..." : "リセットリンクを送信"}
            </Button>
          </form>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-center mb-2">
              メールを送信しました
            </h3>
            <p className="text-muted-foreground text-center text-sm mb-6">
              パスワードリセット用のリンクを送信しました。
              メールボックスを確認してください。
            </p>
            <Button onClick={handleClose} className="w-full">
              閉じる
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
