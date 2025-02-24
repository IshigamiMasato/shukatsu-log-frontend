"use client";

import FormItem from "@/components/containers/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import ValidationErrorMsg from "@/components/elements/ValidationErrorMsg";
import { dispToast } from "@/store/modules/toast";
import { Interview } from "@/types";
import { FormEvent, use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const InterviewEditPage = ({ params } : { params : Promise<{ applyId: number, interviewId: number }> }) => {
    const { applyId, interviewId } = use(params);

    const [interviewDate, setInterviewDate] = useState<string>("");
    const [interviewerInfo, setInterviewerInfo] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ interview_date?: []; interviewer_info?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    useEffect(() => {
        const getInterview = async () => {
            const res = await fetch(`/api/apply/${applyId}/interview/${interviewId}`, {method: 'GET'});

            if ( res.ok ) {
                return await res.json();
            }
        }

        getInterview()
            .then((interview: Interview) => {
                /* フォーム初期化 */
                setInterviewDate(interview.interview_date);
                setInterviewerInfo(interview.interviewer_info ?? "");
                setMemo(interview.memo ?? "");
            });
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/interview/${interviewId}`, {
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
                dispatch( dispToast({ status: "error", message: `面接情報の更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then( (newInterview:Interview) => {
                /* フォーム更新 */
                setInterviewDate(newInterview.interview_date);
                setInterviewerInfo(newInterview.interviewer_info ?? "");
                setMemo(newInterview.memo ?? "");

                dispatch( dispToast({ status: "success", message: `面接情報の更新が完了しました。` }) );
            });
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

export default InterviewEditPage;
