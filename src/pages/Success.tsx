import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { CartContext } from '../contexts/CartContext'

export default function SuccessPage() {
   const cartContext = useContext(CartContext)

  useEffect(() => {
    cartContext?.clearCart()
  }, [])

  return (
    <main className="min-h-screen p-4">

      <NavBar />
      <section
        className="border border-border rounded-xl p-4">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-2xl font-semibold">Order confirmed</h1>
          <p className="text-text-muted text-sm max-w-sm">
            Thanks for your order! A confirmation email with your receipt will be emailed to you asap!
          </p>
          <Link
            to="/"
            className="mt-1 px-6 py-2 rounded bg-accent text-white text-sm hover:opacity-90"
          >
            Continue shopping
          </Link>
          <img src="https://tdpqgiofkwlscegszsph.supabase.co/storage/v1/object/public/logo/thankyoufrog.webp"></img>
        </div>
      </section>
    </main>
  )
}