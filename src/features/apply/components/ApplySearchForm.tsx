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

const ApplySearchForm = ({ companies, params } : { companies: Company[], params: URLSearchParams  }) => {
    const initParams = new URLSearchParams(params);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [keyword, setKeyword]             = useState<string>( initParams.get('keyword') ?? "" );
    const [companyId, setCompanyId]         = useState<number|undefined>( initParams.get('company_id') ? Number(initParams.get('company_id')) : undefined );
    const [checkedStatus, setCheckedStatus] = useState<number[]>( initParams.getAll('status[]').map(Number) );
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

        if (keyword)   params.set('keyword', keyword);
        if (companyId) params.set('company_id', String(companyId));
        if (checkedStatus.length > 0) {
            checkedStatus.forEach(status => {
                params.append('status[]', String(status));
            });
        }

        const searchParams = params.toString();

        router.push(`/apply/?${searchParams}`);
    }

    const clear = () => {
        setKeyword("");
        setCompanyId(undefined);
        setCheckedStatus([]);
    }

    return (
        <div className="mb-5">
            <button onClick={ () => setIsOpen(prev => !prev) } className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                { isOpen ? <span>検索フォームを非表示</span> : <span>検索フォームを表示</span> }
            </button>

            <div className={`p-5 border border-gray-200 rounded-lg shadow-md ${!isOpen && 'hidden'}`}>
                <div className="flex flex-wrap justify-start items-center">
                    <FormItem className="w-full px-2">
                        <Label>検索ワード</Label>
                        <Input
                            type="text"
                            name="keyword"
                            value={ keyword }
                            onChange={ e => setKeyword(e.target.value) }
                        />
                    </FormItem>
                    <FormItem className="sm:basis-1/2 w-full px-2">
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
                    <FormItem className="w-full px-2">
                        <Label>ステータス</Label>
                        <div className="border rounded-lg p-2 flex flex-wrap">
                            {APPLY_STATUS.map((status) => {
                                return (
                                    <div key={status.id} className="mr-2">
                                        <input
                                            id={status.name}
                                            name="status"
                                            type="checkbox"
                                            value={status.id}
                                            checked={checkedStatus.includes(status.id)}
                                            onChange={ (e) => handleCheckboxChange(e, status.id)}
                                        />
                                        <label htmlFor={status.name}>{status.name}</label>
                                    </div>
                                );
                            })}
                        </div>
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
