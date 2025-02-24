"use client";

import { FINAL_RESULT_STATUS } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormItem from "./containers/FormItem";
import Label from "./elements/Label";
import ValidationErrorMsg from "./elements/ValidationErrorMsg";
import Input from "./elements/Input";
import Button from "./elements/Button";

const FinalResultForm = ({ applyId } : { applyId : number }) => {
    const [status, setStatus] = useState<number>();
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ status?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    const onSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/final_result`, {
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
                dispatch( dispToast({ status: "error", message: `選考終了情報の登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            dispatch( dispToast({ status: "success", message: `選考終了情報の登録が完了しました。` }) );
        })
    }

    return (
        <form method="POST" onSubmit={onSubmit}>
            <FormItem>
                <Label label="ステータス" />
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
                { validationErrors.status && <ValidationErrorMsg errors={validationErrors.status} /> }
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

export default FinalResultForm;
