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
import { Exam } from "@/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { dispLoading, removeLoading } from "@/store/modules/loading";

const ExamEditForm = ({ exam } : { exam: Exam }) => {
    const [examDate, setExamDate] = useState<string>(exam.exam_date);
    const [content, setContent]   = useState<string>(exam.content);
    const [memo, setMemo]         = useState<string>(exam.memo ?? "");
    const [validationErrors, setValidationErrors] = useState<{ exam_date?: []; memo?: []; content?: []; }>({});
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch( dispLoading() );
        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${exam.apply_id}/exam/${exam.exam_id}`, {
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
                dispatch( dispToast({ status: "error", message: `試験情報の更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            dispatch( dispToast({ status: "success", message: `試験情報の更新が完了しました。` }) );
            router.push(`/apply/${exam.apply_id}/process`);
        })
    }

    return (
        <FormContainer>
            <FormTitle>試験情報編集フォーム</FormTitle>
            <form method="POST" onSubmit={onSubmit}>
                <FormItem>
                    <Label>試験日</Label><RequiredBadge />
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
                    <Label>試験内容</Label><RequiredBadge />
                    <Textarea
                        name="content"
                        value={ content }
                        onChange={ e => setContent(e.target.value) }
                        errors={validationErrors.content}
                    />
                    { validationErrors.content && <ValidationErrorMsg errors={validationErrors.content} /> }
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

export default ExamEditForm;
