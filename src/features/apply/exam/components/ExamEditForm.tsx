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
import { Exam } from "@/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const ExamEditForm = ({ exam } : { exam: Exam }) => {
    const [examDate, setExamDate] = useState<string>(exam.exam_date);
    const [content, setContent]   = useState<string>(exam.content);
    const [memo, setMemo]         = useState<string>(exam.memo ?? "");
    const [validationErrors, setValidationErrors] = useState<{ exam_date?: []; memo?: []; content?: []; }>({});
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${exam.apply_id}/exam/${exam.exam_id}`, {
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
                dispatch( dispToast({ status: "error", message: `試験情報の更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then( (newExam:Exam) => {
                setExamDate(newExam.exam_date);
                setContent(newExam.content);
                setMemo(newExam.memo ?? "");

                dispatch( dispToast({ status: "success", message: `試験情報の更新が完了しました。` }) );
            });
        })
    }

    return (
        <FormContainer>
            <FormTitle>試験情報編集フォーム</FormTitle>
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
