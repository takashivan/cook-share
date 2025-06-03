import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RestaurantRejectWorksessionModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export function RestaurantRejectWorksessionModal({
  isOpen,
  onCloseAction,
}: RestaurantRejectWorksessionModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onCloseAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>差し戻しました！</DialogTitle>
          <DialogDescription>
            シェフからの完了報告を差し戻しました。<br />
            再申請をお待ちください。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCloseAction}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
