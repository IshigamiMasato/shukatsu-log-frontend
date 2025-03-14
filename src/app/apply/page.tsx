import ActionContainer from "@/components/containers/ActionContainer";
import TitleContainer from "@/components/containers/TitleContainer";
import { DEFAULT_PAGE, DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, INTERVIEW_SELECTION, OFFER, PER_PAGE, UNREGISTERED_SELECTION_PROCESS } from "@/constants/const";
import { getApplies } from "@/features/apply/api/getApplies";
import ApplyDeleteButton from "@/features/apply/components/ApplyDeleteButton";
import ApplySearchForm from "@/features/apply/components/ApplySearchForm";
import DocumentSelectionStatusBadge from "@/features/apply/components/DocumentSelectionStatusBadge";
import ExamSelectionStatusBadge from "@/features/apply/components/ExamSelectionStatusBadge";
import FinalResultStatusBadge from "@/features/apply/components/FinalResultStatusBadge";
import UnregisteredSelectionProcessStatusBadge from "@/features/apply/components/UnregisteredSelectionProcessStatusBadge";
import InterviewSelectionStatusBadge from "@/features/apply/components/InterviewSelectionStatusBadge";
import OfferStatusBadge from "@/features/apply/components/OfferStatusBadge";
import { getCompanies } from "@/features/company/api/getCompanies";
import { Apply } from "@/types";
import { faBuilding, faChevronLeft, faChevronRight, faCirclePlus, faClockRotateLeft, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { JSX } from "react";

const getPageLink = (page: number, params: URLSearchParams) => {
	params.set('page', String(page));
    params.set('offset', String((Number(page) - 1) * PER_PAGE));
    params.set('limit', String(PER_PAGE));
	return `/apply?${params}`;
}

const getBadge = (status: number): JSX.Element|null => {
    switch (status) {
        case UNREGISTERED_SELECTION_PROCESS:
            return <UnregisteredSelectionProcessStatusBadge />;
        case DOCUMENT_SELECTION:
            return <DocumentSelectionStatusBadge />;
        case EXAM_SELECTION:
            return <ExamSelectionStatusBadge />;
        case INTERVIEW_SELECTION:
            return <InterviewSelectionStatusBadge />;
        case OFFER:
            return <OfferStatusBadge />;
        case FINAL_RESULT:
            return <FinalResultStatusBadge />;
        default:
            return null;
    }
}

const ApplyPage = async (props: { searchParams: Promise<{ [key: string]: string|string[] }> }) => {
    const searchParams = await props.searchParams;
    let params = new URLSearchParams();
    if (Object.keys(searchParams).length > 0) {
        Object.keys(searchParams).forEach(key => {
            const value = searchParams[key];
            // 選考ステータスの検索パラメータの場合 (ex: ?status[]=1&status[]=2...)
            if (Array.isArray(value)) {
                value.forEach(val => params.append(key, val));

            // 他検索パラメータの場合
            } else {
                params.set(key, value);
            }
        });
    }
    const resultGetApplies = await getApplies(params);
    // トークンリフレッシュが必要な場合
    if ( resultGetApplies === null ) return;
    const applies = resultGetApplies.data;
    const total = resultGetApplies.total;
    const pageCount = Math.ceil(total / PER_PAGE);
    const currentPage = params.has('page') ? params.get('page') : DEFAULT_PAGE;

    const resultGetCompanies = await getCompanies(new URLSearchParams());
    // トークンリフレッシュが必要な場合
    if ( resultGetCompanies === null ) return;
    const companies = resultGetCompanies.data;

    return (
        <>
            <TitleContainer main="応募一覧" />
            <div className="container mx-auto px-8 py-6 bg-white rounded-lg">
                <ApplySearchForm companies={companies} />

                <div className="flex items-center justify-between overflow-x-auto space-x-2 mb-3">
                    <div className="text-nowrap">
                        <Link href='/apply/create'>
                            <ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white">
                                <FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">応募登録</span>
                            </ActionContainer>
                        </Link>
                    </div>
                    <div className="flex items-center text-xs font-medium text-nowrap">
                        <p>ステータス：</p>
                        <UnregisteredSelectionProcessStatusBadge />
                        <DocumentSelectionStatusBadge />
                        <ExamSelectionStatusBadge />
                        <InterviewSelectionStatusBadge />
                        <OfferStatusBadge />
                        <FinalResultStatusBadge />
                    </div>
                </div>

                <div className="flex items-center justify-between overflow-x-auto mb-3 space-x-2">
                    <div className="text-gray-500 text-nowrap">
                        登録数：<span className="font-semibold text-black">{ total }</span>件
                    </div>
                    <nav>
                        <ul className="flex items-center -space-x-px h-8 text-sm">
                            <Link
                                href={currentPage == 1 ? "#" : getPageLink(Number(currentPage) - 1, params)} aria-disabled={currentPage == 1}
                                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage == 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </Link>
                            {Array.from({ length: pageCount }, (_, i) => {
                                const page = i + 1;
                                return (
                                    <Link href={getPageLink(page, params)}>
                                        <div className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 text-gray-500 ${page == currentPage ? 'bg-blue-100' : 'bg-white  hover:text-gray-700  hover:bg-gray-100'}`}>
                                            { page }
                                        </div>
                                    </Link>
                                )
                            })}
                            <Link
                                href={currentPage == pageCount ? "#" : getPageLink(Number(currentPage) + 1, params)} aria-disabled={currentPage === pageCount}
                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage == pageCount ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </ul>
                    </nav>
                </div>

                <div className="overflow-x-auto shadow-md rounded-lg border">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-nowrap">企業名 / 職種</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">ステータス</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">登録日時</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">更新日時</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">選考履歴</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">企業詳細</th>
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
                                            <Link href={`/apply/${apply.apply_id}/process`}>
                                                <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                    <FontAwesomeIcon icon={faClockRotateLeft} />
                                                </ActionContainer>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <Link href={`/company/${apply.company_id}`}>
                                                <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                    <FontAwesomeIcon icon={faBuilding} />
                                                </ActionContainer>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <Link href={`/apply/${apply.apply_id}/edit`}>
                                                <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                </ActionContainer>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <ApplyDeleteButton applyId={apply.apply_id}>
                                                <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                </ActionContainer>
                                            </ApplyDeleteButton>
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
