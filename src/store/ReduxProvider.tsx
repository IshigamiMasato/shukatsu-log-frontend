"use client";

import { Provider } from "react-redux";
import store from ".";
import Toast from "@/components/Toast";

type Props = {
    children: React.ReactNode
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
    return (
        <Provider store={store}>
            <Toast />
            {children}
        </Provider>
    )
}

export default ReduxProvider;
