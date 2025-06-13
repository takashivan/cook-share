"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useNoShowWorksessionByRestaurant } from "@/hooks/api/companyuser/worksessions/useNoShowWorksessionByRestaurant";
import { JobsDetailData, WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { JobChangeRequestModal } from "../modals/JobChangeRequestModal";
import { AdminJobCancelModal } from "../modals/AdminJobCancelModal";

interface AdminJobActionsMenuProps {
  job: JobsDetailData["job"];
  workSession: WorksessionsRestaurantTodosListData[number];
  sendMessageAction: (message: string) => Promise<void>;
}

export function AdminJobActionsMenu({
  job,
  workSession,
  sendMessageAction,
}: AdminJobActionsMenuProps) {
  const router = useRouter();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isChangeRequestModalOpen, setIsChangeRequestModalOpen] = useState(false);
  const [isNoShowModalOpen, setIsNoShowModalOpen] = useState(false);

  const { trigger: noShowWorksessionTrigger } =
    useNoShowWorksessionByRestaurant({
      worksession_id: workSession.id,
      jobId: job.id,
    });

  // キャンセルモーダルを開く
  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  // 変更リクエストモーダルを開く
  const handleOpenChangeRequestModal = () => {
    setIsChangeRequestModalOpen(true);
  };

  const shouldShowNoShowOption = () => {
    const now = new Date();
    const startTime = new Date(job.start_time);
    return now > startTime;
  };

  // ノーショー報告モーダルを開く
  const handleNoShowClick = () => {
    setIsNoShowModalOpen(true);
  };

  // ノーショー報告の確認
  const handleNoShowConfirm = async () => {
    try {
      await noShowWorksessionTrigger();
      toast({
        title: "ノーショー報告完了",
        description: "シェフのノーショーを報告しました。",
      });
      setIsNoShowModalOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "エラー",
        description: "ノーショー報告に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 sm:h-9 sm:w-9 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              handleCancelClick();
            }}
            className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
            <XCircle className="h-4 w-4 mr-2" />
            キャンセル
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleOpenChangeRequestModal}
            className="cursor-pointer">
            <Pencil className="h-4 w-4 mr-2" />
            シェフに業務内容の変更を依頼する
          </DropdownMenuItem>
          {shouldShowNoShowOption() && (
            <DropdownMenuItem
              onClick={() => {
                handleNoShowClick();
              }}
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
              <XCircle className="h-4 w-4 mr-2" />
              ノーショー報告
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {workSession && (
        <>
          <AdminJobCancelModal
            isOpen={isCancelModalOpen}
            onCloseAction={() => setIsCancelModalOpen(false)}
            job={job}
            workSession={workSession}
            sendMessageAction={sendMessageAction}
          />
          <JobChangeRequestModal
            isOpen={isChangeRequestModalOpen}
            onCloseAction={() => setIsChangeRequestModalOpen(false)}
            job={job}
            worksession={workSession}
            sendMessageAction={sendMessageAction}
          />
        </>
      )}
      <AlertDialog open={isNoShowModalOpen} onOpenChange={setIsNoShowModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ノーショー報告</AlertDialogTitle>
            <AlertDialogDescription>
              シェフが来ませんでした。報告しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsNoShowModalOpen(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={handleNoShowConfirm}>
              報告する
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
};
