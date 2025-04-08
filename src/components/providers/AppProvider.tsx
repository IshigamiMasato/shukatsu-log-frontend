"use client";

import { Provider } from "react-redux";
import store from "@/store";
import Toast from "@/components/Toast";
import { usePathname } from "next/navigation";
import Auth from "@/components/auth/Auth";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import BottomNav from "@/components/navigations/BottomNav";

type Props = {
    children: React.ReactNode
}

const AppProvider: React.FC<Props> = ({ children }) => {
    const path = usePathname();

    return (
        <Provider store={store}>
            <div className="flex flex-col min-h-screen bg-slate-100">
                <Header />
                <Auth path={path}>
                    <div className="grow">
                        { children }
                    </div>
                </Auth>
                <Toast />
                {/* PC用 */}
                <Footer />
                {/* SP用 */}
                <BottomNav />
            </div>
        </Provider>
    )
}

export default AppProvider;
