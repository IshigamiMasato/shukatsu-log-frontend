"use client";

import ActionContainer from "@/components/containers/ActionContainer";
import { Company } from "@/types";
import { faChevronCircleUp, faChevronRight, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CompanyDeleteButton from "./CompanyDeleteButton";
import { useState } from "react";

const CompanyIndexForSP = ({companies} : {companies : Company[]}) => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (companyId: number) => {
        setOpenItems((prev) =>
            prev.includes(companyId)
                ? prev.filter((val) => val !== companyId)
                : [...prev, companyId]
        );
    };

    return (
        <div className="shadow-md rounded-lg border sm:hidden block bg-white">
            {companies.map((company: Company) => {
                const isOpen = openItems.includes(company.company_id);

                return (
                    <div key={company.company_id} className="border-b border-gray-200">
                        <button className="w-full flex items-center px-6 py-3 hover:bg-gray-50 rounded-lg" onClick={ () => toggleItem(company.company_id) }>
                            <span className={`text-2xl text-blue-500 transform transition-transform mr-2 ${ isOpen ? 'rotate-180' : '' }`}>
                                <FontAwesomeIcon icon={faChevronCircleUp} />
                            </span>
                            <span className="font-semibold text-sm">{ company.name }</span>
                        </button>
                        <div className={`text-sm space-y-3 px-6 py-3 ${ isOpen ? 'display' : 'hidden'}`}>
                            <div className="flex">
                                <div className="w-32 font-medium">企業URL</div>
                                <div>
                                    <Link href={company.url ?? "#"} legacyBehavior>
                                        <a target="_blank" rel="noopener noreferrer">{ company.url }</a>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-32 font-medium">従業員数</div>
                                <div>{ company.employee_number?.toLocaleString() }</div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-32 font-medium">編集/削除</div>
                                <div className="space-x-2">
                                    <Link href={`/company/${company.company_id}/edit`}>
                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs !px-3 !py-2">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </ActionContainer>
                                    </Link>
                                    <CompanyDeleteButton companyId={company.company_id}>
                                        <ActionContainer className="bg-red-600 hover:bg-red-700 text-white text-xs !px-3 !py-2">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </ActionContainer>
                                    </CompanyDeleteButton>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-32 font-medium">登録日時</div>
                                <div>{ company.created_at }</div>
                            </div>
                            <div className="flex">
                                <div className="w-32 font-medium">更新日時</div>
                                <div>{ company.updated_at }</div>
                            </div>
                            <div>
                                <Link href={`/company/${company.company_id}`} className="text-blue-500 hover:underline">
                                    <span className="mr-1">企業詳細を表示</span>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CompanyIndexForSP;
