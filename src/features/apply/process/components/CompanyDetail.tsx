"use client";

import { Company } from "@/types";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import InfoBlock from "@/components/InfoBlock";
import { cn } from "@/utils";

const CompanyDetail = ({company} : {company: Company}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="mb-5">
            <button onClick={ () => setIsOpen(prev => !prev) } className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faBuilding} />
                { isOpen ? <span className="ml-1">企業詳細を非表示</span> : <span className="ml-1">企業詳細を表示</span> }
            </button>
            <div className={cn(
                'p-5 border border-gray-200 rounded-lg shadow-md bg-white',
                !isOpen && 'hidden',
            )}>
                <InfoBlock label="企業名">{ company.name ?? "-" }</InfoBlock>
                <InfoBlock label="企業URL">{ company.url ?? "-" }</InfoBlock>
                <InfoBlock label="社長名">{ company.president ?? "-" }</InfoBlock>
                <InfoBlock label="住所">{ company.address ?? "-" }</InfoBlock>
                <InfoBlock label="設立年月日">{ company.establish_date ?? "-" }</InfoBlock>
                <InfoBlock label="従業員数">{ company.employee_number ? company.employee_number.toLocaleString() : "-" }</InfoBlock>
                <InfoBlock label="上場区分">{ company.listing_class ?? "-" }</InfoBlock>
                <InfoBlock label="事業内容">{ company.business_description ?? "-" }</InfoBlock>
                <InfoBlock label="福利厚生">{ company.benefit ?? "-" }</InfoBlock>
                <InfoBlock label="メモ">{ company.memo ?? "-" }</InfoBlock>
            </div>
        </div>
    )
}

export default CompanyDetail;
