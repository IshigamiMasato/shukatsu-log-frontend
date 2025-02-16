"use client";

import { APPLY_STATUS } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import { FormEvent, use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ApplyEditPage = ({ params } : { params : Promise<{ applyId: string }> }) => {
    const { applyId } = use(params); // use()はawaitのように動作するため、use(params)の処理が完了するまでそれ以降の処理は実行されない

    const [companyName, setCompanyName] = useState<string>("");

    const [status, setStatus] = useState<number>();
    const [occupation, setOccupation] = useState<string>("");
    const [applyRoute, setApplyRoute] = useState<string>("");
    const [memo, setMemo] = useState<string>("");

    const [validationErrors, setValidationErrors] = useState<{ company_id?: []; status?: []; occupation?: []; apply_route?: []; memo?: []; }>({});

    useEffect(() => {
        const getApply= async () => {
            const res = await fetch(`/api/apply/${applyId}`, {method: 'GET'});

            if ( res.ok ) {
                return await res.json();
            }
        }

        getApply()
            .then(apply => {
                /* フォーム初期化 */
                setCompanyName(apply.company.name);
                setStatus(apply.status);
                // NULL許可項目はAPIからNULLで返却される。フォームにNULLを設定するとIDEでエラーになるためNULLの場合は初期値に変換
                setOccupation(apply.occupation   ?? "");
                setApplyRoute(apply.apply_route  ?? "");
                setMemo(apply.memo               ?? "");
            });
    }, []);

    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}`, {
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
                dispatch( dispToast({ status: "error", message: `応募更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then(newApply => {
                /* フォーム更新 */
                setStatus(newApply.status);
                // NULL許可項目はAPIからNULLで返却される。フォームにNULLを設定するとIDEでエラーになるためNULLの場合は初期値に変換
                setOccupation(newApply.occupation   ?? "");
                setApplyRoute(newApply.apply_route  ?? "");
                setMemo(newApply.memo               ?? "");

                dispatch( dispToast({ status: "success", message: `応募更新が完了しました。` }) );
            });
        })
    }

    return (
        <form method="PUT" onSubmit={onSubmit}>
            <div>
                <label>企業</label>
                <input type="text" disabled value={ companyName } />
            </div>
            <div>
                <label>ステータス</label>
                <select
                    name="status"
                    value={ status }
                    onChange={ (e) => setStatus( Number(e.target.value) ) }
                >
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
            <div>
                <label>職種</label>
                <input
                    type="text"
                    name="occupation"
                    value={ occupation }
                    onChange={ e => setOccupation(e.target.value) }
                />
                { validationErrors.occupation && <p className="text-red-500">{ validationErrors.occupation.join(',') }</p> }
            </div>
            <div>
                <label>応募経路</label>
                <input
                    type="text"
                    name="apply_route"
                    value={ applyRoute }
                    onChange={ e => setApplyRoute(e.target.value) }
                />
                { validationErrors.apply_route && <p className="text-red-500">{ validationErrors.apply_route.join(',') }</p> }
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
    );
}

export default ApplyEditPage;
