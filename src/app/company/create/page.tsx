import BackLink from "@/components/navigations/BackLink";
import CompanyCreateForm from "@/features/company/components/CompanyCreateForm";

export const metadata = {
	title: `企業登録 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const CompanyCreatePage: React.FC = () => {
    return (
        <>
            <BackLink />
            <CompanyCreateForm />
        </>
    )
}

export default CompanyCreatePage;
