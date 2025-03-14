import getJWT from "@/server/utils/getJWT";
import { ApplyStatusSummary } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getApplyStatusSummary = async (): Promise<ApplyStatusSummary|null|never> => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/apply/status-summary`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) {
            // トークン有効期限切れはフロントのクライアントコンポーネント側でリフレッシュ処理を実施し、再チャレンジするため特にエラーは返さずNULL返却
            if ( data.code === "EXPIRED_TOKEN" ) {
                return null;
            }

            redirect('/login');
        }

        if ( res.status == 404 ) {
            notFound();
        }

        throw new Error( `Failed fetch apply status summary. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const applyStatusSummary: ApplyStatusSummary = await res.json();

    return applyStatusSummary;
}
