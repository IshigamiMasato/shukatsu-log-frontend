"use client";

import FormItem from "@/components/forms/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import { dispToast } from "@/store/modules/toast";
import moment from "moment";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormTitle from "@/components/forms/FormTitle";
import { useRouter } from "next/navigation";

const OfferCreateForm = ({ applyId } : { applyId : number }) => {
    const [offerDate, setOfferDate] = useState<string>( moment().format("YYYY-MM-DD") );
    const [salary , setSalary] = useState<number>();
    const [condition, setCondition] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ offer_date?: []; salary?: []; condition?: []; memo?: []; }>({});
    const dispatch = useDispatch();
    const router = useRouter();

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
            router.push(`/apply/${applyId}/process`);
        })
    }

    return (
        <div className="border p-4">
            <FormTitle>内定情報登録</FormTitle>
            <form method="POST" onSubmit={onSubmit}>
                <FormItem>
                    <Label>内定通知日</Label><RequiredBadge />
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
                    <Label>年収</Label>
                    <Input
                        type="number"
                        name="salary"
                        value={ salary ?? "" }
                        onChange={ e => setSalary( e.target.value ? Number(e.target.value) : undefined) }
                        errors={validationErrors.salary}
                        min={1}
                    />
                    { validationErrors.salary && <ValidationErrorMsg errors={validationErrors.salary} /> }
                </FormItem>
                <FormItem>
                    <Label>条件</Label>
                    <Textarea
                        name="condition"
                        value={ condition }
                        onChange={ e => setCondition(e.target.value) }
                        errors={validationErrors.condition}
                    />
                    { validationErrors.condition && <ValidationErrorMsg errors={validationErrors.condition} /> }
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

export default OfferCreateForm;
