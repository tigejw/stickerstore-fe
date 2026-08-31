import { Link } from 'react-router-dom'
import { useContext } from 'react'
import logo from '../assets/stickerstore.png'
import { ShoppingCart } from 'lucide-react'
import { CartContext } from '../contexts/CartContext.tsx'

const navLinks = [
  { label: 'Stickers', to: '/stickers' },
  { label: 'Bundles', to: '/bundles' },
]

export default function NavBar() {
  const cartContext = useContext(CartContext)
  const itemCount = cartContext?.cart.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  return (
    <header className="mb-4" aria-label="Main navigation">
      <div className="flex items-center">
        <Link to="/" className="w-4/5">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>
        <Link to="/cart" className="w-1/5 flex justify-end">
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">
              {itemCount}
            </span>
          </div>
        </Link>
      </div>
      <nav className="grid grid-cols-3 mt-2">
        <span />
        <div className="flex justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="m-0 text-accent text-s uppercase tracking-wide underline underline-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <span />
      </nav>
    </header>
  )
}