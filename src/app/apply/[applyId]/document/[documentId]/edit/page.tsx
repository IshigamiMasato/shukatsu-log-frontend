import BackLink from "@/components/navigations/BackLink";
import { getDocument } from "@/features/apply/document/api/getDocument";
import DocumentEditForm from "@/features/apply/document/components/DocumentEditForm";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `応募書類編集 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const DocumentEditPage = async ({ params } : { params : Promise<{ applyId: number, documentId: number }> }) => {
    await verifyAuth();

    const { applyId, documentId } = await params;
    const document = await getDocument(applyId, documentId);

    return (
        <>
            <BackLink />
            <DocumentEditForm document={document} />
        </>
    )
}

export default DocumentEditPage;
