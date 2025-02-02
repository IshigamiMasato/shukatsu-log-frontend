"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login: React.FC = () => {
    const [ error, setError ] = useState(null);
    const router = useRouter();

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch('api/login', {method: 'POST', body: formData}).then(res => {
            if ( ! res.ok ) {
                res.json().then(data => {
                    setError(data.msg);

                    return;
                });
            }

            res.json().then(data => {
                localStorage.setItem("access_token", data.access_token);
                router.push("/user");

                return;
            });
        })
    }

    return (
        <div>
            <h1>ログイン</h1>
            { error && <p>{ error }</p> }
            <form onSubmit={handleLogin}>
                <div>
                    <label>メールアドレス</label>
                    <input type="text" name="email" required />
                </div>
                <div>
                    <label>パスワード</label>
                    <input type="text" name="password" required />
                </div>
                <button>送信</button>
            </form>
        </div>
    );
}

export default Login;
