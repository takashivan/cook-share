import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobsSlice";
import restaurantsReducer from "./slices/restaurantsSlice";
import companyJobsReducer from "./slices/companyJobsSlice";
import operatorReducer from "./slices/operatorSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    restaurants: restaurantsReducer,
    companyJobs: companyJobsReducer,
    operator: operatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
