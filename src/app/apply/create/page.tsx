import BackLink from "@/components/navigations/BackLink";
import ApplyCreateForm from "@/features/apply/components/ApplyCreateForm";
import { getCompanies } from "@/features/company/api/getCompanies";

export const metadata = {
	title: `応募登録 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

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
