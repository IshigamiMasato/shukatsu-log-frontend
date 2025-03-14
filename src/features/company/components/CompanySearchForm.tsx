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
    const [name, setName]                             = useState<string>("");
    const [url, setURL]                               = useState<string>("");
    const [president, setPresident]                   = useState<string>("");
    const [address, setAddress]                       = useState<string>("");
    const [fromEstablishDate, setFromEstablishDate]   = useState<string>("");
    const [toEstablishDate, setToEstablishDate]       = useState<string>("");
    const [fromEmployeeNumber, setFromEmployeeNumber] = useState<number|undefined>(undefined);
    const [toEmployeeNumber, setToEmployeeNumber]     = useState<number|undefined>(undefined);
    const [benefit, setBenefit]                       = useState<string>("");
    const [memo, setMemo]                             = useState<string>("");
    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (name)               params.set('name', name);
        if (url)                params.set('url', url);
        if (president)          params.set('president', president);
        if (address)            params.set('address', address);
        if (fromEstablishDate)  params.set('from_establish_date', fromEstablishDate);
        if (toEstablishDate)    params.set('to_establish_date', toEstablishDate);
        if (fromEmployeeNumber) params.set('from_employee_number', fromEmployeeNumber.toString());
        if (toEmployeeNumber)   params.set('to_employee_number', toEmployeeNumber.toString());
        if (benefit)            params.set('benefit', benefit);
        if (memo)               params.set('memo', memo);

        const searchParams = params.toString();

        router.push(`/company/?${searchParams}`);
    }

    const clear = () => {
        setName("");
        setURL("");
        setPresident("");
        setAddress("");
        setFromEstablishDate("");
        setToEstablishDate("");
        setFromEmployeeNumber(undefined);
        setToEmployeeNumber(undefined);
        setBenefit("");
        setMemo("");
    }

    return (
        <div className="mb-5">
            <button onClick={ () => setIsOpen(prev => !prev) } className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                { isOpen ? <span>検索フォームを非表示</span> : <span>検索フォームを表示</span> }
            </button>

            <div className={`flex flex-wrap justify-center items-center p-5 border border-gray-200 rounded-lg shadow-md ${!isOpen && 'hidden'}`}>
                <FormItem className="w-1/2 px-2">
                    <Label>企業名</Label>
                    <Input
                        type="text"
                        name="name"
                        value={ name }
                        onChange={ e => setName(e.target.value) }
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label>企業URL</Label>
                    <Input
                        type="text"
                        name="url"
                        value={ url }
                        onChange={ e => setURL(e.target.value) }
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label>社長名</Label>
                    <Input
                        type="text"
                        name="president"
                        value={ president }
                        onChange={ e => setPresident(e.target.value) }
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label>住所</Label>
                    <Input
                        type="text"
                        name="address"
                        value={ address }
                        onChange={ e => setAddress(e.target.value) }
                    />
                </FormItem>
                <FormItem className="w-full px-2">
                    <Label className="text-nowrap mr-1">設立年月日</Label>
                    <div className="flex items-center w-1/2">
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
                <FormItem className="w-full px-2">
                    <Label className="text-nowrap mr-1">従業員数</Label>
                    <div className="flex items-center w-1/2">
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
                <FormItem className="w-1/2 px-2">
                    <Label>福利厚生</Label>
                    <Input
                        type="text"
                        name="benefit"
                        value={ benefit }
                        onChange={ e => setBenefit(e.target.value) }
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
