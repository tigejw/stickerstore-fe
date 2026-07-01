import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavBar from '../componants/NavBar'
import './Home.css'

type Product = {
  product_id: number
  slug: string
  name: string
  price: number
  thumbnail?: string | null
}

function formatPriceFromCents(value: number) {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'EUR',
  }).format(value / 100)
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    axios
      .get<Product[]>('http://localhost:9090/api/products?is_new=true')
      .then((res) => {
        setProducts(res.data)
      })
      .catch(() => {
        setProducts([])
      })
  }, [])

  return (
    <main className="home-page">
      <NavBar />

      <section className="featured-section" aria-labelledby="featured-heading">
        <div className="featured-heading-wrap">
          <p className="featured-kicker">Featured</p>
          <h1 id="featured-heading">New stickers</h1>
        </div>

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
    </main>
  )
}