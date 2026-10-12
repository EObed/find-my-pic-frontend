'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ArrowLeft, CalendarIcon } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader } from '@/components/Loader'
import { ImageUploadInput } from '@/components/photographer/ImageUploadInput'
import { Textarea } from '@/components/ui/textarea'
import {FrontEndImage, Photo} from "@/interfaces/Photo";
import IEvent from '@/interfaces/Event'
import { createEventAction, updateEventAction } from '@/actions/events'


type EventFormProps =
    | { mode: 'create'; event?: undefined }
    | { mode: 'edit'; event: IEvent }

export function EventForm({ mode, event }: EventFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: event?.name || '',
        code: event?.code || '',
        description: event?.description || '',
    })
    // Store date as a Date object for the calendar; parseISO keeps yyyy-MM-dd in local time.
    const [eventDate, setEventDate] = useState<Date | undefined>(
        event?.date ? parseISO(event.date) : undefined
    )
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [existingImages] = useState<Photo[]>(event?.photos || [])
    const [pendingPhotos, setPendingPhotos] = useState<FrontEndImage[]>([])
    const [isLoading, startTransition] = useTransition()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const cancelHref = event ? `/p/my-events/${event.id}` : '/p/my-events'

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Event name is required'
        }
        if (!eventDate) {
            newErrors.eventDate = 'Event date is required'
        }
        if (pendingPhotos.length === 0 && existingImages.length === 0) {
            newErrors.images = 'Please upload at least one image'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) {
            toast.error('Please fix the errors in the form')
            return
        }

        const input = {
            name: formData.name,
            code: formData.code,
            date: eventDate ? format(eventDate, 'yyyy-MM-dd') : '',
            description: formData.description,
        }

        startTransition(async () => {
            // TODO(api): upload pendingPhotos directly to storage — see actions/events.ts.
            const result = event
                ? await updateEventAction(event.id, input)
                : await createEventAction(input)

            if (result.ok === false) {
                if (result.errors) setErrors(result.errors)
                toast.error(result.message ?? 'Failed to save event. Please try again.')
                return
            }

            toast.success(mode === 'create' ? 'Event created successfully' : 'Event updated successfully')
            router.push(`/p/my-events/${result.data.id}`)
        })
    }

    return (
        <>
            {isLoading &&
                <Loader
                    title={mode === 'create' ? 'Creating event' : 'Saving changes'}
                    description={mode === 'create'
                        ? 'Please standby while we create your event.'
                        : 'Please standby while we update your event.'}
            />}
        <div className="min-h-[calc(100vh-4rem)] bg-background pb-28">
            {/* Form */}
            <form
                id="event-form"
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
            >
                <div className="mb-8 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Link
                        href={cancelHref}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {event ? event.name : 'My Events'}
                    </Link>
                    <div>
                        <h1 className="text-3xl font-semibold sm:text-4xl">{mode === 'create' ? 'Create an event' : 'Edit event'}</h1>
                        <p className="mt-2 text-muted-foreground">
                            {mode === 'create'
                                ? 'Add the details and your photos. You’ll get a code to share with guests.'
                                : 'Update the event details. Changes are visible to guests right away.'}
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Event Details */}
                    <div className="space-y-6 rounded-2xl border border-border bg-card/80 p-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Event Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Event Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium">
                                        Event Name *
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="e.g., Sarah & John Wedding"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value })
                                            if (errors.name) setErrors({ ...errors, name: '' })
                                        }}
                                        className={errors.name ? 'border-destructive' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                {/* Event Date — shadcn Calendar in a Popover */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        Event Date *
                                    </label>
                                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                        <PopoverTrigger
                                            className={cn(
                                                'flex h-11 w-full items-center rounded-lg border border-input bg-card/60 px-3 py-2 text-left text-sm font-normal transition-[border-color,box-shadow] hover:border-primary/30 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:outline-none',
                                                !eventDate && 'text-muted-foreground',
                                                errors.eventDate && 'border-destructive'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {eventDate ? format(eventDate, 'PPP') : 'Pick a date'}
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={eventDate}
                                                onSelect={(date) => {
                                                    setEventDate(date)
                                                    setCalendarOpen(false)
                                                    if (errors.eventDate)
                                                        setErrors({ ...errors, eventDate: '' })
                                                }}
                                                disabled={(date) =>
                                                    date > new Date(new Date().setHours(23, 59, 59, 999))
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.eventDate && (
                                        <p className="text-sm text-destructive">{errors.eventDate}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2 w-full mt-4">
                                <label htmlFor="description" className="block text-sm font-medium">
                                    Description (Optional)
                                </label>
                                <Textarea
                                    id="description"
                                    placeholder="e.g., Reception at Grand Hotel"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images — fixed height so photos scroll, not the action buttons */}
                    <div className="rounded-2xl border border-border bg-card/80 p-6 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-both">
                        <h2 className="text-xl font-semibold mb-6">Event Photos</h2>
                        <div className="max-h-[480px] overflow-y-auto pr-1">
                            <ImageUploadInput
                                onImagesChange={setPendingPhotos}
                                maxImages={100}
                            />
                        </div>
                        {errors.images && (
                            <p className="text-sm text-destructive mt-2">{errors.images}</p>
                        )}
                    </div>
                </div>
            </form>

            {/* Sticky footer actions */}
            <div className="glass fixed bottom-0 left-0 right-0 z-40 border-t border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-4 justify-end">
                    <Button variant="outline" render={<Link href={cancelHref} />} nativeButton={false}>Cancel</Button>
                    <Button
                        type="submit"
                        form="event-form"
                        disabled={isLoading}
                        className="shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                    >
                        {mode === 'create' ? 'Create Event' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
        </>
    )
}