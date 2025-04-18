"use client";

import { Event } from "@/types";
import { EVENT_TYPES } from "@/constants/const";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { dispToast } from "@/store/modules/toast";
import FormItem from "@/components/forms/FormItem";
import Label from "@/components/elements/Label";
import RequiredBadge from "@/components/forms/RequiredBadge";
import Input from "@/components/elements/Input";
import ValidationErrorMsg from "@/components/forms/ValidationErrorMsg";
import Textarea from "@/components/elements/Textarea";
import Button from "@/components/elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { dispLoading, removeLoading } from "@/store/modules/loading";

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

        dispatch( dispLoading() );
        setValidationErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        fetch(`/api/event/${event.event_id}`, {
            method: "PUT",
            body: formData
        }).then(res => {
            dispatch( removeLoading() );

            if ( ! res.ok ) {
                res.json().then(res => {
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
            dispatch( dispLoading() );

            fetch(`/api/event/${eventId}`, {
                method: "DELETE",
            }).then(res => {
                dispatch( removeLoading() );

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
        <div className="fixed inset-0 w-full h-full bg-black/80 flex justify-center items-center z-50">
            <div className="bg-white p-12 rounded-lg">
                <div className="flex justify-end">
                    <Button onClick={() => setModalOpen(false)} className="border">
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </div>

                <form onSubmit={onSubmit}>
                    <FormItem>
                        <Label>タイトル</Label><RequiredBadge />
                        <Input
                            type="text"
                            name="title"
                            value={ title }
                            onChange={ e => setTitle(e.target.value) }
                            errors={validationErrors.title}
                        />
                        { validationErrors.title && <ValidationErrorMsg errors={validationErrors.title} /> }
                    </FormItem>
                    <FormItem>
                        <Label>タイプ</Label><RequiredBadge /><br />
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
                        { validationErrors.type && <ValidationErrorMsg errors={validationErrors.type} /> }
                    </FormItem>
                    <FormItem>
                        <Label>開始</Label><RequiredBadge />
                        <Input
                            type="datetime-local"
                            name="start_at"
                            value={ startAt }
                            onChange={ e => setStartAt(e.target.value) }
                            errors={validationErrors.start_at}
                        />
                        { validationErrors.start_at && <ValidationErrorMsg errors={validationErrors.start_at} /> }
                    </FormItem>
                    <FormItem>
                        <Label>終了</Label><RequiredBadge />
                        <Input
                            type="datetime-local"
                            name="end_at"
                            value={ endAt }
                            onChange={ e => setEndAt(e.target.value) }
                            errors={validationErrors.end_at}
                        />
                        { validationErrors.end_at && <ValidationErrorMsg errors={validationErrors.end_at} /> }
                    </FormItem>
                    <FormItem>
                        <Label>メモ</Label>
                        <Textarea
                            name="memo"
                            value={ memo }
                            onChange={ e => setMemo(e.target.value) }
                            errors={validationErrors.memo}
                        />
                        { validationErrors.memo && <ValidationErrorMsg errors={validationErrors.memo} /> }
                    </FormItem>

                    <div className="flex space-x-1">
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white mt-3">更新</Button>
                        <Button type="button" onClick={() => deleteEventHandler(event.event_id)} className="bg-red-600 hover:bg-red-700 text-white mt-3">
                            削除
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventModal;
