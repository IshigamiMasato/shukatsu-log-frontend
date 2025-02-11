import { SERVER_ERROR, UNSET_TOKEN } from "@/constants/api";
import { getJWT } from "@/helper";

export async function GET(request: Request) {
    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN }, { status: 401 } );
    }

    try {
        const res = await fetch('http://backend/api/event', {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
        });

        const data = await res.json();

        return Response.json( data, {status: res.status} );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
};

export async function POST(request: Request) {
    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN }, { status: 401 } );
    }

    const formData = await request.formData();

    const title   = formData.get('title');
    const type    = formData.get('type');
    const startAt = formData.get('start_at');
    const endAt   = formData.get('end_at');
    const memo    = formData.get('memo');

    try {
        const res = await fetch('http://backend/api/event', {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                title: title,
                type: type,
                start_at: startAt,
                end_at: endAt,
                memo: memo
            })
        });

        const data = await res.json();

        return Response.json( data, { status: res.status } );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}
