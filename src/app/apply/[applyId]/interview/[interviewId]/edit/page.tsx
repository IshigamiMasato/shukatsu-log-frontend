import InterviewEditForm from "@/features/apply/interview/components/InterviewEditForm";

const InterviewEditPage = async ({ params } : { params : Promise<{ applyId: number, interviewId: number }> }) => {
    const { applyId, interviewId } = await params;

    return (
        <InterviewEditForm applyId={applyId} interviewId={interviewId} />
    )
}

export default InterviewEditPage;
