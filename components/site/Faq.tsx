import { Plus } from 'lucide-react'

export interface FaqItem {
    question: string
    answer: string
}

/** Accessible accordion built on <details>, so it works without JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
    return (
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/70">
            {items.map((item) => (
                <details key={item.question} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-medium text-foreground transition-colors hover:text-primary">
                        {item.question}
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-300 group-open:rotate-45 group-open:border-primary/40 group-open:text-primary">
                            <Plus className="h-4 w-4" />
                        </span>
                    </summary>
                    <p className="-mt-1 pb-5 pr-10 leading-relaxed text-muted-foreground">{item.answer}</p>
                </details>
            ))}
        </div>
    )
}
