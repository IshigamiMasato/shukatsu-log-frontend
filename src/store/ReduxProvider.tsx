"use client";

import { Provider } from "react-redux";
import store from ".";
import Toast from "@/components/Toast";
import { usePathname } from "next/navigation";
import { PUBLIC_PAGES } from "@/constants/consts";
import Auth from "@/components/Auth";

type Props = {
    children: React.ReactNode
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
    const path = usePathname();

    return (
        <Provider store={store}>
            <Toast />
            {
                PUBLIC_PAGES.includes(path)
                    ? children // 認証不要ページはそのままレンダリング
                    : <Auth path={path}>{ children }</Auth>
            }
        </Provider>
    )
}

export default ReduxProvider;
