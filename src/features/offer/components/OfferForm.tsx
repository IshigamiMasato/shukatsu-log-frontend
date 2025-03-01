"use client";

import FormItem from "@/components/containers/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/elements/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/elements/ValidationErrorMsg";
import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

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
                <Label label="内定通知日" /><RequiredBadge />
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
                <Textarea
                    name="memo"
                    value={ memo }
                    onChange={ e => setMemo(e.target.value) }
                    errors={validationErrors.memo}
                />
                { validationErrors.memo && <ValidationErrorMsg errors={validationErrors.memo} /> }
            </FormItem>
            <Button>登録</Button>
        </form>
    )
}

export default OfferForm;
