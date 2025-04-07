import BackLink from "@/components/navigations/BackLink";
import { getExam } from "@/features/apply/exam/api/getExam";
import ExamEditForm from "@/features/apply/exam/components/ExamEditForm";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `試験情報編集 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const ExamEditPage = async ({ params } : { params : Promise<{ applyId: number, examId: number }> }) => {
    await verifyAuth();

    const { applyId, examId } = await params;
    const exam = await getExam(applyId, examId);

    return (
        <>
            <BackLink />
            <ExamEditForm exam={exam} />
        </>
    )
}

export default ExamEditPage;
