import { Link } from 'react-router-dom'
import { useContext } from 'react'
import logo from '../assets/colliopteryx.jpg'
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
      <Link to="/" className="block">
        <img src={logo} alt="Logo" className="w-full h-auto object-contain rounded-md" />
      </Link>

      <nav className="grid grid-cols-3 items-center mt-2">
        <span />
        <div className="flex justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="m-0 text-accent text-s uppercase tracking-wide underline underline-offset-2 relative z-1"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link to="/cart" className="flex justify-end relative z-0 mr-2">
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">
              {itemCount}
            </span>
          </div>
        </Link>
      </nav>
    </header>
  )
}