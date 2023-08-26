import { createSlice } from "@reduxjs/toolkit";
import { getEvents } from "../reducers/eventReducer";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: {
      fullEvents: [],
      isLoading: false,
    },
  },
  reducers: {
    // get
  },
  extraReducers: {
    [getEvents.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getEvents.fulfilled.type]: (state, { payload }) => {
      state.events.isLoading = false;
      state.events.fullEvents = payload;
    },
  },
});

export default eventsSlice.reducer;
