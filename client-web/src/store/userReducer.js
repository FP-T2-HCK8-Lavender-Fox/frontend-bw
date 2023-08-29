import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000";

const initialState = {
  loading: false,
  events: [],
  event: {},
  error: "",
  msg: "",
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  try {
    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(baseUrl + "/events", options);
    const events = await response.json();
    return events;
  } catch (error) {
    return error;
  }
});

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id) => {
    try {
      let options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(baseUrl + "/events/" + id, options);
      const event = await response.json();
      return event;
    } catch (error) {
      return error;
    }
  }
);

export const postEvent = createAsyncThunk(
  "events/postEvents",
  async (event) => {
    try {
      let formData = new FormData();
      for (const key in event) {
        formData.append(`${key}`, event[key]);
      }

      let options = {
        method: "post",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        body: formData,
      };
      const response = await fetch(baseUrl + "/events", options);
      const res = await response.json();
      console.log(res);
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

export const editEventById = createAsyncThunk(
  "events/editEventById",
  async (event) => {
    try {
      let options = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(event),
      };
      const response = await fetch(baseUrl + "/events/" + event.id, options);
      const res = await response.json();
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

export const deleteEventById = createAsyncThunk(
  "events/deleteEventById",
  async (id) => {
    try {
      let options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      };
      const response = await fetch(baseUrl + "/events/" + id, options);
      const res = await response.json();
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setMsgEvent(state, action) {
      state.msg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })

      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.event = action.payload;
        state.loading = false;
      })

      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(postEvent.pending, (state) => {
        state.loading = true;
      })

      .addCase(postEvent.fulfilled, (state, action) => {
        state.msg = action.payload;
        state.loading = false;
      })

      .addCase(postEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editEventById.pending, (state) => {
        state.loading = true;
      })

      .addCase(editEventById.fulfilled, (state, action) => {
        state.msg = action.payload;
        state.loading = false;
      })

      .addCase(editEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteEventById.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteEventById.fulfilled, (state, action) => {
        state.msg = action.payload;
        state.loading = false;
      })

      .addCase(deleteEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMsgEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
