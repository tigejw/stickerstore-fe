import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import NavBar from '../componants/NavBar'
import './ProductPage.css'
import { CartContext } from '../contexts/CartContext'

type Product = {

    product_id: number
    slug: string
    name: string
    description: string
    price: number
    thumbnail?: string | null

}

function formatPriceFromCents(value: number) {
    const numericValue = Number(value) || NaN
    return new Intl.NumberFormat('en-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(numericValue / 100)
}

export default function ProductPage() {
    const { slug } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const cartContext = useContext(CartContext)

    if (!cartContext) {
        throw new Error('CartContext error')
    }

    const { setCart } = cartContext

    const handleAddToCart = () => {
        if (!product) {
            return
        }

        setCart((currentCart) => {
            const existingItem = currentCart.find(
                (item) => item.type === 'product' && item.id === product.product_id,
            )

            if (existingItem) {
                return currentCart.map((item) =>
                    item.type === 'product' && item.id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                )
            }

            return [
                ...currentCart,
                {
                    type: 'product',
                    id: product.product_id,
                    name: product.name,
                    quantity: 1,
                    thumbnail: product.thumbnail ?? null,
                    price: product.price,
                },
            ]
        })
    }

    useEffect(() => {
        if (!slug) {
            setLoading(false)
            return
        }

        axios
            .get<{ product: Product }>(`http://localhost:9090/api/products/${slug}`)
            .then((res) => {
                setProduct(res.data.product)
            })
            .catch(() => {
                setProduct(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [slug])

    return (
        <main className="product-page">
            <NavBar />

            {loading ? <p>Loading product...</p> : null}

            {!loading && !product ? <p>Product not found.</p> : null}

            {product ? (
                <section className="product-detail" aria-labelledby="product-title">
                    <div className="product-detail-thumb" aria-label={`${product.name} thumbnail placeholder`}>
                        Thumbnail
                    </div>
                    <h1 id="product-title">{product.name}</h1>

                    <p className="product-detail-price">{formatPriceFromCents(product.price)}</p>
                    <p className="product-detail-description">{product.description}</p>
                    <button type="button" className="product-detail-add-to-cart" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                </section>
            ) : null}
        </main>
    )
}