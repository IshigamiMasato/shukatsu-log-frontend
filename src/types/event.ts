export type Event = {
    event_id: number,
    user_id: number,
    title: string,
    type: number,
    start_at: string,
    end_at: string,
    memo: string|null,
    created_at: string|null,
    updated_at: string|null,
}
