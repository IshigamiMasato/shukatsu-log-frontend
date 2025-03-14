import BackLink from "@/components/navigations/BackLink";
import { getCompany } from "@/features/company/api/getCompany";
import CompanyEditForm from "@/features/company/components/CompanyEditForm";

export const metadata = {
	title: `企業編集 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const CompanyEditPage = async ({ params } : { params : Promise<{ companyId: number }> }) => {
    const companyId = (await params).companyId;

    const company = await getCompany(companyId);

    // トークンリフレッシュが必要な場合
    if ( company === null ) return;

    return (
        <>
            <BackLink />
            <CompanyEditForm company={company} />
        </>
    )
}

export default CompanyEditPage;
