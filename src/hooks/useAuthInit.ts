"use client";

import { loggedIn, loggedOut } from '@/store/modules/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAuthInit = () => {
    const dispatch = useDispatch();

    const loadUserToken = async () => {
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

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                let userData = await loadUserToken();

                // トークンリフレッシュが必要な場合
                if ( userData == 'REFRESH' ) {
                    await refreshToken();

                    // リフレッシュしたトークンで再取得
                    userData = await loadUserToken();
                }

                // 成功した場合はログイン状態にする
                dispatch( loggedIn(userData) );

            } catch ( error ) {
                dispatch( loggedOut({}) );

            }
        }

        initializeAuth();
    }, []);
}

export default useAuthInit;
