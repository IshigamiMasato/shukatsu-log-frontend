"use client";

import FormContainer from "@/components/forms/FormContainer";
import FormItem from "@/components/forms/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import { EVENT_TYPES } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormTitle from "@/components/forms/FormTitle";
import { useRouter } from "next/navigation";

const EventCreateForm = () => {
    const [title, setTitle]     = useState<string>("");
    const [type, setType]       = useState<number|null>(null);
    const [startAt, setStartAt] = useState<string>( moment().format("YYYY-MM-DD HH:mm") );
    const [endAt, setEndAt]     = useState<string>( moment().format("YYYY-MM-DD HH:mm") );
    const [memo, setMemo]       = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ title?: []; type?: []; start_at?: []; end_at?: []; memo?: []; }>({});
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch('/api/event', {
            method: "POST",
            body: formData
        }).then(res => {
            if( ! res.ok ) {
                res.json().then(res => {
                    // バリデーションエラー
                    if ( res.code == "BAD_REQUEST" ) {
                        setValidationErrors(res.errors);
                    }
                })
                dispatch( dispToast({ status: "error", message: `予定登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then(newEvent => {
                dispatch( dispToast({ status: "success", message: `タイトル：${newEvent.title} の登録が完了しました。` }) );
                router.push('/event');
            });
        })
    }

    return (
        <FormContainer>
            <FormTitle>予定登録フォーム</FormTitle>
            <form method="POST" onSubmit={onSubmit}>
                <FormItem>
                    <Label>タイトル</Label><RequiredBadge />
                    <Input
                        type="text"
                        name="title"
                        value={title}
                        onChange={ e => setTitle(e.target.value) }
                        required={true}
                        errors={validationErrors.title}
                    />
                    { validationErrors.title && <ValidationErrorMsg errors={validationErrors.title} /> }
                </FormItem>
                <FormItem>
                    <Label>タイプ</Label><RequiredBadge /><br />
                    {
                        EVENT_TYPES.map(value => {
                            return (
                                <label key={ value.id }>
                                    <input
                                        type="radio"
                                        name="type"
                                        value={ value.id }
                                        onChange={ e => setType(Number(e.target.value)) }
                                        checked={ value.id == type }
                                        required
                                    />
                                    { value.name }
                                </label>
                            );
                        })
                    }
                    { validationErrors.type && <ValidationErrorMsg errors={validationErrors.type} /> }
                </FormItem>
                <FormItem>
                    <Label>開始</Label><RequiredBadge />
                    <Input
                        type="datetime-local"
                        name="start_at"
                        value={ startAt }
                        onChange={ e => setStartAt(e.target.value) }
                        required={true}
                        errors={validationErrors.start_at}
                    />
                    { validationErrors.start_at && <ValidationErrorMsg errors={validationErrors.start_at} /> }
                </FormItem>
                <FormItem>
                    <Label>終了</Label><RequiredBadge />
                    <Input
                        type="datetime-local"
                        name="end_at"
                        value={ endAt }
                        onChange={ e => setEndAt(e.target.value) }
                        required={true}
                        errors={validationErrors.end_at}
                    />
                    { validationErrors.end_at && <ValidationErrorMsg errors={validationErrors.end_at} /> }
                </FormItem>
                <FormItem>
                    <Label>メモ</Label>
                    <Textarea
                        name="memo"
                        value={ memo }
                        onChange={ e => setMemo(e.target.value) }
                        errors={validationErrors.memo}
                    />
                    { validationErrors.memo && <ValidationErrorMsg errors={validationErrors.memo} /> }
                </FormItem>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">登録</Button>
            </form>
        </FormContainer>
    )
}

export default EventCreateForm;
