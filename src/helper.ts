import { cookies } from "next/headers";

export const getJWT = async (): Promise<string|undefined> => {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('jwt');

    return jwtCookie?.value;
}
