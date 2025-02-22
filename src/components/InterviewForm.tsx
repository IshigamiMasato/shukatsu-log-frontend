"use client";

import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

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
        <>
            <form method="POST" onSubmit={onSubmit}>
                <div>
                    <label>面接日</label>
                    <input
                        type="date"
                        name="interview_date"
                        value={ interviewDate }
                        onChange={ e => setInterviewDate(e.target.value) }
                    />
                    { validationErrors.interview_date && <p className="text-red-500">{ validationErrors.interview_date.join(',') }</p> }
                </div>
                <div>
                    <label>面接官情報</label>
                    <input
                        type="text"
                        name="interviewer_info"
                        value={ interviewerInfo }
                        onChange={ e => setInterviewerInfo(e.target.value) }

                    />
                    { validationErrors.interviewer_info && <p className="text-red-500">{ validationErrors.interviewer_info.join(',') }</p> }
                </div>
                <div>
                    <label>メモ</label>
                    <input
                        type="textarea"
                        name="memo"
                        value={ memo }
                        onChange={ e => setMemo(e.target.value) }
                    />
                    { validationErrors.memo && <p className="text-red-500">{ validationErrors.memo.join(',') }</p> }
                </div>
                <button>登録</button>
            </form>
        </>
    )
}

export default InterviewForm;
