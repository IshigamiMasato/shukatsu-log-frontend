"use client";

import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type Props = {
    applyId: number,
    documentId: number,
    fileId: number,
    children: React.ReactNode,
}

const FileDeleteButton = ({ applyId, documentId, fileId, children } : Props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDelete = () => {
        const isConfirmed = window.confirm("本当に削除しますか？");

        if ( isConfirmed ) {
            fetch(`/api/apply/${applyId}/document/${documentId}/file/${fileId}`, {
                method: "DELETE",
            }).then(res => {
                if ( ! res.ok ) {
                    dispatch( dispToast({ status: "error", message: `ファイルの削除に失敗しました。もう一度お試しください。` }) );
                    return;

                }
                dispatch( dispToast({ status: "success", message: `ファイルを削除しました。` }) );
                router.push(`/apply/${applyId}/document/${documentId}/edit`);
            });
        }
    }

    return (
        <button onClick={ () => handleDelete() }>
            { children }
        </button>
    )
}

export default FileDeleteButton;
