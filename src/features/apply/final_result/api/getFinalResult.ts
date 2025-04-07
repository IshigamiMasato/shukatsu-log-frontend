import getJWT from "@/server/utils/getJWT";
import { notFound, redirect } from "next/navigation";
import { FinalResult } from "@/types";

export const getFinalResult = async (applyId: number, finalResultId: number): Promise<FinalResult|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/final_result/${finalResultId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch final_result. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const finalResult: FinalResult  = await res.json();

    return finalResult;
}
