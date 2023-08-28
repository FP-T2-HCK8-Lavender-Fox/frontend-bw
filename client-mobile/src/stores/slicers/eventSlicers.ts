import { createSlice } from "@reduxjs/toolkit";
import {
  getEvents,
  getEventById,
  addEventToUser,
  postPayment,
} from "../reducers/eventReducer";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: {
      fullEvents: [],
      eventById: {
        id: null,
        name: null,
        startDate: "",
        endDate: "",
        active: null,
        description: null,
        amount: null,
        address: null,
        lat: null,
        long: null,
        pics: undefined,
        CategoryId: null,
        AdminId: null,
        createdAt: null,
        updatedAt: null,
        Admin: null,
        Category: null,
      },
      paymentUri: {
        token: "",
        redirect_url: "",
      },
      isLoading: false,
      isError: false,
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
    [getEventById.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getEventById.fulfilled.type]: (state, { payload }) => {
      state.events.isLoading = false;
      state.events.eventById = payload;
    },
    [postPayment.fulfilled.type]: (state, { payload }) => {
      state.events.paymentUri = payload;
    },
    [addEventToUser.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [addEventToUser.fulfilled.type]: (state, action) => {
      state.events.isLoading = false;
    },
  },
});

export default eventsSlice.reducer;
