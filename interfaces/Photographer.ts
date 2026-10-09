import { Photo } from '@/interfaces/Photo'

export interface PhotographerSummary {
    id: string
    name: string
    avatarUrl?: string
}

export interface Photographer extends PhotographerSummary {
    specialties: string[]
    description?: string
    email?: string
    phone?: string
    bestWork: Photo[]
}
