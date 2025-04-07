import BackLink from "@/components/navigations/BackLink";
import { getApply } from "@/features/apply/api/getApply";
import ApplyEditForm from "@/features/apply/components/ApplyEditForm";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `応募編集 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const ApplyEditPage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
    await verifyAuth();

    const applyId = (await params).applyId;
    const apply = await getApply(applyId);

    return (
        <>
            <BackLink />
            <ApplyEditForm apply={apply} />
        </>
    );
}

export default ApplyEditPage;
