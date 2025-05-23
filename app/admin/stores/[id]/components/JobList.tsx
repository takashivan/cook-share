import { useGetCompanyUserNotificationsByUserId } from "@/hooks/api/companyuser/companyUserNotifications/useGetCompanyUserNotificationsByUserId";
import { TabsContent } from "@/components/ui/tabs";
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
import { MoreHorizontal, Users } from "lucide-react";
import Link from "next/link";
import { formatDateToLocalISOStringForDatetimeLocal } from "@/lib/functions";
import type { Job } from "@/lib/api/job";
import { JobWithWorkSessions } from "./JobContent";

type JobTab = "published" | "draft" | "pending" | "expired" | "filled";

interface JobListProps {
  selectedTab: JobTab;
  jobWithWorkSessions: JobWithWorkSessions[];
  onCopyJob: (job: Job) => void;
}

export function JobList({
  selectedTab,
  jobWithWorkSessions,
  onCopyJob,
}: JobListProps) {
  const { user } = useCompanyAuth();
  const router = useRouter();

  // 通知の取得
  const { data: notifications } = useGetCompanyUserNotificationsByUserId({
    userId: user?.id,
  });

  const filteredJobs = jobWithWorkSessions.filter((job) => {
    switch (selectedTab) {
      case "published":
        return (
          job.status === "PUBLISHED" &&
          (!job.expiry_date || job.expiry_date > Date.now())
        );
      case "draft":
        return job.status === "DRAFT";
      case "pending":
        return job.status === "PENDING";
      case "filled":
        return job.status === "FILLED";
      case "expired":
        return job.expiry_date && job.expiry_date <= Date.now();
      default:
        return false;
    }
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
    <TabsContent value={selectedTab}>
      <div className="grid gap-4">
        {filteredJobs.map((job) => {
          const notificationCount =
            notifications?.filter(
              (notification) =>
                notification.job_id === job.id && !notification.is_read
            ).length || 0;
          return (
            <div
              key={job.id}
              className="items-center justify-between p-3 border rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
              onClick={() => router.push(`/admin/job/${job.id}`)}>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {job.status === "PUBLISHED" &&
                      (!job.expiry_date || job.expiry_date > Date.now()) && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          公開中
                        </Badge>
                      )}
                    {job.status === "FILLED" && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">
                        応募あり
                      </Badge>
                    )}
                    {job.status === "DRAFT" && (
                      <Badge className="bg-gray-500 hover:bg-gray-600">
                        下書き
                      </Badge>
                    )}
                    {job.status === "PENDING" && (
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        一時停止中
                      </Badge>
                    )}
                    {job.expiry_date && job.expiry_date <= Date.now() && (
                      <Badge className="bg-red-500 hover:bg-red-600">
                        募集終了
                      </Badge>
                    )}
                  </div>
                  {notificationCount > 0 && (
                    <Badge className="h-5 flex items-center justify-center bg-red-500 text-white px-1.5 py-0.5 ml-auto">
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

                <div className="flex items-center gap-2">
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </TabsContent>
  );
};