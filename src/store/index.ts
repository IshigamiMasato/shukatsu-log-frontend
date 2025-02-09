import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./modules/auth";
import toastReducer from "./modules/toast";

const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
