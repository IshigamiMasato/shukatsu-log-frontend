import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import getJWT from "@/server/utils/getJWT";

export async function POST(request: Request, { params } : {params: Promise<{ applyId: string }>}) {
    const applyId = (await params).applyId;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    const formData = await request.formData();

    const interviewDate = formData.get('interview_date');
    const interviewerInfo = formData.get('interviewer_info');
    const memo = formData.get('memo');

    try {
        const res = await fetch(`${process.env.API_URL}/api/apply/${applyId}/interview`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                interview_date: interviewDate,
                interviewer_info: interviewerInfo ? interviewerInfo : null,
                memo: memo ? memo : null,
            })
        });

        const data = await res.json();

        return Response.json( data, { status: res.status } );

    } catch ( error ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}
