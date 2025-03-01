import ApplyEditForm from "@/features/apply/components/ApplyEditForm";

const ApplyEditPage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
    const applyId = (await params).applyId;

    return (
        <ApplyEditForm applyId={applyId} />
    );
}

export default ApplyEditPage;
