import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import * as SecureStore from "expo-secure-store";

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

export const putUser = createAsyncThunk(
  "events/putUsers",
  async (userData: any) => {
    try {
      let [month, day, year] = userData.birthDate.split("/");
      const dateObj = new Date(+year, +month - 1, +day);
      const { data } = await api.put(`/users/${userData.id}`, {
        name: userData.name,
        gender: userData.gender,
        birthDate: dateObj,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        ktpId: userData.ktpId,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSelf = createAsyncThunk("users/self", async () => {
  try {
    const { data }: any = await api.get("/users/detail", {
      headers: {
        access_token: await SecureStore.getItemAsync("ACCESS_TOKEN"),
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getInactiveUserEvents = createAsyncThunk(
  "events/inactiveUserEvents",
  async () => {
    try {
      const { data } = await api.get("/user-event/inactive", {
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
