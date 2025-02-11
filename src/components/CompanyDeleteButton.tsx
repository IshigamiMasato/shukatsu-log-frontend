"use client";

import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

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
        <button onClick={ () => handleCompanyDelete(companyId) }>削除</button>
    )
}

export default CompanyDeleteButton;
