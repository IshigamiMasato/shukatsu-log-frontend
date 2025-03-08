"use client";

import FormContainer from "@/components/containers/FormContainer";
import FormItem from "@/components/containers/FormItem";
import FormTitle from "@/components/containers/FormTitle";
import ValidationErrorMsg from "@/components/containers/ValidationErrorMsg";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/elements/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import { dispToast } from "@/store/modules/toast";
import { Document } from "@/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const DocumentEditForm = ({ document } : { document: Document }) => {
    const [submissionDate, setSubmissionDate] = useState<string>(document.submission_date);
    const [memo, setMemo] = useState<string>(document.memo ?? "");
    const [validationErrors, setValidationErrors] = useState<{ submission_date?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${document.apply_id}/document/${document.document_id}`, {
            method: "PUT",
            body: formData
        }).then(res => {
            if( ! res.ok ) {
                res.json().then(res => {
                    // バリデーションエラー
                    if ( res.code == "BAD_REQUEST" ) {
                        setValidationErrors(res.errors);
                    }
                })
                dispatch( dispToast({ status: "error", message: `提出書類の更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then( (newDocument:Document) => {
                setSubmissionDate(newDocument.submission_date);
                setMemo(newDocument.memo ?? "");

                dispatch( dispToast({ status: "success", message: `提出書類の更新が完了しました。` }) );
            });
        })
    }

    return (
        <FormContainer>
            <FormTitle>応募書類編集フォーム</FormTitle>
            <form onSubmit={onSubmit}>
                <FormItem>
                    <Label label="書類提出日" /><RequiredBadge />
                    <Input
                        type="date"
                        name="submission_date"
                        value={ submissionDate }
                        onChange={ (e) => setSubmissionDate(e.target.value) }
                        errors={validationErrors.submission_date}
                    />
                    { validationErrors.submission_date && <ValidationErrorMsg errors={validationErrors.submission_date} /> }
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
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">更新</Button>
            </form>
        </FormContainer>
    )
}

export default DocumentEditForm;
