import type { Metadata } from 'next'
import { UploadContent } from '@/components/UploadContent'

export const metadata: Metadata = {
    title: 'Find Your Photos',
    description: 'Upload a selfie and your event code to find every photo of you from the event.',
}

export default function UploadPage() {
    return <UploadContent />
}
