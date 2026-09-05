import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import BundlesPage from "./pages/Bundles";
import CartPage from "./pages/Cart";
import StickersPage from "./pages/Stickers";
import SuccessPage from "./pages/Success";
import './index.css'

function App() {
  return (
    <Router>
      <div className="max-w-[650px] mx-auto px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stickers" element={<StickersPage />} />
          <Route path="/:type/:slug" element={<ProductPage />} />
          <Route path="/bundles" element={<BundlesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
