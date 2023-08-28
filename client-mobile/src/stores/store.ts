import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import eventsSlice from "./slicers/eventSlicers";

export const store = configureStore({
  reducer: {
    events: eventsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
