import BackLink from "@/components/navigations/BackLink";
import EventCreateForm from "@/features/event/components/EventCreateForm";

export const metadata = {
	title: `予定登録 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const EventCreatePage = () => {
    return (
        <>
            <BackLink />
            <EventCreateForm />
        </>
    )
}

export default EventCreatePage;
