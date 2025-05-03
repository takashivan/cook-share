import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { operatorApi } from "@/lib/api/operator";
import { getAllChefs, UserProfile } from "@/lib/api/user";
import { getAllJobs } from "@/lib/api/job";
import { getCuisines } from "@/lib/api/cuisines";
import { getSkills } from "@/lib/api/skill";
import { getRestaurants, Restaurant } from "@/lib/api/restaurant";
import { JobWithRestaurant } from "@/types";
// Async Thunks
export const fetchCompanies = createAsyncThunk(
  "operator/fetchCompanies",
  async () => {
    const response = await operatorApi.getCompanies();
    return response;
  }
);

export const fetchChefs = createAsyncThunk(
  "operator/fetchChefs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await operatorApi.getChefs();
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCuisines = createAsyncThunk(
  "operator/fetchCuisines",
  async () => {
    const response = await getCuisines();
    return response;
  }
);

export const fetchOperatorJobs = createAsyncThunk(
  "operator/fetchJobs",
  async () => {
    const response = await getAllJobs();
    return response;
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

export const fetchSkills = createAsyncThunk(
  "operator/fetchSkills",
  async () => {
    const response = await getSkills();
    return response;
  }
);

export const banChef = createAsyncThunk(
  "operator/banChef",
  async (
    { id, reason }: { id: string; reason: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await operatorApi.banChef(id, reason);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const approveChef = createAsyncThunk(
  "operator/approveChef",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await operatorApi.approveChef(id);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchRestaurants = createAsyncThunk<
  Restaurant[],
  void,
  { rejectValue: string }
>("operator/fetchRestaurants", async (_, { rejectWithValue }) => {
  try {
    const response = await getRestaurants();
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const banRestaurant = createAsyncThunk(
  "operator/banRestaurant",
  async (
    { id, reason }: { id: string; reason: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await operatorApi.banRestaurant(id, reason);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const approveRestaurant = createAsyncThunk(
  "operator/approveRestaurant",
  async (
    { id, reason }: { id: string; reason: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await operatorApi.approveRestaurant(id, reason);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const banJob = createAsyncThunk(
  "operator/banJob",
  async ({ id, reason }: { id: number; reason: string }) => {
    const response = await operatorApi.banJob(id, reason);
    return response;
  }
);

export const approveJob = createAsyncThunk(
  "operator/approveJob",
  async ({ id, reason }: { id: number; reason: string }) => {
    const response = await operatorApi.approveJob(id, reason);
    return response;
  }
);

export const fetchOperatorAlerts = createAsyncThunk(
  "operator/fetchAlerts",
  async () => {
    const response = await operatorApi.getAlert();
    return response;
  }
);

interface Alert {
  id: number;
  created_at: number;
  message: string;
  job_id: number;
  messages: string;
  json: string;
  status: string;
}

interface OperatorState {
  companies: any[];
  chefs: {
    data: UserProfile[];
    loading: boolean;
    error: string | null;
  };
  cuisines: any[];
  skills: any[];
  jobs: {
    data: JobWithRestaurant[];
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
    skills: boolean;
  };
  error: {
    companies: string | null;
    chefs: string | null;
    jobs: string | null;
    billing: string | null;
    staff: string | null;
    cuisines: string | null;
    skills: string | null;
  };
  restaurants: {
    data: Restaurant[];
    loading: boolean;
    error: string | null;
  };
  alerts: {
    data: Alert[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: OperatorState = {
  companies: [],
  chefs: {
    data: [],
    loading: false,
    error: null,
  },
  jobs: {
    data: [],
    loading: false,
    error: null,
  },
  cuisines: [],
  skills: [],
  billing: null,
  staff: [],
  loading: {
    companies: false,
    chefs: false,
    jobs: false,
    billing: false,
    staff: false,
    cuisines: false,
    skills: false,
  },
  error: {
    companies: null,
    chefs: null,
    jobs: null,
    billing: null,
    staff: null,
    cuisines: null,
    skills: null,
  },
  restaurants: {
    data: [],
    loading: false,
    error: null,
  },
  alerts: {
    data: [],
    loading: false,
    error: null,
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
        state.chefs.loading = true;
        state.chefs.error = null;
      })
      .addCase(fetchChefs.fulfilled, (state, action) => {
        state.chefs.loading = false;
        state.chefs.data = action.payload;
      })
      .addCase(fetchChefs.rejected, (state, action) => {
        state.chefs.loading = false;
        state.chefs.error = action.payload as string;
      });

    // Jobs
    builder
      .addCase(fetchOperatorJobs.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
      })
      .addCase(fetchOperatorJobs.fulfilled, (state, action) => {
        state.jobs.data = action.payload;
        state.jobs.loading = false;
      })
      .addCase(fetchOperatorJobs.rejected, (state, action) => {
        state.jobs.loading = false;
        state.jobs.error = action.error.message || "Failed to fetch jobs";
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

    // Skills
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading.skills = true;
        state.error.skills = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
        state.loading.skills = false;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading.skills = false;
        state.error.skills = action.error.message || "エラーが発生しました";
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

    // Ban Chef
    builder
      .addCase(banChef.pending, (state) => {
        state.chefs.loading = true;
        state.chefs.error = null;
      })
      .addCase(banChef.fulfilled, (state) => {
        state.chefs.loading = false;
      })
      .addCase(banChef.rejected, (state, action) => {
        state.chefs.loading = false;
        state.chefs.error = action.payload as string;
      });

    // Approve Chef
    builder
      .addCase(approveChef.pending, (state) => {
        state.chefs.loading = true;
        state.chefs.error = null;
      })
      .addCase(approveChef.fulfilled, (state) => {
        state.chefs.loading = false;
      })
      .addCase(approveChef.rejected, (state, action) => {
        state.chefs.loading = false;
        state.chefs.error = action.payload as string;
      });

    // Fetch Restaurants
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.restaurants.loading = true;
        state.restaurants.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants.loading = false;
        state.restaurants.data = action.payload as Restaurant[];
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.restaurants.loading = false;
        state.restaurants.error = action.payload as string;
      });

    // Ban Restaurant
    builder
      .addCase(banRestaurant.pending, (state) => {
        state.restaurants.loading = true;
        state.restaurants.error = null;
      })
      .addCase(banRestaurant.fulfilled, (state) => {
        state.restaurants.loading = false;
      })
      .addCase(banRestaurant.rejected, (state, action) => {
        state.restaurants.loading = false;
        state.restaurants.error = action.payload as string;
      });

    // Approve Restaurant
    builder
      .addCase(approveRestaurant.pending, (state) => {
        state.restaurants.loading = true;
        state.restaurants.error = null;
      })
      .addCase(approveRestaurant.fulfilled, (state) => {
        state.restaurants.loading = false;
      })
      .addCase(approveRestaurant.rejected, (state, action) => {
        state.restaurants.loading = false;
        state.restaurants.error = action.payload as string;
      });

    // Ban Job
    builder
      .addCase(banJob.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
      })
      .addCase(banJob.fulfilled, (state) => {
        state.jobs.loading = false;
      })
      .addCase(banJob.rejected, (state, action) => {
        state.jobs.loading = false;
        state.jobs.error = action.payload as string;
      });

    // Approve Job
    builder
      .addCase(approveJob.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
      })
      .addCase(approveJob.fulfilled, (state) => {
        state.jobs.loading = false;
      })
      .addCase(approveJob.rejected, (state, action) => {
        state.jobs.loading = false;
        state.jobs.error = action.payload as string;
      });

    // Fetch Alerts
    builder
      .addCase(fetchOperatorAlerts.pending, (state) => {
        state.alerts.loading = true;
        state.alerts.error = null;
      })
      .addCase(fetchOperatorAlerts.fulfilled, (state, action) => {
        state.alerts.loading = false;
        state.alerts.data = action.payload;
      })
      .addCase(fetchOperatorAlerts.rejected, (state, action) => {
        state.alerts.loading = false;
        state.alerts.error = action.error.message || "Failed to fetch alerts";
      });
  },
});

export default operatorSlice.reducer;
