import ApplyDeleteButton from "@/components/ApplyDeleteButton";
import { APPLY_STATUS } from "@/constants/const";
import { getJWT } from "@/helper";
import { Apply } from "@/types";
import { faCircleXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ApplyPage = async () => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/apply`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        throw new Error(`Failed fetch applies. (status=${res.status})`);
    }

    const applies = await res.json();

    return (
        <div className="container mx-auto px-8 py-6">
            <Link href='/apply/create' className="bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block mb-3">応募登録</Link>
            <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left">
                <thead className="text-xs bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-nowrap">ステータス</th>
                        <th scope="col" className="px-6 py-3 text-nowrap">企業名</th>
                        <th scope="col" className="px-6 py-3 text-nowrap">職種</th>
                        <th scope="col" className="px-6 py-3 text-nowrap">応募経路</th>
                        <th scope="col" className="px-6 py-3 text-nowrap">登録日時</th>
                        <th scope="col" className="px-6 py-3 text-nowrap">更新日時</th>
                        <th scope="col" className="px-6 py-3 text-nowrap">編集</th>
                        <th scope="col" className="px-6 py-3 text-nowrap">削除</th>
                    </tr>
                </thead>
                <tbody>
                    {applies.map((apply: Apply) => {
                        return (
                            <tr key={ apply.apply_id } className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium whitespace-nowrap">
                                    <Link href={`/apply/${apply.apply_id}`} className="border p-1 rounded-lg text-blue-500 hover:bg-blue-100 transition-all duration-300">{ APPLY_STATUS.find(status => status.id == apply.status)?.name }</Link>
                                </td>
                                <td className="px-6 py-3 font-medium whitespace-nowrap">
                                    <Link href={`/company/${apply.company_id}`} className="text-blue-500 hover:underline">{ apply.company.name }</Link>
                                </td>
                                <td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.occupation }</td>
                                <td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.apply_route }</td>
                                <td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.created_at }</td>
                                <td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.updated_at }</td>
                                <td className="px-6 py-3 font-medium whitespace-nowrap">
                                    <Link href={`/apply/${apply.apply_id}/edit`} className="bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block border border-gray-300">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Link>
                                </td>
                                <td className="px-6 py-3 font-medium whitespace-nowrap">
                                    <ApplyDeleteButton applyId={apply.apply_id}>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </ApplyDeleteButton>
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

export default ApplyPage;
