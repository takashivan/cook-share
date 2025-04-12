"use client";

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
import { AlertCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";

interface CompanyStaff {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
}

interface EditCompanyStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (
    staffId: string,
    data: { name: string; is_active: boolean }
  ) => Promise<void>;
  onDelete: (staffId: string) => Promise<void>;
  staff: CompanyStaff;
  companyName: string;
}

export function EditCompanyStaffModal({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  staff,
  companyName,
}: EditCompanyStaffModalProps) {
  const [name, setName] = useState(staff.name);
  const [isActive, setIsActive] = useState(staff.is_active);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onUpdate(staff.id, {
        name: name.trim(),
        is_active: isActive,
      });
      onClose();
    } catch (error) {
      console.error("Error updating staff:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await onDelete(staff.id);
      onClose();
    } catch (error) {
      console.error("Error deleting staff:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            スタッフ情報を編集
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={staff.email}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="スタッフの名前"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">アクティブ状態</Label>
              <Switch
                id="is_active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>

            <Card>
              <CardContent className="p-4 flex items-start gap-2 bg-amber-50">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p>
                    {companyName}
                    のスタッフ情報を編集します。アクセス権限の変更は各店舗の設定から行ってください。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter className="gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  削除
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>スタッフを削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は取り消せません。スタッフを削除すると、すべての店舗へのアクセス権限が失われます。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700">
                    削除する
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting || !name.trim()}>
              {isSubmitting ? "更新中..." : "変更を保存"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
