"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event } from "@/types";
import { EventClickArg } from "@fullcalendar/core/index.js";
import ModalPortal from "@/components/ModalPortal";
import EventModal from "@/features/event/components/EventModal";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ActionContainer from "@/components/containers/ActionContainer";
import TitleContainer from "@/components/containers/TitleContainer";

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

            <TitleContainer main="スケジュール" />
            <div className="container mx-auto px-8 py-6 bg-white rounded-lg">
                <Link href='/event/create'>
                    <ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white mx-0 mb-3">
                        <FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">予定登録</span>
                    </ActionContainer>
                </Link>

                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    headerToolbar={
                        {
                            start: '',
                            center: 'title',
                            end: 'today prev,next'
                        }
                    }
                    buttonText={{ today:  '今日' }}
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
