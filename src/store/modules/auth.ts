import { createSlice } from "@reduxjs/toolkit";

type User = {
  name: string,
  email: string,
}

type AuthState = {
  authStatusChecked: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  authStatusChecked: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn( state, {type, payload} ) {
      state.authStatusChecked = true;
      state.isAuthenticated = true;
      state.user = payload;
    },
    loggedOut( state, {type, payload} ) {
      state.authStatusChecked = true;
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Action Creator
export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
