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

  const { cart, setCart } = cartContext

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
        <ul>
          {cart.map((cartItem: CartItem) => {
            return (
              <li key={`${cartItem.type}-${cartItem.id}`}>
                <div>
                  {cartItem.thumbnail ? (
                    <img src={cartItem.thumbnail} alt={cartItem.name} width={72} height={72} />
                  ) : (
                    <div>Thumbnail</div>
                  )}
                </div>
                <div>Name: {cartItem.name}</div>
                <div>Type: {cartItem.type}</div>
                <div>
                  Quantity: {cartItem.quantity}
                  <button
                    onClick={() => handleUpdateQuantity(cartItem.id, cartItem.type, -1)}
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleUpdateQuantity(cartItem.id, cartItem.type, 1)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveItem(cartItem.id, cartItem.type)}
                  >
                    Remove Item
                  </button>
                </div>
                <div>Price: {formatPriceFromCents(cartItem.price)}</div>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
