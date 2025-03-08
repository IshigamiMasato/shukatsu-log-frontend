import ApplyCreateForm from "@/features/apply/components/ApplyCreateForm";
import { getCompanies } from "@/features/company/api/getCompanies";

const ApplyCreatePage = async () => {
    const companies = await getCompanies();

    // トークンリフレッシュが必要な場合
    if ( companies === null ) return;

    return (
        <ApplyCreateForm companies={companies} />
    )
}

export default ApplyCreatePage;
