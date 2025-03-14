import BackLink from "@/components/navigations/BackLink";
import { getInterview } from "@/features/apply/interview/api/getInterview";
import InterviewEditForm from "@/features/apply/interview/components/InterviewEditForm";

const InterviewEditPage = async ({ params } : { params : Promise<{ applyId: number, interviewId: number }> }) => {
    const { applyId, interviewId } = await params;

    const interview = await getInterview(applyId, interviewId);

    // トークンリフレッシュが必要な場合
    if ( interview === null ) return;

    return (
        <>
            <BackLink />
            <InterviewEditForm interview={interview} />
        </>
    )
}

export default InterviewEditPage;
