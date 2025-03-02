"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Button from "../elements/Button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        const isConfirmed = window.confirm("ログアウトしますか？");

        if ( isConfirmed ) {
            fetch('/api/logout', {
                method: "POST",
            }).then(res => {
                if ( ! res.ok ) {
                    res.json().then(data => console.error(data));
                }
                redirect("/login");
            });
        }
    }

    return (
        <header className="border mb-8">
            <div className="container mx-auto px-8 py-6">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-bold">Shukatsu-Log</div>
                    { isAuthenticated && (
                        <>
                            <div className="space-x-4 hidden md:flex items-center text-nowrap">
                                <Link href="/event">予定</Link>
                                <Link href="/company">企業</Link>
                                <Link href="/apply">応募</Link>
                                <Link href="/user">会員情報</Link>
                                <Button onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
                                    ログアウト
                                </Button>
                            </div>
                            <div className="md:hidden">
                                <Button onClick={() => setIsOpen(prev => !prev)}>
                                    <FontAwesomeIcon icon={faBars} />
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                { isAuthenticated && isOpen && (
                    <div className="md:hidden">
                        <ul>
                            <li><Link href="/event" className="block font-medium text-sm px-5 py-2.5 hover:bg-gray-50 border-b">予定</Link></li>
                            <li><Link href="/company" className="block font-medium text-sm px-5 py-2.5 hover:bg-gray-50 border-b">企業</Link></li>
                            <li><Link href="/apply" className="block font-medium text-sm px-5 py-2.5 hover:bg-gray-50 border-b">応募</Link></li>
                            <li><Link href="/user" className="block font-medium text-sm px-5 py-2.5 hover:bg-gray-50 border-b">会員情報</Link></li>
                            <li>
                                <Button onClick={handleLogout} className="hover:bg-gray-50 w-full !text-left">
                                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
                                    ログアウト
                                </Button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;
