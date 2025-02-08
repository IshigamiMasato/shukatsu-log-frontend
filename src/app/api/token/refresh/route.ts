import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt');
    const jwt = jwtCookie?.value;

    if ( ! jwt ) {
        return Response.json( { msg: 'トークンが設定されていません。' }, { status: 401 } );
    }

    try {
        const res = await fetch('http://backend/api/token/refresh', {
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

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { msg: 'サーバーエラー' }, { status: 500 } );

    }
}
