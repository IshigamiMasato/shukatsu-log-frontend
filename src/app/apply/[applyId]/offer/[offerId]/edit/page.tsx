"use client";

import FormItem from "@/components/containers/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import ValidationErrorMsg from "@/components/elements/ValidationErrorMsg";
import { dispToast } from "@/store/modules/toast";
import { Offer } from "@/types";
import { FormEvent, use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const OfferEditPage = ({ params } : { params : Promise<{ applyId: number, offerId: number }> }) => {
    const { applyId, offerId } = use(params);

    const [offerDate, setOfferDate] = useState<string>("");
    const [salary , setSalary] = useState<number>(0);
    const [condition, setCondition] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ offer_date?: []; salary?: []; condition?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    useEffect(() => {
        const getOffer = async () => {
            const res = await fetch(`/api/apply/${applyId}/offer/${offerId}`, {method: 'GET'});

            if ( res.ok ) {
                return await res.json();
            }
        }

        getOffer()
            .then((offer: Offer) => {
                /* フォーム初期化 */
                setOfferDate(offer.offer_date);
                setSalary(offer.salary ?? 0);
                setCondition(offer.condition ?? "");
                setMemo(offer.memo ?? "");
            });
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${applyId}/offer/${offerId}`, {
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
                dispatch( dispToast({ status: "error", message: `内定情報の更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then( (newOffer:Offer) => {
                /* フォーム更新 */
                setOfferDate(newOffer.offer_date);
                setSalary(newOffer.salary ?? 0);
                setCondition(newOffer.condition ?? "");
                setMemo(newOffer.memo ?? "");

                dispatch( dispToast({ status: "success", message: `内定情報の更新が完了しました。` }) );
            });
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

export default OfferEditPage;
