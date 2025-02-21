"use client";

import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

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
        <>
            <form method="POST" onSubmit={onSubmit}>
                <div>
                    <label>試験日</label>
                    <input
                        type="date"
                        name="exam_date"
                        value={ examDate }
                        onChange={ e => setExamDate(e.target.value) }
                    />
                    { validationErrors.exam_date && <p className="text-red-500">{ validationErrors.exam_date.join(',') }</p> }
                </div>
                <div>
                    <label>試験内容</label>
                    <input
                        type="text"
                        name="content"
                        value={ content }
                        onChange={ e => setContent(e.target.value) }

                    />
                    { validationErrors.content && <p className="text-red-500">{ validationErrors.content.join(',') }</p> }
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

export default ExamForm;
