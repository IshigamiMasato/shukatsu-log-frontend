"use client";

import { FormEvent, useEffect, useState } from "react";
import useAuthInit from "@/hooks/useAuthInit";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event, Msg } from "@/types";
import { EVENT_TYPES } from "@/constants/eventConstants";

const Calender = () => {
    useAuthInit();
    const { isAuthenticated, user, authStatusChecked } = useSelector( (state: RootState) => state.auth );
    const router = useRouter();

    // 予定登録フォームの状態管理
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [memo, setMemo] = useState("");

    const clearForm = () => {
        setTitle("");
        setType("");
        setStartAt("");
        setEndAt("");
        setMemo("");
    }

    const [msg, setMsg] = useState<Msg|null>();

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        if ( authStatusChecked ) {
            // 認証状態確認後、未認証だった場合はログイン画面へリダイレクト
            if ( ! isAuthenticated ) {
                router.push("/login");
            }

            const getEvents = async () => {
                const jwt = localStorage.getItem("access_token") ?? "";
                const res = await fetch('/api/event', {method: 'GET', headers: {Authorization: jwt}});

                if ( ! res.ok ) {
                    // イベント情報が取得できなかった場合
                }

                const data = await res.json();
                setEvents(data);
            }

            getEvents();
        }
    }, [authStatusChecked]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("user_id", String(user?.user_id) ); // なければundifined

        const jwt = localStorage.getItem("access_token") ?? "";

        fetch('/api/event', {method: "POST", headers: {Authorization: jwt},  body: formData})
            .then(res => {
                if( ! res.ok ) {
                    setMsg({status: "error", content: "予定登録に失敗しました。もう一度お試しください。"});
                    return;
                }

                res.json().then(newEvent => {
                    setEvents([ ...events, newEvent ]);
                    setMsg({status: "info", content: `タイトル：${newEvent.title}の登録が完了しました。`});
                    clearForm();
                    return;
                });
            })
    }

    return (
        <>
            {/* 予定登録フォーム */}
            <div>
                <form method="POST" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="">タイトル</label>
                        <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        {EVENT_TYPES.map((value) => {
                            return (
                            <label key={ value.id }>
                                <input name="type" type="radio" value={ value.id } onChange={e => setType(e.target.value)} checked={value.id == Number(type)} required />
                                { value.name }
                            </label>
                            );
                        })}
                    </div>
                    <div>
                        <label htmlFor="">開始</label>
                        <input type="datetime-local" name="start_at" value={startAt} onChange={e => setStartAt(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="">終了</label>
                        <input type="datetime-local" name="end_at" value={endAt} onChange={e => setEndAt(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="">メモ</label>
                        <input type="textarea" name="memo" value={memo} onChange={e => setMemo(e.target.value)} />
                    </div>
                    <button>登録</button>
                    { msg && ( <div className={ `${ msg.status == "error" && "bg-red-100" } ${ msg.status == "info" && "bg-green-100" }`  }>{ msg.content }</div> ) }
                </form>
            </div>

            {/* 予定表示 */}
            <div>
                {
                    events.map(event => {
                        return (
                            <div key={event.event_id}>
                                <h3>予定ID: { event.event_id }</h3>
                                <h3>ユーザID: { event.user_id }</h3>
                                <h3>題名: { event.title }</h3>
                                <p>タイプ: { event.type }</p>
                                <p>開始日時: { event.start_at }</p>
                                <p>終了日時: { event.end_at }</p>
                            </div>
                        );
                    })
                }
            </div>

            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={
                    events.map(event => {
                        return { id: String(event.event_id), title: event.title, start: event.start_at, end: event.end_at };
                    })
                }
                locale="ja"
            />
        </>
    )
}

export default Calender;
