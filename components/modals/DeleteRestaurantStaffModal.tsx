import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface DeleteRestaurantStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  staffName: string;
  isLoading: boolean;
}

export function DeleteRestaurantStaffModal({
  isOpen,
  onClose,
  onConfirm,
  staffName,
  isLoading,
}: DeleteRestaurantStaffModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            スタッフを削除
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-start gap-2 text-amber-800">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p>
                <span className="font-medium">{staffName}</span>
                をスタッフから削除します。この操作は取り消せません。
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}>
            {isLoading ? "削除中..." : "削除する"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
