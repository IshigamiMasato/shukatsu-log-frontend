"use client";

import useAuthInit from "@/hooks/useAuthInit";
import { RootState } from "@/store";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Login: React.FC = () => {
    /************ 認証 ************/
    useAuthInit(); // 状態を保持した状態でページ遷移後、再度認証をしているかチェック
    const { isAuthenticated, authStatusChecked } = useSelector( (state: RootState) => state.auth );
    /************ 認証 ************/

    useEffect(() => {
        console.log(`login.tsx:authStatusChecked ${ authStatusChecked ? 'true' : 'false' }`)
        console.log(`login.tsx:isAuthenticated ${ isAuthenticated ? 'true' : 'false' }`)

        if ( authStatusChecked ) {
            // 認証状態確認後、認証済だった場合はユーザ画面へリダイレクト
            if ( isAuthenticated ) {
                redirect("/user");
            }
        }
    }, [authStatusChecked, isAuthenticated]);

    const [validationErrors, setValidationErrors] = useState<{ email?: []; password?: []; }>({});
    const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");

    const router = useRouter();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoginErrorMsg("");
        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch('api/login', {
            method: 'POST',
            body: formData
        }).then(res => {
            if ( ! res.ok ) {
                res.json().then(res => {
                    // バリデーションエラー
                    if ( res.code == "BAD_REQUEST" ) {
                        setValidationErrors(res.errors);
                    }
                });
                setLoginErrorMsg("ログインに失敗しました。");
                return;
            }

            res.json().then(data => {
                localStorage.setItem("access_token", data.access_token);
                router.push('/user');
            });
        })
    }

    return (
        <div>
            { loginErrorMsg && ( <div className="bg-red-100">{ loginErrorMsg }</div> ) }
            <form onSubmit={onSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input type="text" name="email" required />
                    { validationErrors.email && <p className="text-red-500">{ validationErrors.email.join(',') }</p> }
                </div>
                <div>
                    <label>パスワード</label>
                    <input type="text" name="password" required />
                    { validationErrors.password && <p className="text-red-500">{ validationErrors.password.join(',') }</p> }
                </div>
                <button>ログイン</button>
            </form>
        </div>
    );
}

export default Login;
