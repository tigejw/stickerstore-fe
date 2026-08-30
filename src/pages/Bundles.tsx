import NavBar from '../components/NavBar'
import ProductsDislpay from '../components/ProductsDIsplay'
export default function BundlesPage() {
  return (
    <main>
      <NavBar />
      <section>
        <ProductsDislpay stickerOrBundle="bundle"></ProductsDislpay>
      </section>
    </main>
  )
}