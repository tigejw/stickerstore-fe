import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//extract out WET
type Product = {
    product_id: number
    slug: string
    name: string
    price: number
    thumbnail?: string | null
    released_at?: string | null
    created_at?: string | null
}
type StickerOrBundle = "sticker" | "bundle"
type ProductsDisplayProps = {
    stickerOrBundle: StickerOrBundle
}
type SortOption =
    | 'price-asc'
    | 'price-desc'
    | 'name-asc'
    | 'name-desc'
    | 'created_at-asc'
    | 'created_at-desc'

const sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'created_at-asc', label: 'Released date: old to new' },
    { value: 'created_at-desc', label: 'Released date: new to old' },
]
//extract out WET
function formatPriceFromCents(value: number) {
    return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'EUR',
    }).format(value / 100)
}

function getSortQuery(sortBy: SortOption) {
    const [sort_by, order] = sortBy.split('-') as [SortOption extends `${infer Field}-${string}` ? Field : never, 'asc' | 'desc']

    return { sort_by, order }
}

export default function ProductsDislpay({ stickerOrBundle }: ProductsDisplayProps) {
    const [products, setProducts] = useState<Product[]>([])
    const [sortBy, setSortBy] = useState<SortOption>('created_at-desc')

    useEffect(() => {
        const { sort_by, order } = getSortQuery(sortBy)

        axios
            .get<Product[]>(
                `http://localhost:9090/api/${stickerOrBundle === "sticker" ? "products" : "bundles"}?sort_by=${sort_by}&order=${order}`
            )
            .then((res) => {
                setProducts(res.data)
            })
            .catch(() => {
                setProducts([])
            })
    }, [stickerOrBundle, sortBy])
    //same code as homepage feature: could be extracted!
    return (
        <section className="featured-section" aria-labelledby="featured-heading">
            <div className="featured-heading-wrap">
                <p className="featured-kicker">Featured</p>
                <h1 id="featured-heading">New stickers</h1>
            </div>
            <label className="product-sort">
                <span className="product-sort-label">Sort by</span>
                <select
                    className="product-sort-select"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortOption)}
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
            <div className="product-grid" role="list" aria-label="New products">
                {products.map((product) => (
                    <Link
                        key={product.product_id}
                        to={`/stickers/${product.slug}`}
                        className="product-card-link"
                        role="listitem"
                    >
                        <article className="product-card">
                            <div className="product-thumb" aria-label={`${product.name} thumbnail placeholder`}>
                                Thumbnail
                            </div>
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">{formatPriceFromCents(product.price)}</p>
                            <span className="product-action">View sticker</span>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    )
}