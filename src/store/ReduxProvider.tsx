"use client";

import { Provider } from "react-redux";
import store from ".";
import Toast from "@/components/Toast";
import { usePathname } from "next/navigation";
import Auth from "@/components/Auth";
import Header from "@/components/layouts/Header";

type Props = {
    children: React.ReactNode
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
    const path = usePathname();

    return (
        <Provider store={store}>
            <Header />
            <Toast />
            <Auth path={path}>{ children }</Auth>
        </Provider>
    )
}

export default ReduxProvider;
