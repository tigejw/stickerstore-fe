import { useContext, useMemo, useState } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import { CartContext, type CartItem } from '../contexts/CartContext'
import { API_URL } from '../api-url'
function formatPriceFromCents(value: number) {
  return new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value / 100)
}

export default function CartPage() {
  const cartContext = useContext(CartContext)
  const [checkingOut, setCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  if (!cartContext) {
    throw new Error('CartContext error')
  }

  const { cart, setCart } = cartContext

  const { totalItems, totalPriceCents } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity
        acc.totalPriceCents += item.price * item.quantity
        return acc
      },
      { totalItems: 0, totalPriceCents: 0 },
    )
  }, [cart])

  const handleCheckout = async () => {
    if (cart.length === 0 || checkingOut) {
      return
    }
    setCheckingOut(true)
    setCheckoutError(null)
    try {
      const response = await axios.post<{ session?: { url?: string } }>(
        `${API_URL}/create-webhook-session`,
        {
          items: cart.map((item) => ({
            type: item.type,
            id: String(item.id),
            quantity: item.quantity,
          })),
        },
      )
      const checkoutUrl = response.data.session?.url
      if (!checkoutUrl) {
        throw new Error('Checkout session did not return a URL.')
      }
      window.location.assign(checkoutUrl)
    } catch {
      setCheckoutError('Unable to start checkout. Please try again.')
    } finally {
      setCheckingOut(false)
    }
  }

  const handleUpdateQuantity = (id: number, type: 'product' | 'bundle', change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id && item.type === type) {
            return { ...item, quantity: item.quantity + change }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const handleRemoveItem = (id: number, type: 'product' | 'bundle') => {
    setCart((prevCart) => {
      return prevCart.filter((item) => !(item.id === id && item.type === type))
    })
  }

  return (
    <main className="min-h-screen p-4">
      <NavBar />

      <section className="mx-auto border border-border rounded-xl p-4 px-4 py-4">
        <h1 className="mt-1 mb-0 text-xl">Cart</h1>
        {cart.length === 0 ? (
          <p className="m-0 text-text-muted text-xs uppercase tracking-wide py-2">Your cart is empty.</p>
        ) : (
          <p className="m-0 text-text-muted text-xs uppercase tracking-wide py-2">
            {cart.length} item type{cart.length === 1 ? '' : 's'} in your cart
          </p>
        )}


        {checkoutError ? (
          <p className="mt-4 text-sm text-red-600">{checkoutError}</p>
        ) : null}

        {cart.length > 0 ? (
          <ul>
            {cart.map((cartItem: CartItem) => {
              return (
                <li
                  key={`${cartItem.type}-${cartItem.id}`}
                  className="flex gap-4 border-b border-gray-200 py-6 first:border-t"
                >
                  <div className="shrink-0">
                    {cartItem.thumbnail_url ? (
                      <img
                        src={cartItem.thumbnail_url}
                        alt={cartItem.name}
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded-lg border border-dashed border-border-dashed bg-surface-muted object-cover"

                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-md bg-gray-100 text-text-muted text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold uppercase leading-snug">
                      {cartItem.name}
                    </div>

                    <div className="mt-2 text-sm text-accent">
                      {formatPriceFromCents(cartItem.price)}
                    </div>

                    <div className="mt-3 inline-flex items-center rounded-md border border-gray-300">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(cartItem.id, cartItem.type, -1)}
                        className="flex h-6 w-6 items-center justify-center text-accent"
                        aria-label={`Decrease quantity of ${cartItem.name}`}
                      >
                        &minus;
                      </button>
                      <span className="w-6 text-center text-xs">{cartItem.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(cartItem.id, cartItem.type, 1)}
                        className="flex h-6 w-6 items-center justify-center text-accent"
                        aria-label={`Increase quantity of ${cartItem.name}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(cartItem.id, cartItem.type)}
                        className="text-xs text-accent underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : null}

        {cart.length > 0 ? (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="mt-2 flex justify-between text-sm text-text-muted">
              <span>Total items</span>
              <span>{totalItems}</span>
            </div>
            <div className="mt-1 flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPriceFromCents(totalPriceCents)}</span>
            </div>
          </div>
        ) : null}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={cart.length === 0 || checkingOut}
          className="mt-6 w-full rounded-md bg-accent px-4 py-2.5 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {checkingOut ? 'Starting checkout...' : 'Checkout'}
        </button>
        <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="text-text-muted text-xs tracking-wide mt-2">
          *Quick reminder: this website is opperating within Stripe's Test mode.
        </p>
         <p className="text-text-muted text-xs tracking-wide mt-2">
          To check out the payment handling you can use: 
        </p>
        <p className="text-text-muted text-xs tracking-wide mt-2">
          Card Number: 4242 4242 4242 4242 - any future expiry - any CVC
        </p>
        </div>
      </section>
    </main>

  )
}




