"use client";

import { dispLoading, removeLoading } from "@/store/modules/loading";
import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type Props = {
    applyId: number,
    offerId: number,
    children: React.ReactNode,
}

const OfferDeleteButton = ({ applyId, offerId, children } : Props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDelete = () => {
        const isConfirmed = window.confirm("本当に削除しますか？");

        if ( isConfirmed ) {
            dispatch( dispLoading() );

            fetch(`/api/apply/${applyId}/offer/${offerId}`, {
                method: "DELETE",
            }).then(res => {
                dispatch( removeLoading() );

                if ( ! res.ok ) {
                    dispatch( dispToast({ status: "error", message: `内定情報の削除に失敗しました。もう一度お試しください。` }) );
                    return;

                }

                dispatch( dispToast({ status: "success", message: `内定情報を削除しました。` }) );
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

export default OfferDeleteButton;
