import axios from "axios";
import { Job, Application } from "./types";

const JOB_API_BASE = "https://x8ki-letl-twmt.n7.xano.io/api:Mv5jTolf";
const APPLICATION_API_BASE = "https://x8ki-letl-twmt.n7.xano.io/api:MJ8mZ3fN";

export const jobApi = {
  // 全ての求人を取得
  getAllJobs: () => axios.get<Job[]>(`${JOB_API_BASE}/job`),

  // 特定の求人を取得
  getJob: (jobId: string) => axios.get<Job>(`${JOB_API_BASE}/job/${jobId}`),

  // 求人を作成
  createJob: (jobData: Partial<Job>) =>
    axios.post<Job>(`${JOB_API_BASE}/job`, jobData),

  // 求人を更新
  updateJob: (jobId: string, jobData: Partial<Job>) =>
    axios.patch<Job>(`${JOB_API_BASE}/job/${jobId}`, jobData),

  // 求人を削除
  deleteJob: (jobId: string) => axios.delete(`${JOB_API_BASE}/job/${jobId}`),

  // レストラン別の求人を取得
  getJobsByRestaurant: (restaurantId: string) =>
    axios.get<Job[]>(`${JOB_API_BASE}/job/restaurant/${restaurantId}`),
};

export const applicationApi = {
  // 全ての応募を取得
  getAllApplications: () =>
    axios.get<Application[]>(`${APPLICATION_API_BASE}/application`),

  // 特定の応募を取得
  getApplication: (applicationId: string) =>
    axios.get<Application>(
      `${APPLICATION_API_BASE}/application/${applicationId}`
    ),

  // 応募を作成
  createApplication: (applicationData: Partial<Application>) =>
    axios.post<Application>(
      `${APPLICATION_API_BASE}/application`,
      applicationData
    ),

  // 応募を更新
  updateApplication: (
    applicationId: string,
    applicationData: Partial<Application>
  ) =>
    axios.patch<Application>(
      `${APPLICATION_API_BASE}/application/${applicationId}`,
      applicationData
    ),

  // 応募を削除
  deleteApplication: (applicationId: string) =>
    axios.delete(`${APPLICATION_API_BASE}/application/${applicationId}`),

  // 求人別の応募を取得
  getApplicationsByJob: (jobId: string) =>
    axios.get<Application[]>(
      `${APPLICATION_API_BASE}/application/job/${jobId}`
    ),
};
