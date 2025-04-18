import getJWT from "@/server/utils/getJWT";
import { Company } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getCompanies = async (query: URLSearchParams): Promise<{ data: Company[], total: number }|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/company` + ( !query.toString() ? '' : `?${query}` ), {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch companies. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const json: { data: Company[], total: number }  = await res.json();

    return json;
}
