import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const getEvents = createAsyncThunk("events/getEvents", async () => {
  try {
    const { data } = await api.get("/events");

    return data;
  } catch (error) {
    console.log(error);
  }
});
