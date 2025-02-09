import { cookies } from "next/headers";

export async function PUT( request: Request, { params } : {params: Promise<{ eventId: string }>} ) {
    const eventId = (await params).eventId;

    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt');
    const jwt = jwtCookie?.value;

    if ( ! jwt ) {
        return Response.json( { msg: 'トークンが設定されていません。' }, { status: 401 } );
    }

    const formData = await request.formData();

    const title   = formData.get('title');
    const type    = formData.get('type');
    const startAt = formData.get('start_at');
    const endAt   = formData.get('end_at');
    const memo    = formData.get('memo');

    try {
        const res = await fetch(`http://backend/api/event/${eventId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                title: title,
                type: type,
                start_at: startAt,
                end_at: endAt,
                memo: memo
            })
        });

        const data = await res.json();

        return Response.json( data, { status: res.status } );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { msg: 'サーバーエラー' }, { status: 500 } );

    }
}

export async function DELETE( request: Request, { params } : {params: Promise<{ eventId: string }>} ) {
    const eventId = (await params).eventId;

    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt');
    const jwt = jwtCookie?.value;

    if ( ! jwt ) {
        return Response.json( { msg: 'トークンが設定されていません。' }, { status: 401 } );
    }

    try {
        const res = await fetch(`http://backend/api/event/${eventId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
        });

        const data = await res.json();

        return Response.json( data, { status: res.status } );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { msg: 'サーバーエラー' }, { status: 500 } );

    }
}
