import getJWT from "@/server/utils/getJWT";
import { Exam } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getExam = async (applyId: number, examId: number): Promise<Exam|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/exam/${examId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch exam. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const exam: Exam = await res.json();

    return exam;
}
