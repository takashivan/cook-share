"use client";

import Link from "next/link";
import { MessageSquare, Star, Edit } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import useSWR from "swr";
import { applicationApi } from "@/lib/api/application";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Application, Job, WorkSessionWithJob } from "@/types";
import { useEffect, useState } from "react";
import { workSessionApi } from "@/lib/api/workSession";

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

export default function ChefDashboard() {
  const { user } = useAuth();
  const [workSessions, setWorkSessions] = useState<WorkSessionWithJob[]>([]);

  const { data: applications } = useSWR<ApplicationWithJob[]>(
    user ? ["applications", user.id.toString()] : null,
    async ([_, userId]: [string, string]) => {
      const result = await applicationApi.getApplicationsByUser(userId);
      return result.map((app: any) => ({
        ...app,
        job: app.job
          ? {
              ...app.job,
              restaurant: app.job._restaurant,
            }
          : undefined,
      }));
    }
  );

  // 次のお仕事（確定済みの仕事）
  const upcomingJobs = applications
    ?.filter((app) => app.status === "ACCEPTED" && app.job)
    .sort(
      (a, b) =>
        new Date(a.job!.work_date).getTime() -
        new Date(b.job!.work_date).getTime()
    )
    .filter((app) => new Date(app.job!.work_date) >= new Date());

  useEffect(() => {
    const fetchWorkSessions = async () => {
      if (!user?.id) return;
      try {
        const sessions = (await workSessionApi.getWorkSessionsToDoByUserId(
          user.id
        )) as WorkSessionWithJob[];
        // IN_PROGRESS ステータスのものだけをフィルタリング
        const inProgressSessions = sessions.filter(
          (session: WorkSessionWithJob) => session.status === "IN_PROGRESS"
        );
        setWorkSessions(inProgressSessions);
      } catch (error) {
        console.error("Failed to fetch work sessions:", error);
      }
    };

    fetchWorkSessions();
  }, [user?.id]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-6">
        ようこそ、{user?.name || "ゲスト"}さん
      </h1>

      {/* 次のお仕事 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">次のお仕事</h2>
        <div className="space-y-4">
          {upcomingJobs && upcomingJobs.length > 0 ? (
            upcomingJobs.map(
              (application) =>
                application.job && (
                  <Link
                    key={application.id}
                    href={`/chef/job/${application.id}`}
                    className="block">
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {format(
                              new Date(application.job.work_date),
                              "MM/dd (E)",
                              {
                                locale: ja,
                              }
                            )}
                          </span>
                          <span className="text-gray-500">|</span>
                          <span className="text-gray-500">
                            {format(
                              new Date(application.job.start_time),
                              "HH:mm"
                            )}{" "}
                            〜{" "}
                            {format(
                              new Date(application.job.end_time),
                              "HH:mm"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-500 mb-1">
                        {application.job.restaurant.name}
                      </div>
                      <div className="font-medium">{application.job.title}</div>
                    </div>
                  </Link>
                )
            )
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              次のお仕事は未定です
            </div>
          )}
        </div>
      </section>

      {/* やること */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">やること</h2>
        <div className="space-y-4">
          {workSessions.map((session) => (
            <Link
              key={session.id}
              href={`/chef/job/${session.application_id}`}
              className="block">
              <div
                key={session.id}
                className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Edit className="h-5 w-5 text-gray-700" />
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    完了報告
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {format(new Date(session.created_at), "MM/dd (E)", {
                        locale: ja,
                      })}
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-500">
                      {format(new Date(session.check_in_time), "HH:mm")} 〜{" "}
                      {format(new Date(session.check_out_time), "HH:mm")}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 mb-1">
                  {session.job.restaurant.name}
                </div>
                <div className="font-medium">{session.job.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 未読メッセージ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">未読メッセージ</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="h-5 w-5 text-gray-700" />
              <div className="font-medium">洋食 黒船亭</div>
            </div>
            <p className="text-gray-600 truncate">
              はじめまして。この度はご応募いただきありがとう...
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="h-5 w-5 text-gray-700" />
              <div className="font-medium">くっくぴざすし</div>
            </div>
            <p className="text-gray-600 truncate">
              はじめまして。この度はご応募いただきありがとう...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
