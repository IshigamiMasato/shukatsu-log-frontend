"use client";

import { Event } from "@/types";
import "./EventModal.css";
import { EVENT_TYPES } from "@/constants/const";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { dispToast } from "@/store/modules/toast";

type Props = {
    setModalOpen: (bool: boolean) => void,
    event: Event,
    events: Event[],
    setEvents: (events: Event[]) => void,
}

const EventModal: React.FC<Props> = ({ setModalOpen, event, events, setEvents }) => {
    const [title, setTitle]     = useState<string>(event.title);
    const [type, setType]       = useState<number>(event.type);
    const [startAt, setStartAt] = useState<string>(event.start_at);
    const [endAt, setEndAt]     = useState<string>(event.end_at);
    const [memo, setMemo]       = useState<string>(event.memo ? event.memo : "");

    const [validationErrors, setValidationErrors] = useState<{ title?: []; type?: []; start_at?: []; end_at?: []; memo?: []; }>({});

    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/event/${event.event_id}`, {
            method: "PUT",
            body: formData
        }).then(res => {
            if ( ! res.ok ) {
                res.json().then(res => {
                    // バリデーションエラー
                    if ( res.code == "BAD_REQUEST" ) {
                        setValidationErrors(res.errors);
                    } else {
                        setModalOpen(false);
                        dispatch( dispToast({ status: "error", message: `予定の更新に失敗しました。もう一度お試しください。` }) );
                    }
                })
                return;
            }

            res.json().then(updatedEvent => {
                const newEvents = events.map(event => {
                    if (event.event_id == updatedEvent.event_id) {
                        return updatedEvent;
                    }

                    return event;
                });

                setEvents(newEvents);
                setModalOpen(false);
                dispatch( dispToast({ status: "success", message: `予定を更新しました。` }) );
            });
        })
    }

    const deleteEventHandler = (eventId: number) => {
        const isConfirmed = window.confirm("本当に削除しますか？");

        if ( isConfirmed ) {
            fetch(`/api/event/${eventId}`, {
                method: "DELETE",
            }).then(res => {
                if ( ! res.ok ) {
                    setModalOpen(false);
                    dispatch( dispToast({ status: "error", message: `予定の削除に失敗しました。もう一度お試しください。` }) );
                    return;
                }

                res.json().then(deletedEvent => {
                    const newEvents = events.filter(event => event.event_id != deletedEvent.event_id);
                    setEvents(newEvents);
                    setModalOpen(false);
                    dispatch( dispToast({ status: "success", message: `予定を削除しました。` }) );
                });
            });
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">

                <form onSubmit={onSubmit}>
                    <div>
                        <label>タイトル</label>
                        <input
                            type="text"
                            name="title"
                            value={ title }
                            onChange={ e => setTitle(e.target.value) }
                        />
                        { validationErrors.title && <p className="text-red-500">{ validationErrors.title.join(',') }</p> }
                    </div>
                    <div>
                        {
                            EVENT_TYPES.map((value) => {
                                return (
                                    <label key={ value.id }>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ value.id }
                                            onChange={ e => setType(Number(e.target.value)) }
                                            checked={ value.id == type}
                                        />
                                    { value.name }
                                </label>
                            );
                        })}
                        { validationErrors.type && <p className="text-red-500">{ validationErrors.type.join(',') }</p> }
                    </div>
                    <div>
                        <label>開始日時</label>
                        <input
                            type="datetime-local"
                            name="start_at"
                            value={ startAt }
                            onChange={ e => setStartAt(e.target.value) }
                        />
                        { validationErrors.start_at && <p className="text-red-500">{ validationErrors.start_at.join(',') }</p> }
                    </div>
                    <div>
                        <label>終了日時</label>
                        <input
                            type="datetime-local"
                            name="end_at"
                            value={ endAt }
                            onChange={ e => setEndAt(e.target.value) }
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

                    <button>更新</button>
                </form>

                <button type="button" onClick={() => setModalOpen(false)}>
                    閉じる
                </button>

                <button type="button" onClick={() => deleteEventHandler(event.event_id)}>
                    削除
                </button>

            </div>
        </div>
    );
}

export default EventModal;
