"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
    name: string,
    email: string,
}

const User: React.FC = () => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ error, setError ] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getUser()
            .then(user => {
                setUser(user);

            })
            .catch(error => {
                setError(error.message);

            });

    }, []);

    const getUser = async () => {
        const jwt = localStorage.getItem("access_token");

        const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
            method: "GET",
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

    if ( error ) {
        return (
            <p>エラー: { error }</p>
        )
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
