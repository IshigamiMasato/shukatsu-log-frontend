import ActionContainer from "@/components/containers/ActionContainer";
import TitleContainer from "@/components/containers/TitleContainer";
import { getApplies } from "@/features/apply/api/getApplies";
import ApplyDeleteButton from "@/features/apply/components/ApplyDeleteButton";
import ApplySearchForm from "@/features/apply/components/ApplySearchForm";
import DocumentSelectionStatusBadge from "@/features/apply/components/DocumentSelectionStatusBadge";
import ExamSelectionStatusBadge from "@/features/apply/components/ExamSelectionStatusBadge";
import FinalResultStatusBadge from "@/features/apply/components/FinalResultStatusBadge";
import InitStatusBadge from "@/features/apply/components/InitStatusBadge";
import InterviewSelectionStatusBadge from "@/features/apply/components/InterviewSelectionStatusBadge";
import OfferStatusBadge from "@/features/apply/components/OfferStatusBadge";
import { getCompanies } from "@/features/company/api/getCompanies";
import { Apply } from "@/types";
import { faCirclePlus, faClockRotateLeft, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { JSX } from "react";

const getBadge = (status: number): JSX.Element|null => {
    switch (status) {
        case 0:
            return <InitStatusBadge />;
        case 1:
            return <DocumentSelectionStatusBadge />;
        case 2:
            return <ExamSelectionStatusBadge />;
        case 3:
            return <InterviewSelectionStatusBadge />;
        case 4:
            return <OfferStatusBadge />;
        case 5:
            return <FinalResultStatusBadge />;
        default:
            return null;
    }
}

const ApplyPage = async (props: { searchParams: Promise<{ [key: string]: string|string[] }> }) => {
    const searchParams = await props.searchParams;
    let params = new URLSearchParams();;
    if (Object.keys(searchParams).length > 0) {
        Object.keys(searchParams).forEach(key => {
            const value = searchParams[key];
            if (Array.isArray(value)) {
                value.forEach(val => params.append(key, val));
            } else {
                params.append(key, value);
            }
        });
    }
    const applies = await getApplies(params);
    // トークンリフレッシュが必要な場合
    if ( applies === null ) return;

    const companies = await getCompanies();
    // トークンリフレッシュが必要な場合
    if ( companies === null ) return;

    return (
        <>
            <TitleContainer main="応募一覧" />
            <div className="container mx-auto px-8 py-6 bg-white rounded-lg">
                <ApplySearchForm companies={companies} />

                <div className="flex items-center justify-between overflow-x-auto mb-3 space-x-2">
                    <div className="text-gray-500 text-nowrap">
                        登録数：<span className="font-semibold text-black">10</span>件
                    </div>
                    <div className="flex items-center text-xs font-medium text-nowrap">
                        <p>ステータス：</p>
                        <InitStatusBadge />
                        <DocumentSelectionStatusBadge />
                        <ExamSelectionStatusBadge />
                        <InterviewSelectionStatusBadge />
                        <OfferStatusBadge />
                        <FinalResultStatusBadge />
                    </div>
                </div>

                <ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white mb-3">
                    <Link href='/apply/create'>
                        <FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">応募登録</span>
                    </Link>
                </ActionContainer>

                <div className="overflow-x-auto shadow-md rounded-lg border">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-nowrap">企業名 / 職種</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">ステータス</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">登録日時</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">更新日時</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">選考履歴</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">編集</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">削除</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applies.map((apply: Apply) => {
                                return (
                                    <tr key={ apply.apply_id } className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <Link href={`/apply/${apply.apply_id}`} className="text-blue-500 hover:underline">
                                                { apply.company.name } / { apply.occupation }
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            { getBadge(apply.status) }
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.created_at }</td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.updated_at }</td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                <Link href={`/apply/${apply.apply_id}/process`}>
                                                    <FontAwesomeIcon icon={faClockRotateLeft} />
                                                </Link>
                                            </ActionContainer>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                <Link href={`/apply/${apply.apply_id}/edit`}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Link>
                                            </ActionContainer>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                                <ApplyDeleteButton applyId={apply.apply_id}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </ApplyDeleteButton>
                                            </ActionContainer>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ApplyPage;
