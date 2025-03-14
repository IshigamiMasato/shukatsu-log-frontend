import getJWT from "@/server/utils/getJWT";
import { notFound, redirect } from "next/navigation";
import { Offer } from "@/types";

export const getOffer = async (applyId: number, offerId: number): Promise<Offer|null|never> => {
    const jwt = await getJWT();

    const res = await fetch(`http://backend/api/apply/${applyId}/offer/${offerId}`, {
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

        throw new Error( `Failed fetch offer. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const offer: Offer = await res.json();

    return offer;
}
