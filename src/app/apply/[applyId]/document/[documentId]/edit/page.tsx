"use client";

import { dispToast } from "@/store/modules/toast";
import { Document } from "@/types";
import { FormEvent, use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const DocumentEditPage = ({ params } : { params : Promise<{ applyId: number, documentId: number }> }) => {
    const { applyId, documentId } = use(params);

    const [submissionDate, setSubmissionDate] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ submission_date?: []; memo?: []; }>({});

    const dispatch = useDispatch();

    useEffect(() => {
        const getDocument = async () => {
            const res = await fetch(`/api/apply/${applyId}/document/${documentId}`, {method: 'GET'});

            if ( res.ok ) {
                return await res.json();
            }
        }

        getDocument()
            .then((document: Document) => {
                /* フォーム初期化 */
                setSubmissionDate(document.submission_date)
                setMemo(document.memo ?? "");
            });
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/document/${documentId}`, {
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
                /* フォーム更新 */
                setSubmissionDate(newDocument.submission_date);
                setMemo(newDocument.memo ?? "");

                dispatch( dispToast({ status: "success", message: `提出書類の更新が完了しました。` }) );
            });
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>書類提出日</label>
                <input
                    type="date"
                    name="submission_date"
                    value={ submissionDate }
                    onChange={ (e) => setSubmissionDate(e.target.value) }
                />
                { validationErrors.submission_date && <p className="text-red-500">{ validationErrors.submission_date.join(',') }</p> }
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

export default DocumentEditPage;
