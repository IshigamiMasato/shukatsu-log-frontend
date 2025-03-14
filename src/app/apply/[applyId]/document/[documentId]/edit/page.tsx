import BackLink from "@/components/navigations/BackLink";
import { getDocument } from "@/features/apply/document/api/getDocument";
import DocumentEditForm from "@/features/apply/document/components/DocumentEditForm";

const DocumentEditPage = async ({ params } : { params : Promise<{ applyId: number, documentId: number }> }) => {
    const { applyId, documentId } = await params;

    const document = await getDocument(applyId, documentId);

    // トークンリフレッシュが必要な場合
    if ( document === null ) return;

    return (
        <>
            <BackLink />
            <DocumentEditForm document={document} />
        </>
    )
}

export default DocumentEditPage;
