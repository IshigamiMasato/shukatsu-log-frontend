import { Company } from "./company"

export type Apply = {
    apply_id: number,
    user_id: number,
    company_id: number,
    status: number,
    occupation: string|null,
    apply_route: string|null,
    memo: string|null,
    created_at: string|null,
    updated_at: string|null,
    company: Company
}

export type ApplyStatusSummary = {
    document_selection_summary: string,
    exam_selection_summary: string,
    interview_selection_summary: string,
    offer_summary: string,
    final_summary: string,
}
