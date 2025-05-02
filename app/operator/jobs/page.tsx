"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import {
  fetchOperatorJobs,
  fetchOperatorAlerts,
  banJob,
  approveJob,
} from "@/lib/redux/slices/operatorSlice";
import { JobWithRestaurant } from "@/types";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";

export default function JobsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, alerts, loading, error } = useSelector((state: RootState) => ({
    jobs: state.operator.jobs.data,
    alerts: state.operator.alerts.data,
    loading: state.operator.jobs.loading || state.operator.alerts.loading,
    error: state.operator.jobs.error || state.operator.alerts.error,
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuspendedOnly, setShowSuspendedOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobWithRestaurant | null>(
    null
  );
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOperatorJobs());
    dispatch(fetchOperatorAlerts());
  }, [dispatch]);

  const filteredJobs = jobs?.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showSuspendedOnly ? !job.is_approved : true;
    return matchesSearch && matchesStatus;
  });

  const getJobAlert = (jobId: number) => {
    return alerts?.find((alert) => alert.job_id === jobId);
  };

  const handleBan = async (id: number) => {
    if (window.confirm("この求人を停止しますか？")) {
      await dispatch(banJob({ id, reason: "運営判断による停止" }));
      dispatch(fetchOperatorJobs());
      setIsModalOpen(false);
    }
  };

  const handleApprove = async (id: number) => {
    await dispatch(approveJob({ id, reason: "承認" }));
    dispatch(fetchOperatorJobs());
    setIsModalOpen(false);
  };

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
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">求人一覧</h1>
      </div>

      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="求人を検索..."
          className="flex-1 px-4 py-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="flex items-center gap-2">
          <Switch
            checked={showSuspendedOnly}
            onCheckedChange={(checked) => setShowSuspendedOnly(checked)}
          />
          一時停止中の求人のみ表示
        </label>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-1/3 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                タイトル
              </th>
              <th className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                勤務日
              </th>
              <th className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                時給
              </th>
              <th className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs?.map((job: JobWithRestaurant) => {
              const alert = getJobAlert(job.id);
              return (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 truncate max-w-[200px]">
                        {job.title}
                      </button>
                      {alert && (
                        <button
                          onClick={() => {
                            setSelectedAlert(alert);
                            setIsAlertModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700">
                          <AlertCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {new Date(job.work_date).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    ¥{job.hourly_rate?.toLocaleString() || "未設定"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {job.is_approved ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        公開中
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        停止中
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900">
                      詳細
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">{selectedJob.title}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">説明</h3>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>
              <div>
                <h3 className="font-semibold">勤務日</h3>
                <p className="text-gray-600">
                  {new Date(selectedJob.work_date).toLocaleDateString("ja-JP")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">時給</h3>
                <p className="text-gray-600">
                  ¥{selectedJob.hourly_rate?.toLocaleString() || "未設定"}
                </p>
              </div>
              {selectedJob.transportation && (
                <div>
                  <h3 className="font-semibold">交通費</h3>
                  <p className="text-gray-600">{selectedJob.transportation}</p>
                </div>
              )}
              <div className="flex justify-end gap-4 mt-6">
                {selectedJob.is_approved ? (
                  <button
                    onClick={() => handleBan(selectedJob.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    停止
                  </button>
                ) : (
                  <button
                    onClick={() => handleApprove(selectedJob.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    公開
                  </button>
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAlertModalOpen && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              アラート情報
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">ステータス</h3>
                <p className="text-gray-600">{selectedAlert.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">メッセージ</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {selectedAlert.messages}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">作成日時</h3>
                <p className="text-gray-600">
                  {new Date(selectedAlert.created_at).toLocaleString("ja-JP")}
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsAlertModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
