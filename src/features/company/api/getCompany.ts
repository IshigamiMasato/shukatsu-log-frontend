import getJWT from "@/server/utils/getJWT";
import { Company } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getCompany = async (companyId: number): Promise<Company|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/company/${companyId}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch company. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const company: Company = await res.json();

    return company;
}
