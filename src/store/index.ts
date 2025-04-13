import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./modules/auth";
import toastReducer from "./modules/toast";
import loadingReducer from "./modules/loading";

const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        loading: loadingReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
