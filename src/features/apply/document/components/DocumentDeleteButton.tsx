"use client";

import { dispLoading, removeLoading } from "@/store/modules/loading";
import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type Props = {
    applyId: number,
    documentId: number,
    children: React.ReactNode,
}

const DocumentDeleteButton = ({ applyId, documentId, children } : Props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDelete = () => {
        const isConfirmed = window.confirm("本当に削除しますか？");

        if ( isConfirmed ) {
            dispatch( dispLoading() );

            fetch(`/api/apply/${applyId}/document/${documentId}`, {
                method: "DELETE",
            }).then(res => {
                dispatch( removeLoading() );

                if ( ! res.ok ) {
                    dispatch( dispToast({ status: "error", message: `応募書類の削除に失敗しました。もう一度お試しください。` }) );
                    return;

                }

                dispatch( dispToast({ status: "success", message: `応募書類を削除しました。` }) );
                router.push(`/apply/${applyId}/process`);
            });
        }
    }

    return (
        <button onClick={ () => handleDelete() }>
            { children }
        </button>
    )
}

export default DocumentDeleteButton;
