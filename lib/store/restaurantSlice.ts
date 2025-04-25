import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Restaurant } from "@/lib/api/restaurant";
import { getMyRestaurants } from "@/lib/api/companyUser";

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

export const fetchMyRestaurants = createAsyncThunk(
  "restaurants/fetchByCompanyId",
  async (companyuser_id: string) => {
    const response = await getMyRestaurants(companyuser_id);
    return response;
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchMyRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "レストランの取得に失敗しました";
      });
  },
});

export default restaurantSlice.reducer;
