import BackLink from "@/components/navigations/BackLink";
import ActionContainer from "@/components/containers/ActionContainer";
import { getCompany } from "@/features/company/api/getCompany";
import CompanyDeleteButton from "@/features/company/components/CompanyDeleteButton";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import verifyAuth from "@/utils/server/verifyAuth";
import InfoBlock from "@/components/InfoBlock";

export const metadata = {
	title: `企業詳細 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const CompanyDetailPage = async ({ params } : { params : Promise<{ companyId: number }> }) => {
    await verifyAuth();

    const companyId = (await params).companyId;
    const company = await getCompany(companyId);

    return (
        <>
            <BackLink />
            <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto rounded-lg">
                <h2 className="text-lg font-semibold text-nowrap mb-5">企業詳細</h2>
                <div className="flex items-center justify-between overflow-x-auto mb-5">
                    <div />
                    <div className="flex items-center text-nowrap space-x-1">
                        <Link href={`/company/${companyId}/edit`}>
                            <ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
                                <FontAwesomeIcon icon={faPenToSquare} /><span className="ml-1">編集</span>
                            </ActionContainer>
                        </Link>
                        <CompanyDeleteButton companyId={companyId}>
                            <ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
                                <FontAwesomeIcon icon={faTrash} /><span className="ml-1">削除</span>
                            </ActionContainer>
                        </CompanyDeleteButton>
                    </div>
                </div>

                <InfoBlock label="企業名">{ company.name ?? "-" }</InfoBlock>
                <InfoBlock label="企業URL">{ company.url ?? "-" }</InfoBlock>
                <InfoBlock label="社長名">{ company.president ?? "-" }</InfoBlock>
                <InfoBlock label="住所">{ company.address ?? "-" }</InfoBlock>
                <InfoBlock label="設立年月日">{ company.establish_date ?? "-" }</InfoBlock>
                <InfoBlock label="従業員数">{ company.employee_number ? company.employee_number.toLocaleString() : "-" }</InfoBlock>
                <InfoBlock label="上場区分">{ company.listing_class ?? "-" }</InfoBlock>
                <InfoBlock label="事業内容">{ company.business_description ?? "-" }</InfoBlock>
                <InfoBlock label="福利厚生">{ company.benefit ?? "-" }</InfoBlock>
                <InfoBlock label="メモ">{ company.memo ?? "-" }</InfoBlock>
            </div>
        </>
    );
}

export default CompanyDetailPage;
