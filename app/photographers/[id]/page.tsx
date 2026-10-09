'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { AlertCircle, Camera, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/Loader'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Avatar } from '@/components/photographer/Avatar'
import { MasonryGallery } from '@/components/photographer/MasonryGallery'
import { generateMockPhotographer } from '@/lib/mockPhotographer'
import type { Photographer } from '@/interfaces/Photographer'

export default function PhotographerProfilePage() {
    const params = useParams()
    const photographerId = params.id as string
    const [photographer, setPhotographer] = useState<Photographer | null>(null)
    const [error, setError] = useState<string | null>(null)
    // Id of the last photographer whose fetch finished; loading is derived from it so the effect never sets state synchronously.
    const [loadedId, setLoadedId] = useState<string | null>(null)
    const isLoading = loadedId !== photographerId

    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                setPhotographer(generateMockPhotographer(photographerId))
                setError(null)
            } catch (err) {
                console.error('Error fetching photographer:', err)
                setError('Failed to load photographer profile')
            } finally {
                setLoadedId(photographerId)
            }
        }, 800)

        return () => clearTimeout(timeout)
    }, [photographerId])

    if (isLoading) {
        return <Loader />
    }

    const contacts: { icon: typeof Phone; label: string; value: string; href: string }[] = []
    if (photographer?.phone) {
        contacts.push({ icon: Phone, label: 'Phone', value: photographer.phone, href: `tel:${photographer.phone.replace(/\s+/g, '')}` })
    }
    if (photographer?.email) {
        contacts.push({ icon: Mail, label: 'Email', value: photographer.email, href: `mailto:${photographer.email}` })
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">
            <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" />
            <div className="pointer-events-none absolute top-1/2 -left-32 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float-slow" />

            {/* Navigation */}
            <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-sm">
                                <Camera className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-foreground">ImageFinder</span>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            <main className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                {error || !photographer ? (
                    <div className="space-y-4 py-20 text-center animate-in fade-in zoom-in-95 duration-300">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                            <AlertCircle className="h-6 w-6 text-destructive" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
                        <p className="text-foreground/60">{error || 'Photographer not found'}</p>
                        <Button variant="outline" render={<Link href="/" />} nativeButton={false}>
                            Back to Home
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {/* Avatar and name */}
                            <div className="flex items-center gap-5">
                                <Avatar name={photographer.name} src={photographer.avatarUrl} size="xl" />
                                <h1 className="text-3xl font-bold text-balance sm:text-4xl">{photographer.name}</h1>
                            </div>

                            {/* Specialties */}
                            {photographer.specialties.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-semibold text-foreground">Specialty:</span>
                                    {photographer.specialties.map((specialty) => (
                                        <span
                                            key={specialty}
                                            className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            {photographer.description && (
                                <p className="max-w-3xl leading-relaxed text-muted-foreground">{photographer.description}</p>
                            )}
                        </section>

                        {/* Contact */}
                        {contacts.length > 0 && (
                            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-75 fill-mode-both">
                                <h2 className="text-2xl font-bold">Contact</h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {contacts.map(({ icon: Icon, label, value, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            className="card-lift flex items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-xs transition-colors hover:border-primary/50"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm text-muted-foreground">{label}</p>
                                                <p className="truncate font-semibold text-foreground">{value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Best work */}
                        {photographer.bestWork.length > 0 && (
                            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 fill-mode-both">
                                <h2 className="text-2xl font-bold">View My Best Work</h2>
                                <MasonryGallery images={photographer.bestWork} eventName={`${photographer.name} best work`} />
                            </section>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}
