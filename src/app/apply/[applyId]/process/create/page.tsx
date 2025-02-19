"use client";

import { APPLY_STATUS } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, use, useState } from "react";
import { useDispatch } from "react-redux";

const fileToBase64 = async ( file : File ): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('ファイル読み込み失敗'));

        reader.readAsDataURL(file);
    });
}

const ProcessCreatePage = ({ params } : { params : Promise<{ applyId: string }> }) => {
    const { applyId } = use(params); // use()はawaitのように動作するため、use(params)の処理が完了するまでそれ以降の処理は実行されない

    const [status, setStatus] = useState<number>();

    /* 書類 */
    const [submissionDate, setSubmissionDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [memo, setMemo] = useState<string>("");
    const [file, setFile] = useState<File|undefined>(undefined);

    const [validationErrors, setValidationErrors] = useState<{ status?: []; submission_date?: []; file?: []; memo?: []; }>({});

    const dispatch = useDispatch();

    const onSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        if ( file ) {
            try {
                const base64File = await fileToBase64(file);
                formData.append('base64_file', base64File);

            } catch ( error ) {
                console.error(error);
                dispatch( dispToast({ status: "error", message: "ファイルの変換に失敗しました。" }) );
                return;
            }
        }

        // 書類選考中
        if ( status == 1 ) {
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
    }

    const handleFileChange = ( file: File|undefined ) => {
        if ( ! file ) {
            setFile(undefined);
        }
        setFile(file);
    }

    return (
        <>
            <div>
                <label>ステータス</label>
                <select
                    name="status"
                    value={ status }
                    onChange={ (e) => setStatus( Number(e.target.value) ) }
                >
                    <option value="">選択してください</option>
                    {APPLY_STATUS.map(apply => {
                        return (
                            <option key={ apply.id } value={ apply.id }>
                                { apply.name }
                            </option>
                        )
                    })}
                </select>
                { validationErrors.status && <p className="text-red-500">{ validationErrors.status.join(',') }</p> }
            </div>

            { status == 1  && (
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
                    <div>
                        <label>提出書類</label>
                        <input
                            type="file"
                            name="file"
                            onChange={ (e) => handleFileChange(e.target.files?.[0]) }
                        />
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
            )}

            {status == 2  && (
                <div>筆記試験選考中</div>
            )}

            {status == 3  && (
                <div>面接選考中</div>
            )}

            {status == 4  && (
                <div>内定</div>
            )}

            {status == 5  && (
                <div>選考終了</div>
            )}
        </>
    )
}

export default ProcessCreatePage;
