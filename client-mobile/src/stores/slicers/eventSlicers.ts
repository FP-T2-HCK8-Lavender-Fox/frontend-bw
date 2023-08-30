import { createSlice } from "@reduxjs/toolkit";
import {
  getEvents,
  getEventById,
  addEventToUser,
  postPayment,
  getEventsOfUsers,
  getEventOfUserByEventId,
  pushUserAnswer,
  getParticipants,
  getFriendList,
  getSelf,
  postFriendship,
  getFriendToAcceptList,
  getFriendListOfUser,
  acceptFriendRequest,
  rejectFriendRequest,
  getAllEventsByCategoryId,
  getInactiveUserEvents,
  getUserEventsByCategory,
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
      eventParticipants: [],
      friendList: [],
      userSelf: {
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
      userNeedAccept: [],
      allUserFriendIs: [],
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
    [pushUserAnswer.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [pushUserAnswer.fulfilled.type]: (state, action) => {
      state.events.isLoading = false;
    },
    [getParticipants.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getParticipants.fulfilled.type]: (state, { payload }) => {
      state.events.eventParticipants = payload;
      state.events.isLoading = false;
    },
    [getFriendList.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getFriendList.fulfilled.type]: (state, { payload }) => {
      state.events.friendList = payload;
      state.events.isLoading = false;
    },
    [getSelf.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getSelf.fulfilled.type]: (state, { payload }) => {
      state.events.userSelf = payload;
      state.events.isLoading = false;
    },
    [getFriendToAcceptList.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getFriendToAcceptList.fulfilled.type]: (state, { payload }) => {
      state.events.userNeedAccept = payload;
      state.events.isLoading = false;
    },
    [getFriendListOfUser.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getFriendListOfUser.fulfilled.type]: (state, { payload }) => {
      state.events.allUserFriendIs = payload;
      state.events.isLoading = false;
    },
    [acceptFriendRequest.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [acceptFriendRequest.fulfilled.type]: (state, action) => {
      state.events.isLoading = false;
    },
    [rejectFriendRequest.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [rejectFriendRequest.fulfilled.type]: (state, action) => {
      state.events.isLoading = false;
    },
    [getAllEventsByCategoryId.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getAllEventsByCategoryId.fulfilled.type]: (state, { payload }) => {
      state.events.fullEvents = payload;
      state.events.isLoading = false;
    },
    [getUserEventsByCategory.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getUserEventsByCategory.fulfilled.type]: (state, { payload }) => {
      state.events.eventsOfUser = payload;
      state.events.isLoading = false;
    },
    [getInactiveUserEvents.pending.type]: (state, action) => {
      state.events.isLoading = true;
    },
    [getInactiveUserEvents.fulfilled.type]: (state, action) => {
      state.events.isLoading = false;
    },
  },
});

export default eventsSlice.reducer;
