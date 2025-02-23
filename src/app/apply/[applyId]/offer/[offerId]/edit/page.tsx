"use client";

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
            <div>
                <label>内定通知日</label>
                <input
                    type="date"
                    name="offer_date"
                    value={ offerDate }
                    onChange={ e => setOfferDate(e.target.value) }
                />
                { validationErrors.offer_date && <p className="text-red-500">{ validationErrors.offer_date.join(',') }</p> }
            </div>
            <div>
                <label>年収</label>
                <input
                    type="number"
                    name="salary"
                    value={ salary }
                    onChange={ e => setSalary(Number(e.target.value)) }

                />
                { validationErrors.salary && <p className="text-red-500">{ validationErrors.salary.join(',') }</p> }
            </div>
            <div>
                <label>条件</label>
                <input
                    type="text"
                    name="condition"
                    value={ condition }
                    onChange={ e => setCondition(e.target.value) }
                />
                { validationErrors.condition && <p className="text-red-500">{ validationErrors.condition.join(',') }</p> }
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
    )
}

export default OfferEditPage;
