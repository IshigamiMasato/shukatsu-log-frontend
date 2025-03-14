import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import getJWT from "@/server/utils/getJWT";

export async function GET(request: Request, { params } : {params: Promise<{ applyId: number, interviewId: number }>}) {
    const { applyId, interviewId } = await params;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    try {
        const res = await fetch(`http://backend/api/apply/${applyId}/interview/${interviewId}`, {
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

export async function PUT(request: Request, { params } : {params: Promise<{ applyId: number, interviewId: number }>}) {
    const { applyId, interviewId } = await params;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    const formData = await request.formData();

    const interviewDate = formData.get('interview_date');
    const interviewerInfo = formData.get('interviewer_info');
    const memo = formData.get('memo');

    try {
        const res = await fetch(`http://backend/api/apply/${applyId}/interview/${interviewId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                interview_date: interviewDate,
                interviewer_info: interviewerInfo ? interviewerInfo : null,
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

export async function DELETE(request: Request, { params } : {params: Promise<{ applyId: number, interviewId: number }>}) {
    const applyId = (await params).applyId;
    const interviewId = (await params).interviewId;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    try {
        const res = await fetch(`http://backend/api/apply/${applyId}/interview/${interviewId}`, {
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
