import type { Photographer } from '@/interfaces/Photographer'

// Varied aspect ratios so the masonry layout has something to stagger.
const BEST_WORK_SIZES = ['600/800', '600/400', '600/600', '600/900', '600/450', '600/700', '600/500', '600/650', '600/850']

// TODO: replace with real photographer API call
export const generateMockPhotographer = (id: string): Photographer => ({
    id,
    name: 'Ama Mensah',
    avatarUrl: 'https://i.pravatar.cc/320?img=47',
    specialties: ['Weddings', 'Corporate Events', 'Portraits'],
    description: 'Wedding and event photographer capturing candid, joyful moments. Ten years behind the lens, from intimate ceremonies to large conferences.',
    email: 'ama.mensah@example.com',
    phone: '+233 24 123 4567',
    bestWork: BEST_WORK_SIZES.map((size, i) => ({
        id: `${id}-best-${i}`,
        file: `https://picsum.photos/seed/${encodeURIComponent(id)}-best-${i}/${size}`,
    })),
})
