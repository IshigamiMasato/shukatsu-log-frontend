import { getCompany } from "@/features/company/api/CompanyApi";
import CompanyEditForm from "@/features/company/components/CompanyEditForm";

const CompanyEditPage = async ({ params } : { params : Promise<{ companyId: number }> }) => {
    const companyId = (await params).companyId;

    const company = await getCompany(companyId);

    // トークンリフレッシュが必要な場合
    if ( company === null ) return;

    return (
        <CompanyEditForm company={company} />
    )
}

export default CompanyEditPage;
