import { cookies } from "next/headers";

export async function GET(request: Request, { params } : {params: Promise<{ companyId: string }>}) {
    const companyId = (await params).companyId;

    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt');
    const jwt = jwtCookie?.value;

    if ( ! jwt ) {
        return Response.json( { msg: 'トークンが設定されていません。' }, { status: 401 } );
    }

    try {
        const res = await fetch(`http://backend/api/company/${companyId}`, {
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

export async function DELETE( request: Request, { params } : {params: Promise<{ companyId: string }>} ) {
    const companyId = (await params).companyId;

    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt');
    const jwt = jwtCookie?.value;

    if ( ! jwt ) {
        return Response.json( { msg: 'トークンが設定されていません。' }, { status: 401 } );
    }

    try {
        const res = await fetch(`http://backend/api/company/${companyId}`, {
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
