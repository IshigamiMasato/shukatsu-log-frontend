"use client";

import { loggedIn, loggedOut } from '@/store/modules/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAuthInit = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const jwt = localStorage.getItem("access_token");
                const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
                    method: "GET",
                    headers: {
                        "Content-Type"  : "application/json",
                        "Authorization" : `Bearer ${jwt}`
                    }
                });

                // ユーザ情報を取得できた場合は、ログイン状態とする
                if ( res.ok ) {
                    const userInfo = await res.json();
                    dispatch( loggedIn(userInfo) );

                    return;
                }

                const data = await res.json();

                // TODO: トークンの有効期限が切れている場合リフレッシュ
                // TODO: トークンの有効期限が切れている場合リフレッシュ
                // TODO: トークンの有効期限が切れている場合リフレッシュ
                if ( data.code === "EXPIRED_TOKEN" ) {
                }

                dispatch( loggedOut({}) );

            } catch ( error ) {
                dispatch( loggedOut({}) );

            }
        }

        initializeAuth();
    }, []);
}

export default useAuthInit;
