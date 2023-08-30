import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import * as SecureStore from "expo-secure-store";

export const getEvents = createAsyncThunk("events/getEvents", async () => {
  try {
    const { data } = await api.get("/events/user");

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getAllEventsByCategoryId = createAsyncThunk(
  "events/getAllEventsByCatId",
  async (catId: number) => {
    try {
      const { data } = await api.get("/events/category", {
        params: {
          catId,
        },
      });

      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEventById = createAsyncThunk(
  "events/getEventsById",
  async (eventId: number) => {
    try {
      const { data } = await api.get(`/events/detail/${eventId}`);

      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postPayment = createAsyncThunk("events/postPayment", async () => {
  try {
    const { data } = await api.post(
      "/payment-token",
      {
        amount: 100000,
      },
      {
        headers: {
          access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addEventToUser = createAsyncThunk(
  "events/postUserEvent",
  async (eventId: number) => {
    try {
      const { data } = await api.post(
        `/users-event/${eventId}`,
        {},
        {
          headers: {
            access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEventsOfUsers = createAsyncThunk(
  "events/getEventsOfUser",
  async () => {
    try {
      const { data } = await api.get("/users-event/users/detail", {
        headers: {
          access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserEventsByCategory = createAsyncThunk(
  "events/userEventsByCategory",
  async (catId: number) => {
    try {
      const { data } = await api.get("/users-event/category", {
        params: {
          catId,
        },
        headers: {
          access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEventOfUserByEventId = createAsyncThunk(
  "events/getEventsOfUserById",
  async (eventId: number) => {
    try {
      const { data } = await api.get(`/users-event/${eventId}`, {
        headers: {
          access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const pushUserAnswer = createAsyncThunk(
  "checkpoints/userAnswer",
  async (answerData: any) => {
    const { answer, checkpointId } = answerData;
    try {
      const { data } = await api.post(
        `/answers/${checkpointId}`,
        {
          answer: answer,
        },
        {
          headers: {
            access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getParticipants = createAsyncThunk(
  "events/userParticipants",
  async (eventId: number) => {
    try {
      const { data }: any = await api.get(`/events/${eventId}`);

      //@ts-ignore
      const participants = data.dataUsers.map((el) => el.User);
      return participants;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFriendList = createAsyncThunk("users/friendList", async () => {
  try {
    const { data }: any = await api.get("/friends/pending", {
      headers: {
        access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
      },
    });

    return data.pendingFriendships;
  } catch (error) {
    console.log(error);
  }
});

export const postFriendship = createAsyncThunk(
  "users/postFriendShip",
  async (friendId: number) => {
    try {
      const { data }: any = await api.post(
        `/friends/${friendId}`,
        {},
        {
          headers: {
            access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFriendToAcceptList = createAsyncThunk(
  "users/friendToAcceptList",
  async () => {
    try {
      const { data }: any = await api.get("/friends/request", {
        headers: {
          access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
        },
      });

      // @ts-ignore
      const dataReturn = data.pendingFriendships.map((el) => el.User);

      return dataReturn;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFriendListOfUser = createAsyncThunk(
  "users/theFriendsOfUser",
  async () => {
    try {
      const { data }: any = await api.get("/friends", {
        headers: {
          access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
        },
      });

      return data.friends;
    } catch (error) {
      console.log(error);
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "users/acceptFriendRequest",
  async (friendId: number) => {
    try {
      const { data }: any = await api.patch(
        `/friends/${friendId}`,
        {},
        {
          headers: {
            access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const rejectFriendRequest = createAsyncThunk(
  "users/rejectFriendRequest",
  async (friendId: number) => {
    try {
      const { data }: any = await api.delete(`/friends/decline/${friendId}`, {
        headers: {
          access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
