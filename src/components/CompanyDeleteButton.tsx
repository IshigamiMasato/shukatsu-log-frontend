"use client";

import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Button from "./elements/Button";

const CompanyDeleteButton = ({ companyId } : { companyId : number }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleCompanyDelete = (companyId: number) => {
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
        <Button name="削除" onClick={ () => handleCompanyDelete(companyId) } className="bg-red-600 text-white" />
    )
}

export default CompanyDeleteButton;
