import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRestaurantsByCompanyId, Restaurant } from "@/lib/api/restaurant";

interface RestaurantsState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantsState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const fetchRestaurantsByCompanyId = createAsyncThunk(
  "restaurants/fetchByCompanyId",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const restaurants = await getRestaurantsByCompanyId(companyId);
      return restaurants;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "店舗の取得に失敗しました"
      );
    }
  }
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantsByCompanyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantsByCompanyId.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.loading = false;
      })
      .addCase(fetchRestaurantsByCompanyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "エラーが発生しました";
      });
  },
});

export default restaurantsSlice.reducer;
