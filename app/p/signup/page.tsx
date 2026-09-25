import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthLayout } from '@/components/photographer/AuthLayout'
import { SignupForm } from '@/components/photographer/SignupForm'

export const metadata: Metadata = { title: 'Create your account' }

export default function PhotographerSignupPage() {
    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start delivering event galleries in minutes"
            footer={
                <p>
                    Already have an account?{' '}
                    <Link href="/p/login" className="font-medium text-primary hover:underline">
                        Sign in
                    </Link>
                </p>
            }
        >
            <SignupForm />
        </AuthLayout>
    )
}
