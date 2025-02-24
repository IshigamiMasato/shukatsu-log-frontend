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

const InterviewForm = ({ applyId } : { applyId : number }) => {
    const [interviewDate, setInterviewDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [interviewerInfo, setInterviewerInfo] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ interview_date?: []; interviewer_info?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    const onSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/interview`, {
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
                dispatch( dispToast({ status: "error", message: `面接情報の登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            dispatch( dispToast({ status: "success", message: `面接情報の登録が完了しました。` }) );
        })
    }

    return (
        <form method="POST" onSubmit={onSubmit}>
            <FormItem>
                <Label label="面接日" />
                <Input
                    type="date"
                    name="interview_date"
                    value={ interviewDate }
                    onChange={ e => setInterviewDate(e.target.value) }
                    errors={validationErrors.interview_date}
                />
                { validationErrors.interview_date && <ValidationErrorMsg errors={validationErrors.interview_date} /> }
            </FormItem>
            <FormItem>
                <Label label="面接官情報" />
                <Input
                    type="text"
                    name="interviewer_info"
                    value={ interviewerInfo }
                    onChange={ e => setInterviewerInfo(e.target.value) }
                    errors={validationErrors.interviewer_info}
                />
                { validationErrors.interviewer_info && <ValidationErrorMsg errors={validationErrors.interviewer_info} /> }
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

export default InterviewForm;
