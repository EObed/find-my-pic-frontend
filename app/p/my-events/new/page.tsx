'use client'

import { useRouter } from 'next/navigation'
import {EventForm} from "@/components/photographer/EventForm";

export default function CreateEventPage() {
    const router = useRouter()
    return <EventForm mode="create" onCancel={() => router.push('/p/my-events')} />
}
