export async function GET(request: Request) {
    // フロント側で JWT を設定できなかった場合、空文字 が設定
    const jwt = request.headers.get('Authorization');
    if ( ! jwt ) {
        return Response.json( { msg: 'トークンが設定されていません。' }, { status: 401 } );
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
        return Response.json( { msg: 'サーバーエラー' }, { status: 500 } );

    }
};

export async function POST(request: Request) {
    // フロント側で JWT を設定できなかった場合、空文字 が設定
    const jwt = request.headers.get('Authorization');
    if ( ! jwt ) {
        return Response.json( { msg: 'トークンが設定されていません。' }, { status: 401 } );
    }

    const formData = await request.formData();

    // フロント側で user_id が設定されなかった場合、undifined が設定
    const userId  = formData.get('user_id');
    if ( ! userId ) {
        return Response.json( { msg: '会員IDが取得できませんでした。' }, { status: 401 } );
    }

    const title   = formData.get('title');
    const type    = formData.get('type');
    const startAt = formData.get('start_at');
    const endAt   = formData.get('end_at');
    const memo    = formData.get('memo');

    if ( title === '' || type === '' || startAt === '' || endAt === '' ) {
        return Response.json( { msg: '入力フィールドが空です。' }, { status: 400 } );
    }

    try {
        const res = await fetch('http://backend/api/event', {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                user_id: userId,
                title: title,
                type: type,
                start_at: startAt,
                end_at: endAt,
                memo: memo
            })
        });

        const data = await res.json();

        return Response.json( data, {status: res.status} );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( {msg: 'サーバーエラー'}, {status: 500} );

    }
}
