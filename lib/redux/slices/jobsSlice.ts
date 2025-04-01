import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllJobs, Job } from "@/lib/api/job";

interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
  lastFetch: null,
};

// キャッシュの有効期間（1分）
const CACHE_DURATION = 60 * 1000;

// キャッシュが有効かどうかをチェック
const isCacheValid = (lastFetch: number | null): boolean => {
  if (!lastFetch) return false;
  return Date.now() - lastFetch < CACHE_DURATION;
};

export const fetchJobs = createAsyncThunk<Job[], void, { rejectValue: string }>(
  "jobs/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { jobs: JobsState };

      // キャッシュが有効な場合は既存のデータを使用
      if (isCacheValid(state.jobs.lastFetch) && state.jobs.jobs.length > 0) {
        return state.jobs.jobs;
      }

      // キャッシュが無効な場合は新しいデータを取得
      console.log("Fetching fresh jobs data...");
      const jobs = await getAllJobs();
      return jobs;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "求人の取得に失敗しました"
      );
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
        state.lastFetch = Date.now();
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "エラーが発生しました";
      });
  },
});

export default jobsSlice.reducer;
