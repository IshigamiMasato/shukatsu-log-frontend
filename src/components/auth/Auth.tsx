"use client";

import { loggedIn, loggedOut } from "@/store/modules/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../Loading";

type Props = {
    children: React.ReactNode,
    path: string,
}

const Auth: React.FC<Props> = ({ children, path }) => {
    const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();

    /*
    * トークンの有効性の確認
    */
    const loadToken = async () => {
        const res  = await fetch( '/api/user', { method: "GET"} );
        const data = await res.json();

        if ( ! res.ok ) {
            if ( data.code === "EXPIRED_TOKEN" ) {
                return "REFRESH";
            }

            throw new Error( "ユーザー情報取得に失敗しました。" );
        }

        return data;
    };

    const refreshToken = async () => {
        const res  = await fetch( '/api/token/refresh', {method: "POST"} );
        const data = await res.json();

        if ( ! res.ok ) {
            throw new Error('トークンリフレッシュに失敗しました。');
        }

        return data;
    };

    const initializeAuth = async () => {
        try {
            let userData = await loadToken();

            // トークンリフレッシュが必要な場合
            if ( userData == 'REFRESH' ) {
                await refreshToken();
                userData = await loadToken();
                dispatch( loggedIn(userData) );

                return "tokenRefreshed";
            }

            // 成功した場合はログイン状態にする
            dispatch( loggedIn(userData) );

        } catch ( error ) {
            dispatch( loggedOut({}) );
            return "loggedOut";

        }

        return "loggedIn";
    }

    useEffect(() => {
        setIsAuthChecked(false);

        initializeAuth().then(result => {
            setIsAuthChecked(true);

            if ( result === "tokenRefreshed" ) {
                // トークンリフレッシュ後、サーバコンポーネント側でデータを再取得するためリロード
                router.refresh();
            }

            // 認証状態を確認しログアウト状態であればログイン画面へ遷移
            if ( result === "loggedOut" ) {
                router.replace('/login');
            }
        });

    // pathが変更される度に認証状態確認
    }, [path]);

    return (
        isAuthChecked
            ? children
            : <Loading />
    )
}

export default Auth;
