import getJWT from "@/server/utils/getJWT";
import { Document } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getDocument = async (applyId: number, documentId: number): Promise<Document|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/document/${documentId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch document. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const document: Document = await res.json();

    return document;
}
