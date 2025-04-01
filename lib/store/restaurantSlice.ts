import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Restaurant } from "@/lib/api/restaurant";
import { getRestaurantsByCompanyId } from "@/lib/api/restaurant";

interface RestaurantState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const fetchRestaurantsByCompanyId = createAsyncThunk(
  "restaurants/fetchByCompanyId",
  async (companyId: string) => {
    const response = await getRestaurantsByCompanyId(companyId);
    return response;
  }
);

const restaurantSlice = createSlice({
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
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurantsByCompanyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "レストランの取得に失敗しました";
      });
  },
});

export default restaurantSlice.reducer;
