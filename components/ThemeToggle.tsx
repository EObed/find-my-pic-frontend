'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const subscribe = () => () => {}

/** True on the client, false during SSR and hydration — no setState-in-effect needed. */
function useIsClient() {
    return useSyncExternalStore(subscribe, () => true, () => false)
}

export function ThemeToggle() {
    const isClient = useIsClient()
    const { resolvedTheme, setTheme } = useTheme()

    // The theme is unknown on the server, so reserve the button's space to avoid a layout shift.
    if (!isClient) {
        return <div className="h-9 w-9" />
    }

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted/80"
            aria-label="Toggle theme"
        >
            {isDark ? <Sun className="h-5 w-5 text-accent" /> : <Moon className="h-5 w-5 text-primary" />}
        </button>
    )
}
