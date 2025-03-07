import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import { getJWT } from "@/helper";

export async function GET(request: Request, { params } : {params: Promise<{ applyId: number, documentId: number, fileId: number }>}) {
    const { applyId, documentId, fileId } = await params;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    try {
        const res = await fetch(`http://backend/api/apply/${applyId}/document/${documentId}/file/${fileId}`, {
            method: "GET",
            headers: { "Authorization" : `Bearer ${jwt}` },
        });

        if ( ! res.ok ) {
            const data = await res.json();
            return Response.json( data, { status: res.status } );
        }

        // ファイルダウンロードはそのままレスポンスを返してブラウザ側で処理をしてもらう
        return res;

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
};
