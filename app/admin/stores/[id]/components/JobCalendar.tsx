"use client";

import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobWithWorkSessions } from "./JobContent";

interface JobCalendarProps {
  jobWithWorkSessions: JobWithWorkSessions[]
  handleDateClick: (date: Date) => void;
}

export function JobCalendar({
  jobWithWorkSessions,
  handleDateClick,
}: JobCalendarProps) {
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getJobsForDate = (date: Date) => {
    return jobWithWorkSessions.filter((job) => {
      const jobDate = new Date(job.work_date);
      return (
        jobDate.getFullYear() === date.getFullYear() &&
        jobDate.getMonth() === date.getMonth() &&
        jobDate.getDate() === date.getDate()
      );
    });
  };

  const calculateProgress = (applicants: number, required: number) => {
    return Math.min(Math.round((applicants / required) * 100), 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // const getJobStatusColor = (status: string) => {
  //   switch (status) {
  //     case "PUBLISHED":
  //       return "bg-green-100 text-green-800";
  //     case "DRAFT":
  //       return "bg-gray-100 text-gray-800";
  //     case "PENDING":
  //       return "bg-yellow-100 text-yellow-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium">
            {format(currentDate, "yyyy年M月", { locale: ja })}
          </h3>
          <div className="flex items-center gap-4">
            {/* <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>公開中</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span>下書き</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span>一時停止中</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span>応募あり</span>
              </div>
            </div> */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, i) => (
            <div
              key={i}
              className={`text-center text-sm font-medium py-2 ${
                i === 0
                  ? "text-red-500"
                  : i === 6
                  ? "text-blue-500"
                  : ""
              }`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 42 }, (_, i) => {
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              i -
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  1
                ).getDay() +
                1
            );
            const dayJobs = getJobsForDate(date);
            const isToday =
              format(date, "yyyy-MM-dd") ===
              format(new Date(), "yyyy-MM-dd");
            const isCurrentMonth =
              date.getMonth() === currentDate.getMonth();
            const hasApplicants = dayJobs.some(
              (job) => job.workSessionCount > 0
            );
            const dayOfWeek = date.getDay();

            return (
              <div
                key={i}
                className={`min-h-[120px] border rounded-lg p-2 transition-all hover:shadow-md relative ${
                  isToday
                    ? "bg-blue-50 border-blue-200"
                    : !isCurrentMonth
                    ? "bg-gray-50 text-gray-400"
                    : ""
                } ${
                  dayOfWeek === 0
                    ? "border-l-red-200"
                    : dayOfWeek === 6
                    ? "border-l-blue-200"
                    : ""
                }`}>
                <div className="flex justify-between items-center mb-1">
                  <div
                    className={`text-sm font-medium ${
                      dayOfWeek === 0
                        ? "text-red-500"
                        : dayOfWeek === 6
                        ? "text-blue-500"
                        : ""
                    } ${!isCurrentMonth ? "opacity-50" : ""}`}>
                    {format(date, "d")}
                  </div>
                  {isCurrentMonth && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full hover:bg-gray-200"
                      onClick={() => handleDateClick(date)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                <div className="space-y-1 overflow-y-auto max-h-[80px]">
                  {dayJobs.map((job) => {
                    const progress = calculateProgress(
                      job.workSessionCount,
                      job.number_of_spots
                    );
                    const progressColor =
                      getProgressColor(progress);

                    return (
                      <div
                        key={job.id}
                        className={`text-xs p-1.5 rounded border ${
                          job.status === "PUBLISHED"
                            ? "bg-green-100 border-green-300"
                            : job.status === "DRAFT"
                            ? "bg-gray-100 border-gray-300"
                            : "bg-yellow-100 border-yellow-300"
                        } cursor-pointer hover:shadow-sm transition-all relative group`}
                        onClick={() =>
                          router.push(`/admin/job/${job.id}`)
                        }>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {format(
                              new Date(job.start_time),
                              "HH:mm"
                            )}
                          </span>
                        </div>
                        <div className="truncate">{job.title}</div>
                        <div className="mt-1 flex items-center gap-1">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full ${progressColor}`}
                              style={{
                                width: `${progress}%`,
                              }}></div>
                          </div>
                          {/* <span className="text-[10px] whitespace-nowrap">
                            {job.workSessionCount}/
                            {job.number_of_spots}
                          </span> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
};