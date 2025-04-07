"use client";

import { loggedIn, loggedOut } from "@/store/modules/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../Loading";
import { User } from "@/types";

/**
 * 認証状態に応じてフロント画面の制御をするため認証状態を設定
 */
const Auth = ({ children, path } : { children: React.ReactNode, path: string }) => {
    const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();

    /* トークンの有効性の確認 */
    const loadToken = async (): Promise<User|string|never> => {
        const res  = await fetch( '/api/user', { method: "GET"} );
        const data = await res.json();
        if ( ! res.ok ) {
            if ( data.code === "EXPIRED_TOKEN" ) return "needRefresh";
            throw new Error( 'Failed load token.' );
        }
        return data;
    };

    const refreshToken = async (): Promise<object|never> => {
        const res  = await fetch( '/api/token/refresh', {method: "POST"} );
        const data = await res.json();
        if ( ! res.ok ) {
            throw new Error( 'Failed refresh token.' );
        }
        return data;
    };

    const initializeAuth = async () => {
        try {
            let userData = await loadToken();

            if ( userData === "needRefresh" ) {
                await refreshToken();
                userData = await loadToken();
            }

            dispatch( loggedIn(userData) );

        } catch ( error ) {
            console.error(error);
            dispatch( loggedOut() );
        }
    }

    useEffect(() => {
        setIsAuthChecked(false);

        initializeAuth().then(() => {
            setIsAuthChecked(true);
        });

    // pathが変更される度に認証状態確認
    }, [path, router]);

    return (
        isAuthChecked
            ? children
            : <Loading />
    )
}

export default Auth;
