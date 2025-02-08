import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt');
    const jwt = jwtCookie?.value;

    if ( ! jwt ) {
        return Response.json( { msg: 'トークンが設定されていません。' }, { status: 401 } );
    }

    try {
        const res = await fetch('http://backend/api/logout', {
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

        return Response.json( { msg: 'サーバーエラー' }, { status: 500 } );

    }
}
