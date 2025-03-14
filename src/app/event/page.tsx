import { getEvents } from "@/features/event/api/getEvents";
import Calendar from "@/features/event/components/Calendar";

export const metadata = {
	title: `予定 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const EventPage = async () => {
    const events = await getEvents();
    // トークンリフレッシュが必要な場合
    if ( events === null ) return;

    return (
        <Calendar events={events} />
    )
}

export default EventPage;
