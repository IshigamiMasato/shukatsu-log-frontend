import { SERVER_ERROR, UNSET_TOKEN } from "@/constants/api";
import { getJWT } from "@/helper";

export async function GET(request: Request) {
    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN }, { status: 401 } );
    }

    try {
        const res = await fetch('http://backend/api/user', {
            method: "GET",
            headers: {
                "Content-Type"  : "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        });

        const data = await res.json();

        return Response.json( data, {status: res.status} );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}
