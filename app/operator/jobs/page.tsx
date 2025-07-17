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
import { AlertCircle, Search } from "lucide-react";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// ステータス選択肢（JobStatusBadgeForAdmin.tsxに合わせて全て列挙）
const STATUS_OPTIONS = [
  { value: "RECRUITING", label: "募集中" }, // job.status === "PUBLISHED" && job.expiry_date > now && !lastWorksession
  { value: "DRAFT", label: "下書き" }, // job.status === "DRAFT"
  { value: "SUSPENDED", label: "一時停止中" }, // job.status === "PENDING"
  { value: "CLOSED", label: "募集終了" }, // job.status === "PUBLISHED" && job.expiry_date <= now
  { value: "FILLED_SCHEDULED", label: "未チェックイン" }, // job.status === "FILLED" && lastWorksession?.status === "SCHEDULED"
  { value: "FILLED_IN_PROGRESS", label: "完了報告待ち" }, // job.status === "FILLED" && lastWorksession?.status === "IN_PROGRESS"
  { value: "FILLED_COMPLETED", label: "完了報告承認待ち" }, // job.status === "FILLED" && lastWorksession?.status === "COMPLETED"
  { value: "FILLED_VERIFY_REJECTED", label: "完了報告差し戻し" }, // job.status === "FILLED" && lastWorksession?.status === "VERIFY_REJECTED"
  { value: "FILLED_VERIFIED", label: "完了報告承認済" }, // job.status === "FILLED" && lastWorksession?.status === "VERIFIED"
  { value: "FILLED_CANCELED_BY_CHEF", label: "シェフキャンセル" }, // job.status === "FILLED" && lastWorksession?.status === "CANCELED_BY_CHEF"
  { value: "FILLED_CANCELED_BY_RESTAURANT", label: "レストランキャンセル" }, // job.status === "FILLED" && lastWorksession?.status === "CANCELED_BY_RESTAURANT"
];

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
  const [reason, setReason] = useState("");
  const [sortKey, setSortKey] = useState<keyof JobsListData[number] | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [workDateMin, setWorkDateMin] = useState("");
  const [workDateMax, setWorkDateMax] = useState("");
  const [feeMin, setFeeMin] = useState("");
  const [feeMax, setFeeMax] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>(STATUS_OPTIONS.map(opt => opt.value));

  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchOperatorJobs());
    dispatch(fetchOperatorAlerts());
  }, [dispatch]);

  // ソート関数
  const handleSort = (key: keyof JobsListData[number]) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // ソートアイコン
  const renderSortIcon = (key: keyof JobsListData[number]) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? "▲" : "▼";
  };

  // ステータス判定関数
  const getJobStatusKey = (job: JobsListData[number]) => {
    const now = Date.now();
    const lastWorksession = job.worksession as WorksessionsRestaurantTodosListData[number] | null;
    if (job.status === "FILLED" && lastWorksession?.status === "SCHEDULED") return "FILLED_SCHEDULED";
    if (job.status === "FILLED" && lastWorksession?.status === "IN_PROGRESS") return "FILLED_IN_PROGRESS";
    if (job.status === "FILLED" && lastWorksession?.status === "COMPLETED") return "FILLED_COMPLETED";
    if (job.status === "FILLED" && lastWorksession?.status === "VERIFY_REJECTED") return "FILLED_VERIFY_REJECTED";
    if (job.status === "FILLED" && lastWorksession?.status === "VERIFIED") return "FILLED_VERIFIED";
    if (job.status === "FILLED" && lastWorksession?.status === "CANCELED_BY_CHEF") return "FILLED_CANCELED_BY_CHEF";
    if (job.status === "FILLED" && lastWorksession?.status === "CANCELED_BY_RESTAURANT") return "FILLED_CANCELED_BY_RESTAURANT";
    if (job.status === "PUBLISHED" && job.expiry_date && new Date(job.expiry_date).getTime() > now && !lastWorksession) return "RECRUITING";
    if (job.status === "DRAFT") return "DRAFT";
    if (job.status === "PENDING") return "SUSPENDED";
    if (job.status === "PUBLISHED" && job.expiry_date && new Date(job.expiry_date).getTime() <= now) return "CLOSED";
    return ""; // 該当なし
  };

  // ステータスチェックボックスのハンドラ
  const handleStatusChange = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredJobs = jobs?.filter((job) => {
    const query = searchTerm.trim().toLowerCase();
    if (
      query &&
      !(
        job.id.toString().includes(query) ||
        job.title.toLowerCase().includes(query)
      )
    ) {
      return false;
    }
    // 勤務日フィルタ
    if (
      (workDateMin && new Date(job.work_date) < new Date(workDateMin)) ||
      (workDateMax && new Date(job.work_date) > new Date(workDateMax))
    ) {
      return false;
    }
    // 報酬フィルタ
    if (
      (feeMin && job.fee < Number(feeMin)) ||
      (feeMax && job.fee > Number(feeMax))
    ) {
      return false;
    }
    // ステータスフィルタ
    const statusKey = getJobStatusKey(job);
    if (statusFilter.length === 0 || !statusFilter.includes(statusKey)) {
      return false;
    }
    // 一時停止中のみ
    if (showSuspendedOnly && statusKey !== "SUSPENDED") {
      return false;
    }
    return true;
  });

  // ソート済みデータ
  const sortedJobs = [...(filteredJobs ?? [])].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }
    return 0;
  });

  const getJobAlert = (jobId: number) => {
    return alerts?.find((alert) => alert.job_id === jobId);
  };

  const handleBan = async (id: number) => {
    if (!reason) return;

    try {
      await dispatch(banJob({ id, reason })).unwrap();
      toast({
        title: "求人が停止されました",
        description: "求人の停止に成功しました",
      });
      setSelectedJob(null);
      setReason("");
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
    if (!reason) return;

    try {
      await dispatch(approveJob({ id, reason })).unwrap();
      toast({
        title: "求人が承認されました",
        description: "求人の承認に成功しました",
      });
      setSelectedJob(null);
      setReason("");
      dispatch(fetchOperatorJobs());
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "求人の承認に失敗しました",
        variant: "destructive",
      });
    }
  };

  // フィルターリセット関数
  const handleFilterReset = () => {
    setWorkDateMin("");
    setWorkDateMax("");
    setFeeMin("");
    setFeeMax("");
    setStatusFilter(STATUS_OPTIONS.map(opt => opt.value));
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
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">求人一覧</h2>
          <p className="text-muted-foreground">登録されている求人の一覧です</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ID・タイトルで検索..."
              className="w-full pl-8 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            フィルター
          </Button>
        </div>

        {/* フィルターダイアログ */}
        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>求人フィルター</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>勤務日（開始）</label>
                <Input
                  type="date"
                  value={workDateMin}
                  onChange={e => setWorkDateMin(e.target.value)}
                />
              </div>
              <div>
                <label>勤務日（終了）</label>
                <Input
                  type="date"
                  value={workDateMax}
                  onChange={e => setWorkDateMax(e.target.value)}
                />
              </div>
              <div>
                <label>報酬（最小）</label>
                <Input
                  type="number"
                  value={feeMin}
                  onChange={e => setFeeMin(e.target.value)}
                />
              </div>
              <div>
                <label>報酬（最大）</label>
                <Input
                  type="number"
                  value={feeMax}
                  onChange={e => setFeeMax(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label>ステータス</label>
                <div className="flex gap-4 mt-1 flex-wrap">
                  {STATUS_OPTIONS.map(opt => (
                    <label key={opt.value} className="flex items-center gap-1">
                      <Checkbox
                        checked={statusFilter.includes(opt.value)}
                        onCheckedChange={() => handleStatusChange(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-row gap-2 justify-end">
              <Button
                variant="secondary"
                type="button"
                onClick={handleFilterReset}
              >
                フィルターリセット
              </Button>
              <Button variant="outline" onClick={() => setFilterOpen(false)}>
                閉じる
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card>
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      style={{ minWidth: "4em", width: "4em" }}
                      onClick={() => handleSort("id")}
                      className="cursor-pointer"
                    >
                      ID {renderSortIcon("id")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "16em", width: "16em" }}
                      onClick={() => handleSort("title")}
                      className="cursor-pointer"
                    >
                      タイトル {renderSortIcon("title")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "9em", width: "9em" }}
                      onClick={() => handleSort("work_date")}
                      className="cursor-pointer"
                    >
                      勤務日 {renderSortIcon("work_date")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "8em", width: "8em" }}
                      onClick={() => handleSort("fee")}
                      className="cursor-pointer"
                    >
                      報酬 {renderSortIcon("fee")}
                    </TableHead>
                    <TableHead
                      style={{ minWidth: "12em", width: "12em" }}
                      onClick={() => handleSort("status")}
                      className="cursor-pointer"
                    >
                      ステータス {renderSortIcon("status")}
                    </TableHead>
                    <TableHead style={{ minWidth: "5em", width: "5em" }}>
                      操作
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedJobs?.map((job) => {
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
            </div>
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
                        <span className="block mb-2">求人を承認しますか？</span>
                        <Input
                          placeholder="承認理由を入力"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        />
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
                          <span className="block mb-2">求人をBANしますか？</span>
                          <Input
                            placeholder="BAN理由を入力"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                          />
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
