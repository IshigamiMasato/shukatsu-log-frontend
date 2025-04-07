import getJWT from "@/server/utils/getJWT";
import { notFound, redirect } from "next/navigation";
import { Interview } from "@/types";

export const getInterview = async (applyId: number, interviewId: number): Promise<Interview|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/interview/${interviewId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch interview. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const interview: Interview = await res.json();

    return interview;
}
