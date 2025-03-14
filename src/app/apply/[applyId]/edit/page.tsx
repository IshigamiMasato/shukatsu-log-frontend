import BackLink from "@/components/navigations/BackLink";
import { getApply } from "@/features/apply/api/getApply";
import ApplyEditForm from "@/features/apply/components/ApplyEditForm";

export const metadata = {
	title: `応募編集 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const ApplyEditPage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
    const applyId = (await params).applyId;

    const apply = await getApply(applyId);

    // トークンリフレッシュが必要な場合
    if ( apply === null ) return;

    return (
        <>
            <BackLink />
            <ApplyEditForm apply={apply} />
        </>
    );
}

export default ApplyEditPage;
