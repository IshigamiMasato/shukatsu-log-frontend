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
