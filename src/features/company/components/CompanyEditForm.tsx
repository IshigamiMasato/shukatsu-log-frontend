"use client";

import FormContainer from "@/components/forms/FormContainer";
import FormItem from "@/components/forms/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Textarea from "@/components/elements/Textarea";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import { dispToast } from "@/store/modules/toast";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormTitle from "@/components/forms/FormTitle";
import { Company } from "@/types";

const CompanyEditForm = ({ company } : { company: Company }) => {
    const [name, setName]                     = useState<string>(company.name                      ?? "");
    const [url, setURL]                       = useState<string>(company.url                       ?? "");
    const [president, setPresident]           = useState<string>(company.president                 ?? "");
    const [address, setAddress]               = useState<string>(company.address                   ?? "");
    const [establishDate, setEstablishDate]   = useState<string>(company.establish_date            ?? "");
    const [employeeNumber, setEmployeeNumber] = useState<number|undefined>(company.employee_number ?? undefined);
    const [listingClass, setListingClass]     = useState<string>(company.listing_class             ?? "");
    const [benefit, setBenefit]               = useState<string>(company.benefit                   ?? "");
    const [memo, setMemo]                     = useState<string>(company.memo                      ?? "");
    const [validationErrors, setValidationErrors] = useState<{ name?: []; url?: []; president?: []; address?: []; establish_date?: []; employee_number?: []; listing_class?: []; benefit?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/company/${company.company_id}`, {
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
                setName(newCompany.name                      ?? "");
                setURL(newCompany.url                        ?? "");
                setPresident(newCompany.president            ?? "");
                setAddress(newCompany.address                ?? "");
                setEstablishDate(newCompany.establish_date   ?? "");
                setEmployeeNumber(newCompany.employee_number ?? undefined);
                setListingClass(newCompany.listing_class     ?? "");
                setBenefit(newCompany.benefit                ?? "");
                setMemo(newCompany.memo                      ?? "");

                dispatch( dispToast({ status: "success", message: `企業更新が完了しました。` }) );
            });
        })
    }

    return (
        <FormContainer>
            <FormTitle>企業編集フォーム</FormTitle>
            <form onSubmit={onSubmit}>
                <FormItem>
                    <Label>企業名</Label><RequiredBadge />
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
                    <Label>企業URL</Label>
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
                    <Label>社長名</Label>
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
                    <Label>住所</Label>
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
                    <Label>設立年月日</Label>
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
                    <Label>従業員数</Label>
                    <Input
                        type="number"
                        name="employee_number"
                        value={ employeeNumber ?? "" }
                        onChange={ e => setEmployeeNumber( e.target.value ? Number(e.target.value) : undefined ) }
                        errors={validationErrors.employee_number}
                        min={1}
                    />
                    { validationErrors.employee_number && <ValidationErrorMsg errors={validationErrors.employee_number} /> }
                </FormItem>
                <FormItem>
                    <Label>上場区分</Label>
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
                    <Label>福利厚生</Label>
                    <Textarea
                        name="benefit"
                        value={ benefit }
                        onChange={ e => setBenefit(e.target.value) }
                        errors={validationErrors.benefit}
                    />
                    { validationErrors.benefit && <ValidationErrorMsg errors={validationErrors.benefit} /> }
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
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">更新</Button>
            </form>
        </FormContainer>
    );
}

export default CompanyEditForm;
