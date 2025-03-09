import BackLink from "@/components/BackLink";
import ProcessCreateForm from "@/features/apply/components/process/ProcessCreateForm";

const ProcessCreatePage = async ({ params } : { params : Promise<{ applyId: number }> }) => {
    const applyId = (await params).applyId;

    return (
        <>
            <BackLink />
            <ProcessCreateForm applyId={applyId} />
        </>
    )
}

export default ProcessCreatePage;
