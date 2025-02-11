"use client";

import { redirect } from "next/navigation";

const LogoutButton = () => {
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
        <button onClick={ handleLogout }>ログアウト</button>
    )
}

export default LogoutButton;
