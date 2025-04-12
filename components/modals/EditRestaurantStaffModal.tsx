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
import { Checkbox } from "@/components/ui/checkbox";
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

interface RestaurantStaff {
  id: string;
  email: string;
  name: string;
  can_manage_jobs: boolean;
  can_edit: boolean;
}

interface EditRestaurantStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (
    staffId: string,
    data: { can_manage_jobs: boolean; can_edit: boolean }
  ) => Promise<void>;
  onDelete: (staffId: string) => Promise<void>;
  staff: RestaurantStaff;
  restaurantName: string;
}

export function EditRestaurantStaffModal({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  staff,
  restaurantName,
}: EditRestaurantStaffModalProps) {
  const [canManageJobs, setCanManageJobs] = useState(staff.can_manage_jobs);
  const [canEdit, setCanEdit] = useState(staff.can_edit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await onUpdate(staff.id, {
        can_manage_jobs: canManageJobs,
        can_edit: canEdit,
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
            店舗スタッフの権限を編集
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
                value={staff.name}
                disabled
                className="bg-gray-100"
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
                    の店舗スタッフの権限を変更します。会社全体の管理権限は会社のスタッフ管理から設定してください。
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
                  <AlertDialogTitle>
                    店舗スタッフを削除しますか？
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は取り消せません。スタッフを削除すると、この店舗へのアクセス権限が失われます。
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "更新中..." : "変更を保存"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
