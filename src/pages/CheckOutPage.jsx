
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"

export const CheckoutPage = () => {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    toast.success("Order placed successfully!")
    clearCart()
    navigate("/")
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <h3 className="text-xl font-semibold mb-4">Total: ${total.toFixed(2)}</h3>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}
