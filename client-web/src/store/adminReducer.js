import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const baseUrl = "";
const baseUrl = "http://localhost:3000";

const initialState = {
  loading: false,
  admins: [],
  error: "",
  msg: "",
};

export const fetchAdmins = createAsyncThunk("admins/fetchAdmins", async () => {
  try {
    let options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    };
    const response = await fetch(baseUrl + "/admin", options);
    const admins = await response.json();
    return admins;
  } catch (error) {
    return error;
  }
});

export const postAdmin = createAsyncThunk(
  "admins/postAdmins",
  async (admin) => {
    try {
      let options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      };
      const response = await fetch(baseUrl + "/admin/register", options);
      const res = await response.json();
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

export const editAdminById = createAsyncThunk(
  "admins/editAdminById",
  async (admin) => {
    try {
      let options = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(admin),
      };
      const response = await fetch(baseUrl + "/admin/" + admin.id, options);
      const res = await response.json();
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

export const deleteAdminById = createAsyncThunk(
  "admins/deleteAdminById",
  async (id) => {
    try {
      let options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      };
      const response = await fetch(baseUrl + "/admin/" + id, options);
      const res = await response.json();
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    setAdmin(state, action) {
      const admin = action.payload;
      state.admins[admin.id] = admin;
    },
    setMsgAdmin(state, action) {
      const msg = action.payload;
      state.msg = msg;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })

      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(postAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(postAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload;
      })

      .addCase(postAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editAdminById.pending, (state) => {
        state.loading = true;
      })

      .addCase(editAdminById.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload;
      })

      .addCase(editAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteAdminById.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteAdminById.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload;
      })

      .addCase(deleteAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAdmin, setMsgAdmin } = adminsSlice.actions;

export default adminsSlice.reducer;
