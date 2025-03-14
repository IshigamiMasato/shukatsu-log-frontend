import BackLink from "@/components/BackLink";
import ApplyCreateForm from "@/features/apply/components/ApplyCreateForm";
import { getCompanies } from "@/features/company/api/getCompanies";

const ApplyCreatePage = async () => {
    const result = await getCompanies(new URLSearchParams());

    // トークンリフレッシュが必要な場合
    if ( result === null ) return;

    const companies = result.data;

    return (
        <>
            <BackLink />
            <ApplyCreateForm companies={companies} />
        </>
    )
}

export default ApplyCreatePage;
