import NavBar from '../components/NavBar'
import ProductsDislpay from '../components/ProductsDIsplay'

export default function StickersPage() {
  return (
    <main className="min-h-screen p-4">
      <NavBar />
      <ProductsDislpay stickerOrBundle={"sticker"}></ProductsDislpay>
    </main>
  )
}