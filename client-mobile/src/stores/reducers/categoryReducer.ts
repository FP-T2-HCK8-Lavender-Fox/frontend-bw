import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const getCategories = createAsyncThunk(
  "events/allCategories",
  async () => {
    try {
      const { data } = await api.get("/categories");

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
