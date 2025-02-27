"use client";

import FormItem from "@/components/containers/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/elements/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/elements/ValidationErrorMsg";
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
        <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto">
            <h2 className="text-lg font-semibold mb-5">企業編集フォーム</h2>
            <form onSubmit={onSubmit}>
                <FormItem>
                    <Label label="企業名" /><RequiredBadge />
                    <Input
                        type="text"
                        name="name"
                        value={ name }
                        onChange={ e => setName(e.target.value) }
                        errors={validationErrors.name}
                    />
                    { validationErrors.name && <ValidationErrorMsg errors={validationErrors.name} /> }
                </FormItem>
                <FormItem>
                    <Label label="企業URL" />
                    <Input
                        type="text"
                        name="url"
                        value={ url }
                        onChange={ e => setURL(e.target.value) }
                        errors={validationErrors.url}
                    />
                    { validationErrors.url && <ValidationErrorMsg errors={validationErrors.url} /> }
                </FormItem>
                <FormItem>
                    <Label label="社長名" />
                    <Input
                        type="text"
                        name="president"
                        value={ president }
                        onChange={ e => setPresident(e.target.value) }
                        errors={validationErrors.president}
                    />
                    { validationErrors.president && <ValidationErrorMsg errors={validationErrors.president} /> }
                </FormItem>
                <FormItem>
                    <Label label="住所" />
                    <Input
                        type="text"
                        name="address"
                        value={ address }
                        onChange={ e => setAddress(e.target.value) }
                        errors={validationErrors.address}
                    />
                    { validationErrors.address && <ValidationErrorMsg errors={validationErrors.address} /> }
                </FormItem>
                <FormItem>
                    <Label label="設立年月日" />
                    <Input
                        type="date"
                        name="establish_date"
                        value={ establishDate }
                        onChange={ e => setEstablishDate(e.target.value) }
                        errors={validationErrors.establish_date}
                    />
                    { validationErrors.establish_date && <ValidationErrorMsg errors={validationErrors.establish_date} /> }
                </FormItem>
                <FormItem>
                    <Label label="従業員数" />
                    <Input
                        type="number"
                        name="employee_number"
                        value={ employeeNumber }
                        onChange={ e => setEmployeeNumber(Number(e.target.value)) }
                        errors={validationErrors.employee_number}
                    />
                    { validationErrors.employee_number && <ValidationErrorMsg errors={validationErrors.employee_number} /> }
                </FormItem>
                <FormItem>
                    <Label label="上場区分" />
                    <Input
                        type="text"
                        name="listing_class"
                        value={ listingClass }
                        onChange={ e => setListingClass(e.target.value) }
                        errors={validationErrors.listing_class}
                    />
                    { validationErrors.listing_class && <ValidationErrorMsg errors={validationErrors.listing_class} /> }
                </FormItem>
                <FormItem>
                    <Label label="福利厚生" />
                    <Textarea
                        name="benefit"
                        value={ benefit }
                        onChange={ e => setBenefit(e.target.value) }
                        errors={validationErrors.benefit}
                    />
                    { validationErrors.benefit && <ValidationErrorMsg errors={validationErrors.benefit} /> }
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
                <Button className="bg-blue-600 text-white mt-3">更新</Button>
            </form>
        </div>
    );
}

export default CompanyEditPage;
