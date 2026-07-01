import NavBar from '../componants/NavBar'
import ProductsDislpay from '../componants/ProductsDIsplay'
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