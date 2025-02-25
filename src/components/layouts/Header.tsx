"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Button from "../elements/Button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        fetch('/api/logout', {
            method: "POST",
        }).then(res => {
            if ( ! res.ok ) {
                res.json().then(data => console.error(data));
            }
            redirect("/login");
        });
    }

    return (
        <header className="container mx-auto px-8 py-6 flex justify-between items-center">
            <div className="text-lg font-bold">Shukatsu-Log</div>
            { isAuthenticated && (
                <>
                    <div className="space-x-4 hidden md:flex items-center text-nowrap">
                        <Link href="/calender">予定</Link>
                        <Link href="/company">企業</Link>
                        <Link href="/apply">応募</Link>
                        <Link href="/user">会員情報</Link>
                        <Button name="ログアウト" onClick={handleLogout} />
                    </div>
                    <div className="md:hidden">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </>
            )}
        </header>
    )
}

export default Header;
