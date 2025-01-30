// サーバサイドで実行される

export async function POST(request: Request) {
    const formData = await request.formData();

    const email    = formData.get('email');
    const password = formData.get('password');

    if ( email === '' || password === '' ) {
        return Response.json( { msg: '入力フィールドが空です。' }, { status: 400 } );
    }

    try {
        const res = await fetch('http://backend/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if ( ! res.ok ) {
            throw new Error( data.message );
        }

        return Response.json( data );

    } catch ( error: any ) {
        return Response.json({ msg: 'ログインに失敗しました。' }, { status: 401 });

    }
}
