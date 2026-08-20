'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GoogleIcon } from '@/components/GoogleIcon'
import { AuthLayout } from '@/components/photographer/AuthLayout'
import { setItem } from '@/lib/storage'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export default function PhotographerLoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors: Record<string, string> = {}
        if (!EMAIL_REGEX.test(email)) newErrors.email = 'Please enter a valid email address'
        if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'

        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        setIsLoading(true)
        try {
            // TODO: replace with a real authentication API call
            await new Promise((resolve) => setTimeout(resolve, 1200))

            const displayName = email
                .split('@')[0]
                .split(/[._-]+/)
                .filter(Boolean)
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(' ')

            setItem('user', {
                token: 'mock-token',
                firstName: displayName || 'Photographer',
                lastName: '',
                email,
            })

            toast.success('Welcome back!')
            router.push('/p/my-events')
        } catch {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true)
        try {
            // TODO: wire up real Google OAuth once a client ID is configured
            await new Promise((resolve) => setTimeout(resolve, 900))
            toast.info("Google sign-in isn't connected yet — continue with email for now")
        } finally {
            setIsGoogleLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to manage your event galleries"
            footer={
                <p>
                    Don&apos;t have an account?{' '}
                    <Link href="/p/signup" className="font-medium text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            }
        >
            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
            >
                {isGoogleLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <GoogleIcon className="h-4 w-4" />
                )}
                Continue with Google
            </Button>

            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or continue with email</span>
                <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (errors.email) setErrors({ ...errors, email: '' })
                            }}
                            disabled={isLoading}
                            className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        />
                    </div>
                    {errors.email && (
                        <p className="flex items-center gap-1 text-xs text-destructive">
                            <AlertCircle className="h-3 w-3" /> {errors.email}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (errors.password) setErrors({ ...errors, password: '' })
                            }}
                            disabled={isLoading}
                            className={`px-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="flex items-center gap-1 text-xs text-destructive">
                            <AlertCircle className="h-3 w-3" /> {errors.password}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>
        </AuthLayout>
    )
}
