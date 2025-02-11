"use client";

import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event } from "@/types";
import { EVENT_TYPES } from "@/constants/eventConstants";
import { createPortal } from "react-dom";
import moment from "moment";
import { EventClickArg } from "@fullcalendar/core/index.js";
import EventModal from "@/components/event/EventModal";
import { dispToast } from "@/store/modules/toast";

const ModalPortal = ({ children } : { children: React.ReactNode }) => {
    const target = document.querySelector('.modal-wrapper');

    if ( ! target ) return;

    return createPortal(children, target);
}

const Calender = () => {
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

    const dispatch = useDispatch();

    /************ イベント登録 ************/
    const [title, setTitle]     = useState<string>("");
    const [type, setType]       = useState<number|null>(null);
    const [startAt, setStartAt] = useState<string>( moment().format("YYYY-MM-DD HH:mm") );
    const [endAt, setEndAt]     = useState<string>( moment().format("YYYY-MM-DD HH:mm") );
    const [memo, setMemo]       = useState<string>("");

    const [validationErrors, setValidationErrors] = useState<{ title?: []; type?: []; start_at?: []; end_at?: []; memo?: []; }>({});

    const clearForm = () => {
        setTitle("");
        setType(null);
        setStartAt( moment().format("YYYY-MM-DDTHH:mm") );
        setEndAt( moment().format("YYYY-MM-DDTHH:mm") );
        setMemo("");
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch('/api/event', {
            method: "POST",
            body: formData
        }).then(res => {
            if( ! res.ok ) {
                res.json().then(res => {
                    // バリデーションエラー
                    if ( res.code == "BAD_REQUEST" ) {
                        setValidationErrors(res.errors);
                    }
                })
                dispatch( dispToast({ status: "error", message: `予定登録に失敗しました。もう一度お試しください。` }) );
                return;
            }

            res.json().then(newEvent => {
                setEvents([ ...events, newEvent ]);
                dispatch( dispToast({ status: "success", message: `タイトル：${newEvent.title} の登録が完了しました。` }) );
                clearForm();
            });
        })
    }
    /************ イベント登録 ************/

    /************ イベント表示 ************/
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
    /************ イベント表示 ************/

    return (
        <>
            {/* 予定モーダル表示域 */}
            <div className="modal-wrapper"></div>

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

            {/* 予定登録フォーム */}
            <div>
                <form method="POST" onSubmit={onSubmit}>
                    <div>
                        <label>タイトル</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={ e => setTitle(e.target.value) }
                            required
                        />
                        { validationErrors.title && <p className="text-red-500">{ validationErrors.title.join(',') }</p> }
                    </div>
                    <div>
                        {
                            EVENT_TYPES.map(value => {
                                return (
                                    <label key={ value.id }>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ value.id }
                                            onChange={ e => setType(Number(e.target.value)) }
                                            checked={ value.id == type }
                                            required
                                        />
                                        { value.name }
                                    </label>
                                );
                            })
                        }
                        { validationErrors.type && <p className="text-red-500">{ validationErrors.type.join(',') }</p> }
                    </div>
                    <div>
                        <label>開始</label>
                        <input
                            type="datetime-local"
                            name="start_at"
                            value={ startAt }
                            onChange={ e => setStartAt(e.target.value) }
                            required
                        />
                        { validationErrors.start_at && <p className="text-red-500">{ validationErrors.start_at.join(',') }</p> }
                    </div>
                    <div>
                        <label>終了</label>
                        <input
                            type="datetime-local"
                            name="end_at"
                            value={ endAt }
                            onChange={ e => setEndAt(e.target.value) }
                            required
                        />
                        { validationErrors.end_at && <p className="text-red-500">{ validationErrors.end_at.join(',') }</p> }
                    </div>
                    <div>
                        <label>メモ</label>
                        <input
                            type="textarea"
                            name="memo"
                            value={ memo }
                            onChange={ e => setMemo(e.target.value) }
                        />
                        { validationErrors.memo && <p className="text-red-500">{ validationErrors.memo.join(',') }</p> }
                    </div>
                    <button>登録</button>
                </form>
            </div>

            {/* 予定カレンダー表示域 */}
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
        </>
    )
}

export default Calender;
