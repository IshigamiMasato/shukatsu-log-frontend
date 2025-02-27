"use client";

import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Button from "./elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSquareXmark } from "@fortawesome/free-solid-svg-icons";

const ApplyDeleteButton = ({ applyId } : { applyId : number }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDelete = (applyId: number) => {
        const isConfirmed = window.confirm("本当に削除しますか？");

        if ( isConfirmed ) {
            fetch(`/api/apply/${applyId}`, {
                method: "DELETE",
            }).then(res => {
                if ( ! res.ok ) {
                    dispatch( dispToast({ status: "error", message: `応募の削除に失敗しました。もう一度お試しください。` }) );
                    return;
                }

                dispatch( dispToast({ status: "success", message: `応募を削除しました。` }) );
                router.push('/apply');
            });
        }
    }

    return (
        <Button onClick={ () => handleDelete(applyId) } className="bg-red-600 text-white">
            <FontAwesomeIcon icon={faCircleXmark} /><span className="ml-1">削除</span>
        </Button>
    )
}

export default ApplyDeleteButton;
