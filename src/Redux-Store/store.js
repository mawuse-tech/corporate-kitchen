import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth-Folder/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
