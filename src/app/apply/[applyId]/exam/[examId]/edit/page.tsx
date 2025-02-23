"use client";

import { dispToast } from "@/store/modules/toast";
import { Exam } from "@/types";
import { FormEvent, use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ExamEditPage = ({ params } : { params : Promise<{ applyId: number, examId: number }> }) => {
    const { applyId, examId } = use(params);

    const [examDate, setExamDate] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ exam_date?: []; memo?: []; content?: []; }>({});
    const dispatch = useDispatch();

    useEffect(() => {
        const getExam = async () => {
            const res = await fetch(`/api/apply/${applyId}/exam/${examId}`, {method: 'GET'});

            if ( res.ok ) {
                return await res.json();
            }
        }

        getExam()
            .then((exam: Exam) => {
                /* フォーム初期化 */
                setExamDate(exam.exam_date);
                setContent(exam.content);
                setMemo(exam.memo ?? "");
            });
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/exam/${examId}`, {
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
                /* フォーム更新 */
                setExamDate(newExam.exam_date);
                setContent(newExam.content);
                setMemo(newExam.memo ?? "");

                dispatch( dispToast({ status: "success", message: `試験情報の更新が完了しました。` }) );
            });
        })
    }

    return (
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
            <button>更新</button>
        </form>
    )
}

export default ExamEditPage;
