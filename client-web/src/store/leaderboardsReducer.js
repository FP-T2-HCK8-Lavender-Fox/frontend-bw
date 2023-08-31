import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "https://c3d6-103-3-221-239.ngrok-free.app";
// const baseUrl = "http://localhost:3000";

const initialState = {
  leaderboardLoading: false,
  leaderboards: [],
  leaderboard: {},
  leaderboardError: "",
  leaderboardMsg: "",
};

export const fetchLeaderboards = createAsyncThunk(
  "leaderboards/fetchLeaderboards",
  async (id) => {
    try {
      let options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "tes",
        },
      };
      const response = await fetch(baseUrl + "/leaderboards", options);
      let leaderboards = await response.json();
      leaderboards = leaderboards.filter((el) => el.EventId === Number(id));
      return leaderboards;
    } catch (error) {
      return error;
    }
  }
);

export const fetchLeaderboardById = createAsyncThunk(
  "leaderboards/fetchLeaderboardById",
  async (id) => {
    try {
      let options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "tes",
        },
      };
      const response = await fetch(baseUrl + "/leaderboards/" + id, options);
      const leaderboard = await response.json();
      return leaderboard;
    } catch (error) {
      return error;
    }
  }
);

export const postLeaderboard = createAsyncThunk(
  "leaderboards/postLeaderboards",
  async (data) => {
    try {
      let temp = [];
      for (const i in data) {
        let options = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
            "ngrok-skip-browser-warning": "tes",
          },
          body: JSON.stringify(data[i]),
        };
        const response = await fetch(
          baseUrl + "/leaderboards/" + data[i].EventId,
          options
        );
        const res = await response.json();
        temp.push(res.message);
      }
      return temp;
    } catch (error) {
      return error;
    }
  }
);

export const deleteLeaderboardById = createAsyncThunk(
  "leaderboards/deleteLeaderboardById",
  async (data) => {
    try {
      let temp = [];
      for (const i in data) {
        let options = {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
            "ngrok-skip-browser-warning": "tes",
          },
        };
        const response = await fetch(
          baseUrl + "/leaderboards/" + data[i].id,
          options
        );
        const res = await response.json();
        temp.push(res.message);
      }
      return temp;
    } catch (error) {
      return error;
    }
  }
);

const leaderboardsSlice = createSlice({
  name: "leaderboards",
  initialState,
  reducers: {
    setMsgLeaderboard(state, action) {
      state.msg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.leaderboardLoading = true;
      })

      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.leaderboards = action.payload;
        state.leaderboardLoading = false;
      })

      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.error.message;
      })

      .addCase(fetchLeaderboardById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchLeaderboardById.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
        state.leaderboardLoading = false;
      })

      .addCase(fetchLeaderboardById.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.error.message;
      })

      .addCase(postLeaderboard.pending, (state) => {
        state.leaderboardLoading = true;
      })

      .addCase(postLeaderboard.fulfilled, (state, action) => {
        state.leaderboardMsg = action.payload;
        state.leaderboardLoading = false;
      })

      .addCase(postLeaderboard.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.error.message;
      })

      .addCase(deleteLeaderboardById.pending, (state) => {
        state.leaderboardLoading = true;
      })

      .addCase(deleteLeaderboardById.fulfilled, (state, action) => {
        state.leaderboardMsg = action.payload;
        state.leaderboardLoading = false;
      })

      .addCase(deleteLeaderboardById.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.error.message;
      });
  },
});

export const { setMsgLeaderboard } = leaderboardsSlice.actions;

export default leaderboardsSlice.reducer;
