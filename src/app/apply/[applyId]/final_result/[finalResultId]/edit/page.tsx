import BackLink from "@/components/navigations/BackLink";
import { getFinalResult } from "@/features/apply/final_result/api/getFinalResult";
import FinalResultEditForm from "@/features/apply/final_result/components/FinalResultEditForm";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `選考終了情報編集 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const FinalResultEditPage = async ({ params } : { params : Promise<{ applyId: number, finalResultId: number }> }) => {
    await verifyAuth();

    const { applyId, finalResultId } = await params;
    const finalResult = await getFinalResult(applyId, finalResultId);

    return (
        <>
            <BackLink />
            <FinalResultEditForm finalResult={finalResult} />
        </>
    )
}

export default FinalResultEditPage;
