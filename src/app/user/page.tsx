"use client";

import useAuthInit from "@/hooks/useAuthInit";
import { RootState } from "@/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const User: React.FC = () => {
    /* 認証 */
    useAuthInit();
    const { isAuthenticated, user, authStatusChecked } = useSelector( (state: RootState) => state.auth );

    useEffect(() => {
        if ( authStatusChecked ) {
            // 認証状態確認後、未認証だった場合はログイン画面へリダイレクト
            if ( ! isAuthenticated ) {
                redirect("/login");
            }
        }
    }, [authStatusChecked]);

    const handleLogout = () => {
        const jwt = localStorage.getItem("access_token") ?? "";

        fetch('/api/logout', {method: "POST", headers: {Authorization: jwt}})
            .then(res => {
                if ( ! res.ok ) {
                    res.json().then(data => {
                        console.error(data);
                    })
                }

                localStorage.removeItem("access_token");
                redirect("/login");
            });
    }

    return (
        <>
            {
                user === null
                    ? ( <div>データ取得中</div> )
                    : (
                        <div>
                            <h1>ユーザ情報</h1>
                            <p>名前： { user.name }</p>
                            <p>メールアドレス： { user.email }</p>
                            <button onClick={ handleLogout }>ログアウト</button>
                        </div>
                    )
            }
        </>
    );
}

export default User;
