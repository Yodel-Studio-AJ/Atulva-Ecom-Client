import { BrowserRouter, Route, Routes } from "react-router-dom"
import ClientLayout from "./layouts/ClientLayout"
import LandingPage from "./pages/LandingPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import ProductsPage from "./pages/ProductsPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CartPage from "./pages/CartPage"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from "./components/basic/ProtectedRoute"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
