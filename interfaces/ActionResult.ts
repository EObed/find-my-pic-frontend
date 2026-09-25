import type { FieldErrors } from '@/lib/validation'

/** Serializable result every server action returns to its client caller. */
export type ActionResult<T = undefined> =
    | { ok: true; data: T }
    | { ok: false; message?: string; errors?: FieldErrors }
