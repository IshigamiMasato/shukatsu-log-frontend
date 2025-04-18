"use client";

import FormContainer from "@/components/forms/FormContainer";
import FormItem from "@/components/forms/FormItem";
import FormTitle from "@/components/forms/FormTitle";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import { dispToast } from "@/store/modules/toast";
import { Interview } from "@/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { dispLoading, removeLoading } from "@/store/modules/loading";

const InterviewEditForm = ({ interview } : { interview: Interview }) => {
    const [interviewDate, setInterviewDate]     = useState<string>(interview.interview_date);
    const [interviewerInfo, setInterviewerInfo] = useState<string>(interview.interviewer_info ?? "");
    const [memo, setMemo]                       = useState<string>(interview.memo ?? "");
    const [validationErrors, setValidationErrors] = useState<{ interview_date?: []; interviewer_info?: []; memo?: []; }>({});
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch( dispLoading() );
        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${interview.apply_id}/interview/${interview.interview_id}`, {
            method: "PUT",
            body: formData
        }).then(res => {
            dispatch( removeLoading() );

            if( ! res.ok ) {
                res.json().then(res => {
                    if ( res.code == "BAD_REQUEST" ) {
                        setValidationErrors(res.errors);
                    }
                })
                dispatch( dispToast({ status: "error", message: `面接情報の更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            dispatch( dispToast({ status: "success", message: `面接情報の更新が完了しました。` }) );
            router.push(`/apply/${interview.apply_id}/process`);
        })
    }

    return (
        <FormContainer>
            <FormTitle>面接情報編集フォーム</FormTitle>
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
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">更新</Button>
            </form>
        </FormContainer>
    )
}

export default InterviewEditForm;
