import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./categoryReducer";
import eventReducer from "./eventReducer";
import checkpointReducer from "./checkpointReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import leaderboardsReducer from "./leaderboardsReducer";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    event: eventReducer,
    category: categoryReducer,
    checkpoint: checkpointReducer,
    user: userReducer,
    leaderboard: leaderboardsReducer
  },
});

export default store;
