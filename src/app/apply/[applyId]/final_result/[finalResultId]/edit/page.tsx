"use client";

import { FINAL_RESULT_STATUS } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import { FinalResult } from "@/types";
import { FormEvent, use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FinalResultEditPage = ({ params } : { params : Promise<{ applyId: number, finalResultId: number }> }) => {
    const { applyId, finalResultId } = use(params);

    const [status, setStatus] = useState<number>();
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ status?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    useEffect(() => {
        const getFinalResult = async () => {
            const res = await fetch(`/api/apply/${applyId}/final_result/${finalResultId}`, {method: 'GET'});

            if ( res.ok ) {
                return await res.json();
            }
        }

        getFinalResult()
            .then((finalResult: FinalResult) => {
                /* フォーム初期化 */
                setStatus(finalResult.status);
                setMemo(finalResult.memo ?? "");
            });
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/final_result/${finalResultId}`, {
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
                dispatch( dispToast({ status: "error", message: `選考終了情報の更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then( (newFinalResult:FinalResult) => {
                /* フォーム更新 */
                setStatus(newFinalResult.status);
                setMemo(newFinalResult.memo ?? "");

                dispatch( dispToast({ status: "success", message: `選考終了情報の更新が完了しました。` }) );
            });
        })
    }

    return (
        <form method="POST" onSubmit={onSubmit}>
            <div>
                <label>ステータス</label>
                <select
                    name="status"
                    value={ status }
                    onChange={ (e) => setStatus( Number(e.target.value) ) }
                >
                    <option value="">選択してください</option>
                    {FINAL_RESULT_STATUS.map(apply => {
                        return (
                            <option key={ apply.id } value={ apply.id }>
                                { apply.name }
                            </option>
                        )
                    })}
                </select>
                { validationErrors.status && <p className="text-red-500">{ validationErrors.status.join(',') }</p> }
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

export default FinalResultEditPage;
