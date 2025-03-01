import ExamEditForm from "@/features/exam/components/ExamEditForm";

const ExamEditPage = async ({ params } : { params : Promise<{ applyId: number, examId: number }> }) => {
    const { applyId, examId } = await params;

    return (
        <ExamEditForm applyId={applyId} examId={examId} />
    )
}

export default ExamEditPage;
