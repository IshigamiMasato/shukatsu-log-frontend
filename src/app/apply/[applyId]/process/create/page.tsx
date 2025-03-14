import BackLink from "@/components/navigations/BackLink";
import ProcessCreateForm from "@/features/apply/process/components/ProcessCreateForm";

export const metadata = {
	title: `選考履歴登録 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

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
