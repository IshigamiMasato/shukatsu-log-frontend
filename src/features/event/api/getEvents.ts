import getJWT from "@/server/utils/getJWT";
import { Event } from "@/types";
import { notFound, redirect } from "next/navigation";

export const getEvents = async (query?: URLSearchParams): Promise<Event[]|never> => {
    const jwt = await getJWT();

    const res = await fetch(`${process.env.API_URL}/api/event` + ( query ? `?${query}` : '' ), {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` }
    });

    if ( ! res.ok ) {
        const data = await res.json();

        if ( res.status == 401 ) redirect('/login');
        if ( res.status == 404 ) notFound();

        throw new Error( `Failed fetch apply status events. (status=${res.status}, data=${JSON.stringify(data)})` );
    }

    const events: Event[] = await res.json();

    return events;
}
