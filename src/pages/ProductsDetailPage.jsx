import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProducts, getReviews } from "../services/userService";
import { CartContext } from "../context/CartContext";
import theme from "../themes/ThemeColors";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRes = await getProducts();
        const found = productRes.products.find((p) => p.id === id);

        if (!found) {
          setError("Product not found.");
          setLoading(false);
          return;
        }

        setProduct(found);

        const reviewRes = await getReviews();
        const related = reviewRes.review.filter((r) => r.productId === id);
        setReviews(related);
      } catch (err) {
        console.error(err)
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

   if (loading) {
    return (
      <div className="flex flex-row gap-2 w-full justify-center items-center h-screen">
        <div className="w-2 h-2 rounded-full bg-[#B85C38] animate-bounce [animation-delay:.7s]"></div>
        <div className="w-2 h-2 rounded-full bg-[#B85C38] animate-bounce [animation-delay:.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-[#B85C38] animate-bounce [animation-delay:.7s]"></div>
      </div>
    )
  }


  if (error) {
    return (
      <p className={`${theme.styles.subtext} text-center py-12 text-red-600`}>
        {error}
      </p>
    );
  }

  return (
    <section className={`min-h-screen ${theme.colors.background}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src={product.images}
            alt={`Image of ${product.name}`}
            className="w-full h-auto object-cover rounded-xl shadow-md"
          />

          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold mb-4"
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
              className={`${theme.styles.button} mb-6`}
            >
              Add to Cart
            </button>

            <p className={`${theme.styles.paragraphs} leading-relaxed`}>
              {product.description || "No description available."}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2
            className={`${theme.styles.subheadings} mb-4`}
            style={{ fontFamily: theme.fonts.primary }}
          >
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (
            <p className={`${theme.styles.subtext}`}>No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="border rounded-xl p-4 bg-white shadow-sm"
                >
                  <header
                    className={`${theme.colors.primary} font-medium mb-1`}
                    style={{ fontFamily: theme.fonts.secondary }}
                  >
                    {review.user?.name || "Anonymous"}
                  </header>
                  <blockquote className={`${theme.styles.subtext}`}>
                    “{review.message}”
                  </blockquote>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
