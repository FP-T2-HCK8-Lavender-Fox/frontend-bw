import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./categoryReducer";
import eventReducer from "./eventReducer";
import checkpointReducer from "./checkpointReducer";
import adminReducer from "./adminReducer";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    event: eventReducer,
    category: categoryReducer,
    checkpoint: checkpointReducer,
  },
});

export default store;
