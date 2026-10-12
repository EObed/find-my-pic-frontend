import { cn } from '@/lib/utils'
import { MIN_PASSWORD_LENGTH } from '@/lib/validation'

const LEVELS = [
    { label: 'Too short', bar: 'bg-destructive' },
    { label: 'Weak', bar: 'bg-orange-500' },
    { label: 'Fair', bar: 'bg-amber-500' },
    { label: 'Good', bar: 'bg-emerald-500' },
    { label: 'Strong', bar: 'bg-emerald-500' },
]

function scorePassword(password: string) {
    if (password.length < MIN_PASSWORD_LENGTH) return 0
    let score = 1
    if (password.length >= 10) score++
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
    if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++
    return score
}

/** Four-segment meter that updates as the user types. Purely advisory — validation stays in lib/validation. */
export function PasswordStrength({ password }: { password: string }) {
    if (!password) return null
    const score = scorePassword(password)
    const level = LEVELS[score]

    return (
        <div className="space-y-1.5" aria-live="polite">
            <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((segment) => (
                    <div key={segment} className="h-1 overflow-hidden rounded-full bg-muted">
                        <div
                            className={cn('h-full rounded-full transition-all duration-300', level.bar, score >= segment ? 'w-full' : 'w-0')}
                        />
                    </div>
                ))}
            </div>
            <p className="text-xs text-muted-foreground">
                Password strength: <span className="font-medium text-foreground">{level.label}</span>
            </p>
        </div>
    )
}
