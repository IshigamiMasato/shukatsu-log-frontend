import { getEvents } from "@/features/event/api/getEvents";
import Calendar from "@/features/event/components/Calendar";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `予定一覧 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const EventPage = async () => {
    await verifyAuth();
    const events = await getEvents();

    return (
        <Calendar events={events} />
    )
}

export default EventPage;
