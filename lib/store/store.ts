import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantSlice";
import jobReducer from "./jobSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    jobs: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
