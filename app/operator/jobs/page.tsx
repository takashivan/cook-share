"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import {
  fetchOperatorJobs,
  fetchOperatorAlerts,
  banJob,
  approveJob,
} from "@/lib/redux/slices/operatorSlice";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobStatusBadgeForAdmin } from "@/components/badge/JobStatusBadgeForAdmin";
import { JobsListData } from "@/api/__generated__/operator/data-contracts";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function JobsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useSelector((state: RootState) => state.operator.jobs.data);
  const loading = useSelector((state: RootState) => state.operator.jobs.loading);
  const error = useSelector((state: RootState) => state.operator.jobs.error);
  const alerts = useSelector((state: RootState) => state.operator.alerts.data);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobsListData[number] | null>(
    null
  );
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchOperatorJobs());
    dispatch(fetchOperatorAlerts());
  }, [dispatch]);

  const filteredJobs = jobs?.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showSuspendedOnly ? !job.is_approved : true;
    return matchesSearch && matchesStatus;
  });

  const getJobAlert = (jobId: number) => {
    return alerts?.find((alert) => alert.job_id === jobId);
  };

  const handleBan = async (id: number) => {
    try {
      await dispatch(banJob({ id, reason: "運営判断による停止" })).unwrap();
      toast({
        title: "求人が停止されました",
        description: "求人の停止に成功しました",
      });
      setSelectedJob(null);
      dispatch(fetchOperatorJobs());
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "求人の停止に失敗しました",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await dispatch(approveJob({ id, reason: "承認" })).unwrap();
      toast({
        title: "求人が承認されました",
        description: "求人の承認に成功しました",
      });
      setSelectedJob(null);
      dispatch(fetchOperatorJobs());
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "求人の承認に失敗しました",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">エラーが発生しました: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">求人一覧</h1>
        </div>

        <div className="mb-6 flex gap-4">
          <Input
            type="text"
            placeholder="求人を検索..."
            className="flex-1 px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label className="flex items-center gap-2">
            <Switch
              checked={showSuspendedOnly}
              onCheckedChange={(checked) => setShowSuspendedOnly(checked)}
            />
            一時停止中の求人のみ表示
          </label>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>タイトル</TableHead>
                  <TableHead>勤務日</TableHead>
                  <TableHead>報酬</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs?.map((job) => {
                  const alert = getJobAlert(job.id);
                  return (
                    <TableRow key={job.id}>
                      <TableCell>{job.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/job/${job.id}`}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {job.title}
                          </Link>
                          {alert && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedAlert(alert);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <AlertCircle className="h-5 w-5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(job.work_date).toLocaleDateString("ja-JP")}</TableCell>
                      <TableCell>{`¥${job.fee.toLocaleString()}`}</TableCell>
                      <TableCell>
                        <JobStatusBadgeForAdmin
                          job={job}
                          lastWorksession={job.worksession as WorksessionsRestaurantTodosListData[number] ?? null}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedJob(job);
                            setIsModalOpen(true);
                          }}
                        >
                          詳細
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>求人詳細</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">基本情報</h3>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">ID</div>
                  <div>
                    {selectedJob.id}
                  </div>
                </div>

                <div className="flex">
                  <div className="w-32 flex-shrink-0">タイトル</div>
                  <span className="flex items-center gap-1">
                    {selectedJob.title}
                    {(() => {
                      const alert = getJobAlert(selectedJob.id);
                      return alert ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedAlert(alert);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <AlertCircle className="h-5 w-5" />
                        </Button>
                      ) : null;
                    })()}
                  </span>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">ステータス</div>
                  <div>
                    <JobStatusBadgeForAdmin
                      job={selectedJob}
                      lastWorksession={selectedJob.worksession as WorksessionsRestaurantTodosListData[number] ?? null}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">求人詳細</div>
                  <div>{selectedJob.description}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">勤務日</div>
                  <div>{format(new Date(selectedJob.work_date), "yyyy/MM/dd", { locale: ja })}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">開始時間</div>
                  <div>{format(new Date(selectedJob.start_time), "HH:mm", { locale: ja })}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">終了時間</div>
                  <div>{format(new Date(selectedJob.end_time), "HH:mm", { locale: ja })}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">報酬</div>
                  <div>¥{selectedJob.fee.toLocaleString()}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">締め切り</div>
                  <div>{selectedJob.expiry_date ? format(new Date(selectedJob.expiry_date), "yyyy/MM/dd HH:mm", { locale: ja }) : "未設定"}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">業務内容</div>
                  <div>{selectedJob.task}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">必要なスキル</div>
                  <div>{selectedJob.skill}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">持ち物</div>
                  <div>{selectedJob.whattotake}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">交通費</div>
                  <div>
                    {selectedJob.transportation_type === "NONE"
                      ? "交通費なし"
                      : selectedJob.transportation_type === "MAX"
                      ? "上限"
                      : "一律"}{" "}
                    |{" "}
                    {selectedJob.transportation_type !== "NONE"
                      ? `¥${selectedJob.transportation_amount.toLocaleString()}`
                      : '-'}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">備考</div>
                  <div>{selectedJob.note}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">ポイント</div>
                  <div>{selectedJob.point}</div>
                </div>
                <div className="flex">
                  <div className="w-32 flex-shrink-0">作成日時</div>
                  <div>{format(new Date(selectedJob.created_at), "yyyy/MM/dd HH:mm", { locale: ja })}</div>
                </div>
              </div>
              {selectedJob.status === "PENDING" ? (
                <div>
                  <h3 className="font-semibold mb-2">承認</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                      >
                        承認する
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>求人の承認</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        求人を承認しますか？
                      </DialogDescription>
                      <DialogFooter className="gap-2">
                        <DialogClose>キャンセル</DialogClose>
                        <Button
                          variant="default"
                          onClick={() => handleApprove(selectedJob.id)}>
                          承認する
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : selectedJob.status === "PUBLISHED" ? (
                <div>
                  <h3 className="font-semibold mb-2">BAN</h3>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                      >
                        BANする
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          求人のBAN
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          求人をBANしますか？
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleBan(selectedJob.id)}
                          className="bg-red-600 hover:bg-red-700">
                          BANする
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {selectedAlert && (
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>アラート情報</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">ステータス</h3>
                <p>{selectedAlert.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">メッセージ</h3>
                <p className="whitespace-pre-line">
                  {selectedAlert.messages}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">作成日時</h3>
                <p>
                  {new Date(selectedAlert.created_at).toLocaleString("ja-JP")}
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setSelectedAlert(null)}
                  variant="outline"
                >
                  閉じる
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}  
    </>
  );
};
