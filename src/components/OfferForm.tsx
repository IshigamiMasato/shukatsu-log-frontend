"use client";

import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormItem from "./containers/FormItem";
import Label from "./elements/Label";
import Input from "./elements/Input";
import ValidationErrorMsg from "./elements/ValidationErrorMsg";
import Button from "./elements/Button";

const OfferForm = ({ applyId } : { applyId : number }) => {
    const [offerDate, setOfferDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [salary , setSalary] = useState<number>();
    const [condition, setCondition] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ offer_date?: []; salary?: []; condition?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    const onSubmit = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/offer`, {
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
                dispatch( dispToast({ status: "error", message: `内定情報の登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            dispatch( dispToast({ status: "success", message: `内定情報の登録が完了しました。` }) );
        })
    }

    return (
        <form method="POST" onSubmit={onSubmit}>
            <FormItem>
                <Label label="内定通知日" />
                <Input
                    type="date"
                    name="offer_date"
                    value={ offerDate }
                    onChange={ e => setOfferDate(e.target.value) }
                    errors={validationErrors.offer_date}
                />
                { validationErrors.offer_date && <ValidationErrorMsg errors={validationErrors.offer_date} /> }
            </FormItem>
            <FormItem>
                <Label label="年収" />
                <Input
                    type="number"
                    name="salary"
                    value={ salary }
                    onChange={ e => setSalary(Number(e.target.value)) }
                    errors={validationErrors.salary}
                />
                { validationErrors.salary && <ValidationErrorMsg errors={validationErrors.salary} /> }
            </FormItem>
            <FormItem>
                <Label label="条件" />
                <Input
                    type="text"
                    name="condition"
                    value={ condition }
                    onChange={ e => setCondition(e.target.value) }
                    errors={validationErrors.condition}
                />
                { validationErrors.condition && <ValidationErrorMsg errors={validationErrors.condition} /> }
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

export default OfferForm;
