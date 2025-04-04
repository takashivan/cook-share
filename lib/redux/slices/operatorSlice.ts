import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { operatorApi } from "@/lib/api/operator";
import { getAllChefs, UserProfile } from "@/lib/api/user";
import { getAllJobs, Job } from "@/lib/api/job";
import { getCuisines } from "@/lib/api/cuisines";

// Async Thunks
export const fetchCompanies = createAsyncThunk(
  "operator/fetchCompanies",
  async () => {
    const response = await operatorApi.getCompanies();
    return response;
  }
);

export const fetchChefs = createAsyncThunk("operator/fetchChefs", async () => {
  const response = await getAllChefs();
  return response;
});

export const fetchCuisines = createAsyncThunk(
  "operator/fetchCuisines",
  async () => {
    const response = await getCuisines();
    return response;
  }
);

export const fetchOperatorJobs = createAsyncThunk(
  "operator/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const jobs = await getAllJobs();
      return jobs;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "求人の取得に失敗しました"
      );
    }
  }
);

export const fetchBilling = createAsyncThunk(
  "operator/fetchBilling",
  async () => {
    const response = await operatorApi.getBilling();
    return response;
  }
);

export const fetchStaff = createAsyncThunk("operator/fetchStaff", async () => {
  const response = await operatorApi.getStaff();
  return response;
});

interface OperatorState {
  companies: any[];
  chefs: any[];
  cuisines: any[];
  jobs: {
    data: Job[];
    loading: boolean;
    error: string | null;
  };
  billing: any;
  staff: any[];
  loading: {
    companies: boolean;
    chefs: boolean;
    jobs: boolean;
    billing: boolean;
    staff: boolean;
    cuisines: boolean;
  };
  error: {
    companies: string | null;
    chefs: string | null;
    jobs: string | null;
    billing: string | null;
    staff: string | null;
    cuisines: string | null;
  };
}

const initialState: OperatorState = {
  companies: [],
  chefs: [],
  jobs: {
    data: [],
    loading: false,
    error: null,
  },
  cuisines: [],
  billing: null,
  staff: [],
  loading: {
    companies: false,
    chefs: false,
    jobs: false,
    billing: false,
    staff: false,
    cuisines: false,
  },
  error: {
    companies: null,
    chefs: null,
    jobs: null,
    billing: null,
    staff: null,
    cuisines: null,
  },
};

const operatorSlice = createSlice({
  name: "operator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Companies
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading.companies = true;
        state.error.companies = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.loading.companies = false;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading.companies = false;
        state.error.companies = action.error.message || "エラーが発生しました";
      });

    // Chefs
    builder
      .addCase(fetchChefs.pending, (state) => {
        state.loading.chefs = true;
        state.error.chefs = null;
      })
      .addCase(fetchChefs.fulfilled, (state, action) => {
        state.chefs = action.payload;
        state.loading.chefs = false;
      })
      .addCase(fetchChefs.rejected, (state, action) => {
        state.loading.chefs = false;
        state.error.chefs = action.error.message || "エラーが発生しました";
      });

    // Jobs
    builder
      .addCase(fetchOperatorJobs.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
        state.loading.jobs = true;
        state.error.jobs = null;
      })
      .addCase(fetchOperatorJobs.fulfilled, (state, action) => {
        state.jobs.data = action.payload;
        state.jobs.loading = false;
        state.loading.jobs = false;
      })
      .addCase(fetchOperatorJobs.rejected, (state, action) => {
        state.jobs.loading = false;
        state.jobs.error = action.error.message || "エラーが発生しました";
        state.loading.jobs = false;
        state.error.jobs = action.error.message || "エラーが発生しました";
      });

    // Cuisines
    builder
      .addCase(fetchCuisines.pending, (state) => {
        state.loading.cuisines = true;
        state.error.cuisines = null;
      })
      .addCase(fetchCuisines.fulfilled, (state, action) => {
        state.cuisines = action.payload;
        state.loading.cuisines = false;
      })
      .addCase(fetchCuisines.rejected, (state, action) => {
        state.loading.cuisines = false;
        state.error.cuisines = action.error.message || "エラーが発生しました";
      });

    // Billing
    builder
      .addCase(fetchBilling.pending, (state) => {
        state.loading.billing = true;
        state.error.billing = null;
      })
      .addCase(fetchBilling.fulfilled, (state, action) => {
        state.billing = action.payload;
        state.loading.billing = false;
      })
      .addCase(fetchBilling.rejected, (state, action) => {
        state.loading.billing = false;
        state.error.billing = action.error.message || "エラーが発生しました";
      });

    // Staff
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading.staff = true;
        state.error.staff = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.staff = action.payload;
        state.loading.staff = false;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading.staff = false;
        state.error.staff = action.error.message || "エラーが発生しました";
      });
  },
});

export default operatorSlice.reducer;
