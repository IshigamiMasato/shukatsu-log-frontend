import ActionContainer from "@/components/containers/ActionContainer";
import TitleContainer from "@/components/containers/TitleContainer";
import { DEFAULT_PAGE, PER_PAGE } from "@/constants/const";
import { getCompanies } from "@/features/company/api/getCompanies";
import CompanyDeleteButton from "@/features/company/components/CompanyDeleteButton";
import CompanySearchForm from "@/features/company/components/CompanySearchForm";
import { Company } from "@/types";
import { faChevronLeft, faChevronRight, faCirclePlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const metadata = {
	title: `企業一覧 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const getPageLink = (page: number, params: URLSearchParams) => {
	params.set('page', String(page));
    params.set('offset', String((Number(page) - 1) * PER_PAGE));
    params.set('limit', String(PER_PAGE));
	return `/company?${params}`;
}

const CompanyPage = async ( props: { searchParams: Promise<{ [key: string]: string }> }) => {
    const searchParams = await props.searchParams;
    const params = new URLSearchParams(searchParams);
    const result = await getCompanies(params);
    // トークンリフレッシュが必要な場合
    if ( result === null ) return;

    const companies = result.data;
    const total = result.total;

    const pageCount = Math.ceil(total / PER_PAGE);
    const currentPage = params.has('page') ? params.get('page') : DEFAULT_PAGE;

    return (
        <>
            <TitleContainer main="企業一覧" />
            <div className="container mx-auto px-8 py-6 bg-white rounded-lg">
                <CompanySearchForm />

                <Link href='/company/create'>
                    <ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white mb-3">
                        <FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">企業登録</span>
                    </ActionContainer>
                </Link>

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
                        <thead className="text-xs bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-nowrap">企業名</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">企業URL</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">従業員数</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">編集</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">削除</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">登録日時</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">更新日時</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company: Company) => {
                                return (
                                    <tr key={ company.company_id } className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <Link href={`/company/${company.company_id}`} className="text-blue-500 hover:underline">{ company.name }</Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <Link href={company.url ?? "#"} legacyBehavior>
                                                <a target="_blank" rel="noopener noreferrer">{ company.url }</a>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">{ company.employee_number?.toLocaleString() }</td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <Link href={`/company/${company.company_id}/edit`}>
                                                <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </ActionContainer>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <CompanyDeleteButton companyId={company.company_id}>
                                                <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </ActionContainer>
                                            </CompanyDeleteButton>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">{ company.created_at }</td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">{ company.updated_at }</td>
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

export default CompanyPage;
