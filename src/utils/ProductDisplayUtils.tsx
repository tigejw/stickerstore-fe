import type { SortOption } from "../types/types"

export function formatPriceFromCents(value: number) {
    return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'EUR',
    }).format(value / 100)
}

export function getSortQuery(sortBy: SortOption) {
    const [sort_by, order] = sortBy.split('-') as [SortOption extends `${infer Field}-${string}` ? Field : never, 'asc' | 'desc']
    return { sort_by, order }
}