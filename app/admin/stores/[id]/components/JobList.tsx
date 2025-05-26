"use client";

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
import { JobStatusBadgeForAdmin } from "@/components/badge/JobStatusBadgeForAdmin";

type JobTab = "published" | "draft" | "pending" | "expired" | "filled";

interface JobListProps {
  jobWithWorkSessions: JobWithWorkSessions[];
  onCopyJob: (job: Job) => void;
}

export function JobList({ jobWithWorkSessions, onCopyJob }: JobListProps) {
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
      title: `${job.title}`,
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
                  <JobStatusBadgeForAdmin
                    job={job}
                    lastWorksession={job.lastWorksession}
                  />
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
}
