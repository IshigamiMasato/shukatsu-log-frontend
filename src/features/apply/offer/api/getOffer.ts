import getJWT from "@/server/utils/getJWT";
import { notFound, redirect } from "next/navigation";
import { Offer } from "@/types";

export const getOffer = async (applyId: number, offerId: number): Promise<Offer|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/offer/${offerId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch offer. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const offer: Offer = await res.json();

    return offer;
}
