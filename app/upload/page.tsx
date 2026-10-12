import type { Metadata } from 'next'
import { UploadContent } from '@/components/UploadContent'

export const metadata: Metadata = {
    title: 'Find Your Photos',
    description: 'Upload a selfie and your event code to find every photo of you from the event.',
}

export default async function UploadPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
    // Guest links shared by photographers look like /upload?code=WED2024001.
    const { code } = await searchParams
    const initialCode = typeof code === 'string' ? code.trim().toUpperCase().slice(0, 32) : ''

    return <UploadContent initialCode={initialCode} />
}
