"use client";

import FormItem from "@/components/forms/FormItem";
import Button from "@/components/elements/Button";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Select from "@/components/elements/Select";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import { FINAL_RESULT_STATUS } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormTitle from "@/components/forms/FormTitle";
import { useRouter } from "next/navigation";

const FinalResultCreateForm = ({ applyId } : { applyId : number }) => {
    const [status, setStatus] = useState<number>();
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ status?: []; memo?: []; }>({});
    const dispatch = useDispatch();
    const router = useRouter();

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
            router.push(`/apply/${applyId}/process`);
        })
    }

    return (
        <div className="border p-4">
            <FormTitle>試験情報登録</FormTitle>
            <form method="POST" onSubmit={onSubmit}>
                <FormItem>
                    <Label>選考終了ステータス</Label><RequiredBadge />
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
                    <Label>メモ</Label>
                    <Textarea
                        name="memo"
                        value={ memo }
                        onChange={ e => setMemo(e.target.value) }
                        errors={validationErrors.memo}
                    />
                    { validationErrors.memo && <ValidationErrorMsg errors={validationErrors.memo} /> }
                </FormItem>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">登録</Button>
            </form>
        </div>
    )
}

export default FinalResultCreateForm;
