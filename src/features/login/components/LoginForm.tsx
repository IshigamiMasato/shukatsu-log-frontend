"use client";

import FormContainer from "@/components/forms/FormContainer";
import FormItem from "@/components/forms/FormItem";
import Button from "@/components/elements/Button";
import ErrorMsg from "@/components/forms/ErrorMsg";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginForm = () => {
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

            // ログイン成功時TOP画面へ遷移
            router.push('/');
        })
    }

    return (
        <FormContainer>
            { loginErrorMsg && <ErrorMsg error={loginErrorMsg} /> }
            <form onSubmit={onSubmit}>
                <FormItem>
                    <Label>メールアドレス</Label>
                    <Input
                        type="text"
                        name="email"
                        required={true}
                        errors={validationErrors.email}
                    />
                    { validationErrors.email && <ValidationErrorMsg errors={validationErrors.email} /> }
                </FormItem>
                <FormItem>
                    <Label>パスワード</Label>
                    <Input
                        type="text"
                        name="password"
                        required={true}
                        errors={validationErrors.password}
                    />
                    { validationErrors.password && <ValidationErrorMsg errors={validationErrors.password} /> }
                </FormItem>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">ログイン</Button>
            </form>
        </FormContainer>
    )
}

export default LoginForm;
