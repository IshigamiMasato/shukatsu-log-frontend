import FinalResultEditForm from "@/features/final_result/components/FinalResultEditForm";

const FinalResultEditPage = async ({ params } : { params : Promise<{ applyId: number, finalResultId: number }> }) => {
    const { applyId, finalResultId } = await params;

    return (
        <FinalResultEditForm applyId={applyId} finalResultId={finalResultId} />
    )
}

export default FinalResultEditPage;
