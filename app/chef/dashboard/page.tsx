"use client";

import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useGetWorksessionsByUserIdByTodo } from "@/hooks/api/user/worksessions/useGetWorksessionsByUserIdByTodo";

export default function ChefDashboard() {
  const { user } = useAuth();

  // ワークセッションの取得
  const { data: workSessionsData } = useGetWorksessionsByUserIdByTodo({
    userId: user?.id?.toString(),
  });

  const upcomingJobs =
    workSessionsData?.filter((session) => session.status === "SCHEDULED") ?? [];
  console.log("upcomingJobs", upcomingJobs);


  // const { data: applications } = useSWR<ApplicationWithJob[]>(
  //   user ? ["applications", user.id.toString()] : null,
  //   async ([_, userId]: [string, string]) => {
  //     const result = await applicationApi.getApplicationsByUser(userId);
  //     return result.map((app: any) => ({
  //       ...app,
  //       job: app.job
  //         ? {
  //             ...app.job,
  //             restaurant: app.job._restaurant,
  //           }
  //         : undefined,
  //     }));
  //   }
  // );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          ようこそ、{user?.name || "ゲスト"}さん
        </h1>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">次のお仕事</h2>
        {upcomingJobs && upcomingJobs.length > 0 ? (
          upcomingJobs.map((session) => (
            <Link
              key={session.id}
              href={`/chef/job/${session.job_id}`}
              className="block">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {format(new Date(session.job.work_date), "MM/dd (E)", {
                        locale: ja,
                      })}
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-500">
                      {format(new Date(session.job.start_time), "HH:mm")} 〜{" "}
                      {format(new Date(session.job.end_time), "HH:mm")}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 mb-1">
                  {session.job.restaurant.name}
                </div>
                <div className="font-medium">{session.job.title}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center space-y-4">
            <p className="text-gray-500">次のお仕事は未定です</p>
            <Link href="/">
              <Button variant="outline" className="w-full">
                お仕事を探す
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
