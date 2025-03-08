import { getJWT } from "@/helper";
import { notFound, redirect } from "next/navigation";
import { FinalResult } from "@/types";

export const getFinalResult = async (applyId: number, finalResultId: number): Promise<FinalResult|null|never> => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/apply/${applyId}/final_result/${finalResultId}`, {
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

        throw new Error( `Failed fetch final_result. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const finalResult: FinalResult  = await res.json();

    return finalResult;
}
