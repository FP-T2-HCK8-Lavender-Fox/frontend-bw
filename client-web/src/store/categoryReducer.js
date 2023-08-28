import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000";

const initialState = {
  loading: false,
  categories: [],
  category: {
    name: "",
  },
  error: "",
  msg: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      let options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(baseUrl + "/categories", options);
      const categories = await response.json();
      return categories;
    } catch (error) {
      return error;
    }
  }
);

// export const fetchCategoryById = createAsyncThunk(
//   "categories/fetchCategoryById",
//   async (id) => {
//     try {
//       let options = {
//         method: "get",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await fetch(baseUrl + "/categories/" + id, options);
//       const category = await response.json();
//       return category;
//     } catch (error) {
//       return error;
//     }
//   }
// );

export const postCategory = createAsyncThunk(
  "categories/postCategories",
  async (category) => {
    try {
      let options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(category),
      };
      const response = await fetch(baseUrl + "/categories", options);
      const res = await response.json();
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

export const editCategoryById = createAsyncThunk(
  "categories/editCategoryById",
  async (category) => {
    try {
      let options = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(category),
      };
      const response = await fetch(
        baseUrl + "/categories/" + category.id,
        options
      );
      const res = await response.json();
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

export const deleteCategoryById = createAsyncThunk(
  "categories/deleteCategoryById",
  async (id) => {
    try {
      let options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      };
      const response = await fetch(baseUrl + "/categories/" + id, options);
      const res = await response.json();
      return res.message;
    } catch (error) {
      return error;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setMsgCategory(state, action) {
      const msg = action.payload;
      state.msg = msg;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // .addCase(fetchCategoryById.pending, (state) => {
      //   state.loading = true;
      // })

      // .addCase(fetchCategoryById.fulfilled, (state, action) => {
      //   state.category = action.payload;
      //   state.loading = false;
      // })

      // .addCase(fetchCategoryById.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })

      .addCase(postCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(postCategory.fulfilled, (state, action) => {
        state.msg = action.payload;
        state.loading = false;
      })

      .addCase(postCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editCategoryById.pending, (state) => {
        state.loading = true;
      })

      .addCase(editCategoryById.fulfilled, (state, action) => {
        state.msg = action.payload;
        state.loading = false;
      })

      .addCase(editCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.msg = action.payload;
        state.loading = false;
      })

      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setMsgCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
