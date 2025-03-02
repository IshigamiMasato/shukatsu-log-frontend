import ActionContainer from "@/components/containers/ActionContainer";
import IndexPageTitle from "@/components/containers/IndexPageTitle";
import CompanyDeleteButton from "@/features/company/components/CompanyDeleteButton";
import { getJWT } from "@/helper";
import { Company } from "@/types";
import { faCirclePlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const CompanyPage: React.FC = async () => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/company`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch companies. (status=${res.status})`);
    }

    const companies = await res.json();

    return (
        <>
            <IndexPageTitle>企業一覧</IndexPageTitle>

            <div className="container mx-auto px-8 py-6 bg-white rounded-lg">
                <ActionContainer className="mb-3">
                    <Link href='/company/create'>
                        <FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">企業登録</span>
                    </Link>
                </ActionContainer>

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
                                            <ActionContainer>
                                                <Link href={`/company/${company.company_id}/edit`}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Link>
                                            </ActionContainer>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <ActionContainer>
                                                <CompanyDeleteButton companyId={company.company_id}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </CompanyDeleteButton>
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

export default CompanyPage;
