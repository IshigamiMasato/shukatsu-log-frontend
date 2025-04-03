import getJWT from "@/server/utils/getJWT";
import { ProcessItem } from "@/types/ProcessItem";
import { notFound, redirect } from "next/navigation";

export const getProcess = async (applyId: number): Promise<ProcessItem[]|null|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/process`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
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

        throw new Error( `Failed fetch process. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const processData = await res.json();

    return processData;
}
