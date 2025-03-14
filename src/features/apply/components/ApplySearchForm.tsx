"use client";

import FormItem from "@/components/forms/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import Select from "@/components/elements/Select";
import { APPLY_STATUS } from "@/constants/const";
import { Company } from "@/types";
import { faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const ApplySearchForm = ({ companies } : { companies: Company[] }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [companyId, setCompanyId]         = useState<number|undefined>(undefined);
    const [checkedStatus, setCheckedStatus] = useState<number[]>([]);
    const [occupation, setOccupation]       = useState<string>("");
    const [applyRoute, setApplyRoute]       = useState<string>("");
    const [memo, setMemo]                   = useState<string>("");
    const router = useRouter();

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, statusId: number) => {
        setCheckedStatus((prevCheckedStatus) => {
            if (prevCheckedStatus.includes(statusId)) {
                return prevCheckedStatus.filter((status) => status != statusId);
            } else {
                return [...prevCheckedStatus, statusId];
            }
        });
    }

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (companyId) params.set('company_id', String(companyId));
        if (checkedStatus.length > 0) {
            checkedStatus.forEach(status => {
                params.append('status[]', String(status));
            });
        }
        if (occupation) params.set('occupation', occupation);
        if (applyRoute) params.set('apply_route', applyRoute);
        if (memo)       params.set('memo', memo);

        const searchParams = params.toString();

        router.push(`/apply/?${searchParams}`);
    }

    const clear = () => {
        setCompanyId(undefined);
        setCheckedStatus([]);
        setOccupation("");
        setApplyRoute("");
        setMemo("");
    }

    return (
        <div className="mb-5">
            <button onClick={ () => setIsOpen(prev => !prev) } className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                { isOpen ? <span>検索フォームを非表示</span> : <span>検索フォームを表示</span> }
            </button>

            <div className={`p-5 border border-gray-200 rounded-lg shadow-md ${!isOpen && 'hidden'}`}>
                <div className="flex flex-wrap justify-start items-center">
                    <FormItem className="w-1/2 px-2">
                        <Label>企業</Label>
                        <Select
                            name="company_id"
                            value={ companyId ?? "" }
                            onChange={ (e) => setCompanyId(Number(e.target.value)) }
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
                    </FormItem>
                    <FormItem className="w-full flex flex-wrap px-2">
                        {APPLY_STATUS.map((status) => {
                            return (
                                <div key={status.id} className="mr-2">
                                    <label htmlFor={status.name}>{status.name}</label>
                                    <input
                                        id={status.name}
                                        name="status"
                                        type="checkbox"
                                        value={status.id}
                                        checked={checkedStatus.includes(status.id)}
                                        onChange={ (e) => handleCheckboxChange(e, status.id)}
                                    />
                                </div>
                            );
                        })}
                    </FormItem>
                    <FormItem className="w-1/2 px-2">
                        <Label>職種</Label>
                        <Input
                            type="text"
                            name="occupation"
                            value={ occupation }
                            onChange={ e => setOccupation(e.target.value) }
                        />
                    </FormItem>
                    <FormItem className="w-1/2 px-2">
                        <Label>応募経路</Label>
                        <Input
                            type="text"
                            name="apply_route"
                            value={ applyRoute }
                            onChange={ e => setApplyRoute(e.target.value) }
                        />
                    </FormItem>
                    <FormItem className="w-1/2 px-2">
                        <Label>メモ</Label>
                        <Input
                            type="text"
                            name="memo"
                            value={ memo }
                            onChange={ e => setMemo(e.target.value) }
                        />
                    </FormItem>
                </div>
                <div className="flex justify-center text-center space-x-1 mt-5">
                    <Button className="bg-white border border-gray-300" onClick={ () => clear() }>
                        <FontAwesomeIcon icon={faCircleXmark} /><span className="ml-1">クリア</span>
                    </Button>
                    <Button className="bg-blue-500 text-white" onClick={ () => handleSearch() }>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /><span className="ml-1">検索</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ApplySearchForm;
