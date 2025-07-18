import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { operatorApi } from "@/lib/api/operator";
import { getApi } from "@/api/api-factory";
import { CompaniesDetailData, CompaniesListData, RestaurantCuisinesListData } from "@/api/__generated__/base/data-contracts";
import { Companies } from "@/api/__generated__/operator/Companies";
import { RestaurantsDetailData, RestaurantsListData, UsersListData, CompaniesDetailData as CompaniesDetailDataDorOperator, JobsListData, ChefReviewsListData, RestaurantReviewsListData, OperatorsListData, BillingSummariesListData } from "@/api/__generated__/operator/data-contracts";
import { Users } from "@/api/__generated__/operator/Users";
import { Operator } from "@/api/__generated__/operator/Operator";
import { Restaurants } from "@/api/__generated__/operator/Restaurants";
import { RestaurantCuisines } from "@/api/__generated__/base/RestaurantCuisines";
import { Jobs } from "@/api/__generated__/operator/Jobs";
import { ChefReviews } from "@/api/__generated__/operator/ChefReviews";
import { RestaurantReviews } from "@/api/__generated__/operator/RestaurantReviews";
import { Operators } from "@/api/__generated__/operator/Operators";
import { BillingSummaries } from "@/api/__generated__/operator/BillingSummaries";

// ダッシュボード
export const fetchDashboardQuery = createAsyncThunk(
  "operator/fetchDashboardQuery",
  async () => {
    const response = await operatorApi.getDashboardQuery();
    return response;
  }
);

// 会社一覧
// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
type CompaniesListResponse = CompaniesListData[number] & {
  restaurantCount: number;
  jobCount: number;
  worksessionCount: number;
  worksessionCanceledByRestaurantCount: number;
};
export const fetchCompanies = createAsyncThunk(
  "operator/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const companiesApi = getApi(Companies);
      const response = await companiesApi.companiesList({
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data as CompaniesListResponse[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// 会社詳細
// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
type CompanyDetailResponse = Omit<CompaniesDetailDataDorOperator, "restaurants"> & {
  restaurants: Array<CompaniesDetailDataDorOperator["restaurants"][number] & {
    companyUserCount: number;
    jobCount: number;
    worksessionCount: number;
    worksessionCanceledByRestaurantCount: number;
    rating: number;
  }>;
};

export const fetchCompanyDetail = createAsyncThunk(
  "operator/fetchCompanyDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const companiesApi = getApi(Companies);
      const response = await companiesApi.companiesDetail(id, {
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data as CompanyDetailResponse;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// レストラン一覧
// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
export type RestaurantsListResponse = RestaurantsListData[number] & {
  company: CompaniesDetailData;
  companyUserCount: number;
  jobCount: number;
  worksessionCount: number;
  worksessionCanceledByRestaurantCount: number;
  rating: number;
};
export const fetchRestaurants = createAsyncThunk(
  "operator/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const restaurantsApi = getApi(Restaurants);
      const response = await restaurantsApi.restaurantsList({
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data as RestaurantsListResponse[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// レストラン詳細
export const fetchRestaurantDetail = createAsyncThunk(
  "operator/fetchRestaurant",
  async (id: number, { rejectWithValue }) => {
    try {
      const restaurantsApi = getApi(Restaurants);
      const response = await restaurantsApi.restaurantsDetail(id, {
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// レストランのBAN
export const banRestaurant = createAsyncThunk(
  "operator/banRestaurant",
  async (
    { id, reason }: { id: number; reason: string },
    { rejectWithValue }
  ) => {
    try {
      const operatorApi = getApi(Operator);
      const response = await operatorApi.restaurantsBanPartialUpdate(id, {
        reason
      }, {
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// レストランの承認
export const approveRestaurant = createAsyncThunk(
  "operator/approveRestaurant",
  async (
    { id, reason }: { id: number; reason: string },
    { rejectWithValue }
  ) => {
    try {
      const operatorApi = getApi(Operator);
      const response = await operatorApi.restaurantsApprovePartialUpdate(id, {
        reason
      }, {
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// 求人一覧
// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
export type JobsListResponse = JobsListData[number] & {
  adminlogs: RestaurantsDetailData["adminlogs"];
};
export const fetchOperatorJobs = createAsyncThunk(
  "operator/fetchJobs",
  async () => {
    const jobsApi = getApi(Jobs);
    const response = await jobsApi.jobsList({
      headers: {
        "X-User-Type": "operator",
      }
    });
    return response.data as JobsListResponse[];
  }
);

// 求人のBAN
export const banJob = createAsyncThunk(
  "operator/banJob",
  async ({ id, reason }: { id: number; reason: string }) => {
    const operatorApi = getApi(Operator);
    const response = await operatorApi.jobsBanPartialUpdate(id, {
      reason
    }, {
      headers: {
        "X-User-Type": "operator",
      }
    });
    return response.data;
  }
);

// 求人の承認
export const approveJob = createAsyncThunk(
  "operator/approveJob",
  async ({ id, reason }: { id: number; reason: string }) => {
  const operatorApi = getApi(Operator);
    const response = await operatorApi.jobsApprovePartialUpdate(id, {
      reason
    }, {
      headers: {
        "X-User-Type": "operator",
      }
    });
    return response.data;
  }
);

// シェフ一覧
// XANOから生成されるSwaggerの定義が不完全なため、レスポンスの型を手動で定義する
export type UsersListResponse = UsersListData[number] & {
  worksessionCount: number;
  worksessionCanceledByChefCount: number;
  rating: number;
  adminlogs: RestaurantsDetailData["adminlogs"];
};
export const fetchChefs = createAsyncThunk(
  "operator/fetchChefs",
  async (_, { rejectWithValue }) => {
    try {
      const usersApi = getApi(Users);
      const response = await usersApi.usersList({
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data as UsersListResponse[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// シェフのBAN
export const banChef = createAsyncThunk(
  "operator/banChef",
  async (
    { id, reason }: { id: string; reason: string },
    { rejectWithValue }
  ) => {
    try {
      const operatorApi = getApi(Operator);
      const response = await operatorApi.usersBanPartialUpdate(id, {
        reason
      }, {
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// シェフの承認
export const approveChef = createAsyncThunk(
  "operator/approveChef",
  async (
    { id, reason }: { id: string; reason: string },
    { rejectWithValue }
  ) => {
    try {
      const operatorApi = getApi(Operator);
      const response = await operatorApi.usersApprovePartialUpdate(id, {
        reason
      },{
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// シェフレビュー一覧
export const fetchChefReviews = createAsyncThunk(
  "operator/fetchChefReviews",
  async (_, { rejectWithValue }) => {
    try {
      const chefReviewsApi = getApi(ChefReviews);
      const response = await chefReviewsApi.chefReviewsList({
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// レストランレビュー一覧
export const fetchRestaurantReviews = createAsyncThunk(
  "operator/fetchRestaurantReviews",
  async (_, { rejectWithValue }) => {
    try {
      const restaurantReviewsApi = getApi(RestaurantReviews);
      const response = await restaurantReviewsApi.restaurantReviewsList({
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// 請求一覧
export const fetchBillings = createAsyncThunk(
  "operator/fetchBillings",
  async () => {
    const billingsApi = getApi(BillingSummaries);
    const response = await billingsApi.billingSummariesList({
      headers: {
        "X-User-Type": "operator",
      }
    });
    return response.data;
  }
);

// ジャンル一覧
export const fetchCuisines = createAsyncThunk(
  "operator/fetchCuisines",
  async () => {
    const restaurantCuisinesApi = getApi(RestaurantCuisines);
    const response = await restaurantCuisinesApi.restaurantCuisinesList();
    return response.data;
  }
);

// 運営管理者一覧
export const fetchOperators = createAsyncThunk(
  "operator/fetchOperators",
  async () => {
    const operatorsApi = getApi(Operators);
    const response = await operatorsApi.operatorsList({
      headers: {
        "X-User-Type": "operator",
      }
    });
    return response.data;
  }
);

// 運営管理者の作成
export const createOperator = createAsyncThunk(
  "operator/createOperator",
  async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const operatorsApi = getApi(Operators);
      const response = await operatorsApi.operatorsCreate({
        name: data.name,
        email: data.email,
        password: data.password,
      }, {
        headers: {
          "X-User-Type": "operator",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// 運営管理者の削除
export const deleteOperator = createAsyncThunk(
  "operator/deleteOperator",
  async (id: string, { rejectWithValue }) => {
    try {
      const operatorsApi = getApi(Operators);
      await operatorsApi.operatorsDelete(id, {
        headers: {
          "X-User-Type": "operator",
        }
      });
      return id; // Return the ID of the deleted operator
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface DashboardQuery {
  total_users_count: number;
  verified_users_count: number;
  profile_completed_users_count: number;
  active_user_count: number;
  total_fee: number;
  filled_jobs: number;
  total_restaurants: number;
  new_restaurants: number;
  total_chefs: number;
  new_chefs: number;
  total_jobs: number;
  new_jobs: number;
}

interface OperatorState {
  dashboardQuery: {
    data: DashboardQuery | null;
    loading: boolean;
    error: string | null;
  };
  companies: {
    data: CompaniesListResponse[],
    loading: boolean;
    error: string | null;
  };
  companyDetail: {
    data: CompanyDetailResponse | null,
    loading: boolean;
    error: string | null;
  };
  restaurants: {
    data: RestaurantsListResponse[];
    loading: boolean;
    error: string | null;
  };
  restaurantDetail: {
    data: RestaurantsDetailData | null;
    loading: boolean;
    error: string | null;
  };
  jobs: {
    data: JobsListResponse[];
    loading: boolean;
    error: string | null;
  };
  chefs: {
    data: UsersListResponse[];
    loading: boolean;
    error: string | null;
  };
  chefReviews: {
    data: ChefReviewsListData;
    loading: boolean;
    error: string | null;
  };
  restaurantReviews: {
    data: RestaurantReviewsListData;
    loading: boolean;
    error: string | null;
  };
  cuisines: {
    data: RestaurantCuisinesListData;
    loading: boolean;
    error: string | null;
  };
  billingSummaries: {
    data: BillingSummariesListData;
    loading: boolean;
    error: string | null;
  };
  operators: {
    data: OperatorsListData;
    loading: boolean;
    error: string | null;
  };
}

const initialState: OperatorState = {
  dashboardQuery: {
    data: null,
    loading: false,
    error: null,
  },
  companies: {
    data: [],
    loading: false,
    error: null,
  },
  companyDetail: {
    data: null,
    loading: false,
    error: null,
  },
  restaurants: {
    data: [],
    loading: false,
    error: null,
  },
  restaurantDetail: {
    data: null,
    loading: false,
    error: null,
  },
  jobs: {
    data: [],
    loading: false,
    error: null,
  },
  chefs: {
    data: [],
    loading: false,
    error: null,
  },
  chefReviews: {
    data: [],
    loading: false,
    error: null,
  },
  restaurantReviews: {
    data: [],
    loading: false,
    error: null,
  },
  cuisines: {
    data: [],
    loading: false,
    error: null,
  },
  billingSummaries: {
    data: [],
    loading: false,
    error: null,
  },
  operators: {
    data: [],
    loading: false,
    error: null,
  }
};

const operatorSlice = createSlice({
  name: "operator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Dashboard Query
    builder
      .addCase(fetchDashboardQuery.pending, (state) => {
        state.dashboardQuery.loading = true;
        state.dashboardQuery.error = null;
      })
      .addCase(fetchDashboardQuery.fulfilled, (state, action) => {
        state.dashboardQuery.loading = false;
        state.dashboardQuery.data = action.payload;
      })
      .addCase(fetchDashboardQuery.rejected, (state, action) => {
        state.dashboardQuery.loading = false;
        state.dashboardQuery.error =
          action.error.message || "Failed to fetch dashboard query";
      });

    // Companies
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.companies.loading = true;
        state.companies.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies.data = action.payload;
        state.companies.loading = false;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.companies.loading = false;
        state.companies.error = action.error.message || "エラーが発生しました";
      });

    // Company Detail
    builder
      .addCase(fetchCompanyDetail.pending, (state) => {
        state.companyDetail.loading = true;
        state.companyDetail.error = null;
      })
      .addCase(fetchCompanyDetail.fulfilled, (state, action) => {
        state.companyDetail.data = action.payload;
        state.companyDetail.loading = false;
      })
      .addCase(fetchCompanyDetail.rejected, (state, action) => {
        state.companyDetail.loading = false;
        state.companyDetail.error = action.error.message || "エラーが発生しました";
      });

    // Fetch Restaurants
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.restaurants.loading = true;
        state.restaurants.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants.loading = false;
        state.restaurants.data = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.restaurants.loading = false;
        state.restaurants.error = action.payload as string;
      });
    
    // Fetch Restaurant Detail
    builder
      .addCase(fetchRestaurantDetail.pending, (state) => {
        state.restaurantDetail.loading = true;
        state.restaurantDetail.error = null;
      })
      .addCase(fetchRestaurantDetail.fulfilled, (state, action) => {
        state.restaurantDetail.loading = false;
        state.restaurantDetail.data = action.payload;
      })
      .addCase(fetchRestaurantDetail.rejected, (state, action) => {
        state.restaurantDetail.loading = false;
        state.restaurantDetail.error = action.payload as string;
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

    // Chef Reviews
    builder
      .addCase(fetchChefReviews.pending, (state) => {
        state.chefReviews.loading = true;
        state.chefReviews.error = null;
      })
      .addCase(fetchChefReviews.fulfilled, (state, action) => {
        state.chefReviews.data = action.payload;
        state.chefReviews.loading = false;
      })
      .addCase(fetchChefReviews.rejected, (state, action) => {
        state.chefReviews.loading = false;
        state.chefReviews.error = action.error.message || "Failed to fetch chef reviews";
      });

    // Restaurant Reviews
    builder
      .addCase(fetchRestaurantReviews.pending, (state) => {
        state.restaurantReviews.loading = true;
        state.restaurantReviews.error = null;
      })
      .addCase(fetchRestaurantReviews.fulfilled, (state, action) => {
        state.restaurantReviews.data = action.payload;
        state.restaurantReviews.loading = false;
      })
      .addCase(fetchRestaurantReviews.rejected, (state, action) => {
        state.restaurantReviews.loading = false;
        state.restaurantReviews.error = action.error.message || "Failed to fetch restaurant reviews";
      });

    // Cuisines
    builder
      .addCase(fetchCuisines.pending, (state) => {
        state.cuisines.loading = true;
        state.cuisines.error = null;
      })
      .addCase(fetchCuisines.fulfilled, (state, action) => {
        state.cuisines.data = action.payload;
        state.cuisines.loading = false;
      })
      .addCase(fetchCuisines.rejected, (state, action) => {
        state.cuisines.loading = false;
        state.cuisines.error = action.error.message || "エラーが発生しました";
      });

    // Billing Summaries
    builder
      .addCase(fetchBillings.pending, (state) => {
        state.billingSummaries.loading = true;
        state.billingSummaries.error = null;
      })
      .addCase(fetchBillings.fulfilled, (state, action) => {
        state.billingSummaries.data = action.payload;
        state.billingSummaries.loading = false;
      })
      .addCase(fetchBillings.rejected, (state, action) => {
        state.billingSummaries.loading = false;
        state.billingSummaries.error = action.error.message || "Failed to fetch billing summaries";
      });

    // Fetch Operators
    builder
      .addCase(fetchOperators.pending, (state) => {
        state.operators.loading = true;
        state.operators.error = null;
      })
      .addCase(fetchOperators.fulfilled, (state, action) => {
        state.operators.data = action.payload;
        state.operators.loading = false;
      })
      .addCase(fetchOperators.rejected, (state, action) => {
        state.operators.loading = false;
        state.operators.error = action.error.message || "Failed to fetch operators";
      });

    // Create Operator
    builder
      .addCase(createOperator.pending, (state) => {
        state.operators.loading = true;
        state.operators.error = null;
      })
      .addCase(createOperator.fulfilled, (state, action) => {
        state.operators.data.push(action.payload);
        state.operators.loading = false;
      })
      .addCase(createOperator.rejected, (state, action) => {
        state.operators.loading = false;
        state.operators.error = action.error.message || "Failed to create operator";
      });

    // Delete Operator
    builder
      .addCase(deleteOperator.pending, (state) => {
        state.operators.loading = true;
        state.operators.error = null;
      })
      .addCase(deleteOperator.fulfilled, (state, action) => {
        state.operators.data = state.operators.data.filter(operator => operator.id !== action.payload);
        state.operators.loading = false;
      })
      .addCase(deleteOperator.rejected, (state, action) => {
        state.operators.loading = false;
        state.operators.error = action.error.message || "Failed to delete operator";
      });
  },
});

export default operatorSlice.reducer;
