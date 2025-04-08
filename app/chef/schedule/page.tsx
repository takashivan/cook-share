"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { applicationApi } from "@/lib/api/application";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Application, Job } from "@/types";

// APIレスポンスの型
interface ApplicationResponse extends Omit<Application, "job"> {
  job: {
    id: number;
    created_at: string;
    title: string;
    description: string;
    work_date: string;
    start_time: number;
    end_time: number;
    hourly_rate: number;
    required_skills: string[];
    status: string;
    updated_at: string;
    restaurant_id: number;
    image: string | null;
    creator_id: number;
    task: string | null;
    skill: string | null;
    whattotake: string | null;
    note: string | null;
    point: string | null;
    transportation: string;
    is_approved: boolean;
    _restaurant: {
      id: number;
      name: string;
      address: string;
      image: string | null;
    };
  };
}

interface ApplicationWithJob extends Application {
  job?: Job & {
    restaurant: {
      id: number;
      name: string;
      address: string;
      image: string | null;
    };
  };
}

export default function SchedulePage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [activeTab, setActiveTab] = useState("applied");

  useEffect(() => {
    const fetchApplications = async () => {
      if (user?.id) {
        try {
          const response = (await applicationApi.getApplicationsByUser(
            user.id
          )) as ApplicationResponse[];
          console.log("API Response:", response);
          // レスポンスのジョブデータを適切な型に変換
          const applicationsWithJobs = response.map((app) => {
            if (!app.job) return { ...app, job: undefined };

            // タイムスタンプを数値に変換し、null値を適切に処理
            const jobWithNumberTimestamps = {
              ...app.job,
              created_at: new Date(app.job.created_at).getTime(),
              updated_at: new Date(app.job.updated_at).getTime(),
              image: app.job.image || "",
              task: app.job.task || "",
              skill: app.job.skill || "",
              whattotake: app.job.whattotake || "",
              note: app.job.note || "",
              point: app.job.point || "",
              restaurant: {
                ...app.job._restaurant,
                image: app.job._restaurant.image || "",
              },
            };
            console.log("Transformed job:", jobWithNumberTimestamps);
            return { ...app, job: jobWithNumberTimestamps };
          });
          console.log("Final applications:", applicationsWithJobs);
          setApplications(applicationsWithJobs);
        } catch (error) {
          console.error("Failed to fetch applications:", error);
        }
      }
    };

    fetchApplications();
  }, [user?.id]);

  console.log("Current applications state:", applications);

  const filteredApplications = {
    applied: applications.filter((app) => app.status === "APPLIED"),
    upcoming: applications.filter((app) => app.status === "ACCEPTED"),
    completed: applications.filter((app) =>
      ["DONE", "REJECTED", "CANCELED"].includes(app.status)
    ),
  };

  console.log("Filtered applications:", filteredApplications);

  const renderJobCard = (application: ApplicationWithJob) => {
    if (!application.job) return null;

    const workDate = format(
      new Date(application.job.work_date),
      "yyyy年MM月dd日 (E)",
      {
        locale: ja,
      }
    );
    const startTime = format(
      new Date(application.job.start_time * 1000),
      "HH:mm"
    );
    const endTime = format(new Date(application.job.end_time * 1000), "HH:mm");

    return (
      <Link href={`/chef/job/${application.job.id}`} key={application.id}>
        <Card className="mb-4 hover:bg-gray-50 transition-colors">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{workDate}</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-500">
                  {startTime} 〜 {endTime}
                </span>
              </div>
              <Badge
                variant={
                  application.status === "APPLIED"
                    ? "secondary"
                    : application.status === "ACCEPTED"
                    ? "default"
                    : application.status === "REJECTED"
                    ? "destructive"
                    : application.status === "CANCELED"
                    ? "outline"
                    : "outline"
                }>
                {application.status === "APPLIED"
                  ? "応募中"
                  : application.status === "ACCEPTED"
                  ? "確定"
                  : application.status === "REJECTED"
                  ? "不採用"
                  : application.status === "CANCELED"
                  ? "キャンセル"
                  : "完了"}
              </Badge>
            </div>
            <div className="text-gray-500 mb-1">
              {application.job.restaurant.name}
            </div>
            <div className="text-xs text-gray-400 mb-2">
              {application.job.restaurant.address}
            </div>
            <div className="font-medium">{application.job.title}</div>
            {application.notes && (
              <div className="text-sm text-gray-500 mt-2">
                {application.notes}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">お仕事スケジュール</h1>

      <Tabs
        defaultValue="applied"
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="applied">応募中</TabsTrigger>
          <TabsTrigger value="upcoming">次のお仕事</TabsTrigger>
          <TabsTrigger value="completed">完了</TabsTrigger>
        </TabsList>

        <TabsContent value="applied" className="mt-6">
          {filteredApplications.applied.length > 0 ? (
            filteredApplications.applied.map(renderJobCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              応募中のお仕事はありません
            </p>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          {filteredApplications.upcoming.length > 0 ? (
            filteredApplications.upcoming.map(renderJobCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              確定しているお仕事はありません
            </p>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {filteredApplications.completed.length > 0 ? (
            filteredApplications.completed.map(renderJobCard)
          ) : (
            <p className="text-center text-gray-500 py-8">
              完了したお仕事はありません
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
