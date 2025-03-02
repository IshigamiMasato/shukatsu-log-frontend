"use client";

import { dispToast } from "@/store/modules/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type Props = {
    companyId: number,
    children: React.ReactNode,
}

const CompanyDeleteButton = ({ companyId, children } : Props) => {
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
        <button onClick={ () => handleDelete(companyId) }>
            { children }
        </button>
    )
}

export default CompanyDeleteButton;
