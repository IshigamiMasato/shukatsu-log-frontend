import BackLink from "@/components/navigations/BackLink";
import ProcessCreateForm from "@/features/apply/process/components/ProcessCreateForm";

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
