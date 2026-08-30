import { Link } from 'react-router-dom'
import logo from '../assets/stickerstore.png'
const navLinks = [
  { label: 'Stickers', to: '/stickers' },
  { label: 'Bundles', to: '/bundles' },
]

export default function NavBar() {
  return (
    <header className="mb-4" aria-label="Main navigation">
      <div className="flex items-center">
        <Link to="/" className="w-4/5">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>
        <Link to="/cart" className="w-1/5 text-right text-sm uppercase">
          Cart
        </Link>
      </div>
      <nav className="grid grid-cols-3 mt-2">
        <span />
        <div className="flex justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="m-0 text-text-muted text-s uppercase tracking-wide underline underline-offset-2"
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