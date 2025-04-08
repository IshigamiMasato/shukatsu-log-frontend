"use client";

import { Apply } from "@/types";
import { faBuilding, faChevronCircleUp, faChevronRight, faClockRotateLeft, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import getBadge from "../getBadge";
import Link from "next/link";
import ActionContainer from "@/components/containers/ActionContainer";
import ApplyDeleteButton from "./ApplyDeleteButton";

const ApplyIndexForSP = ({applies} : {applies : Apply[]}) => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (applyId: number) => {
        setOpenItems((prev) =>
            prev.includes(applyId)
                ? prev.filter((val) => val !== applyId)
                : [...prev, applyId]
        );
    };

    return (
        <div className="shadow-md rounded-lg border sm:hidden block bg-white">
            {applies.map((apply: Apply) => {
                const isOpen = openItems.includes(apply.apply_id);

                return (
                    <div key={apply.apply_id} className="border-b border-gray-200">
                        <button className="w-full flex items-center px-6 py-3 hover:bg-gray-50 rounded-lg" onClick={ () => toggleItem(apply.apply_id) }>
                            <span className={`text-2xl text-blue-500 transform transition-transform mr-2 ${ isOpen ? 'rotate-180' : '' }`}>
                                <FontAwesomeIcon icon={faChevronCircleUp} />
                            </span>
                            <span className="font-semibold text-sm">{ apply.company.name } / { apply.occupation }</span>
                        </button>

                        <div className={`text-sm space-y-3 px-6 py-3 ${ isOpen ? 'display' : 'hidden'}`}>
                            <div className="flex">
                                <div className="w-32 font-medium">ステータス</div>
                                <div>
                                    { getBadge(apply.status) }
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-32 font-medium">選考履歴</div>
                                <div>
                                    <Link href={`/apply/${apply.apply_id}/process`}>
                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs !px-3 !py-2">
                                            <FontAwesomeIcon icon={faClockRotateLeft} />
                                        </ActionContainer>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-32 font-medium">企業詳細</div>
                                <div>
                                    <Link href={`/company/${apply.company_id}`}>
                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs !px-3 !py-2">
                                            <FontAwesomeIcon icon={faBuilding} />
                                        </ActionContainer>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-32 font-medium">編集/削除</div>
                                <div className="space-x-2">
                                    <Link href={`/apply/${apply.apply_id}/edit`}>
                                        <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs !px-3 !py-2">
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                        </ActionContainer>
                                    </Link>
                                    <ApplyDeleteButton applyId={apply.apply_id}>
                                        <ActionContainer className="bg-red-600 hover:bg-red-700 text-white text-xs !px-3 !py-2">
                                                <FontAwesomeIcon icon={faTrash} />
                                        </ActionContainer>
                                    </ApplyDeleteButton>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-32 font-medium">登録日時</div>
                                <div>{ apply.created_at }</div>
                            </div>
                            <div className="flex">
                                <div className="w-32 font-medium">更新日時</div>
                                <div>{ apply.updated_at }</div>
                            </div>
                            <div>
                                <Link href={`/apply/${apply.apply_id}`} className="text-blue-500 hover:underline">
                                    <span className="mr-1">応募詳細を表示</span>
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

export default ApplyIndexForSP;
