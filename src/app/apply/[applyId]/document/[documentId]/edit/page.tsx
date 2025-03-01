import DocumentEditForm from "@/features/document/components/DocumentEditForm";

const DocumentEditPage = async ({ params } : { params : Promise<{ applyId: number, documentId: number }> }) => {
    const { applyId, documentId } = await params;

    return (
        <DocumentEditForm applyId={applyId} documentId={documentId} />
    )
}

export default DocumentEditPage;
