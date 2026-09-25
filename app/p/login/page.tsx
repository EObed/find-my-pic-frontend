import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthLayout } from '@/components/photographer/AuthLayout'
import { LoginForm } from '@/components/photographer/LoginForm'

export const metadata: Metadata = { title: 'Sign in' }

export default function PhotographerLoginPage() {
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
            <LoginForm />
        </AuthLayout>
    )
}
