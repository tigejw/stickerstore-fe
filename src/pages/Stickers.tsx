import NavBar from '../components/NavBar'
import ProductsDislpay from '../components/ProductsDIsplay'

export default function StickersPage() {
  return (
    <main>
      <NavBar />
      <ProductsDislpay stickerOrBundle={"sticker"}></ProductsDislpay>
    </main>
  )
}