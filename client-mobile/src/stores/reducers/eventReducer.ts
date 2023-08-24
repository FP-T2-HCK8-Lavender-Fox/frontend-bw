import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchEvents = createAsyncThunk("events/fetchAll", async (_, thunkAPI) => {
  // resp
  const response = "absurd";
  return response;
});

interface EventsState {
  events: [];
  isLoading: boolean;
}

const eventInitialState = {
  events: [],
  isLoading: false,
} as EventsState;

export const eventSlice = createSlice({
  name: "counter",
  initialState: eventInitialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchEvents.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.events = action.payload;
      }
    );
  },
});
