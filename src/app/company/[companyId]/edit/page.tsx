"use client";

import { dispToast } from "@/store/modules/toast";
import { FormEvent, use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CompanyEditPage = ({ params } : { params : Promise<{ companyId: string }> }) => {
    const { companyId } = use(params); // use()はawaitのように動作するため、use(params)の処理が完了するまでそれ以降の処理は実行されない

    const [name, setName]                     = useState<string>("");
    const [url, setURL]                       = useState<string>("");
    const [president, setPresident]           = useState<string>("");
    const [address, setAddress]               = useState<string>("");
    const [establishDate, setEstablishDate]   = useState<string>("");
    const [employeeNumber, setEmployeeNumber] = useState<number>(0);
    const [listingClass, setListingClass]     = useState<string>("");
    const [benefit, setBenefit]               = useState<string>("");
    const [memo, setMemo]                     = useState<string>("");

    const [validationErrors, setValidationErrors] = useState<{ name?: []; url?: []; president?: []; address?: []; establish_date?: []; employee_number?: []; listing_class?: []; benefit?: []; memo?: []; }>({});

    useEffect(() => {
        const getCompany = async () => {
            const res = await fetch(`/api/company/${companyId}`, {method: 'GET'});

            if ( res.ok ) {
                return await res.json();
            }
        }

        getCompany()
            .then(company => {
                /* フォーム初期化 */
                setName(company.name);
                 // NULL許可項目はAPIからNULLで返却される。フォームにNULLを設定するとIDEでエラーになるためNULLの場合は初期値に変換
                setURL(company.url                        ?? "");
                setPresident(company.president            ?? "");
                setAddress(company.address                ?? "");
                setEstablishDate(company.establish_date   ?? "");
                setEmployeeNumber(company.employee_number ?? 0);
                setListingClass(company.listing_class     ?? "");
                setBenefit(company.benefit                ?? "");
                setMemo(company.memo                      ?? "");
            });
    }, []);

    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/company/${companyId}`, {
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
                dispatch( dispToast({ status: "error", message: `企業更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then(newCompany => {
                /* フォーム更新 */
                setName(newCompany.name);
                 // NULL許可項目はAPIからNULLで返却される。フォームにNULLを設定するとIDEでエラーになるためNULLの場合は初期値に変換
                setURL(newCompany.url                        ?? "");
                setPresident(newCompany.president            ?? "");
                setAddress(newCompany.address                ?? "");
                setEstablishDate(newCompany.establish_date   ?? "");
                setEmployeeNumber(newCompany.employee_number ?? 0);
                setListingClass(newCompany.listing_class     ?? "");
                setBenefit(newCompany.benefit                ?? "");
                setMemo(newCompany.memo                      ?? "");

                dispatch( dispToast({ status: "success", message: `企業更新が完了しました。` }) );
            });
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>企業名</label>
                    <input
                        type="text"
                        name="name"
                        value={ name }
                        onChange={ e => setName(e.target.value) }
                    />
                    { validationErrors.name && <p className="text-red-500">{ validationErrors.name.join(',') }</p> }
                </div>
                <div>
                    <label>企業URL</label>
                    <input
                        type="text"
                        name="url"
                        value={ url }
                        onChange={ e => setURL(e.target.value) }
                    />
                    { validationErrors.url && <p className="text-red-500">{ validationErrors.url.join(',') }</p> }
                </div>
                <div>
                    <label>社長名</label>
                    <input
                        type="text"
                        name="president"
                        value={ president }
                        onChange={ e => setPresident(e.target.value) }
                    />
                    { validationErrors.president && <p className="text-red-500">{ validationErrors.president.join(',') }</p> }
                </div>
                <div>
                    <label>住所</label>
                    <input
                        type="text"
                        name="address"
                        value={ address }
                        onChange={ e => setAddress(e.target.value) }
                    />
                    { validationErrors.address && <p className="text-red-500">{ validationErrors.address.join(',') }</p> }
                </div>
                <div>
                    <label>設立年月日</label>
                    <input
                        type="date"
                        name="establish_date"
                        value={ establishDate }
                        onChange={ e => setEstablishDate(e.target.value) }
                    />
                    { validationErrors.establish_date && <p className="text-red-500">{ validationErrors.establish_date.join(',') }</p> }
                </div>
                <div>
                    <label>従業員数</label>
                    <input
                        type="number"
                        name="employee_number"
                        value={ employeeNumber }
                        onChange={ e => setEmployeeNumber(Number(e.target.value)) }
                    />
                    { validationErrors.employee_number && <p className="text-red-500">{ validationErrors.employee_number.join(',') }</p> }
                </div>
                <div>
                    <label>上場区分</label>
                    <input
                        type="text"
                        name="listing_class"
                        value={ listingClass }
                        onChange={ e => setListingClass(e.target.value) }
                    />
                    { validationErrors.listing_class && <p className="text-red-500">{ validationErrors.listing_class.join(',') }</p> }
                </div>
                <div>
                    <label>福利厚生</label>
                    <input
                        type="textarea"
                        name="benefit"
                        value={ benefit }
                        onChange={ e => setBenefit(e.target.value) }
                    />
                    { validationErrors.benefit && <p className="text-red-500">{ validationErrors.benefit.join(',') }</p> }
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
        </div>
    );
}

export default CompanyEditPage;
