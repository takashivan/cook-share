import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface AddRestaurantStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    email: string,
    permissions: { canEdit: boolean; canManageJobs: boolean }
  ) => Promise<void>;
  restaurantName: string;
  restaurantId?: number;
  companyId?: string;
}

export function AddRestaurantStaffModal({
  isOpen,
  onClose,
  onSubmit,
  restaurantName,
  restaurantId,
  companyId,
}: AddRestaurantStaffModalProps) {
  const [email, setEmail] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [canManageJobs, setCanManageJobs] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, { canEdit, canManageJobs });
    setEmail("");
    setCanEdit(false);
    setCanManageJobs(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>スタッフを追加</DialogTitle>
          <DialogDescription>
            {restaurantName}に新しいスタッフを追加します。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>権限</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canEdit"
                    checked={canEdit}
                    onCheckedChange={(checked) =>
                      setCanEdit(checked as boolean)
                    }
                  />
                  <Label htmlFor="canEdit">店舗情報の編集</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canManageJobs"
                    checked={canManageJobs}
                    onCheckedChange={(checked) =>
                      setCanManageJobs(checked as boolean)
                    }
                  />
                  <Label htmlFor="canManageJobs">求人の管理</Label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit">追加</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
