"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login: React.FC = () => {
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

            // ログイン成功時ユーザ画面へ遷移
            router.push('/user');
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
