import NavBar from '../components/NavBar'
import ProductsDislpay from '../components/ProductsDIsplay'
export default function BundlesPage() {
  return (
    <main className="min-h-screen p-4">
      <NavBar />
      <section>
        <ProductsDislpay stickerOrBundle="bundle"></ProductsDislpay>
      </section>
    </main>
  )
}