"use client";

import { RootState } from "@/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Footer = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <footer className="mt-16 lg:mt-32 bg-gray-50 sm:block hidden">
            <div className="container mx-auto px-8 py-12">
                <div className="flex flex-col items-start">
                    <div className="text-sm font-bold text-gray-500 mb-5">
                        <Link href="/">ShukatsuLog</Link>
                    </div>
                    <div>
                        { isAuthenticated && (
                            <div className="flex flex-col items-start text-nowrap text-sm text-gray-500">
                                <Link href="/event">予定</Link>
                                <Link href="/company">企業</Link>
                                <Link href="/apply">応募</Link>
                                <Link href="/user">会員情報</Link>
                            </div>
                        )}
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:text-center">
                    <span className="text-sm text-gray-500">© 2025 <Link href='/' className="hover:underline">ShukatsuLog™</Link>. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
