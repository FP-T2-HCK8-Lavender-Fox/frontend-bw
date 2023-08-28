import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000";

const initialState = {
  loading: false,
  checkpoints: [],
  error: "",
};

export const fetchCheckpointsByEventId = createAsyncThunk(
  "checkpoints/fetchCheckpointsByEventId",
  async (id) => {
    try {
      let options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(baseUrl + "/checkpoints/" + id, options);
      const checkpoints = await response.json();
      return checkpoints;
    } catch (error) {
      return error;
    }
  }
);

const checkpointsSlice = createSlice({
  name: "checkpoints",
  initialState,
  reducers: {
    setMsg(state, action) {
      state.msg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckpointsByEventId.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCheckpointsByEventId.fulfilled, (state, action) => {
        state.loading = false;
        state.checkpoints = action.payload;
      })

      .addCase(fetchCheckpointsByEventId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAdmin, setMsg } = checkpointsSlice.actions;

export default checkpointsSlice.reducer;
