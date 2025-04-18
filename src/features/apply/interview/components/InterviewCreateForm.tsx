"use client";

import FormItem from "@/components/forms/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormTitle from "@/components/forms/FormTitle";
import { useRouter } from "next/navigation";
import { dispLoading, removeLoading } from "@/store/modules/loading";

const InterviewCreateForm = ({ applyId } : { applyId : number }) => {
    const [interviewDate, setInterviewDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [interviewerInfo, setInterviewerInfo] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ interview_date?: []; interviewer_info?: []; memo?: []; }>({});
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        dispatch( dispLoading() );
        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/interview`, {
            method: "POST",
            body: formData
        }).then(res => {
            dispatch( removeLoading() );

            if( ! res.ok ) {
                res.json().then(res => {
                    if ( res.code == "BAD_REQUEST" ) {
                        setValidationErrors(res.errors);
                    }
                })
                dispatch( dispToast({ status: "error", message: `面接情報の登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            dispatch( dispToast({ status: "success", message: `面接情報の登録が完了しました。` }) );
            router.push(`/apply/${applyId}/process`);
        })
    }

    return (
        <div className="border p-4">
            <FormTitle>面接情報登録</FormTitle>
            <form method="POST" onSubmit={onSubmit}>
                <FormItem>
                    <Label>面接日</Label><RequiredBadge />
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
                    <Label>面接官情報</Label>
                    <Textarea
                        name="interviewer_info"
                        value={ interviewerInfo }
                        onChange={ e => setInterviewerInfo(e.target.value) }
                        errors={validationErrors.interviewer_info}
                    />
                    { validationErrors.interviewer_info && <ValidationErrorMsg errors={validationErrors.interviewer_info} /> }
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
        </div>
    )
}

export default InterviewCreateForm;
