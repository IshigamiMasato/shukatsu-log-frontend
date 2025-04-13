import { createSlice } from "@reduxjs/toolkit";

type LoadingState = {
    isDisp: boolean,
}

const initialState: LoadingState = {
    isDisp: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
    dispLoading( state ) {
        state.isDisp  = true;
    },
    removeLoading( state ) {
        state.isDisp  = false;
    }
  }
});

// Action Creator
export const { dispLoading, removeLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
