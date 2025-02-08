"use client";

import useAuthInit from "@/hooks/useAuthInit";
import { RootState } from "@/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const User: React.FC = () => {
    /************ 認証 ************/
    useAuthInit(); // 状態を保持した状態でページ遷移後、再度認証をしているかチェック
    const { isAuthenticated, user, authStatusChecked } = useSelector( (state: RootState) => state.auth );
    /************ 認証 ************/

    useEffect(() => {
        console.log(`user.tsx:authStatusChecked ${ authStatusChecked ? 'true' : 'false' }`)
        console.log(`user.tsx:isAuthenticated ${ isAuthenticated ? 'true' : 'false' }`)

        if ( authStatusChecked ) {
            // 認証状態確認後、未認証だった場合はログイン画面へリダイレクト
            if ( ! isAuthenticated ) {
                redirect("/login");
            }
        }
    }, [authStatusChecked, isAuthenticated]);

    const handleLogout = () => {
        fetch('/api/logout', {
            method: "POST",
        }).then(res => {
            if ( ! res.ok ) {
                res.json().then(data => {
                    console.error(data);
                })
            }

            redirect("/login");
        });
    }

    return (
        <>
            { user === null
                ? ( <div>Loading...</div> )
                : (
                    <div>
                        <h1>ユーザ情報</h1>
                        <p>名前： { user.name }</p>
                        <p>メールアドレス： { user.email }</p>
                        <button onClick={ handleLogout }>ログアウト</button>
                        <Link href="/calender">カレンダー</Link>
                    </div>
                )
            }
        </>
    );
}

export default User;
