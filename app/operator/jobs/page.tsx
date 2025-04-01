"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { fetchOperatorJobs } from "@/lib/redux/slices/operatorSlice";
import { Job } from "@/lib/api/job";
import Link from "next/link";

export default function JobsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => ({
    jobs: state.operator.jobs.data,
    loading: state.operator.jobs.loading,
    error: state.operator.jobs.error,
  }));

  useEffect(() => {
    dispatch(fetchOperatorJobs());
  }, [dispatch]);

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">求人一覧</h1>
        <Link
          href="/operator/jobs/new"
          className="bg-black text-white px-4 py-2 rounded hover:bg-black/90">
          新規求人作成
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(jobs) &&
          jobs.map((job: Job) => (
            <Link
              key={job.id}
              href={`/operator/jobs/${job.id}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {job.description}
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  勤務日: {new Date(job.work_date).toLocaleDateString("ja-JP")}
                </p>
                <p>
                  時間:{" "}
                  {new Date(job.start_time * 1000).toLocaleTimeString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(job.end_time * 1000).toLocaleTimeString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>時給: ¥{job.hourly_rate?.toLocaleString() || "未設定"}</p>
                {job.transportation && <p>交通費: {job.transportation}</p>}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
