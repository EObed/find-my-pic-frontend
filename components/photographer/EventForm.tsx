'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ArrowLeft, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader } from '@/components/Loader'
import { ImageUploadInput } from '@/components/photographer/ImageUploadInput'
import { Textarea } from '@/components/ui/textarea'

interface ImageFile {
    id: string
    file: File
    preview: string
}

interface EventFormProps {
    mode: 'create' | 'edit'
    eventId?: string
    initialData?: {
        name: string
        code: string
        eventDate: string
        description: string
        images: ImageFile[]
    }
}

export function EventForm({ mode, eventId, initialData }: EventFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        code: initialData?.code || '',
        description: initialData?.description || '',
    })
    // Store date as a Date object for the calendar
    const [eventDate, setEventDate] = useState<Date | undefined>(
        initialData?.eventDate ? new Date(initialData.eventDate) : undefined
    )
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [images, setImages] = useState<ImageFile[]>(initialData?.images || [])
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Event name is required'
        }
        if (!eventDate) {
            newErrors.eventDate = 'Event date is required'
        }
        if (images.length === 0) {
            newErrors.images = 'Please upload at least one image'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
console.log("start")
        if (!validateForm()) {
            toast.error('Please fix the errors in the form')
            return
        }

        setIsLoading(true)
        console.log("loading set to true")

        try {
            // TODO: replace with real API call when ready
            // const data = new FormData()
            // data.append('name', formData.name)
            // data.append('code', formData.code.toUpperCase())
            // data.append('eventDate', eventDate ? eventDate.toISOString() : '')
            // data.append('description', formData.description)
            // images.forEach((img) => { data.append('images', img.file) })
            // const url = mode === 'create' ? '/api/events' : `/api/events/${eventId}`
            // const response = await fetch(url, { method: mode === 'create' ? 'POST' : 'PATCH', body: data })
            // if (!response.ok) throw new Error(await response.text())

            await new Promise((resolve) => setTimeout(resolve, 3000))

            toast.success(
                mode === 'create'
                    ? 'Event created successfully'
                    : 'Event updated successfully'
            )

            router.push('/p/my-events/001')
            router.refresh()
        } catch (error) {
            console.error('Form submission error:', error)
            toast.error('Failed to save event. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading &&
                <Loader
                    title={"Creating event"}
                    description={"Please standby while we create your event."}
            />}
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="sticky top-0 z-40 backdrop-blur-sm bg-background/80 border-b border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link
                            href="/p/my-events"
                            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Back</span>
                        </Link>
                        <h1 className="text-lg font-bold">
                            {mode === 'create' ? 'Create Event' : 'Edit Event'}
                        </h1>
                        <div className="w-16" />
                    </div>
                </div>
            </div>

            {/* Form */}
            <form
                id="event-form"
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
                <div className="space-y-8">
                    {/* Event Details */}
                    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
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
                                                'flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-left font-normal hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
                    <div className="bg-card rounded-lg border border-border p-6">
                        <h2 className="text-xl font-semibold mb-6">Event Photos</h2>
                        <div className="max-h-[480px] overflow-y-auto pr-1">
                            <ImageUploadInput
                                onImagesChange={setImages}
                                maxImages={50}
                                initialImages={images}
                            />
                        </div>
                        {errors.images && (
                            <p className="text-sm text-destructive mt-2">{errors.images}</p>
                        )}
                    </div>
                </div>
            </form>

            {/* Sticky footer actions */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-t border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-4 justify-end">
                    <Link href="/p/my-events">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button
                        type="submit"
                        form="event-form"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
                    >
                        {mode === 'create' ? 'Create Event' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
        </>
    )
}