"use client";

type Props = {
    applyId: number,
    documentId: number,
    fileId: number,
    children: React.ReactNode,
}

const FileDownloadButton = ({ applyId, documentId, fileId, children } : Props) => {
    const handleDownload = () => {
        location.href = `/api/apply/${applyId}/document/${documentId}/file/${fileId}`
    }

    return (
        <button onClick={ () => handleDownload() }>
            { children }
        </button>
    )
}

export default FileDownloadButton;
