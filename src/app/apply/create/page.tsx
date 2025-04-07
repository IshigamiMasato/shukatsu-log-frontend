import BackLink from "@/components/navigations/BackLink";
import ApplyCreateForm from "@/features/apply/components/ApplyCreateForm";
import { getCompanies } from "@/features/company/api/getCompanies";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `応募登録 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const ApplyCreatePage = async () => {
    await verifyAuth();

    const result = await getCompanies(new URLSearchParams());
    const companies = result.data;

    return (
        <>
            <BackLink />
            <ApplyCreateForm companies={companies} />
        </>
    )
}

export default ApplyCreatePage;
