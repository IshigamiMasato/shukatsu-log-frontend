import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn( state, { payload } ) {
      state.isAuthenticated = true;
      state.user = payload;
    },
    loggedOut( state ) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Action Creator
export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
