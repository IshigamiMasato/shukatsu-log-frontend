export async function POST(request: Request) {
    const formData = await request.formData();

    const email    = formData.get('email');
    const password = formData.get('password');

    if ( !email || !password ) {
        let items = [];
        if ( ! email ) items.push("メールアドレス");
        if ( ! password ) items.push("パスワード");

        return Response.json( { msg: `次の項目を入力してください：${items.join("、")}` }, { status: 400 } );
    }

    try {
        const res = await fetch('http://backend/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if ( ! res.ok ) {
            throw new Error( JSON.stringify(data) );
        }

        return Response.json( data );

    } catch ( error: any ) {
        console.error(error.message);
        return Response.json( { msg: 'ログインに失敗しました。' }, { status: 401 } );

    }
}
