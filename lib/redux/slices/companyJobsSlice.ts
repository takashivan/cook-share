import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "@/lib/api/job";
import { getApi } from "@/api/api-factory";
import { Job as JobApi } from "@/api/__generated__/chef-connect/Job";

interface CompanyJobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: CompanyJobsState = {
  jobs: [],
  loading: false,
  error: null,
};

export const fetchCompanyJobs = createAsyncThunk<any, void>(
  "companyJobs/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = (await getApi(JobApi).getJob2()).data.jobs;
      console.log("API Response in company slice:", response);
      return response;
    } catch (error) {
      console.error("Error in fetchCompanyJobs:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "求人の取得に失敗しました"
      );
    }
  }
);

const companyJobsSlice = createSlice({
  name: "companyJobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyJobs.fulfilled, (state, action) => {
        state.jobs = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchCompanyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "エラーが発生しました";
      });
  },
});

export default companyJobsSlice.reducer;
