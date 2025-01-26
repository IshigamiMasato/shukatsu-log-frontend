"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login: React.FC = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);
    const router = useRouter();

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);

        login()
            .then(res => {
                localStorage.setItem("access_token", res.access_token);
                router.push("/user");

            })
            .catch(error => {
                setError(error.message);

            });
    }

    const login = async () => {
        const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if ( ! res.ok ) {
            throw new Error( data.message );
        }

        return data;
    }

    return (
        <div>
            <h1>ログイン</h1>
            { error && <p>{ error }</p> }
            <form onSubmit={handleLogin}>
                <div>
                    <label>メールアドレス</label>
                    <input
                        type="text"
                        value={email}
                        onChange={ (e) => { setEmail(e.target.value) } }
                        required
                    />
                </div>
                <div>
                    <label>パスワード</label>
                    <input
                        type="text"
                        value={password}
                        onChange={ (e) => { setPassword(e.target.value) } }
                        required
                    />
                </div>
                <button>送信</button>
            </form>
        </div>
    );
}

export default Login;
