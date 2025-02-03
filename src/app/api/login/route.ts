export async function POST(request: Request) {
    const formData = await request.formData();

    const email    = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch('http://backend/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        return Response.json( data, { status: res.status } );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { msg: 'サーバーエラー' }, { status: 500 } );

    }
}
