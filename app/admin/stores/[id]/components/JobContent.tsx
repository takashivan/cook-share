import { Calendar, List, Plus } from "lucide-react";
import { JobCalendar } from "./JobCalendar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { CreateJobModal } from "@/components/modals/CreateJobModal";
import { JobsCreatePayload, JobsListOutput, WorksessionsRestaurantTodosListData } from "@/api/__generated__/base/data-contracts";
import { useCreateJob } from "@/hooks/api/companyuser/jobs/useCreateJob";
import { toast } from "@/hooks/use-toast";
import { JobList } from "./JobList";
import type { Job } from "@/lib/api/job";
import { format } from "date-fns";
import { useGetRestaurant } from "@/hooks/api/companyuser/restaurants/useGetRestaurant";
import { useGetJobsByRestaurantId } from "@/hooks/api/companyuser/jobs/useGetJobsByRestaurantId";
import { useGetMultipleWorksessionsByJobId } from "@/hooks/api/companyuser/worksessions/useGetMultipleWorksessionsByJobId";
import { ja } from "date-fns/locale";

export interface JobWithWorkSessions extends Omit<JobsListOutput[number], "workSessionCount"> {
  formattedWorkDate: string;
  formattedTime: string;
  workSessionCount: number;
  lastWorksession: WorksessionsRestaurantTodosListData[number] | null;
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
  const jobWithWorkSessions: JobWithWorkSessions[] =
    (jobs?.map((job) => {
      const workSessions = worksessionsbyJob?.find((workSessions) =>
        workSessions.some((workSession) => workSession.job_id === job.id)
      ) || [];

      const workSessionCount = workSessions.length;
      const lastWorksession = workSessions.length > 0 ? workSessions.reduce((prev, current) => {
        return new Date(prev.created_at) > new Date(current.created_at)
          ? prev
          : current;
      }, workSessions[0]) : null;
        
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
        lastWorksession,
      };
    }) ?? []).sort((a, b) => {
      // work_dateの降順でソート
      return new Date(b.work_date).getTime() - new Date(a.work_date).getTime();
    });

  // 求人を状態ごとにフィルタリング
  const filteredJobsList = {
    // マッチング済み、かつ、未チェックインorチェックイン済or勤務完了 の求人
    filled: jobWithWorkSessions.filter((job) => {
      const lastWorksessionStatus = job.lastWorksession?.status;

      return (
        job.status === "FILLED" &&
          (lastWorksessionStatus === "SCHEDULED" || lastWorksessionStatus === "IN_PROGRESS" || lastWorksessionStatus === "COMPLETED")
      )
    }),
    // 未マッチング、かつ、掲載期限より前、かつ、応募が１回も無い求人
    published: jobWithWorkSessions.filter((job) => {
      return (
        job.status === "PUBLISHED" &&
        (!job.expiry_date || job.expiry_date > Date.now()) &&
        job.workSessionCount === 0
      );
    }),
    // 下書きの求人
    draft: jobWithWorkSessions.filter((job) => job.status === "DRAFT"),
    // 一時停止中の求人
    pending: jobWithWorkSessions.filter((job) => job.status === "PENDING"),
    // 未マッチングかつ掲載期限が過ぎた求人、または、マッチング済みかつ勤務完了報告承認済みまたはキャンセル済みの求人
    expired: jobWithWorkSessions.filter((job) => {
      return (
        (job.status === "PUBLISHED" &&
          job.expiry_date && job.expiry_date <= Date.now()) ||
        (job.status === "FILLED" &&
          (job.lastWorksession?.status === "VERIFIED" || job.lastWorksession?.status === "CANCELED_BY_CHEF" || job.lastWorksession?.status === "CANCELED_BY_RESTAURANT")
        )
      );
    }),
  }

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
        <Tabs defaultValue="filled" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="filled">マッチング済</TabsTrigger>
            <TabsTrigger value="published">未マッチング</TabsTrigger>
            <TabsTrigger value="draft">下書き</TabsTrigger>
            <TabsTrigger value="pending">一時停止中</TabsTrigger>
            <TabsTrigger value="expired">過去の求人</TabsTrigger>
          </TabsList>

          <TabsContent value={"filled"}>
            <JobList
              jobWithWorkSessions={filteredJobsList.filled}
              onCopyJob={handleCopyJob}
            />
          </TabsContent>
          <TabsContent value={"published"}>
            <JobList
              jobWithWorkSessions={filteredJobsList.published}
              onCopyJob={handleCopyJob}
            />
          </TabsContent>
          <TabsContent value={"draft"}>
            <JobList
              jobWithWorkSessions={filteredJobsList.draft}
              onCopyJob={handleCopyJob}
            />
          </TabsContent>
          <TabsContent value={"pending"}>
            <JobList
              jobWithWorkSessions={filteredJobsList.pending}
              onCopyJob={handleCopyJob}
            />
          </TabsContent>
          <TabsContent value={"expired"}>
            <JobList
              jobWithWorkSessions={filteredJobsList.expired}
              onCopyJob={handleCopyJob}
            />
          </TabsContent>
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
