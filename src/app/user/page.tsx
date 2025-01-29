"use client";

import useAuthInit from "@/hooks/useAuthInit";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const User: React.FC = () => {
    useAuthInit();
    const { isAuthenticated, user, authStatusChecked } = useSelector( (state: RootState) => state.auth );

    const router = useRouter();

    useEffect(() => {
        if (authStatusChecked) {
            // 認証状態確認後、未認証だった場合はログイン画面へリダイレクト
            if ( ! isAuthenticated ) {
                router.push("/login");
            }
        }

    }, [authStatusChecked]);

    const handleLogout = () => {
        logout()
            .catch(error => {
                console.error(error.message);

            })
            .finally(() => {
                localStorage.removeItem("access_token");
                router.push("/login");

            });

    }

    const logout = async () => {
        const jwt = localStorage.getItem("access_token");

        const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type"  : "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        });

        const data = await res.json();

        if ( ! res.ok ) {
            throw new Error( data.message );
        }

        return data;
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
