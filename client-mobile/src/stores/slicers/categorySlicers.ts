import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../reducers/categoryReducer";
getCategories;

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    isLoading: false,
    fullCategories: [],
  },
  reducers: {
    // get
  },
  extraReducers: {
    [getCategories.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled.type]: (state, { payload }) => {
      state.fullCategories = payload;
      state.isLoading = false;
    },
  },
});

export default categorySlice.reducer;
