"use client";

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "../elements/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLayerGroup, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { loggedOut } from "@/store/modules/auth";
import { useRouter } from "next/navigation";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        const isConfirmed = window.confirm("ログアウトしますか？");

        if ( isConfirmed ) {
            fetch('/api/logout', {
                method: "POST",
            }).then(() => {
                dispatch( loggedOut() );
                setIsOpen(false);

                router.replace('/login');
            });
        }
    }

    return (
        <header className="border-b mb-8 bg-white shadow-md">
            <div className="container mx-auto px-8 py-3">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-bold">
                        <Link href="/">
                            <FontAwesomeIcon icon={faLayerGroup} className="mr-1 text-xl" />
                            <span className="text-blue-600">Shukatsu</span>
                            <span className="text-red-600">Log</span>
                        </Link>
                        { user?.email === 'guest@example.com' && (
                            <div className="inline-block text-sm ml-2 rounded-lg p-1 bg-red-600 text-white">ゲストログイン中</div>
                        )}
                    </div>
                    { isAuthenticated && (
                        <>
                            <div className="space-x-4 hidden md:flex items-center text-nowrap">
                                <Link href="/event">予定</Link>
                                <Link href="/company">企業</Link>
                                <Link href="/apply">応募</Link>
                                <Link href="/user">会員情報</Link>
                                <Button onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faRightFromBracket}/>
                                    <span className="ml-1">ログアウト</span>
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
                            <li><Link href="/event" onClick={() => setIsOpen(false)} className="block font-medium text-sm px-5 py-2.5 hover:bg-gray-50 border-b">予定</Link></li>
                            <li><Link href="/company" onClick={() => setIsOpen(false)} className="block font-medium text-sm px-5 py-2.5 hover:bg-gray-50 border-b">企業</Link></li>
                            <li><Link href="/apply" onClick={() => setIsOpen(false)} className="block font-medium text-sm px-5 py-2.5 hover:bg-gray-50 border-b">応募</Link></li>
                            <li><Link href="/user" onClick={() => setIsOpen(false)} className="block font-medium text-sm px-5 py-2.5 hover:bg-gray-50 border-b">会員情報</Link></li>
                            <li>
                                <Button onClick={handleLogout} className="hover:bg-gray-50 w-full !text-left">
                                    <FontAwesomeIcon icon={faRightFromBracket}/>
                                    <span className="ml-1">ログアウト</span>
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
