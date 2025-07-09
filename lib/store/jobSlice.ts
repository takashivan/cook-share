import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobApi } from "@/lib/api/job";
import { applicationApi } from "@/lib/api/application";
import type { Job } from "@/types";
import type { Application } from "@/types";

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  applications: Application[];
  loading: boolean;
  error: string | null;
  lastFetch: {
    jobs: number;
    job: number;
    applications: number;
  };
  isFetching: {
    jobs: boolean;
    job: boolean;
    applications: boolean;
  };
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  applications: [],
  loading: false,
  error: null,
  lastFetch: {
    jobs: 0,
    job: 0,
    applications: 0,
  },
  isFetching: {
    jobs: false,
    job: false,
    applications: false,
  },
};

const CACHE_DURATION = 60000; // 60 seconds
const RATE_LIMIT_DELAY = 2000; // 2 seconds between requests

const shouldFetch = (lastFetch: number) => {
  return Date.now() - lastFetch > CACHE_DURATION;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchJobsByCompanyId = createAsyncThunk(
  "jobs/fetchByCompanyId",
  async (companyId: string, { getState }) => {
    const state = getState() as { jobs: JobState };
    if (!shouldFetch(state.jobs.lastFetch.jobs)) {
      return state.jobs.jobs;
    }
    if (state.jobs.isFetching.jobs) {
      return state.jobs.jobs;
    }
    await delay(RATE_LIMIT_DELAY);
    const response = await jobApi.getJobsByCompany(companyId);
    return response;
  }
);

// export const fetchJobById = createAsyncThunk(
//   "jobs/fetchById",
//   async (jobId: string, { getState }) => {
//     const state = getState() as { jobs: JobState };
//     if (!shouldFetch(state.jobs.lastFetch.job)) {
//       return state.jobs.selectedJob;
//     }
//     if (state.jobs.isFetching.job) {
//       return state.jobs.selectedJob;
//     }
//     await delay(RATE_LIMIT_DELAY);
//     const response = await jobApi.getJob(jobId);
//     return response;
//   }
// );

export const fetchApplicationsByJob = createAsyncThunk(
  "jobs/fetchApplicationsByJob",
  async (jobId: string, { getState }) => {
    const state = getState() as { jobs: JobState };
    if (!shouldFetch(state.jobs.lastFetch.applications)) {
      return state.jobs.applications;
    }
    if (state.jobs.isFetching.applications) {
      return state.jobs.applications;
    }
    await delay(RATE_LIMIT_DELAY);
    const response = await applicationApi.getApplicationsByJob(Number(jobId));
    return response;
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsByCompanyId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isFetching.jobs = true;
      })
      .addCase(fetchJobsByCompanyId.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = JSON.parse(
          JSON.stringify(
            Array.isArray(action.payload) ? action.payload : action.payload.jobs
          )
        );
        state.lastFetch.jobs = Date.now();
        state.isFetching.jobs = false;
      })
      .addCase(fetchJobsByCompanyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs";
        state.isFetching.jobs = false;
      })
      // .addCase(fetchJobById.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      //   state.isFetching.job = true;
      // })
      // .addCase(fetchJobById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.selectedJob = action.payload
      //     ? JSON.parse(JSON.stringify(action.payload))
      //     : null;
      //   state.lastFetch.job = Date.now();
      //   state.isFetching.job = false;
      // })
      // .addCase(fetchJobById.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || "Failed to fetch job";
      //   state.isFetching.job = false;
      // })
      .addCase(fetchApplicationsByJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isFetching.applications = true;
      })
      .addCase(fetchApplicationsByJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
        state.lastFetch.applications = Date.now();
        state.isFetching.applications = false;
      })
      .addCase(fetchApplicationsByJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "応募者の取得に失敗しました";
        state.isFetching.applications = false;
      });
  },
});

export default jobSlice.reducer;
