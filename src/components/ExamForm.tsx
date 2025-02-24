"use client";

import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormItem from "./containers/FormItem";
import Label from "./elements/Label";
import Input from "./elements/Input";
import ValidationErrorMsg from "./elements/ValidationErrorMsg";
import Button from "./elements/Button";

const ExamForm = ({ applyId } : { applyId : number }) => {
    const [examDate, setExamDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [content, setContent] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ exam_date?: []; memo?: []; content?: []; }>({});
    const dispatch = useDispatch();

    const onSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/exam`, {
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
                dispatch( dispToast({ status: "error", message: `試験情報の登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            dispatch( dispToast({ status: "success", message: `試験情報の登録が完了しました。` }) );
        })
    }

    return (
        <form method="POST" onSubmit={onSubmit}>
            <FormItem>
                <Label label="試験日" />
                <Input
                    type="date"
                    name="exam_date"
                    value={ examDate }
                    onChange={ e => setExamDate(e.target.value) }
                    errors={validationErrors.exam_date}
                />
                { validationErrors.exam_date && <ValidationErrorMsg errors={validationErrors.exam_date} /> }
            </FormItem>
            <FormItem>
                <Label label="試験内容" />
                <Input
                    type="text"
                    name="content"
                    value={ content }
                    onChange={ e => setContent(e.target.value) }
                    errors={validationErrors.content}
                />
                { validationErrors.content && <ValidationErrorMsg errors={validationErrors.content} /> }
            </FormItem>
            <FormItem>
                <Label label="メモ" />
                <Input
                    type="textarea"
                    name="memo"
                    value={ memo }
                    onChange={ e => setMemo(e.target.value) }
                    errors={validationErrors.memo}
                />
                { validationErrors.memo && <ValidationErrorMsg errors={validationErrors.memo} /> }
            </FormItem>
            <Button name="登録" />
        </form>
    )
}

export default ExamForm;
