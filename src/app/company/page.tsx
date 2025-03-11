import ActionContainer from "@/components/containers/ActionContainer";
import TitleContainer from "@/components/containers/TitleContainer";
import { getCompanies } from "@/features/company/api/getCompanies";
import CompanyDeleteButton from "@/features/company/components/CompanyDeleteButton";
import CompanySearchForm from "@/features/company/components/CompanySearchForm";
import { Company } from "@/types";
import { faCirclePlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const CompanyPage = async ( props: { searchParams: Promise<{ [key: string]: string }> }) => {
    const searchParams = await props.searchParams;
    let params;
    if ( Object.keys(searchParams).length > 0 ) {
        params = new URLSearchParams(searchParams);
    }
    const result = await getCompanies(params);
    // トークンリフレッシュが必要な場合
    if ( result === null ) return;

    const companies = result.data;
    const total = result.total;

    return (
        <>
            <TitleContainer main="企業一覧" />
            <div className="container mx-auto px-8 py-6 bg-white rounded-lg">
                <CompanySearchForm />

                <div className="flex items-center justify-between overflow-x-auto mb-3 space-x-2">
                    <div className="text-gray-500 text-nowrap">
                        登録数：<span className="font-semibold text-black">{ total }</span>件
                    </div>
                </div>

                <Link href='/company/create'>
                    <ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white mb-3">
                        <FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">企業登録</span>
                    </ActionContainer>
                </Link>

                <div className="overflow-x-auto shadow-md rounded-lg border">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">企業名</th>
                                <th scope="col" className="px-6 py-3">登録日時</th>
                                <th scope="col" className="px-6 py-3">更新日時</th>
                                <th scope="col" className="px-6 py-3">編集</th>
                                <th scope="col" className="px-6 py-3">削除</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company: Company) => {
                                return (
                                    <tr key={ company.company_id } className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <Link href={`/company/${company.company_id}`} className="text-blue-500 hover:underline">{ company.name }</Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">{ company.created_at }</td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">{ company.updated_at }</td>
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
