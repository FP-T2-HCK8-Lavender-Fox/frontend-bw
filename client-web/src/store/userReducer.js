import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000";

const initialState = {
  loading: false,
  users: [],
  error: "",
  msg: "",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    };
    const response = await fetch(baseUrl + "/users", options);
    const users = await response.json();
    return users;
  } catch (error) {
    return error;
  }
});

export const deleteUserById = createAsyncThunk(
  "users/deleteUserById",
  async (id) => {
    try {
      let options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      };
      const response = await fetch(baseUrl + "/users/" + id, options);
      const res = await response.json();
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

const usersSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setMsgUser(state, action) {
      state.msg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.msg = action.payload;
        state.loading = false;
      })

      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMsgUser } = usersSlice.actions;

export default usersSlice.reducer;
