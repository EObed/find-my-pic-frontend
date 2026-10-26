import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowDown, ArrowRight, Camera, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/CopyButton'
import { Reveal } from '@/components/motion/Reveal'
import { Avatar } from '@/components/photographer/Avatar'
import { MasonryGallery } from '@/components/photographer/MasonryGallery'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { getPhotographer } from '@/lib/api/photographers'

type PhotographerPageProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PhotographerPageProps): Promise<Metadata> {
    const photographer = await getPhotographer((await params).id)
    if (!photographer) return { title: 'Photographer not found' }

    return {
        title: photographer.name,
        description: photographer.description ?? `See the best work of ${photographer.name}.`,
    }
}

export default async function PhotographerProfilePage({ params }: PhotographerPageProps) {
    const { id } = await params
    const photographer = await getPhotographer(id)

    if (!photographer) notFound()

    const { name, avatarUrl, description, specialties, email, phone, bestWork } = photographer
    const firstName = name.split(' ')[0]

    const contacts = [
        phone && { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s+/g, '')}` },
        email && { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    ].filter((contact) => !!contact)

    // Prefer email for bookings since it carries a subject line; fall back to a call.
    const bookingHref = email
        ? `mailto:${email}?subject=${encodeURIComponent('Booking enquiry')}`
        : contacts[0]?.href
    const [cover, inset] = bestWork
    const hasWork = bestWork.length > 0

    const navLinks = [
        { href: '#about', label: 'About' },
        ...(hasWork ? [{ href: '#work', label: 'Work' }] : []),
        ...(contacts.length > 0 ? [{ href: '#contact', label: 'Contact' }] : []),
    ]

    return (
        <div className="relative min-h-screen overflow-x-clip bg-background">
            <SiteHeader
                links={navLinks}
                actions={
                    bookingHref && (
                        <Button render={<a href={bookingHref} />} nativeButton={false}>
                            Book a session
                        </Button>
                    )
                }
            />

            {/* Hero: profile on the left, a cover collage of their work on the right */}
            <section id="about" className="relative scroll-mt-24">
                <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:pt-20 lg:pb-28">
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center gap-4">
                            <Avatar name={name} src={avatarUrl} size="lg" />
                            <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                                <Camera className="h-4 w-4 text-primary" />
                                Photographer
                            </p>
                        </div>

                        <div className="space-y-5">
                            <h1 className="text-5xl leading-[1.02] font-semibold text-balance sm:text-6xl lg:text-7xl">{name}</h1>
                            {description && (
                                <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">{description}</p>
                            )}
                        </div>

                        {specialties.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Specialises in</p>
                                <ul className="flex flex-wrap gap-2">
                                    {specialties.map((specialty) => (
                                        <li
                                            key={specialty}
                                            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground/80"
                                        >
                                            {specialty}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3">
                            {bookingHref && (
                                <Button size="lg" render={<a href={bookingHref} />} nativeButton={false}>
                                    Book a session
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            )}
                            {hasWork && (
                                <Button size="lg" variant="outline" render={<a href="#work" />} nativeButton={false}>
                                    See portfolio
                                    <ArrowDown className="ml-1 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {cover && (
                        <div className="relative animate-in fade-in zoom-in-95 duration-700 delay-150 fill-mode-both lg:pl-10">
                            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary/15 blur-[100px]" />

                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]">
                                <Image
                                    src={cover.file}
                                    alt={cover.title ?? `${name} cover photo`}
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 540px, 100vw"
                                    className="object-cover"
                                />
                            </div>

                            {inset && (
                                <div className="absolute -bottom-8 -left-2 hidden aspect-square w-44 overflow-hidden rounded-2xl bg-muted shadow-xl ring-8 ring-background sm:block lg:-left-0">
                                    <Image
                                        src={inset.file}
                                        alt={inset.title ?? `${name} photo`}
                                        fill
                                        sizes="176px"
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <a
                                href="#work"
                                className="glass absolute top-5 right-5 flex items-center gap-3 rounded-2xl border border-border py-2.5 pr-4 pl-3 text-sm shadow-lg transition-transform hover:-translate-y-0.5"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary tabular-nums">
                                    {bestWork.length}
                                </span>
                                <span className="leading-tight">
                                    <span className="block font-medium text-foreground">Portfolio</span>
                                    <span className="block text-xs text-muted-foreground">photos to explore</span>
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Work */}
            {hasWork && (
                <section id="work" className="scroll-mt-24 border-t border-border bg-muted/30">
                    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
                        <Reveal className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div className="space-y-2">
                                <p className="text-xs font-medium tracking-wider text-primary uppercase">Portfolio</p>
                                <h2 className="text-3xl font-semibold sm:text-4xl">Selected work</h2>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {bestWork.length} photo{bestWork.length === 1 ? '' : 's'} · click any photo to enlarge
                            </p>
                        </Reveal>

                        <MasonryGallery images={bestWork} eventName={`${name} best work`} />
                    </div>
                </section>
            )}

            {/* Contact */}
            {contacts.length > 0 && (
                <section id="contact" className="scroll-mt-24">
                    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
                        <Reveal className="grid grid-cols-1 gap-10 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-12 md:grid-cols-[1.15fr_1fr] md:items-center">
                            <div className="space-y-5">
                                <h2 className="text-3xl font-semibold text-balance sm:text-4xl">Work with {firstName}</h2>
                                <p className="max-w-md text-muted-foreground">
                                    Planning an event? Share your date and what you have in mind, and {firstName} will get back to you.
                                </p>
                                {bookingHref && (
                                    <Button size="lg" render={<a href={bookingHref} />} nativeButton={false}>
                                        Book a session
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            <ul className="divide-y divide-border rounded-2xl border border-border bg-background">
                                {contacts.map(({ icon: Icon, label, value, href }) => (
                                    <li key={label} className="flex items-center gap-4 p-4 sm:p-5">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <a href={href} className="min-w-0 flex-1">
                                            <span className="block text-xs text-muted-foreground">{label}</span>
                                            <span className="block truncate font-medium text-foreground hover:text-primary">{value}</span>
                                        </a>
                                        <CopyButton value={value} label={`Copy ${label.toLowerCase()}`} className="p-2" />
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                </section>
            )}

            <SiteFooter />
        </div>
    )
}
