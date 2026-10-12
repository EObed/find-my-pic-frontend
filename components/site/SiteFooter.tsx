import Link from 'next/link'
import { Logo } from '@/components/Logo'

const COLUMNS = [
    {
        title: 'Guests',
        links: [
            { href: '/upload', label: 'Find my photos' },
            { href: '/#how-it-works', label: 'How it works' },
            { href: '/#faq', label: 'FAQ' },
        ],
    },
    {
        title: 'Photographers',
        links: [
            { href: '/p', label: 'Overview' },
            { href: '/p/signup', label: 'Create an account' },
            { href: '/p/login', label: 'Sign in' },
        ],
    },
]

export function SiteFooter() {
    return (
        <footer className="border-t border-border">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
                <div className="space-y-4">
                    <Logo />
                    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                        AI photo matching for events. Guests find themselves in seconds; photographers deliver galleries without the busywork.
                    </p>
                </div>

                {COLUMNS.map((column) => (
                    <div key={column.title} className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">{column.title}</h4>
                        <ul className="space-y-2.5 text-sm">
                            {column.links.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-t border-border">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
                    <p>&copy; {new Date().getFullYear()} ImageFinder. All rights reserved.</p>
                    <p>Made for photographers and the people in their photos.</p>
                </div>
            </div>
        </footer>
    )
}
