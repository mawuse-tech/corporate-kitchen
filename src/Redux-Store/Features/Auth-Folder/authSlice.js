import { createSlice } from "@reduxjs/toolkit";
import clients from "../../../Data-Folder/clients.json";

//auth state of the application. when login, reducer updates the state
const initialState = {
  user: null,
  client: null,
  team: [],
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      const user = action.payload;
      state.user = user;
      state.loading = false;
      state.error = null;
      // set client based on user.client_id
      state.client = clients.find((c) => c.id === user.client_id) || null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setClient(state, action) {
      state.client = action.payload;
    },
    setTeam(state, action) {
      state.team = action.payload;
    },
    logout(state) {
      state.user = null;
      state.client = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, setClient, setTeam, logout } = authSlice.actions;
export default authSlice.reducer;
