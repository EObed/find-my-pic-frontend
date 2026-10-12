'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'

interface SiteHeaderProps {
    links: { href: string; label: string }[]
    /** Call-to-action buttons (rendered on the server and passed in). */
    actions: ReactNode
    logoHref?: string
}

export function SiteHeader({ links, actions, logoHref = '/' }: SiteHeaderProps) {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!menuOpen) return
        const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [menuOpen])

    return (
        <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
            <div
                className={cn(
                    'mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-4',
                    scrolled || menuOpen
                        ? 'glass h-14 border-border shadow-[0_10px_30px_-18px_rgb(0_0_0/0.35)]'
                        : 'h-16 border-transparent'
                )}
            >
                <Logo href={logoHref} />

                <nav className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <div className="hidden items-center gap-2 sm:flex">{actions}</div>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="rounded-lg p-2 text-foreground/80 transition-colors hover:bg-muted md:hidden"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={cn(
                    'glass mx-auto mt-2 max-w-6xl origin-top overflow-hidden rounded-2xl border border-border transition-all duration-300 md:hidden',
                    menuOpen ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 border-transparent opacity-0'
                )}
            >
                <nav className="flex flex-col p-2">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg px-3 py-3 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="mt-2 flex flex-col gap-2 border-t border-border p-2 pt-4 [&>*]:w-full">{actions}</div>
                </nav>
            </div>
        </header>
    )
}
