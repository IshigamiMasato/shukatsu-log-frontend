import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import getJWT from "@/server/utils/getJWT";

export async function POST(request: Request, { params } : {params: Promise<{ applyId: string }>}) {
    const applyId = (await params).applyId;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    const formData = await request.formData();

    const submissionDate = formData.get('submission_date');
    const files = formData.getAll('files[]') as string[];
    let fileData;
    if ( files.length > 0 ) {
        fileData = files.map(file => JSON.parse(file));
    }
    const memo = formData.get('memo');

    try {
        const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/document`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                submission_date: submissionDate,
                files: fileData ? fileData : [],
                memo: memo ? memo : null,
            })
        });

        const data = await res.json();

        return Response.json( data, { status: res.status } );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}
