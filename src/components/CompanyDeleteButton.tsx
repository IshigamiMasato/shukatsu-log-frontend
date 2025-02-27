"use client";

import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Button from "./elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const CompanyDeleteButton = ({ companyId } : { companyId : number }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDelete = (companyId: number) => {
        const isConfirmed = window.confirm("本当に削除しますか？");

        if ( isConfirmed ) {
            fetch(`/api/company/${companyId}`, {
                method: "DELETE",
            }).then(res => {
                if ( ! res.ok ) {
                    dispatch( dispToast({ status: "error", message: `企業の削除に失敗しました。もう一度お試しください。` }) );
                    return;
                }

                dispatch( dispToast({ status: "success", message: `企業を削除しました。` }) );
                router.push('/company');
            });
        }
    }

    return (
        <Button onClick={ () => handleDelete(companyId) } className="bg-red-600 text-white">
            <FontAwesomeIcon icon={faCircleXmark} /><span className="ml-1">削除</span>
        </Button>
    )
}

export default CompanyDeleteButton;
