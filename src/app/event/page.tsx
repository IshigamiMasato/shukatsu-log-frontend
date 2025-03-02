"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event } from "@/types";
import { EventClickArg } from "@fullcalendar/core/index.js";
import ModalPortal from "@/components/ModalPortal";
import EventModal from "@/features/event/components/EventModal";
import Link from "next/link";

const EventPage = () => {
    useEffect(() => {
        const getEvents = async () => {
            const res = await fetch('/api/event', {method: 'GET'});

            if ( res.ok ) {
                const data = await res.json();
                setEvents(data);
            }
        }

        getEvents();
    }, []);

    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const eventClickHandler = ( e: EventClickArg ) => {
        const selectedEventId = Number(e.event.id);
        const selectedEvent = events.find(event => event.event_id == selectedEventId);

        if ( ! selectedEvent ) return;

        setSelectedEvent(selectedEvent);
        setModalOpen(true);
    }

    return (
        <>
            { modalOpen && selectedEvent && (
                <ModalPortal>
                    <EventModal
                        setModalOpen={setModalOpen}
                        event={selectedEvent}
                        events={events}
                        setEvents={setEvents}
                    />
                </ModalPortal>
            )}

            <div className="container mx-auto px-8 py-6">
                <Link href='/event/create' className="bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block mb-3">予定登録</Link>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={
                        events.map(event => {
                            return { id: String(event.event_id), title: event.title, start: event.start_at, end: event.end_at };
                        })
                    }
                    locale="ja"
                    eventClick={eventClickHandler}
                />
            </div>
        </>
    )
}

export default EventPage;
