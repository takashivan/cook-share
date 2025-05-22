"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

interface CheckInQRModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  workSessionData: {
    id: string;
    check_in_code: number | null;
    chefName: string;
    restaurantName: string;
  };
}

export function CheckInQRModal({
  isOpen,
  onCloseAction,
  workSessionData,
}: CheckInQRModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onCloseAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>チェックインQRコード</DialogTitle>
          <DialogDescription>
            <span className="line-clamp-1">
              {workSessionData.chefName} - {workSessionData.restaurantName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              シェフに以下のQRコード、<br />もしくは6桁のチェックインコードを提示してください
            </p>
            {workSessionData.check_in_code ? (
              <div className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg">
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG
                    value={workSessionData.id.toString()}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <span className="text-3xl font-mono font-bold tracking-wider mt-1">
                  {workSessionData.check_in_code}
                </span>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                チェックインコードが設定されていません
              </p>
            )}
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
            <QRCodeSVG
              value={workSessionData.id.toString()}
              size={200}
              level="H"
              includeMargin={true}
            />
            <span className="text-lg font-bold text-center">
              {workSessionData.check_in_code}
            </span>
          </div>
        </div> */}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCloseAction}
            className="w-full sm:w-auto">
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
