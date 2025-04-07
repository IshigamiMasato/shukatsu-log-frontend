import BackLink from "@/components/navigations/BackLink";
import EventCreateForm from "@/features/event/components/EventCreateForm";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `予定登録 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const EventCreatePage = async () => {
    await verifyAuth();

    return (
        <>
            <BackLink />
            <EventCreateForm />
        </>
    )
}

export default EventCreatePage;
