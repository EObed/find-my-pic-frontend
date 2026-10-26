import 'server-only'

import { cache } from 'react'
import type { Photographer } from '@/interfaces/Photographer'
import { generateMockPhotographer } from '@/lib/mockPhotographer'

// TODO(api): replace the mock with a backend request. The profile page depends only on this signature.

const MOCK_LATENCY_MS = 600

/** Cached per request so generateMetadata and the page share one fetch. */
export const getPhotographer = cache(async (id: string): Promise<Photographer | null> => {
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
    return generateMockPhotographer(id)
})
