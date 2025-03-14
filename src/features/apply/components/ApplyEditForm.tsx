"use client";

import FormContainer from "@/components/forms/FormContainer";
import FormItem from "@/components/forms/FormItem";
import FormTitle from "@/components/forms/FormTitle";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Select from "@/components/elements/Select";
import Textarea from "@/components/elements/Textarea";
import { APPLY_STATUS } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import { Apply } from "@/types";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const ApplyEditForm = ({ apply } : { apply: Apply }) => {
    const [status, setStatus]           = useState<number>(apply.status);
    const [occupation, setOccupation]   = useState<string>(apply.occupation  ?? "");
    const [applyRoute, setApplyRoute]   = useState<string>(apply.apply_route ?? "");
    const [memo, setMemo]               = useState<string>(apply.memo        ?? "");
    const [validationErrors, setValidationErrors] = useState<{ company_id?: []; status?: []; occupation?: []; apply_route?: []; memo?: []; }>({});
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/apply/${apply.apply_id}`, {
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
                dispatch( dispToast({ status: "error", message: `応募更新に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then((newApply: Apply) => {
                setStatus(newApply.status);
                setOccupation(newApply.occupation   ?? "");
                setApplyRoute(newApply.apply_route  ?? "");
                setMemo(newApply.memo               ?? "");

                dispatch( dispToast({ status: "success", message: `応募更新が完了しました。` }) );
            });
        })
    }

    return (
        <FormContainer>
            <FormTitle>応募編集フォーム</FormTitle>
            <form method="PUT" onSubmit={onSubmit}>
                <FormItem>
                    <Label label="企業" /><RequiredBadge />
                    <Input
                        type="text"
                        name="name"
                        value={ apply.company.name }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem>
                    <Label label="ステータス" /><RequiredBadge />
                    <Select
                        name="status"
                        value={ status }
                        onChange={ (e) => setStatus( Number(e.target.value) ) }
                        errors={validationErrors.status}
                    >
                        <option value="">選択してください</option>
                        {APPLY_STATUS.map(apply => {
                            return (
                                <option key={ apply.id } value={ apply.id }>
                                    { apply.name }
                                </option>
                            )
                        })}
                    </Select>
                    { validationErrors.status && <p className="text-red-500">{ validationErrors.status.join(',') }</p> }
                </FormItem>
                <FormItem>
                    <Label label="職種" />
                    <Input
                        type="text"
                        name="occupation"
                        value={ occupation }
                        onChange={ e => setOccupation(e.target.value) }
                        errors={validationErrors.occupation}
                    />
                    { validationErrors.occupation && <p className="text-red-500">{ validationErrors.occupation.join(',') }</p> }
                </FormItem>
                <FormItem>
                    <Label label="応募経路" />
                    <Input
                        type="text"
                        name="apply_route"
                        value={ applyRoute }
                        onChange={ e => setApplyRoute(e.target.value) }
                        errors={validationErrors.apply_route}
                    />
                    { validationErrors.apply_route && <p className="text-red-500">{ validationErrors.apply_route.join(',') }</p> }
                </FormItem>
                <FormItem>
                    <Label label="メモ" />
                    <Textarea
                        name="memo"
                        value={ memo }
                        onChange={ e => setMemo(e.target.value) }
                        errors={validationErrors.memo}
                    />
                    { validationErrors.memo && <p className="text-red-500">{ validationErrors.memo.join(',') }</p> }
                </FormItem>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">登録</Button>
            </form>
        </FormContainer>
    );
}

export default ApplyEditForm;
