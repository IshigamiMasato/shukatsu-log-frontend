"use client";

import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const FinalResultDeleteButton = ({ applyId, finalResultId } : { applyId : number, finalResultId : number }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDelete = () => {
        const isConfirmed = window.confirm("本当に削除しますか？");

        if ( isConfirmed ) {
            fetch(`/api/apply/${applyId}/final_result/${finalResultId}`, {
                method: "DELETE",
            }).then(res => {
                if ( ! res.ok ) {
                    dispatch( dispToast({ status: "error", message: `選考終了情報の削除に失敗しました。もう一度お試しください。` }) );
                    return;

                }
                dispatch( dispToast({ status: "success", message: `選考終了情報を削除しました。` }) );
                router.push(`/apply/${applyId}/process`);
            });
        }
    }

    return (
        <button onClick={ () => handleDelete() }>削除</button>
    )
}

export default FinalResultDeleteButton;
