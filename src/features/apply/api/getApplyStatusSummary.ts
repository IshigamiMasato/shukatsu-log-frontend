import getJWT from "@/server/utils/getJWT";
import { ApplyStatusSummary } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getApplyStatusSummary = async (): Promise<ApplyStatusSummary|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/apply/status-summary`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch apply status summary. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const applyStatusSummary: ApplyStatusSummary = await res.json();

    return applyStatusSummary;
}
