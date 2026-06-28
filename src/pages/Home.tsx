import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Home.css'

type Product = {
  product_id: number
  name: string
  price: number
  thumbnail?: string | null
}

const navLinks = [
  { label: 'Stickers', to: '/stickers' },
  { label: 'Bundles', to: '/bundles' },
]

function formatPriceFromCents(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
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
      <header className="home-nav" aria-label="Main navigation">
        <div className="logo-placeholder">Logo</div>
        <nav className="home-links">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="home-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link to="/cart" className="cart-placeholder">
          Cart
        </Link>
      </header>

      <section className="featured-section" aria-labelledby="featured-heading">
        <div className="featured-heading-wrap">
          <p className="featured-kicker">Featured</p>
          <h1 id="featured-heading">New stickers</h1>
        </div>

        <div className="product-grid" role="list" aria-label="New products">
          {products.map((product) => (
            <article key={product.product_id} className="product-card" role="listitem">
              <div className="product-thumb" aria-label={`${product.name} thumbnail placeholder`}>
                Thumbnail
              </div>
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">{formatPriceFromCents(product.price)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}