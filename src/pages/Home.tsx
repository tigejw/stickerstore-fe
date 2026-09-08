import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from '../api-url'
import NavBar from '../components/NavBar'
import type { Product } from '../types/types'
import AddToCartButton from '../components/AddToCartButton'
import { TestModeMessage } from '../components/TestModeMessage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

function formatPriceFromCents(value: number) {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'EUR',
  }).format(value / 100)
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const initial = (window as any).__initialProducts as Promise<Product[]> | undefined

    if (initial) {
      console.log("triggered")
      initial
        .then((data) => {
          console.log(data, "data")
          return setProducts(data)
        })
        .catch(() => {
          console.log("catch")
          return setProducts([])
        })
    } else {
      axios
        .get<Product[]>(`${API_URL}/products?is_new=true&active=true`)
        .then((res) => {
          setProducts(res.data)
        })
        .catch(() => {
          setProducts([])
        })
    }
  }, [])

  return (
    <>
      <TestModeMessage />
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
        <section className="mt-6 border border-border rounded-xl p-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="m-0 text-text-muted text-xs uppercase tracking-wide">
            FAQ
          </h2>
          <Accordion defaultValue={["shipping"]}>
            <AccordionItem value="shipping" className="border-border">
              <AccordionTrigger className="text-[0.9rem] font-medium hover:text-accent">
                Shipping
              </AccordionTrigger>
              <AccordionContent className="text-text-muted text-[0.85rem]">
                We are currently not shipping anywhere, as this website isn't a real store!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns" className="border-border">
              <AccordionTrigger className="text-[0.9rem] font-medium hover:text-accent">
                Returns
              </AccordionTrigger>
              <AccordionContent className="text-text-muted text-[0.85rem]">
                You can request a refund within 14 days of recieving your totally fictional stickers!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="durability" className="border-border">
              <AccordionTrigger className="text-[0.9rem] font-medium hover:text-accent">
                Sticker Quality
              </AccordionTrigger>
              <AccordionContent className="text-text-muted text-[0.85rem]">
                Our stickers don't actually exist! But if they did they would be very high quality!!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </>
  )
}