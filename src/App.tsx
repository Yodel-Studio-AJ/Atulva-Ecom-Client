import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import ProductDetailPage from "./pages/ProductDetailPage"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App