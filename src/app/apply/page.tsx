import ActionContainer from "@/components/containers/ActionContainer";
import TitleContainer from "@/components/containers/TitleContainer";
import { APPLY_STATUS } from "@/constants/const";
import { getApplies } from "@/features/apply/api/getApplies";
import ApplyDeleteButton from "@/features/apply/components/ApplyDeleteButton";
import { Apply } from "@/types";
import { faCirclePlus, faClockRotateLeft, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ApplyPage = async () => {
    const applies = await getApplies();

    // トークンリフレッシュが必要な場合
    if ( applies === null ) return;

    return (
        <>
            <TitleContainer main="応募一覧" />
            <div className="container mx-auto px-8 py-6 bg-white rounded-lg">
                <ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white mb-3">
                    <Link href='/apply/create'>
                        <FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">応募登録</span>
                    </Link>
                </ActionContainer>

                <div className="overflow-x-auto shadow-md rounded-lg border">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-nowrap">ステータス</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">企業名</th>
                                <th scope="col" className="px-6 py-3 text-nowrap">職種</th>
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
                                            <Link href={`/apply/${apply.apply_id}`} className="border p-1 rounded-lg text-blue-500 hover:bg-blue-100 transition-all duration-300">{ APPLY_STATUS.find(status => status.id == apply.status)?.name }</Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                                            <Link href={`/company/${apply.company_id}`} className="text-blue-500 hover:underline">{ apply.company.name }</Link>
                                        </td>
                                        <td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.occupation }</td>
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
