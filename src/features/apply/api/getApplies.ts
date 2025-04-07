import getJWT from "@/server/utils/getJWT";
import { Apply } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getApplies = async (query?: URLSearchParams): Promise<{ data: Apply[], total: number }|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/apply` + ( query ? `?${query}` : '' ), {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch applies. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const json: { data: Apply[], total: number }  = await res.json();

    return json;
}
