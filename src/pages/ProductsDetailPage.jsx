import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { getProducts, getReviews } from "../services/userService"
import { CartContext } from "../context/CartContext"
import theme from "../themes/ThemeColors"

export const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProduct = async () => {
      const productRes = await getProducts()
      const found = productRes.products.find((p) => p.id === id)
      setProduct(found)

      const reviewRes = await getReviews()
      const related = reviewRes.review.filter((r) => r.productId === id)
      setReviews(related)
    }

    fetchProduct()
  }, [id])

  if (!product)
    return (
      <p className={`${theme.styles.subtext} text-center py-12`}>
        Loading product...
      </p>
    )

  return (
    <section>

    <div className={`max-w-7xl w-full mx-auto p-6 ${theme.colors.background} min-h-screen`}>
      {/* Product Info */}
      <div className="grid md:grid-cols-2">
        <img
          src={product.images}
          alt={product.name}
          className="w-100 h-100 rounded shadow-md"
        />

        <div>
          <h1
            className={`text-[#2E2E2E] text-lg sm:text-lg md:text-2xl font-semibold mb-3`}
            style={{ fontFamily: theme.fonts.primary }}
          >
            {product.name}
          </h1>
          <p
            className={`${theme.colors.primary} text-xl font-semibold mb-4`}
            style={{ fontFamily: theme.fonts.alt }}
          >
           Price: ${product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className={`${theme.styles.button} mb-4`}
          >
            Add to Cart
          </button>

          <p className={`${theme.styles.paragraphs}`}>
            {product.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2
          className={`${theme.styles.subheadings}`}
          style={{ fontFamily: theme.fonts.primary }}
        >
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className={`${theme.styles.subtext}`}>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="mb-4 border rounded-xl p-4 bg-white shadow-sm"
            >
              <div
                className={`${theme.colors.primary} font-medium mb-1`}
                style={{ fontFamily: theme.fonts.secondary }}
              >
                {review.user?.name || "Anonymous"}
              </div>
              <p className={`${theme.styles.subtext}`}>
                “{review.message}”
              </p>
            </div>
          ))
        )}
      </div>
    </div>
        </section>
  )
}
