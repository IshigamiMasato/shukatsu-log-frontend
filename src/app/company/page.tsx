import CompanyDeleteButton from "@/features/company/components/CompanyDeleteButton";
import { getJWT } from "@/helper";
import { Company } from "@/types";
import { faCircleXmark, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
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
        <div className="container mx-auto px-8 py-6">
            <Link href='/company/create' className="bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block mb-3">企業登録</Link>
            <div className="overflow-x-auto shadow-md rounded-lg">
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
                                        <Link href={`/company/${company.company_id}/edit`} className="bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-3 font-medium whitespace-nowrap">
                                        <CompanyDeleteButton companyId={company.company_id}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </CompanyDeleteButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CompanyPage;
