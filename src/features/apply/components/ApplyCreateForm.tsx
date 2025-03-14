"use client";

import FormContainer from "@/components/forms/FormContainer";
import FormItem from "@/components/forms/FormItem";
import FormTitle from "@/components/forms/FormTitle";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Select from "@/components/elements/Select";
import Textarea from "@/components/elements/Textarea";
import { dispToast } from "@/store/modules/toast";
import { Apply, Company } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const ApplyCreateForm = ({ companies } : { companies: Company[] }) => {
    const [companyId, setCompanyId]   = useState<number|undefined>(undefined);
    const [occupation, setOccupation] = useState<string>("");
    const [applyRoute, setApplyRoute] = useState<string>("");
    const [memo, setMemo]             = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<{ company_id?: []; status?: []; occupation?: []; apply_route?: []; memo?: []; }>({});
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch('/api/apply', {
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
                dispatch( dispToast({ status: "error", message: `応募登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then((newApply:Apply) => {
                dispatch( dispToast({ status: "success", message: '応募登録が完了しました。引き続き選考履歴を登録してください。' }) );
                router.push(`/apply/${newApply.apply_id}/process/create`);
            });
        })
    }

    return (
        <FormContainer>
            <FormTitle>応募登録フォーム</FormTitle>
            <form method="POST" onSubmit={onSubmit}>
                <FormItem>
                    <Label>企業</Label><RequiredBadge />
                    <Select
                        name="company_id"
                        value={ companyId ?? "" }
                        onChange={ (e) => setCompanyId(Number(e.target.value)) }
                        errors={validationErrors.company_id}
                    >
                        <option value="">選択してください</option>
                        {companies.map(company => {
                            return (
                                <option key={ company.company_id } value={ company.company_id }>
                                    { company.name }
                                </option>
                            )
                        })}
                    </Select>
                    { validationErrors.company_id && <ValidationErrorMsg errors={validationErrors.company_id} /> }
                </FormItem>
                <FormItem>
                    <Label>職種</Label><RequiredBadge />
                    <Input
                        type="text"
                        name="occupation"
                        value={ occupation }
                        onChange={ e => setOccupation(e.target.value) }
                        errors={validationErrors.occupation}
                    />
                    { validationErrors.occupation && <ValidationErrorMsg errors={validationErrors.occupation} /> }
                </FormItem>
                <FormItem>
                    <Label>応募経路</Label>
                    <Input
                        type="text"
                        name="apply_route"
                        value={ applyRoute }
                        onChange={ e => setApplyRoute(e.target.value) }
                        errors={validationErrors.apply_route}
                    />
                    { validationErrors.apply_route && <ValidationErrorMsg errors={validationErrors.apply_route} /> }
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
        </FormContainer>
    )
}

export default ApplyCreateForm;
