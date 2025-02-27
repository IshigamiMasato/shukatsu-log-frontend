"use client";

import FormItem from "@/components/containers/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/elements/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/elements/ValidationErrorMsg";
import { EVENT_TYPES } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import { Event } from "@/types";
import moment from "moment";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
    events: Event[],
    setEvents: Dispatch<SetStateAction<Event[]>>,
}

const EventCreateForm = ({ events, setEvents } : Props) => {
    /************ イベント登録 ************/
    const [title, setTitle]     = useState<string>("");
    const [type, setType]       = useState<number|null>(null);
    const [startAt, setStartAt] = useState<string>( moment().format("YYYY-MM-DD HH:mm") );
    const [endAt, setEndAt]     = useState<string>( moment().format("YYYY-MM-DD HH:mm") );
    const [memo, setMemo]       = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ title?: []; type?: []; start_at?: []; end_at?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    const clearForm = () => {
        setTitle("");
        setType(null);
        setStartAt( moment().format("YYYY-MM-DDTHH:mm") );
        setEndAt( moment().format("YYYY-MM-DDTHH:mm") );
        setMemo("");
    }

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
                setEvents([ ...events, newEvent ]);
                dispatch( dispToast({ status: "success", message: `タイトル：${newEvent.title} の登録が完了しました。` }) );
                clearForm();
            });
        })
    }
    /************ イベント登録 ************/

    return (
        <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto">
            <h2 className="text-lg font-semibold mb-5">予定登録フォーム</h2>
            <form method="POST" onSubmit={onSubmit}>
                <FormItem>
                    <Label label="タイトル" /><RequiredBadge />
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
                    <RequiredBadge /><br />
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
                    <Label label="開始" /><RequiredBadge />
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
                    <Label label="終了" /><RequiredBadge />
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
                    <Label label="メモ" />
                    <Textarea
                        name="memo"
                        value={ memo }
                        onChange={ e => setMemo(e.target.value) }
                        errors={validationErrors.memo}
                    />
                    { validationErrors.memo && <ValidationErrorMsg errors={validationErrors.memo} /> }
                </FormItem>
                <Button className="bg-blue-600 text-white mt-3">登録</Button>
            </form>
        </div>
    )
}

export default EventCreateForm;
