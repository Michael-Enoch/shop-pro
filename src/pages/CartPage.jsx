
import { Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

export const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart()

  const increaseQty = (item) => {
    addToCart(item)
  }

  const decreaseQty = (id) => {
    const existingItem = cart.find((item) => item.id === id)
    if (existingItem.quantity === 1) {
      removeFromCart(id)
    } else {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      // Forcing the update
      updatedCart.forEach(item => {
        if (item.id === id) {
          removeFromCart(item.id)
          for (let i = 0; i < item.quantity; i++) {
            addToCart(item)
          }
        }
      })
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

  if (!cart.length) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Your cart is empty 🛒</h2>
          <Link to="/products" className="text-blue-600 hover:underline text-lg">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary-dark">Your Shopping Cart</h1>
      <div className="grid gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow p-4 border"
          >
            <div className="flex items-center gap-4 w-full md:w-1/2">
              <img
                src={item.images || "https://via.placeholder.com/100"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-lg text-primary-dark">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="min-w-[20px] text-center">{item.quantity}</span>
              <button
                onClick={() => increaseQty(item)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
  <h2 className="text-2xl font-semibold">
    Total: <span className="text-primary">${total}</span>
  </h2>
  <Link to="/checkout">
    <button
      className="mt-4 px-6 py-3 bg-blue-600 text-white  rounded hover:bg-blue-700 transition font-medium hover:bg-primary-dark"
    >
      Proceed to Checkout
    </button>
  </Link>
</div>

    </div>
  )
}
