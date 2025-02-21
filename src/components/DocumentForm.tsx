"use client";

import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const DocumentForm = ({ applyId } : { applyId : number }) => {
    const FILE_COUNT = 5;

    const [submissionDate, setSubmissionDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [files, setFiles] = useState<(File|undefined)[]>([]);
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ status?: []; submission_date?: []; file?: []; memo?: []; }>({});

    const dispatch = useDispatch();

    const fileToBase64 = async ( file : File ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error('ファイル読み込み失敗'));

            reader.readAsDataURL(file);
        });
    }

    const onSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        for (let i = 1; i <= FILE_COUNT; i++) {
            try {
                const file = files[i];

                if ( file ) {
                    const base64File = await fileToBase64(file);
                    formData.append(`files[]`, base64File);
                }

            } catch ( error ) {
                console.error(error);
                dispatch( dispToast({ status: "error", message: "ファイルのアップロードに失敗しました。" }) );
                return;
            }
        }

        fetch(`/api/apply/${applyId}/document`, {
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
                dispatch( dispToast({ status: "error", message: `書類の登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            dispatch( dispToast({ status: "success", message: `書類の登録が完了しました。` }) );
        })
    }

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
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
            {
                [...Array(FILE_COUNT)].map((v, i) => {
                    const index = i + 1; // indexを1スタートとする

                    return (
                        <div key={`file_${index}`}>
                            <label>提出書類</label>
                            <input
                                type="file"
                                name={`file_${index}`}
                                onChange={ (e) => {
                                    const newFiles = [...files];
                                    newFiles[index] = e.target.files?.[0];
                                    setFiles(newFiles);
                                }}
                            />
                        </div>
                    )
                })
            }
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
    )
}

export default DocumentForm;
