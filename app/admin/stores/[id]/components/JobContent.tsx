import { Calendar, List, Plus } from "lucide-react";
import { JobCalendar } from "./JobCalendar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { CreateJobModal } from "@/components/modals/CreateJobModal";
import { JobsCreatePayload, JobsListOutput } from "@/api/__generated__/base/data-contracts";
import { useCreateJob } from "@/hooks/api/companyuser/jobs/useCreateJob";
import { toast } from "@/hooks/use-toast";
import { JobList } from "./JobList";
import type { Job } from "@/lib/api/job";
import { format } from "date-fns";
import { useGetRestaurant } from "@/hooks/api/companyuser/restaurants/useGetRestaurant";
import { useGetJobsByRestaurantId } from "@/hooks/api/companyuser/jobs/useGetJobsByRestaurantId";
import { useGetMultipleWorksessionsByJobId } from "@/hooks/api/companyuser/worksessions/useGetMultipleWorksessionsByJobId";
import { ja } from "date-fns/locale";

export interface JobWithWorkSessions
  extends Omit<JobsListOutput[number], "workSessionCount"> {
  formattedWorkDate: string;
  formattedTime: string;
  workSessionCount: number;
}

interface JobContentProps {
  restaurantId: number;
}

export function JobContent({
  restaurantId,
}: JobContentProps) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);

  const [copiedJob, setCopiedJob] = useState<Partial<Job> | null>(null);

  // 求人の取得
  const { data: jobs } = useGetJobsByRestaurantId({
    restaurantId,
  });

  // worksessionの取得
  const { data: worksessionsbyJob } = useGetMultipleWorksessionsByJobId({
    jobIds: jobs?.map((job) => job.id) || [],
  });

  // 求人とworksessionの結合
  const jobWithWorkSessions: JobWithWorkSessions[] | undefined =
    jobs?.map((job) => {
      const workSessionCount =
        worksessionsbyJob?.find((workSessions) =>
          workSessions.some((workSession) => workSession.job_id === job.id)
        )?.length || 0;
      return {
        ...job,
        formattedWorkDate: format(new Date(job.work_date), "yyyy年MM月dd日", {
          locale: ja,
        }),
        formattedTime: `${format(
          new Date(job.start_time),
          "HH:mm"
        )} 〜 ${format(new Date(job.end_time), "HH:mm")}`,
        workSessionCount,
      };
    }) ?? [];

  // レストラン情報の取得
  const { data: restaurant } = useGetRestaurant({
    restaurantId,
  });

  // 求人の追加
  const { trigger: createJobTrigger } = useCreateJob({
    companyId: restaurant?.companies_id ?? undefined,
    restaurantId: restaurant?.id,
    handleSuccess: () => {
      setIsCreateJobModalOpen(false);
      setCopiedJob(null);
      toast({
        title: "求人を追加しました",
        description: "新しい求人の登録が完了しました。",
      });
    },
    handleError: (error) => {
      console.error("Failed to create job:", error);
      toast({
        title: "エラーが発生しました",
        description: "求人の追加に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    },
  });

  const handleCreateJob = async (data: JobsCreatePayload) => {
    await createJobTrigger(data);
  };

  const handleCopyJob = (jobData: Job) => {
    setCopiedJob(jobData);
    setIsCreateJobModalOpen(true);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            title="リスト表示">
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("calendar")}
            title="カレンダー表示">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <Button size="sm" onClick={() => setIsCreateJobModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          求人を追加
        </Button>
      </div>

      {viewMode === "calendar" ? (
        <JobCalendar
          jobWithWorkSessions={jobWithWorkSessions}
          handleDateClick={(date) => {
            setSelectedDate(date);
            setIsCreateJobModalOpen(true);
          }}
        />
      ) : (
        <Tabs defaultValue="published" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="filled">マッチング済</TabsTrigger>
            <TabsTrigger value="published">未マッチング</TabsTrigger>
            <TabsTrigger value="draft">下書き</TabsTrigger>
            <TabsTrigger value="pending">一時停止中</TabsTrigger>
            <TabsTrigger value="expired">過去の求人</TabsTrigger>
          </TabsList>

          <JobList
            selectedTab="filled"
            jobWithWorkSessions={jobWithWorkSessions}
            onCopyJob={handleCopyJob}
          />
          <JobList
            selectedTab="published"
            jobWithWorkSessions={jobWithWorkSessions}
            onCopyJob={handleCopyJob}
          />
          <JobList
            selectedTab="draft"
            jobWithWorkSessions={jobWithWorkSessions}
            onCopyJob={handleCopyJob}
          />
          <JobList
            selectedTab="pending"
            jobWithWorkSessions={jobWithWorkSessions}
            onCopyJob={handleCopyJob}
          />
          <JobList
            selectedTab="expired"
            jobWithWorkSessions={jobWithWorkSessions}
            onCopyJob={handleCopyJob}
          />
        </Tabs>
      )}

      <CreateJobModal
        isOpen={isCreateJobModalOpen}
        onClose={() => {
          setIsCreateJobModalOpen(false);
          setCopiedJob(null);
          setSelectedDate(null);
        }}
        onSubmit={handleCreateJob}
        restaurantId={restaurantId}
        initialData={
          copiedJob || selectedDate
            ? {
                ...copiedJob,
                work_date: copiedJob
                  ? copiedJob.work_date
                  : selectedDate
                  ? format(selectedDate, "yyyy-MM-dd")
                  : undefined,
              }
            : undefined
        }
      />
    </>
  )
};
