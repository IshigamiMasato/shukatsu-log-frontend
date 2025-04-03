import { SERVER_ERROR } from "@/constants/api";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const formData = await request.formData();

    const email    = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch(`${process.env.API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        // ログイン成功時にCookieにJWTを保存
        if ( res.ok ) {
            const cookieStore = await cookies();
            cookieStore.set({
                name: 'jwt',
                value: data.access_token,
                httpOnly: true,
            });
        }

        return Response.json( data, { status: res.status } );

    } catch ( error ) {
        console.error(error);
        return Response.json( { message: SERVER_ERROR }, { status: 500 } );

    }
}
