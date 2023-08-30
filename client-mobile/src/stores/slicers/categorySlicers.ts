import { createSlice } from "@reduxjs/toolkit";
import { getCategories, getSelf, putUser } from "../reducers/categoryReducer";
getCategories;

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    isLoading: false,
    fullCategories: [],
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
  },
  reducers: {
    // get
  },
  extraReducers: {
    [getSelf.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getSelf.fulfilled.type]: (state, { payload }) => {
      state.userSelf = payload;
      state.isLoading = false;
    },
    [getCategories.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled.type]: (state, { payload }) => {
      state.fullCategories = payload;
      state.isLoading = false;
    },
    [putUser.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [putUser.fulfilled.type]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default categorySlice.reducer;
