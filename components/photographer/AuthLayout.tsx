import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CircleCheck } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

interface AuthLayoutProps {
    title: string
    subtitle: string
    children: ReactNode
    footer: ReactNode
}

const COLLAGE = [
    { seed: 'auth-wedding', h: 'h-40' },
    { seed: 'auth-party', h: 'h-56' },
    { seed: 'auth-stage', h: 'h-48' },
    { seed: 'auth-grad', h: 'h-36' },
    { seed: 'auth-crowd', h: 'h-52' },
    { seed: 'auth-portrait', h: 'h-40' },
]

const BENEFITS = ['Create an event in under a minute', 'Guests find their own photos', 'Track every delivery']

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
    return (
        <div className="grid min-h-screen bg-background lg:grid-cols-[1fr_1.05fr]">
            {/* Brand panel (large screens) */}
            <aside className="relative hidden overflow-hidden bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--accent)_45%)] text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
                <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />

                {/* Slowly drifting photo collage */}
                <div className="pointer-events-none absolute -right-16 -bottom-24 grid w-[120%] rotate-[-8deg] grid-cols-3 gap-3 opacity-35">
                    {COLLAGE.map((photo, i) => (
                        <div
                            key={photo.seed}
                            className={`relative ${photo.h} overflow-hidden rounded-2xl ${i % 2 ? 'animate-float-slow' : 'animate-float'}`}
                        >
                            <Image src={`https://picsum.photos/seed/${photo.seed}/400/500`} alt="" fill sizes="240px" className="object-cover" />
                        </div>
                    ))}
                </div>

                <div className="relative">
                    <Logo href="/p" className="[&>span:last-child]:text-primary-foreground" />
                </div>

                <div className="relative max-w-md space-y-6">
                    <h2 className="text-4xl leading-tight font-semibold">Deliver every gallery without the busywork.</h2>
                    <ul className="space-y-3">
                        {BENEFITS.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2.5 text-primary-foreground/90">
                                <CircleCheck className="h-5 w-5 shrink-0" />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative text-sm text-primary-foreground/70">&copy; {new Date().getFullYear()} ImageFinder</p>
            </aside>

            {/* Form column */}
            <div className="relative flex flex-col">
                <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative flex h-16 items-center justify-between px-4 sm:px-8">
                    <Link
                        href="/p"
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                    <div className="lg:hidden">
                        <Logo href="/p" />
                    </div>
                    <ThemeToggle />
                </div>

                <main className="relative flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
                    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-8 space-y-2">
                            <h1 className="text-3xl font-semibold">{title}</h1>
                            <p className="text-muted-foreground">{subtitle}</p>
                        </div>

                        <div className="space-y-6">{children}</div>

                        <div className="mt-8 text-sm text-muted-foreground">{footer}</div>
                    </div>
                </main>
            </div>
        </div>
    )
}
