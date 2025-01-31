export async function POST(request: Request) {
    const jwt = request.headers.get('Authorization');

    try {
        const res = await fetch('http://backend/api/token/refresh', {
            method: "POST",
            headers: {
                "Content-Type"  : "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        });

        const data = await res.json();

        return Response.json( data, {status: res.status} );

    } catch ( error: any ) {
        return Response.json( {msg: 'サーバーエラー'}, {status: 500} );

    }
}
