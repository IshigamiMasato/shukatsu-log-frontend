"use client";

import FormItem from "@/components/forms/FormItem";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import Textarea from "@/components/elements/Textarea";
import { Company } from "@/types";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const CompanyDetail = ({company} : {company: Company}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="mb-5">
            <button onClick={ () => setIsOpen(prev => !prev) } className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faBuilding} />
                { isOpen ? <span className="ml-1">企業詳細を非表示</span> : <span className="ml-1">企業詳細を表示</span> }
            </button>
            <div className={`flex flex-wrap justify-center items-center p-5 border border-gray-200 rounded-lg shadow-md bg-white  ${!isOpen && 'hidden'}`}>
                <FormItem className="sm:basis-1/2 w-full px-2">
                    <Label>企業名</Label>
                    <Input
                        type="text"
                        name="name"
                        value={ company.name }
                        readOnly={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="sm:basis-1/2 w-full px-2">
                    <Label>企業URL</Label>
                    <Input
                        type="text"
                        name="url"
                        value={ company.url ?? "" }
                        readOnly={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="sm:basis-1/2 w-full px-2">
                    <Label>社長名</Label>
                    <Input
                        type="text"
                        name="president"
                        value={ company.president ?? "" }
                        readOnly={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="sm:basis-1/2 w-full px-2">
                    <Label>住所</Label>
                    <Input
                        type="text"
                        name="address"
                        value={ company.address ?? "" }
                        readOnly={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="sm:basis-1/2 w-full px-2">
                    <Label>設立年月日</Label>
                    <Input
                        type="date"
                        name="establish_date"
                        value={ company.establish_date ?? "" }
                        readOnly={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="sm:basis-1/2 w-full px-2">
                    <Label>従業員数</Label>
                    <Input
                        type="text"
                        name="employee_number"
                        value={ company.employee_number ? company.employee_number.toLocaleString() : '' }
                        readOnly={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="sm:basis-1/2 w-full px-2">
                    <Label>上場区分</Label>
                    <Input
                        type="text"
                        name="listing_class"
                        value={ company.listing_class ?? "" }
                        readOnly={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <div />
                </FormItem>
                <FormItem className="sm:basis-1/2 w-full px-2">
                    <Label>福利厚生</Label>
                    <Textarea
                        name="benefit"
                        value={ company.benefit ?? "" }
                        readOnly={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="sm:basis-1/2 w-full px-2">
                    <Label>メモ</Label>
                    <Textarea
                        name="memo"
                        value={ company.memo ?? "" }
                        readOnly={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
            </div>
        </div>
    )
}

export default CompanyDetail;
