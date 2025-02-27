"use client";

import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event } from "@/types";
import { EVENT_TYPES } from "@/constants/const";
import moment from "moment";
import { EventClickArg } from "@fullcalendar/core/index.js";
import EventModal from "@/components/event/EventModal";
import { dispToast } from "@/store/modules/toast";
import ModalPortal from "@/components/ModalPortal";
import FormItem from "@/components/containers/FormItem";
import Label from "@/components/elements/Label";
import Input from "@/components/elements/Input";
import ValidationErrorMsg from "@/components/elements/ValidationErrorMsg";
import Button from "@/components/elements/Button";
import RequiredBadge from "@/components/elements/RequiredBadge";
import Textarea from "@/components/elements/Textarea";

const CalenderPage = () => {
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
            <div className="w-full sm:max-w-lg max-w-sm p-4 bg-white mx-auto">
                <h2 className="text-lg font-semibold mb-5">予定登録フォーム</h2>
                <form method="POST" onSubmit={onSubmit}>
                    <FormItem>
                        <Label label="タイトル" /><RequiredBadge />
                        <Input
                            type="text"
                            name="title"
                            value={title}
                            onChange={ e => setTitle(e.target.value) }
                            required={true}
                            errors={validationErrors.title}
                        />
                        { validationErrors.title && <ValidationErrorMsg errors={validationErrors.title} /> }
                    </FormItem>
                    <FormItem>
                        <RequiredBadge /><br />
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
                        { validationErrors.type && <ValidationErrorMsg errors={validationErrors.type} /> }
                    </FormItem>
                    <FormItem>
                        <Label label="開始" /><RequiredBadge />
                        <Input
                            type="datetime-local"
                            name="start_at"
                            value={ startAt }
                            onChange={ e => setStartAt(e.target.value) }
                            required={true}
                            errors={validationErrors.start_at}
                        />
                        { validationErrors.start_at && <ValidationErrorMsg errors={validationErrors.start_at} /> }
                    </FormItem>
                    <FormItem>
                        <Label label="終了" /><RequiredBadge />
                        <Input
                            type="datetime-local"
                            name="end_at"
                            value={ endAt }
                            onChange={ e => setEndAt(e.target.value) }
                            required={true}
                            errors={validationErrors.end_at}
                        />
                        { validationErrors.end_at && <ValidationErrorMsg errors={validationErrors.end_at} /> }
                    </FormItem>
                    <FormItem>
                        <Label label="メモ" />
                        <Textarea
                            name="memo"
                            value={ memo }
                            onChange={ e => setMemo(e.target.value) }
                            errors={validationErrors.memo}
                        />
                        { validationErrors.memo && <ValidationErrorMsg errors={validationErrors.memo} /> }
                    </FormItem>
                    <Button className="bg-blue-600 text-white mt-3">登録</Button>
                </form>
            </div>

            {/* 予定カレンダー表示域 */}
            <div className="container mx-auto px-8 py-6">
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

export default CalenderPage;
