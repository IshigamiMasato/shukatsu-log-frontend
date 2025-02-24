"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Button from "../elements/Button";
import { redirect } from "next/navigation";

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
        <div className="flex justify-between">
            <h1>Header</h1>
            <div>
                { isAuthenticated
                    ? ( <Button name="ログアウト" onClick={handleLogout} /> )
                    : ( <Button name="ログイン" onClick={() => { redirect("/login") }} /> )
                }
            </div>
        </div>
    )
}

export default Header;
