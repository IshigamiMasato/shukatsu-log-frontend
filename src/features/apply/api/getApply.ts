import getJWT from "@/server/utils/getJWT";
import { Apply } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getApply = async (applyId: number): Promise<Apply|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch apply. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const apply: Apply = await res.json();

    return apply;
}
