"use client";

import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormItem from "@/components/forms/FormItem";
import Label from "@/components/elements/Label";
import Input from "@/components/elements/Input";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import Textarea from "@/components/elements/Textarea";
import Button from "@/components/elements/Button";
import RequiredBadge from "@/components/forms/RequiredBadge";
import FormTitle from "@/components/forms/FormTitle";
import { useRouter } from "next/navigation";

const ExamCreateForm = ({ applyId } : { applyId : number }) => {
    const [examDate, setExamDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [content, setContent] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ exam_date?: []; memo?: []; content?: []; }>({});
    const dispatch = useDispatch();
    const router = useRouter();

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
            router.push(`/apply/${applyId}/process`);
        })
    }

    return (
        <div className="border p-4">
            <FormTitle>試験情報登録</FormTitle>
            <form method="POST" onSubmit={onSubmit}>
                <FormItem>
                    <Label label="試験日" /><RequiredBadge />
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
                    <Label label="試験内容" /><RequiredBadge />
                    <Textarea
                        name="content"
                        value={ content }
                        onChange={ e => setContent(e.target.value) }
                        errors={validationErrors.content}
                    />
                    { validationErrors.content && <ValidationErrorMsg errors={validationErrors.content} /> }
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
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">登録</Button>
            </form>
        </div>
    )
}

export default ExamCreateForm;
