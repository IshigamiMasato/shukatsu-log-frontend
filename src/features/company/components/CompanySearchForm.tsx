"use client";

import FormItem from "@/components/forms/FormItem";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import { faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CompanySearchForm = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [keyword, setKeyword]                       = useState<string>("");
    const [fromEstablishDate, setFromEstablishDate]   = useState<string>("");
    const [toEstablishDate, setToEstablishDate]       = useState<string>("");
    const [fromEmployeeNumber, setFromEmployeeNumber] = useState<number|undefined>(undefined);
    const [toEmployeeNumber, setToEmployeeNumber]     = useState<number|undefined>(undefined);
    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (keyword)            params.set('keyword', keyword);
        if (fromEstablishDate)  params.set('from_establish_date', fromEstablishDate);
        if (toEstablishDate)    params.set('to_establish_date', toEstablishDate);
        if (fromEmployeeNumber) params.set('from_employee_number', fromEmployeeNumber.toString());
        if (toEmployeeNumber)   params.set('to_employee_number', toEmployeeNumber.toString());

        const searchParams = params.toString();

        router.push(`/company/?${searchParams}`);
    }

    const clear = () => {
        setKeyword("");
        setFromEstablishDate("");
        setToEstablishDate("");
        setFromEmployeeNumber(undefined);
        setToEmployeeNumber(undefined);
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
                        <Label className="text-nowrap mr-1">設立年月日</Label>
                        <div className="flex items-center">
                            <Input
                                type="date"
                                name="from_establish_date"
                                value={ fromEstablishDate }
                                onChange={ e => setFromEstablishDate(e.target.value) }
                            />
                            〜
                            <Input
                                type="date"
                                name="to_establish_date"
                                value={ toEstablishDate }
                                onChange={ e => setToEstablishDate(e.target.value) }
                            />
                        </div>
                    </FormItem>
                    <FormItem className="sm:basis-1/2 w-full px-2">
                        <Label className="text-nowrap mr-1">従業員数</Label>
                            <div className="flex items-center">
                                <Input
                                    type="number"
                                    name="from_employee_number"
                                    value={ fromEmployeeNumber ?? "" }
                                    onChange={ e => setFromEmployeeNumber( e.target.value ? Number(e.target.value) : undefined ) }
                                    min={1}
                                />
                                〜
                                <Input
                                    type="number"
                                    name="to_employee_number"
                                    value={ toEmployeeNumber ?? "" }
                                    onChange={ e => setToEmployeeNumber( e.target.value ? Number(e.target.value) : undefined ) }
                                    min={1}
                                />
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

export default CompanySearchForm;
