import { createSlice } from "@reduxjs/toolkit";

type ToastState = {
    isDisp: boolean;
    status?: "success"|"error";
    message?: string;
}

const initialState: ToastState = {
    isDisp: false,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
    dispToast( state, {type, payload} ) {
        state.isDisp  = true;
        state.status  = payload.status;
        state.message = payload.message;
    },
    removeToast( state, {type, payload} ) {
        state.isDisp  = false;
        state.status  = undefined;
        state.message = undefined;
    }
  }
});

// Action Creator
export const { dispToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
