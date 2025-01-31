"use client";

import { loggedIn, loggedOut } from '@/store/modules/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAuthInit = () => {
    const dispatch = useDispatch();

    const loadUserToken = async (jwt: string) => {
        const res  = await fetch( '/api/user', { method: "GET", headers: { Authorization: jwt}} );
        const data = await res.json();

        if ( ! res.ok ) {
            if ( data.code === "EXPIRED_TOKEN" ) {
                return "REFRESH";
            }

            throw new Error( "ユーザー情報取得に失敗しました。" );
        }

        return data;
    };

    const refreshToken = async (jwt: string) => {
        const res  = await fetch( '/api/token/refresh', {method: "POST", headers: { Authorization: jwt }} );
        const data = await res.json();

        if ( ! res.ok ) {
            throw new Error('トークンリフレッシュに失敗しました。');
        }

        return data;
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const jwt = localStorage.getItem("access_token");

                // JWT が無ければログアウト状態とする
                if (! jwt) {
                    dispatch( loggedOut({}) );
                    return;
                }

                let userData = await loadUserToken(jwt);

                // トークンリフレッシュが必要な場合
                if ( userData == 'REFRESH' ) {
                    const refreshData = await refreshToken(jwt);
                    localStorage.setItem("access_token", refreshData.access_token);

                    // リフレッシュしたトークンで再取得
                    userData = await loadUserToken(refreshData.access_token);
                }

                // 成功した場合はログイン状態にする
                dispatch( loggedIn(userData) );

            } catch ( error ) {
                dispatch( loggedOut({}) );
                localStorage.removeItem("access_token");

            }
        }

        initializeAuth();
    }, []);
}

export default useAuthInit;
