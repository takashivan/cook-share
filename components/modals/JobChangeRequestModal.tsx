"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "@/hooks/use-toast";
import { useCreateJobChangeRequest } from "@/hooks/api/companyuser/jobChangeRequests/useCreateJobChangeRequest";
import { useForm } from "react-hook-form";
import { JobsDetailData, WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { useGetJobChangeRequest } from "@/hooks/api/companyuser/jobChangeRequests/useGetJobChangeRequest";
import { useDeleteJobChangeRequest } from "@/hooks/api/companyuser/jobChangeRequests/useDeleteJobChangeRequest";
import { ErrorPage } from "../layout/ErrorPage";
import { LoadingSpinner } from "../LoadingSpinner";
import { useRouter } from "next/navigation";

interface CreateJobChangeRequestData {
  work_date: string;
  start_time: string;
  end_time: string;
  task: string;
  fee: number;
  reason: string;
}

interface JobChangeRequestModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  job: JobsDetailData['job'];
  worksession: WorksessionsRestaurantTodosListData[number];
  sendMessageAction: (message: string) => Promise<void>;
}

export function JobChangeRequestModal({
  isOpen,
  onCloseAction,
  job,
  worksession,
  sendMessageAction,
}: JobChangeRequestModalProps) {
  const router = useRouter();

  const {
    data: existingChangeRequest,
    error: changeRequestError,
    isLoading: changeRequestLoading,
  } = useGetJobChangeRequest({
    worksessionsId: worksession.id,
  });
  const pendingRequest = existingChangeRequest?.status === "PENDING" ? existingChangeRequest : null;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateJobChangeRequestData>({
    // Jobのデータを初期値として設定
    defaultValues: {
      work_date: job.work_date || "",
      start_time: job.start_time
        ? format(new Date(job.start_time), "HH:mm")
        : "",
      end_time: job.end_time ? format(new Date(job.end_time), "HH:mm") : "",
      task: job.task || "",
      fee: job.fee || 0,
      reason: "",
    },
  });

  const handleClose = () => {
    // モーダルを閉じる前にフォームをリセット
    reset();
    onCloseAction();
  }

  const { trigger: createJobChangeRequest } = useCreateJobChangeRequest({
    worksessionsId: worksession.id,
  });

  const { trigger: deleteJobChangeRequest } = useDeleteJobChangeRequest({
    jobChangeRequestId: pendingRequest?.id,
    worksessionsId: worksession.id,
  });

  const handleChangeRequestSubmit = async (data: CreateJobChangeRequestData) => {
    // 既存の変更リクエストがある場合は、処理を中止
    if (pendingRequest) {
      toast({
        title: "変更リクエストが既に存在します",
        description:
          "既存の変更リクエストが承認または拒否されるまで、新しいリクエストを作成できません。",
        variant: "destructive",
      });

      // 応募モーダルを閉じて画面をリフレッシュする
      handleClose();
      router.refresh();
      
      return;
    }

    try {
      // 変更リクエストのデータ構造を作成
      const changeRequestData = {
        requested_by: worksession.restaurant_id,
        proposed_changes: {
          work_date: data.work_date,
          start_time: new Date(
            data.work_date + "T" + data.start_time
          ).getTime(),
          end_time: new Date(
            data.work_date + "T" + data.end_time
          ).getTime(),
          task: data.task,
          fee: data.fee,
        },
        reason: data.reason,
        worksession_id: worksession.id,
      };

      // 変更リクエストを作成
      await createJobChangeRequest(changeRequestData);

      // メッセージとして変更リクエストを送信
      const message = `【業務内容変更リクエスト】
日付: ${data.work_date}
時間: ${data.start_time}〜${data.end_time}
業務内容: ${data.task}
報酬: ¥${data.fee}

変更理由:
${data.reason}

※この変更はシェフの承認が必要です。`;

      await sendMessageAction(message);

      toast({
        title: "変更リクエストを送信しました",
        description: "シェフの承認をお待ちください。",
      });

      handleClose();
    } catch (error) {
      if ((error as any).response?.data?.payload?.code === "already_exist") {
        toast({
          title: "変更リクエストが既に存在します",
          description:
            "既存の変更リクエストが承認または拒否されるまで、新しいリクエストを作成できません。",
          variant: "destructive",
        });

        // 応募モーダルを閉じて画面をリフレッシュする
        handleClose();
        router.refresh();

        return;
      }

      toast({
        title: "エラー",
        description: "変更リクエストの送信に失敗しました。",
        variant: "destructive",
      });
    }
  };

  const handleDeleteChangeRequest = async () => {
    try {
      await deleteJobChangeRequest();

      // 変更リクエストの詳細を取得
      if (!pendingRequest?.proposed_changes) {
        throw new Error("変更リクエストの詳細が見つかりません");
      }

      const changes = pendingRequest.proposed_changes;

      // メッセージとして変更リクエストのキャンセルを送信
      const message = `【変更リクエストのキャンセル】
以下の変更リクエストをキャンセルしました：

日付: ${changes.work_date}
時間: ${format(new Date(changes.start_time), "HH:mm")}〜${format(
        new Date(changes.end_time),
        "HH:mm"
      )}
業務内容: ${changes.task}
報酬: ¥${changes.fee}`;

      await sendMessageAction(message);

      toast({
        title: "変更リクエストを削除しました",
        description: "新しい変更リクエストを作成できます。",
      });

      handleClose();
    } catch (error) {
      toast({
        title: "エラー",
        description: "変更リクエストの削除に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {changeRequestError ? (
          <ErrorPage />
        ) : changeRequestLoading ? (
          <LoadingSpinner />
        ): (
          <>
            <DialogHeader>
              <DialogTitle>
                {pendingRequest
                  ? "変更リクエストの管理"
                  : "業務内容変更リクエスト"}
              </DialogTitle>
              <DialogDescription>
                {pendingRequest
                  // ? pendingRequest.status === "REJECTED"
                  //   ? "変更リクエストが拒否されました。新しいリクエストを作成するには、既存のリクエストを削除してください。"
                  //   : pendingRequest.status === "APPROVED"
                  //   ? "変更リクエストが承認されています。新しいリクエストを作成するには、既存のリクエストを削除してください。"
                  //   : "既存の変更リクエストが存在します。新しいリクエストを作成するには、既存のリクエストを削除してください。"
                  ? "既存の変更リクエストが存在します。新しいリクエストを作成するには、既存のリクエストを削除してください。"
                  : "シェフに業務内容の変更をリクエストします。変更はシェフの承認が必要です。"}
              </DialogDescription>
            </DialogHeader>
            {pendingRequest ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">現在の変更リクエスト</h4>
                  <div className="space-y-2 text-sm">
                    {(() => {
                      const changes = pendingRequest.proposed_changes;
                      return (
                        <>
                          <p>日付: {changes.work_date}</p>
                          <p>
                            時間: {format(new Date(changes.start_time), "HH:mm")}
                            〜{format(new Date(changes.end_time), "HH:mm")}
                          </p>
                          <p>業務内容: {changes.task}</p>
                          <p>報酬: ¥{changes.fee}</p>
                          <p>
                            ステータス:{" "}承認待ち
                            {/* {pendingRequest.status === "PENDING"
                              ? "承認待ち"
                              : pendingRequest.status === "APPROVED"
                              ? "承認済み"
                              : "拒否済み"} */}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={handleClose}>
                    閉じる
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteChangeRequest}
                    // disabled={pendingRequest.status === "PENDING"}
                  >
                    変更リクエストを削除
                    {/* {pendingRequest.status === "PENDING"
                      ? "変更リクエストを削除"
                      : "既存のリクエストを削除して新規作成"} */}
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(handleChangeRequestSubmit)}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="work_date">作業日</Label>
                      <Input
                        id="work_date"
                        type="date"
                        {...register("work_date", {
                          required: "作業日は必須です",
                        })}
                      />
                      {errors.work_date && (
                        <p className="text-red-500 text-sm">
                          {errors.work_date.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fee">報酬</Label>
                      <Input
                        id="fee"
                        type="number"
                        placeholder="例: 14800"
                        {...register("fee", {
                          required: "報酬は必須です",
                          valueAsNumber: true,
                          validate: (value) => {
                            const formValues = watch();
                            if (
                              !formValues.start_time ||
                              !formValues.end_time
                            )
                              return true;

                            const startTime = new Date(
                              `2000-01-01T${formValues.start_time}:00`
                            );
                            const endTime = new Date(
                              `2000-01-01T${formValues.end_time}:00`
                            );

                            // 終了時間が開始時間より前の場合は翌日の時間として計算
                            if (endTime < startTime) {
                              endTime.setDate(endTime.getDate() + 1);
                            }

                            const hours =
                              (endTime.getTime() - startTime.getTime()) /
                              (1000 * 60 * 60);
                            const hourlyRate = Number(value) / hours;

                            if (hourlyRate < 1850) {
                              return `時給ベースで1850円を下回らないように設定してください（現在: ${Math.floor(
                                hourlyRate
                              )}円）`;
                            }
                            return true;
                          },
                        })}
                      />
                      {errors.fee && (
                        <p className="text-red-500 text-sm">
                          {errors.fee.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_time">開始時間</Label>
                      <Input
                        id="start_time"
                        type="time"
                        {...register("start_time", {
                          required: "開始時間は必須です",
                        })}
                      />
                      {errors.start_time && (
                        <p className="text-red-500 text-sm">
                          {errors.start_time.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end_time">終了時間</Label>
                      <Input
                        id="end_time"
                        type="time"
                        {...register("end_time", {
                          required: "終了時間は必須です",
                        })}
                      />
                      {errors.end_time && (
                        <p className="text-red-500 text-sm">
                          {errors.end_time.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task">業務内容</Label>
                    <TextareaAutosize
                      id="task"
                      placeholder="変更後の業務内容を入力してください"
                      {...register("task", {
                        required: "業務内容は必須です",
                      })}
                      minRows={2}
                      className="w-full px-3 py-2 border rounded-md text-base bg-white resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition"
                    />
                    {errors.task && (
                      <p className="text-red-500 text-sm">
                        {errors.task.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">変更理由</Label>
                    <TextareaAutosize
                      id="reason"
                      placeholder="変更理由を入力してください"
                      {...register("reason", {
                        required: "変更理由は必須です",
                      })}
                      minRows={2}
                      className="w-full px-3 py-2 border rounded-md text-base bg-white resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 focus:outline-none transition"
                    />
                    {errors.reason && (
                      <p className="text-red-500 text-sm">
                        {errors.reason.message}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={handleClose}>
                    キャンセル
                  </Button>
                  <Button type="submit">
                    リクエストを送信
                  </Button>
                </DialogFooter>
              </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
