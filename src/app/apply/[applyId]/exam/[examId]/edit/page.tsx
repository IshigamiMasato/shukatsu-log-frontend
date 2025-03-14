import BackLink from "@/components/navigations/BackLink";
import { getExam } from "@/features/apply/exam/api/getExam";
import ExamEditForm from "@/features/apply/exam/components/ExamEditForm";

const ExamEditPage = async ({ params } : { params : Promise<{ applyId: number, examId: number }> }) => {
    const { applyId, examId } = await params;

    const exam = await getExam(applyId, examId);

    // トークンリフレッシュが必要な場合
    if ( exam === null ) return;

    return (
        <>
            <BackLink />
            <ExamEditForm exam={exam} />
        </>
    )
}

export default ExamEditPage;
