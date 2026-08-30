import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from '../api'
import NavBar from '../componants/NavBar'
import { CartContext } from '../contexts/CartContext'

type Product = {
  product_id: number
  slug: string
  name: string
  price: number
  thumbnail_url: string
  thumbnail_alt_text?: string
}

function formatPriceFromCents(value: number) {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'EUR',
  }).format(value / 100)
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const cartContext = useContext(CartContext)

  if (!cartContext) {
    throw new Error('CartContext error')
  }

  const { addToCart } = cartContext

  useEffect(() => {
    axios
      .get<Product[]>(`${API_URL}/products?is_new=true`)
      .then((res) => {
        setProducts(res.data)
        console.log(res.data)
      })
      .catch(() => {
        setProducts([])
      })
  }, [])

  function handleAddToCart(e: React.MouseEvent, product: Product) {
    e.preventDefault()
    // e.stopPropagation()
    addToCart({
      type: 'product',
      id: product.product_id,
      name: product.name,
      thumbnail_url: product.thumbnail_url ?? null,
      price: product.price,
    })
  }

  return (
    <main className="min-h-screen p-4">
      <NavBar />

      <section
        className="border border-border rounded-xl p-4"
        aria-labelledby="featured-heading"
      >
        <div className="mb-[0.95rem]">
          <p className="m-0 text-text-muted text-xs uppercase tracking-wide">
            Featured
          </p>
          <h1 id="featured-heading" className="mt-1 mb-0 text-xl">
            New stickers
          </h1>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          role="list"
          aria-label="New products"
        >
          {products.map((product) => (
            <Link
              key={product.product_id}
              to={`/stickers/${product.slug}`}
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
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="mt-2 inline-flex items-center min-h-8 bg-accent text-white rounded-full px-[0.7rem] text-xs uppercase cursor-pointer hover:opacity-90"
                >
                  Add to cart
                </button>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}