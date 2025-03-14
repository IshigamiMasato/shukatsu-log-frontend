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
                <FormItem className="w-1/2 px-2">
                    <Label label="企業名" />
                    <Input
                        type="text"
                        name="name"
                        value={ company.name }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label label="企業URL" />
                    <Input
                        type="text"
                        name="url"
                        value={ company.url ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label label="社長名" />
                    <Input
                        type="text"
                        name="president"
                        value={ company.president ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label label="住所" />
                    <Input
                        type="text"
                        name="address"
                        value={ company.address ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label label="設立年月日" />
                    <Input
                        type="date"
                        name="establish_date"
                        value={ company.establish_date ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label label="従業員数" />
                    <Input
                        type="number"
                        name="employee_number"
                        value={ company.employee_number ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label label="上場区分" />
                    <Input
                        type="text"
                        name="listing_class"
                        value={ company.listing_class ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <div />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label label="福利厚生" />
                    <Textarea
                        name="benefit"
                        value={ company.benefit ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
                <FormItem className="w-1/2 px-2">
                    <Label label="メモ" />
                    <Textarea
                        name="memo"
                        value={ company.memo ?? "" }
                        disabled={true}
                        className="text-gray-500 bg-gray-100"
                    />
                </FormItem>
            </div>
        </div>
    )
}

export default CompanyDetail;
