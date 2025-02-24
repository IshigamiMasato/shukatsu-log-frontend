"use client";

import FormItem from "@/components/containers/FormItem";
import Button from "@/components/elements/Button";
import ErrorMsg from "@/components/elements/ErrorMsg";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import ValidationErrorMsg from "@/components/elements/ValidationErrorMsg";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage: React.FC = () => {
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
            { loginErrorMsg && <ErrorMsg error={loginErrorMsg} /> }
            <form onSubmit={onSubmit}>
                <FormItem>
                    <Label label="メールアドレス" />
                    <Input
                        type="text"
                        name="email"
                        required={true}
                        errors={validationErrors.email}
                    />
                    { validationErrors.email && <ValidationErrorMsg errors={validationErrors.email} /> }
                </FormItem>
                <FormItem>
                    <Label label="パスワード" />
                    <Input
                        type="text"
                        name="password"
                        required={true}
                        errors={validationErrors.password}
                    />
                    { validationErrors.password && <ValidationErrorMsg errors={validationErrors.password} /> }
                </FormItem>
                <Button name="ログイン"/>
            </form>
        </div>
    );
}

export default LoginPage;
