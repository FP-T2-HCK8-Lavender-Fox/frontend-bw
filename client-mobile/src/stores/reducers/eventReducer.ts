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
      const { data } = await api.get(`/events/${eventId}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addEventToUser = createAsyncThunk(
  "events/postUserEvent",
  async (eventId: number) => {
    try {
      const { data } = await api.post(
        `/user-event/${eventId}`,
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
