import { File } from "./file";

export type Document = {
    document_id: number,
    apply_id: number,
    submission_date: string,
    memo: string|null,
    created_at: string|null,
    updated_at: string|null,
    files: File[],
}
