import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from '../api-url'
import type { Product, ProductsDisplayProps, SortOption } from "../types/types";
import { formatPriceFromCents, getSortQuery } from "../utils/ProductDisplayUtils";

import AddToCartButton from "../components/AddToCartButton"
const sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'created_at-asc', label: 'Released date: old to new' },
    { value: 'created_at-desc', label: 'Released date: new to old' },
]

export default function ProductsDislpay({ stickerOrBundle }: ProductsDisplayProps) {
    const [products, setProducts] = useState<Product[]>([])
    const [sortBy, setSortBy] = useState<SortOption>('created_at-desc')

    useEffect(() => {
        const { sort_by, order } = getSortQuery(sortBy)

        axios
            .get<Product[]>(
                `${API_URL}/${stickerOrBundle === "sticker" ? "products" : "bundles"}?sort_by=${sort_by}&order=${order}&active=true`
            )
            .then((res) => {
                setProducts(res.data)

                console.log(res.data)
            })
            .catch(() => {
                setProducts([])
            })
    }, [stickerOrBundle, sortBy])

    const heading = stickerOrBundle === "sticker" ? "All stickers" : "All bundles"




    return (
        <section
            className="border border-border rounded-xl p-4"
            aria-labelledby="products-heading"
        >
            <div className="mb-[0.95rem] flex items-end justify-between gap-3 flex-wrap">
                <div>
                    <p className="m-0 text-text-muted text-xs uppercase tracking-wide">
                        {stickerOrBundle === "sticker" ? "Stickers" : "Bundles"}
                    </p>
                    <h1 id="products-heading" className="mt-1 mb-0 text-xl">
                        {heading}
                    </h1>
                </div>

                <label className="flex items-center gap-2 text-sm">
                    <span className="text-text-muted text-xs uppercase tracking-wide">Sort by</span>
                    <select
                        className="border border-border rounded-lg px-2 py-1 text-sm bg-transparent"
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
            </div>

            <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                role="list"
                aria-label={stickerOrBundle === "sticker" ? "Stickers" : "Bundles"}
            >
                {products.map((product) => (
                    <Link
                        key={product.product_id}
                        to={`/${stickerOrBundle}s/${product.slug}`}
                        state={{ preview: product }}
                        className="no-underline text-inherit"
                        role="listitem"
                    >
                        <article className="flex flex-col items-center h-full border border-border rounded-xl p-[0.6rem]">
                            <img
                                src={product.thumbnail_url}
                                alt={product.thumbnail_alt_text ?? product.name}
                                className="w-full aspect-square rounded-lg border border-dashed border-border-dashed bg-surface-muted object-cover"
                            />

                            <div className="flex-1" />

                            <h2 className="mt-[0.55rem] mb-1 text-[0.9rem] leading-[1.3] line-clamp-2 text-center font-medium">
                                {product.name}
                            </h2>
                            <p className="m-0 text-text-muted text-[0.82rem] text-center">
                                {formatPriceFromCents(product.price)}
                            </p>
                            <AddToCartButton product={product} />
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    )
}