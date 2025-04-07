import BackLink from "@/components/navigations/BackLink";
import CompanyCreateForm from "@/features/company/components/CompanyCreateForm";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `企業登録 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const CompanyCreatePage = async () => {
    await verifyAuth();

    return (
        <>
            <BackLink />
            <CompanyCreateForm />
        </>
    )
}

export default CompanyCreatePage;
