import BackLink from "@/components/navigations/BackLink";
import ActionContainer from "@/components/containers/ActionContainer";
import { APPLY_STATUS } from "@/constants/const";
import { getApply } from "@/features/apply/api/getApply";
import ApplyDeleteButton from "@/features/apply/components/ApplyDeleteButton";
import { faBuilding, faClockRotateLeft, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import verifyAuth from "@/utils/server/verifyAuth";
import InfoBlock from "@/components/InfoBlock";

export const metadata = {
	title: `応募詳細 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const ApplyDetailPage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
    await verifyAuth();

    const applyId = (await params).applyId;
    const apply = await getApply(applyId);

    return (
        <>
            <BackLink />
            <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto rounded-lg">
                <h2 className="text-lg font-semibold text-nowrap mb-5">応募詳細</h2>
                <div className="flex items-center justify-between overflow-x-auto mb-5">
                    <div />
                    <div className="flex items-center text-nowrap space-x-1">
                        <Link href={`/company/${apply.company_id}`}>
                            <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                    <FontAwesomeIcon icon={faBuilding} /><span className="ml-1">企業詳細</span>
                            </ActionContainer>
                        </Link>
                        <Link href={`/apply/${apply.apply_id}/process`}>
                            <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                    <FontAwesomeIcon icon={faClockRotateLeft} /><span className="ml-1">選考履歴</span>
                            </ActionContainer>
                        </Link>
                        <Link href={`/apply/${applyId}/edit`}>
                            <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                    <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                            </ActionContainer>
                        </Link>
                        <ApplyDeleteButton applyId={applyId}>
                            <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                    <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                            </ActionContainer>
                        </ApplyDeleteButton>
                    </div>
                </div>

                <InfoBlock label="企業名">{ apply.company.name ?? "-" }</InfoBlock>
                <InfoBlock label="企業URL">{ apply.company.url ?? "-" }</InfoBlock>
                <InfoBlock label="職種">{ apply.occupation ?? "-" }</InfoBlock>
                <InfoBlock label="選考ステータス">{ APPLY_STATUS.find(status => status.id == apply.status)?.name ?? "-" }</InfoBlock>
                <InfoBlock label="応募経路">{ apply.apply_route ?? "-" }</InfoBlock>
                <InfoBlock label="メモ">{ apply.memo ?? "-" }</InfoBlock>
            </div>
        </>
    );
}

export default ApplyDetailPage;
