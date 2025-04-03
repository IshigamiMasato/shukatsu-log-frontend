import { SERVER_ERROR, UNSET_TOKEN_ERROR } from "@/constants/api";
import getJWT from "@/server/utils/getJWT";

export async function GET() {
    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    try {
        const res = await fetch(`${process.env.API_URL}/api/company`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
        });

        const data = await res.json();

        return Response.json( data, {status: res.status} );

    } catch ( error ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
};

export async function POST(request: Request) {
    const jwt = await getJWT();

    if ( ! jwt ) {
        return Response.json( { message: UNSET_TOKEN_ERROR }, { status: 401 } );
    }

    const formData = await request.formData();

    const name           = formData.get('name');
    const url            = formData.get('url');
    const president      = formData.get('president');
    const address        = formData.get('address');
    const establishDate  = formData.get('establish_date');
    const employeeNumber = formData.get('employee_number');
    const listingClass   = formData.get('listing_class');
    const businessDescription = formData.get('business_description');
    const benefit        = formData.get('benefit');
    const memo           = formData.get('memo');

    try {
        const res = await fetch(`${process.env.API_URL}/api/company`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${jwt}` },
            body: JSON.stringify({
                name: name,
                url: url ? url : null,
                president: president ? president : null,
                address: address ? address : null,
                establish_date: establishDate ? establishDate : null,
                employee_number: employeeNumber ? employeeNumber : null,
                listing_class: listingClass ? listingClass : null,
                business_description: businessDescription ? businessDescription : null,
                benefit: benefit ? benefit : null,
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
