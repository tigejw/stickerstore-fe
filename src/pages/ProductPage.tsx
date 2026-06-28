import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import NavBar from '../componants/NavBar'
import './ProductPage.css'

type Product = {

    product_id: number
    slug: string
    name: string
    description: string
    price: number

}

function formatPriceFromCents(value: number) {
    console.log(value)
    const numericValue = Number(value) || NaN
    console.log(value)
    return new Intl.NumberFormat('en-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(numericValue / 100)
}

export default function ProductPage() {
    const { slug } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(slug)
        if (!slug) {
            setLoading(false)
            return
        }

        axios
            .get<Product>(`http://localhost:9090/api/products/${slug}`)
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
                </section>
            ) : null}
        </main>
    )
}