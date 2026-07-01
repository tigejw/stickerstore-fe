import NavBar from '../componants/NavBar'
import ProductsDislpay from '../componants/ProductsDIsplay'

export default function StickersPage() {
  return (
    <main>
      <NavBar />
      <ProductsDislpay stickerOrBundle={"sticker"}></ProductsDislpay>
    </main>
  )
}