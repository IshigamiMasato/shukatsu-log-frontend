import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import getJWT from "@/server/utils/getJWT";

export async function GET(request: Request, { params } : {params: Promise<{ applyId: number, examId: number }>}) {
    const { applyId, examId } = await params;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    try {
        const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/exam/${examId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
        });

        const data = await res.json();

        return Response.json( data, {status: res.status} );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
};

export async function PUT(request: Request, { params } : {params: Promise<{ applyId: number, examId: number }>}) {
    const { applyId, examId } = await params;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    const formData = await request.formData();

    const examDate = formData.get('exam_date');
    const content = formData.get('content');
    const memo = formData.get('memo');

    try {
        const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/exam/${examId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                exam_date: examDate,
                content: content,
                memo: memo ? memo : null,
            })
        });

        const data = await res.json();

        return Response.json( data, { status: res.status } );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}

export async function DELETE(request: Request, { params } : {params: Promise<{ applyId: number, examId: number }>}) {
    const applyId = (await params).applyId;
    const examId = (await params).examId;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    try {
        const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/exam/${examId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
        });

        const data = await res.json();

        return Response.json( data, { status: res.status } );

    } catch ( error: any ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}
