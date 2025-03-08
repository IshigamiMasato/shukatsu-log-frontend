"use client";

import FormContainer from "@/components/containers/FormContainer";
import FormItem from "@/components/containers/FormItem";
import FormTitle from "@/components/containers/FormTitle";
import ValidationErrorMsg from "@/components/containers/ValidationErrorMsg";
import Button from "@/components/elements/Button";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/elements/RequiredBadge";
import Select from "@/components/elements/Select";
import Textarea from "@/components/elements/Textarea";
import { FINAL_RESULT_STATUS } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import { FinalResult } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FinalResultEditForm = ({ applyId, finalResultId } : { applyId : number, finalResultId : number }) => {
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
        <FormContainer>
            <FormTitle>選考終了情報編集フォーム</FormTitle>
            <form method="POST" onSubmit={onSubmit}>
                <FormItem>
                    <Label label="ステータス" /><RequiredBadge />
                    <Select
                        name="status"
                        value={ status }
                        onChange={ (e) => setStatus( Number(e.target.value) ) }
                        errors={validationErrors.status}
                    >
                        <option value="">選択してください</option>
                        {FINAL_RESULT_STATUS.map(apply => {
                            return (
                                <option key={ apply.id } value={ apply.id }>
                                    { apply.name }
                                </option>
                            )
                        })}
                    </Select>
                    { validationErrors.status && <ValidationErrorMsg errors={validationErrors.status} /> }
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

export default FinalResultEditForm;
