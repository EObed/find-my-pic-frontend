'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ArrowLeft, Camera, Moon, Sun } from 'lucide-react'

interface AuthLayoutProps {
    title: string
    subtitle: string
    children: ReactNode
    footer: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setMounted(true)
        })

        return () => cancelAnimationFrame(id)
    }, [])

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-background transition-colors duration-300">
            <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" />
            <div className="pointer-events-none absolute top-1/2 -left-32 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float-slow" />

            <nav className="relative z-10 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link
                            href="/p"
                            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="hidden sm:inline">Back</span>
                        </Link>

                        <Link href="/p" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
                                <Camera className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold text-foreground">ImageFinder</span>
                        </Link>

                        {mounted ? (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted/80"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-5 w-5 text-accent" />
                                ) : (
                                    <Moon className="h-5 w-5 text-primary" />
                                )}
                            </button>
                        ) : (
                            <div className="h-9 w-9" />
                        )}
                    </div>
                </div>
            </nav>

            <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="card-lift glow-ring space-y-6 rounded-2xl border border-border bg-card p-8 shadow-xl">
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                            <p className="text-sm text-foreground/60">{subtitle}</p>
                        </div>

                        {children}
                    </div>

                    <div className="mt-6 text-center text-sm text-foreground/60">{footer}</div>
                </div>
            </main>
        </div>
    )
}
