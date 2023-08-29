import { createSlice } from "@reduxjs/toolkit";
import {
  getEvents,
  getEventById,
  addEventToUser,
  postPayment,
  getEventsOfUsers,
  getEventOfUserByEventId,
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
      eventsOfUser: [],
      eventOfUserById: {
        dataEvents: {
          UserId: null,
          EventId: null,
          point: null,
          createdAt: null,
          updatedAt: null,
          User: {
            id: null,
            name: null,
            gender: null,
            birthDate: null,
            email: null,
            phoneNumber: null,
            address: null,
            ktpId: null,
            createdAt: null,
            updatedAt: null,
          },
          Event: {
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
            Category: {
              id: 0,
              name: "",
              createdAt: "",
              updatedAt: "",
            },
            Admin: {
              id: 0,
              username: "",
              name: "",
              email: "",
              createdAt: "",
              updatedAt: "",
            },
          },
        },
        checkpointData: [],
        answerQuizData: [],
        leaderboard: null,
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
    [getEventsOfUsers.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getEventsOfUsers.fulfilled.type]: (state, { payload }) => {
      state.events.eventsOfUser = payload;
      state.events.isLoading = false;
    },
    [getEventOfUserByEventId.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getEventOfUserByEventId.fulfilled.type]: (state, { payload }) => {
      state.events.eventOfUserById = payload;
      state.events.isLoading = false;
    },
  },
});

export default eventsSlice.reducer;
