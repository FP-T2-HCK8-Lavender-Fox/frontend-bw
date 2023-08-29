import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import * as SecureStore from "expo-secure-store";

export const getEvents = createAsyncThunk("events/getEvents", async () => {
  try {
    const { data } = await api.get("/events");

    return data;
  } catch (error) {
    console.log(error);
  }
});

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
