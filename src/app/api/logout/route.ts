export async function POST(request: Request) {
    // フロント側で JWT を設定できなかった場合、空文字 が設定
    const jwt = request.headers.get('Authorization');
    if ( ! jwt ) {
        return Response.json( { msg: 'トークンが設定されていません。' }, { status: 401 } );
    }

    try {
        const res = await fetch('http://backend/api/logout', {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
        });

        const data = await res.json();

        return Response.json( data, {status: res.status} );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { msg: 'サーバーエラー' }, { status: 500 } );

    }
}
