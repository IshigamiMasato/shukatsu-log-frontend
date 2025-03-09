"use client";

import { Provider } from "react-redux";
import store from ".";
import Toast from "@/components/Toast";
import { usePathname } from "next/navigation";
import Auth from "@/components/Auth";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

type Props = {
    children: React.ReactNode
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
    const path = usePathname();

    return (
        <Provider store={store}>
            <div className="flex flex-col min-h-screen">
                <Header />
                <Toast />
                <Auth path={path}>{ children }</Auth>
                <Footer />
            </div>
        </Provider>
    )
}

export default ReduxProvider;
