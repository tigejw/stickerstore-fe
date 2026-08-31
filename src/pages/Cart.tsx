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
    <main>
      <NavBar />
      <section>
        <h1>Cart</h1>
        {cart.length === 0 ? <p>Your cart is empty.</p> : null}
        {cart.length > 0 ? <p>{cart.length} item type(s) in your cart.</p> : null}
        {checkoutError ? <p>{checkoutError}</p> : null}
        <ul>
          {cart.map((cartItem: CartItem) => {
            return (
              <li key={`${cartItem.type}-${cartItem.id}`}>
                <div>
                  {cartItem.thumbnail_url ? (
                    <img src={cartItem.thumbnail_url} alt={cartItem.name} width={72} height={72} />
                  ) : (
                    <div>Thumbnail</div>
                  )}
                </div>
                <div>Name: {cartItem.name}</div>
                <div>Type: {cartItem.type}</div>
                <div>
                  Quantity: {cartItem.quantity}
                  <button onClick={() => handleUpdateQuantity(cartItem.id, cartItem.type, -1)}>
                    -
                  </button>
                  <button onClick={() => handleUpdateQuantity(cartItem.id, cartItem.type, 1)}>
                    +
                  </button>
                </div>
                <div>
                  <button onClick={() => handleRemoveItem(cartItem.id, cartItem.type)}>
                    Remove Item
                  </button>
                </div>
                <div>Price: {formatPriceFromCents(cartItem.price)}</div>
                <div>Subtotal: {formatPriceFromCents(cartItem.price * cartItem.quantity)}</div>
              </li>
            )
          })}
        </ul>

        {cart.length > 0 ? (
          <div>
            <h2>Order Summary</h2>
            <div>Total items: {totalItems}</div>
            <div>Total: {formatPriceFromCents(totalPriceCents)}</div>
          </div>
        ) : null}

        <button type="button" onClick={handleCheckout} disabled={cart.length === 0 || checkingOut}>
          {checkingOut ? 'Starting checkout...' : 'Checkout'}
        </button>
      </section>
    </main>
  )
}