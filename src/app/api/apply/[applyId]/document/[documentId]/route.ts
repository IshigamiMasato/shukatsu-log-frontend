import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import { getJWT } from "@/helper";

export async function DELETE(request: Request, { params } : {params: Promise<{ applyId: string, documentId: string }>}) {
    const applyId = (await params).applyId;
    const documentId = (await params).documentId;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    try {
        const res = await fetch(`http://backend/api/apply/${applyId}/document/${documentId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
        });

        const data = await res.json();

        return Response.json( data, { status: res.status } );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}
