import { useGetCompanyUserNotificationsByUserId } from "@/hooks/api/companyuser/companyUserNotifications/useGetCompanyUserNotificationsByUserId";
import { useCompanyAuth } from "@/lib/contexts/CompanyAuthContext";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { formatDateToLocalISOStringForDatetimeLocal } from "@/lib/functions";
import type { Job } from "@/lib/api/job";
import { JobWithWorkSessions } from "./JobContent";

type JobTab = "published" | "draft" | "pending" | "expired" | "filled";

interface JobListProps {
  jobWithWorkSessions: JobWithWorkSessions[];
  onCopyJob: (job: Job) => void;
}

export function JobList({
  jobWithWorkSessions,
  onCopyJob,
}: JobListProps) {
  const { user } = useCompanyAuth();
  const router = useRouter();

  // 通知の取得
  const { data: notifications } = useGetCompanyUserNotificationsByUserId({
    userId: user?.id,
  });

  const handleCopyJob = (job: any) => {
    const { id, ...jobWithoutId } = job;
    const jobData = {
      ...jobWithoutId,
      title: `${job.title} (コピー)`,
      status: "DRAFT",
      start_time: new Date(job.start_time).toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      end_time: new Date(job.end_time).toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      expiry_date: formatDateToLocalISOStringForDatetimeLocal(
        new Date(job.expiry_date)
      ),
    };
    onCopyJob(jobData);
  };

  return (
    <div className="grid gap-4">
      {jobWithWorkSessions.map((job) => {
        const notificationCount =
          notifications?.filter(
            (notification) =>
              notification.job_id === job.id && !notification.is_read
          ).length || 0;
        return (
          <div
            key={job.id}
            className="items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => router.push(`/admin/job/${job.id}`)}>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {job.status === "FILLED" && job.lastWorksession?.status === "SCHEDULED" &&
                    <Badge className="bg-yellow-500 hover:bg-yellow-500">
                      未チェックイン
                    </Badge>
                  }
                  {job.status === "FILLED" && job.lastWorksession?.status === "IN_PROGRESS" &&
                    <Badge className="bg-blue-500 hover:bg-blue-500">
                      チェックイン済
                    </Badge>
                  }
                  {job.status === "FILLED" && job.lastWorksession?.status === "COMPLETED" &&
                    <Badge className="bg-green-500 hover:bg-green-500">
                      勤務完了
                    </Badge>
                  }

                  {job.status === "PUBLISHED" && job.expiry_date && job.expiry_date > Date.now() && job.workSessionCount === 0 &&
                    <Badge className="bg-pink-500 hover:bg-pink-500">
                      募集中
                    </Badge>
                  }

                  {job.status === "DRAFT" &&
                    <Badge className="bg-gray-500 hover:bg-gray-500">
                      下書き
                    </Badge>
                  }

                  {job.status === "PENDING" &&
                    <Badge className="bg-gray-500 hover:bg-gray-500">
                      一時停止中
                    </Badge>
                  }

                  {job.status === "PUBLISHED" && job.expiry_date && job.expiry_date <= Date.now() &&
                    <Badge className="bg-red-500 hover:bg-red-500">
                      募集終了
                    </Badge>
                  }
                  {job.status === "FILLED" && job.lastWorksession?.status === "VERIFIED" &&
                    <Badge className="bg-green-500 hover:bg-green-500">
                      勤務完了承認済み
                    </Badge>
                  }
                  {job.status === "FILLED" && job.lastWorksession?.status === "CANCELED_BY_CHEF" &&
                    <Badge className="bg-gray-500 hover:bg-gray-500">
                      シェフキャンセル
                    </Badge>
                  }
                  {job.status === "FILLED" && job.lastWorksession?.status === "CANCELED_BY_RESTAURANT" &&
                    <Badge className="bg-gray-500 hover:bg-gray-500">
                      レストランキャンセル
                    </Badge>
                  }
                </div>
                {notificationCount > 0 && (
                  <Badge className="h-5 flex items-center justify-center bg-red-500 hover:bg-red-500 text-white px-1.5 py-0.5 ml-auto">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </Badge>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/job/${job.id}`}>詳細を見る</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyJob(job);
                      }}>
                      コピーして新規作成
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm">{job.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {job.formattedWorkDate}
                </Badge>
                <span className="text-xs text-gray-500">
                  {job.formattedTime}
                </span>
                <span className="text-xs text-gray-500">{job.fee}円</span>
              </div>

              {/* <div className="flex items-center gap-2">
                {job.workSessionCount > 0 ? (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">応募あり</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">応募なし</span>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};