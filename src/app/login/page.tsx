"use client";

import useAuthInit from "@/hooks/useAuthInit";
import { RootState } from "@/store";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Login: React.FC = () => {
    /* 認証 */
    useAuthInit();
    const { isAuthenticated, user, authStatusChecked } = useSelector( (state: RootState) => state.auth );

    const [error, setError] = useState<string | null>(null);
    // バリデーションエラー用
    const [errors, setErrors] = useState<{ email?: []; password?: []; }>({});

    useEffect(() => {
        if ( authStatusChecked ) {
            // 認証状態確認後、認証済だった場合はユーザ画面へリダイレクト
            if ( isAuthenticated ) {
                redirect("/user");
            }
        }
    }, [authStatusChecked, isAuthenticated]);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        setErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch('api/login', {method: 'POST', body: formData}).then(res => {
            if ( ! res.ok ) {
                res.json().then(res => {
                    // バリデーションエラー
                    if ( res.code == "BAD_REQUEST" ) {
                        setErrors(res.errors);
                    }
                });
                setError("ログインに失敗しました。");
                return;
            }

            res.json().then(data => {
                localStorage.setItem("access_token", data.access_token);
                window.location.href = '/user';
            });
        })
    }

    return (
        <div>
            <h1>ログイン</h1>
            { error && ( <div className="bg-red-100">{ error }</div> ) }
            <form onSubmit={handleLogin}>
                <div>
                    <label>メールアドレス</label>
                    <input type="text" name="email" required />
                    { errors.email && <p className="text-red-500">{ errors.email.join(',') }</p>}
                </div>
                <div>
                    <label>パスワード</label>
                    <input type="text" name="password" required />
                    { errors.password && <p className="text-red-500">{ errors.password.join(',') }</p>}
                </div>
                <button>送信</button>
            </form>
        </div>
    );
}

export default Login;
