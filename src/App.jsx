import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"  // <-- import CartProvider
import { Toaster } from "react-hot-toast"
import { HomePage } from "./pages/Homepage"
import { UserRegistration } from "./pages/UserRegistration"
import { LoginForm } from "./pages/LoginForm"
import { Dashboard } from "./pages/Dashboard"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import Navbar from "./components/Navbar"
import { ProductsPage } from "./pages/ProductsPage"
import { ProductDetail } from "./pages/ProductsDetailPage"
import { CartPage } from "./pages/CartPage"
import { CheckoutPage } from "./pages/CheckOutPage"
import Footer from "./pages/Footer"



function App() {
  return (
    <AuthProvider>
      <CartProvider>  {/* Wrap here */}
        <BrowserRouter>
          <Navbar />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<UserRegistration />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* New routes */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
