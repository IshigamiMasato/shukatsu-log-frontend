
import { Event } from "@/types";
import "./Modal.css";
import { EVENT_TYPES } from "@/constants/eventConstants";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

type Props = {
    handleCloseClick: () => void,
    event: Event|null,
    events: Event[],
    setEvents: (events: Event[]) => void,
    setModalOpen: (bool: boolean) => void,
}

const Modal: React.FC<Props> = ({ handleCloseClick, event, events, setEvents, setModalOpen }) => {
    const [title, setTitle]     = useState(event?.title);
    const [type, setType]       = useState(event?.type);
    const [startAt, setStartAt] = useState(event?.start_at);
    const [endAt, setEndAt]     = useState(event?.end_at);
    const [memo, setMemo]       = useState(event?.memo);

    const { user } = useSelector( (state: RootState) => state.auth );

    // バリデーションエラー用
    const [errors, setErrors] = useState<{ title?: []; type?: []; start_at?: []; end_at?: []; memo?: []; }>({});

    const router = useRouter();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("user_id", String(user?.user_id) ); // なければundifined

        const jwt = localStorage.getItem("access_token") ?? "";

        fetch(`/api/event/${event?.event_id}`, {method: "PUT", headers: {Authorization: jwt},  body: formData})
            .then(res => {
                if ( ! res.ok ) {
                    res.json().then(res => {
                        // バリデーションエラー
                        if ( res.code == "BAD_REQUEST" ) {
                            setErrors(res.errors);
                        }
                    })
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

                    return;
                });
            })
    }

    const handleDeleteEvent = (eventId: number|undefined) => {
        if ( ! eventId ) {
            return;
        }

        const jwt = localStorage.getItem("access_token") ?? "";

        fetch(`/api/event/${event?.event_id}`, {
            method: "DELETE",
            headers: {Authorization: jwt},
            body: JSON.stringify({ "user_id": user?.user_id })

        }).then(res => {
            res.json().then(deletedEvent => {
                console.log(deletedEvent);
                const newEvents = events.filter(event => event.event_id != deletedEvent.event_id);
                setEvents(newEvents);
                setModalOpen(false);
                return;

            });
        });
    }

    return (
        <div className="modal">
            <div className="modal-content">

                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="">タイトル</label>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        { errors.title && <p className="text-red-500">{ errors.title.join(',') }</p>}
                    </div>
                    <div>
                        {EVENT_TYPES.map((value) => {
                            return (
                            <label key={ value.id }>
                                <input name="type" type="radio" value={ value.id } checked={value.id == Number(type)} onChange={e => setType(Number(e.target.value))} />
                                { value.name }
                            </label>
                            );
                        })}
                        { errors.type && <p className="text-red-500">{ errors.type.join(',') }</p>}
                    </div>
                    <div>
                        <label htmlFor="">開始日時</label>
                        <input type="datetime-local" name="start_at" value={startAt} onChange={e => setStartAt(e.target.value)} />
                        { errors.start_at && <p className="text-red-500">{ errors.start_at.join(',') }</p>}
                    </div>
                    <div>
                        <label htmlFor="">終了日時</label>
                        <input type="datetime-local" name="end_at" value={endAt} onChange={e => setEndAt(e.target.value)} />
                        { errors.end_at && <p className="text-red-500">{ errors.end_at.join(',') }</p>}
                    </div>
                    <div>
                        <label htmlFor="">メモ</label>
                        <input type="textarea" name="memo" value={memo} onChange={e => setMemo(e.target.value)} />
                        { errors.memo && <p className="text-red-500">{ errors.memo.join(',') }</p>}
                    </div>

                    <button>更新</button>
                </form>

                <button type="button" onClick={handleCloseClick}>
                    閉じる
                </button>

                <button type="button" onClick={() => handleDeleteEvent(event?.event_id)}>
                    削除
                </button>

            </div>
        </div>
    );
}

export default Modal;
