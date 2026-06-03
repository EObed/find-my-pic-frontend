import {Photo} from "@/interfaces/Photo";

export default interface IEvent {
    id: string
    name: string
    date: string
    code: string
    description?: string
    status: 'active' | 'inactive'
    photoCount: number
    createdAt: Date
    photos: Photo[]
}