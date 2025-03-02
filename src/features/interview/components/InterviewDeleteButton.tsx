"use client";

import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type Props = {
    applyId: number,
    interviewId: number,
    children: React.ReactNode,
}

const InterviewDeleteButton = ({ applyId, interviewId, children } : Props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDelete = () => {
        const isConfirmed = window.confirm("本当に削除しますか？");

        if ( isConfirmed ) {
            fetch(`/api/apply/${applyId}/interview/${interviewId}`, {
                method: "DELETE",
            }).then(res => {
                if ( ! res.ok ) {
                    dispatch( dispToast({ status: "error", message: `面接情報の削除に失敗しました。もう一度お試しください。` }) );
                    return;

                }
                dispatch( dispToast({ status: "success", message: `面接情報を削除しました。` }) );
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

export default InterviewDeleteButton;
