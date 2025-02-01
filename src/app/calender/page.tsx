"use client";

import { FormEvent, useEffect, useState } from "react";
import useAuthInit from "@/hooks/useAuthInit";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

type Event = {
    event_id: number,
    user_id: number,
    title: string,
    type: number,
    start_at: string,
    end_at: string,
}

const Calender = () => {
    useAuthInit();
    const { isAuthenticated, user, authStatusChecked } = useSelector( (state: RootState) => state.auth );
    const router = useRouter();

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (authStatusChecked) {
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

    const EVENT_TYPES = [
        { id: 1, name: "説明会" },
        { id: 2, name: "リクルータ面談" },
        { id: 3, name: "書類提出" },
        { id: 4, name: "適性検査" },
        { id: 5, name: "面談" },
        { id: 6, name: "内定関連" },
    ];

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("user_id", String(user?.user_id) ); // なければundifined

        const jwt = localStorage.getItem("access_token") ?? "";

        fetch('/api/event', {method: "POST", headers: {Authorization: jwt},  body: formData})
            .then(res => {
                if( ! res.ok ) {
                    return;
                }

                res.json().then(newEvent => {
                    setEvents([ ...events, newEvent ]);
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
                        <input type="text" name="title" />
                    </div>
                    <div>
                        {EVENT_TYPES.map((value) => {
                            return (
                            <label key={ value.id }>
                                <input name="type" type="radio" value={ value.id } />
                                { value.name }
                            </label>
                            );
                        })}
                    </div>
                    <div>
                        <label htmlFor="">開始</label>
                        <input type="datetime-local" name="start_at" />
                    </div>
                    <div>
                        <label htmlFor="">終了</label>
                        <input type="datetime-local" name="end_at" />
                    </div>
                    <div>
                        <label htmlFor="">メモ</label>
                        <input type="textarea" name="memo" />
                    </div>
                    <button>登録</button>
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
