import BackLink from "@/components/BackLink";
import { getApply } from "@/features/apply/api/getApply";
import ApplyEditForm from "@/features/apply/components/ApplyEditForm";

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
