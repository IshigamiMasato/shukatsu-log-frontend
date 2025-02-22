import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import { getJWT } from "@/helper";

export async function POST(request: Request, { params } : {params: Promise<{ applyId: string }>}) {
    const applyId = (await params).applyId;

    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    const formData = await request.formData();

    const offerDate = formData.get('offer_date');
    const salary = formData.get('salary');
    const condition = formData.get('condition');
    const memo = formData.get('memo');

    try {
        const res = await fetch(`http://backend/api/apply/${applyId}/offer`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                offer_date: offerDate,
                salary: salary ? salary : null,
                condition: condition ? condition : null,
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
