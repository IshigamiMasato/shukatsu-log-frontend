import BackLink from "@/components/navigations/BackLink";
import { getInterview } from "@/features/apply/interview/api/getInterview";
import InterviewEditForm from "@/features/apply/interview/components/InterviewEditForm";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `面接情報編集 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const InterviewEditPage = async ({ params } : { params : Promise<{ applyId: number, interviewId: number }> }) => {
    await verifyAuth();

    const { applyId, interviewId } = await params;
    const interview = await getInterview(applyId, interviewId);

    return (
        <>
            <BackLink />
            <InterviewEditForm interview={interview} />
        </>
    )
}

export default InterviewEditPage;
