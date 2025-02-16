"use client";

import { APPLY_STATUS } from "@/constants/const";
import { dispToast } from "@/store/modules/toast";
import { Company } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ApplyCreatePage = () => {
    const [companies, setCompanies] = useState<Company[]>([]);

    const [companyId, setCompanyId] = useState<number|undefined>(undefined);
    const [status, setStatus] = useState<number|undefined>(undefined);
    const [occupation, setOccupation] = useState<string>("");
    const [applyRoute, setApplyRoute] = useState<string>("");
    const [memo, setMemo] = useState<string>("");

    const [validationErrors, setValidationErrors] = useState<{ company_id?: []; status?: []; occupation?: []; apply_route?: []; memo?: []; }>({});

    useEffect(() => {
        const getCompanies = async () => {
            const res = await fetch('/api/company', {method: "GET"});

            if ( res.ok ) {
                const companies = await res.json();
                setCompanies(companies);
            }
        }

        getCompanies();
    }, []);

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

            res.json().then(newApply => {
                dispatch( dispToast({ status: "success", message: `企業名：${newApply.company.name} への応募登録が完了しました。` }) );
                router.push('/apply');
            });
        })
    }

    return (
        <form method="POST" onSubmit={onSubmit}>
            <div>
                <label>企業</label>
                <select
                    name="company_id"
                    value={ companyId }
                    onChange={ (e) => setCompanyId(Number(e.target.value)) }
                >
                    {companies.map(company => {
                        return (
                            <option key={ company.company_id } value={ company.company_id }>
                                { company.name }
                            </option>
                        )
                    })}
                </select>
                { validationErrors.company_id && <p className="text-red-500">{ validationErrors.company_id.join(',') }</p> }
            </div>
            <div>
                <label>ステータス</label>
                <select
                    name="status"
                    value={ status }
                    onChange={ (e) => setStatus( Number(e.target.value) ) }
                >
                    {APPLY_STATUS.map(apply => {
                        return (
                            <option key={ apply.id } value={ apply.id }>
                                { apply.name }
                            </option>
                        )
                    })}
                </select>
                { validationErrors.status && <p className="text-red-500">{ validationErrors.status.join(',') }</p> }
            </div>
            <div>
                <label>職種</label>
                <input
                    type="text"
                    name="occupation"
                    value={ occupation }
                    onChange={ e => setOccupation(e.target.value) }
                />
                { validationErrors.occupation && <p className="text-red-500">{ validationErrors.occupation.join(',') }</p> }
            </div>
            <div>
                <label>応募経路</label>
                <input
                    type="text"
                    name="apply_route"
                    value={ applyRoute }
                    onChange={ e => setApplyRoute(e.target.value) }
                />
                { validationErrors.apply_route && <p className="text-red-500">{ validationErrors.apply_route.join(',') }</p> }
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

export default ApplyCreatePage;
