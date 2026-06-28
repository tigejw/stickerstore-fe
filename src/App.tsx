import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import BundlesPage from "./pages/Bundles";
import CartPage from "./pages/Cart";
import StickersPage from "./pages/Stickers";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stickers" element={<StickersPage />} />
        <Route path="/stickers/:slug" element={<ProductPage />} />
        <Route path="/bundles" element={<BundlesPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  )
}

export default App
