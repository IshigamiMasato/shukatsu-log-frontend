import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import getJWT from "@/server/utils/getJWT";

export async function POST(request: Request) {
    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    const formData = await request.formData();

    const companyId   = formData.get('company_id');
    const occupation  = formData.get('occupation');
    const apply_route = formData.get('apply_route');
    const memo        = formData.get('memo');

    try {
        const res = await fetch('http://backend/api/apply', {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                company_id: companyId,
                occupation: occupation,
                apply_route: apply_route ? apply_route : null,
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
