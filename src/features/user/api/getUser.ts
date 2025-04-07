import getJWT from "@/server/utils/getJWT";
import { User } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getUser = async (): Promise<User|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch user. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const user: User = await res.json();

    return user;
}
