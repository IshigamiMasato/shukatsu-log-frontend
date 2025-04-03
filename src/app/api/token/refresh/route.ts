import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import getJWT from "@/server/utils/getJWT";
import { cookies } from "next/headers";

export async function POST() {
    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    try {
        const res = await fetch(`${process.env.API_URL}/api/token/refresh`, {
            method: "POST",
            headers: {
                "Content-Type"  : "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        });

        const data = await res.json();

        // ログイン成功時にCookieにJWTを保存
        if ( res.ok ) {
            const cookieStore = await cookies();
            cookieStore.set({
                name: 'jwt',
                value: data.access_token,
                httpOnly: true,
            });
        }

        return Response.json( data, {status: res.status} );

    } catch ( error ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}
