import { useContext } from 'react'
import NavBar from '../componants/NavBar'
import { CartContext, type CartItem } from '../contexts/CartContext'

function formatPriceFromCents(value: number) {
  return new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value / 100)
}

export default function CartPage() {
  const cartContext = useContext(CartContext)

  if (!cartContext) {
    throw new Error('CartContext error')
  }

  const { cart } = cartContext

  return (
    <main>
      <NavBar />
      <section>
        <h1>Cart</h1>
        {cart.length === 0 ? <p>Your cart is empty.</p> : null}
        {cart.length > 0 ? <p>{cart.length} item type(s) in your cart.</p> : null}
        <ul>
          {cart.map((cartItem: CartItem) => {
            return (
              <li key={`${cartItem.type}-${cartItem.id}`}>
                <div>
                  {cartItem.thumbnail ? (
                    <img src={cartItem.thumbnail} alt={cartItem.name} width={72} height={72} />
                  ) : (
                    <div aria-label={`${cartItem.name} thumbnail placeholder`}>Thumbnail</div>
                  )}
                </div>
                <div>Name: {cartItem.name}</div>
                <div>Type: {cartItem.type}</div>
                <div>Quantity: {cartItem.quantity}</div>
                <div>Price: {formatPriceFromCents(cartItem.price)}</div>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
