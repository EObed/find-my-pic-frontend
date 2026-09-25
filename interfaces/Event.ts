import {Photo} from "@/interfaces/Photo";

export default interface IEvent {
    id: string
    name: string
    /** Event day as an ISO date (yyyy-MM-dd). */
    date: string
    code: string
    description?: string
    status: 'active' | 'inactive'
    photoCount: number
    /** ISO timestamp — a string rather than a Date so it serializes from server to client components. */
    createdAt: string
    photos: Photo[]
}

/** Fields the photographer edits in the create/edit form. */
export interface EventInput {
    name: string
    code: string
    date: string
    description: string
}
