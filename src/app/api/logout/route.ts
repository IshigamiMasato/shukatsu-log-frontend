import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import getJWT from "@/server/utils/getJWT";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = await cookies();

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    try {
        const res = await fetch(`${process.env.API_URL}/api/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
        });

        const data = await res.json();

        // CookieからJWTを削除
        cookieStore.delete('jwt');

        return Response.json( data, {status: res.status} );

    } catch ( error: any ) {
        console.error(error);

        // CookieからJWTを削除
        cookieStore.delete('jwt');

        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}
