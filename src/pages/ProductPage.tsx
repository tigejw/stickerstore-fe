import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import './ProductPage.css'
import { CartContext } from '../contexts/CartContext'
import { API_URL } from '../api'

type Product = {
    product_id: number
    slug: string
    name: string
    description: string
    price: number
    thumbnail_url: string | null
    thumbnail_alt_text: string
}

interface BundleImage {
    image_url: string;
    alt_text: string;
    is_thumbnail: boolean;
    display_order: number;
}

type Bundle = {
    bundle_id: number
    slug: string
    name: string
    description: string
    thumbnail_url: string
    thumbnail_alt_text: string
    price: number
    active: boolean
    created_at: string
    is_new: boolean
    images: BundleImage[]
    products: Product[]
}

type ProductOrBundle = Product | Bundle
type ProductPageResponse = {
    product?: ProductOrBundle
    bundle?: ProductOrBundle
}

function formatPriceFromCents(value: number) {
    const numericValue = Number(value) || NaN
    return new Intl.NumberFormat('en-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(numericValue / 100)
}

function isBundle(item: ProductOrBundle): item is Bundle {
    return 'bundle_id' in item
}

export default function ProductPage() {
    const { type, slug } = useParams()
    const [item, setItem] = useState<ProductOrBundle | null>(null)
    const [loading, setLoading] = useState(true)
    const cartContext = useContext(CartContext)

    if (!cartContext) {
        throw new Error('CartContext error')
    }

    const { addToCart } = cartContext

    const handleAddToCart = () => {
        if (!item) {
            return
        }

        addToCart({
            type: isBundle(item) ? 'bundle' : 'product',
            id: isBundle(item) ? item.bundle_id : item.product_id,
            name: item.name,
            thumbnail_url: item.thumbnail_url,
            price: item.price,
        })
    }

    useEffect(() => {
        if (!type || !slug) {
            setLoading(false)
            return
        }

        const apiPath = type === 'bundles' ? 'bundles' : 'products'
        axios
            .get<ProductPageResponse>(`${API_URL}/${apiPath}/${slug}`)
            .then((res) => {
                setItem(res.data.product ?? res.data.bundle ?? null)
            })
            .catch(() => {
                setItem(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [type, slug])

    if (loading) {
        return (
            <main className="product-page">
                <NavBar />
                <p>Loading product...</p>
            </main>
        )
    }

    if (!item) {
        return (
            <main className="product-page">
                <NavBar />
                <p>Product not found.</p>
            </main>
        )
    }

    const isBundleItem = isBundle(item)
    const imageUrl = item.thumbnail_url

    return (
        <main className="product-page">
            <NavBar />
            <section className="product-detail" aria-labelledby="product-title">
                <div className="product-detail-thumb" aria-label={`${item.name} thumbnail placeholder`}>
                    {imageUrl ? (
                        <img src={imageUrl} alt={item.name} />
                    ) : (
                        'Thumbnail'
                    )}
                </div>
                <h1 id="product-title">{item.name}</h1>

                <p className="product-detail-price">{formatPriceFromCents(item.price)}</p>
                <p className="product-detail-description">{item.description}</p>

                {isBundleItem && (
                    <div className="bundle-products">
                        <h2>Includes:</h2>
                        <ul>
                            {item.products.map((product) => (
                                <li key={product.product_id}>
                                    {product.name} - {formatPriceFromCents(product.price)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button type="button" className="product-detail-add-to-cart" onClick={handleAddToCart}>
                    Add to cart
                </button>
            </section>
        </main>
    )
}