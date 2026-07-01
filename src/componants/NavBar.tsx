import { Link } from 'react-router-dom'
import './NavBar.css'

const navLinks = [
  { label: 'Stickers', to: '/stickers' },
  { label: 'Bundles', to: '/bundles' },
]

export default function NavBar() {
  return (
    <header className="site-nav" aria-label="Main navigation">
      <Link to="/" className="site-nav-logo">Logo</Link>
      <nav className="site-nav-links">
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} className="site-nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
      <Link to="/cart" className="site-nav-cart">
        Cart
      </Link>
    </header>
  )
}