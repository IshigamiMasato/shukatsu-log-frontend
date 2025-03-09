import BackLink from "@/components/BackLink";
import ApplyCreateForm from "@/features/apply/components/ApplyCreateForm";
import { getCompanies } from "@/features/company/api/getCompanies";

const ApplyCreatePage = async () => {
    const companies = await getCompanies();

    // トークンリフレッシュが必要な場合
    if ( companies === null ) return;

    return (
        <>
            <BackLink />
            <ApplyCreateForm companies={companies} />
        </>
    )
}

export default ApplyCreatePage;
