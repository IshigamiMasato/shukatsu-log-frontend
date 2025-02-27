import CompanyEditForm from "@/features/company/components/CompanyEditForm";

const CompanyEditPage = async ({ params } : { params : Promise<{ companyId: number }> }) => {
    const companyId = (await params).companyId;

    return (
        <CompanyEditForm companyId={companyId} />
    )
}

export default CompanyEditPage;
