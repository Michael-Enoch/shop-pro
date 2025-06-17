/* eslint-disable no-unused-vars */
import { getBrands, getCategories, getColors, getProducts, getReviews } from "../services/userService"
import { useEffect, useState } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import toast from "react-hot-toast"
import logo from "../assets/bg-01.jpg"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import theme from "../themes/ThemeColors" // import your theme

const capitalize = (text = "") => text.charAt(0).toUpperCase() + text.slice(1)

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating - fullStars >= 0.5
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={16} fill="currentColor" className="text-yellow-500" />
      ))}
      {halfStar && <Star size={16} fill="currentColor" className="text-yellow-300 opacity-70" />}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <Star key={i} size={16} className="text-gray-300" />
      ))}
    </div>
  )
}

export const HomePage = () => {
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [colors, setColors] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 100])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsRes = await getBrands()
        setBrands(brandsRes.normalizedBrands)

        const productsRes = await getProducts()
        setProducts(productsRes.products)

        const categoriesRes = await getCategories()
        setCategories(categoriesRes.categories)

        const reviewRes = await getReviews()
        setReviews(reviewRes.review)

        const colorsRes = await getColors()
        setColors(colorsRes.colors || [])
      } catch (error) {
        const errMessage = "Failed to load content. Please try again"
        setError(errMessage)
        toast.error(errMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
    return <div className="text-center py-20 text-xl text-red-500">{error}</div>
  }

  return (
    <>
      {/* Hero Section */}
      <section
        style={{ backgroundImage: `url(${logo})`, fontFamily: theme.fonts.primary }}
        className="bg-cover bg-center bg-no-repeat h-[80vh] md:h-screen"
      >
      <div className="bg-black/60 w-full h-full text-white text-center flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-6"
        >
          Welcome to VelvetLuxe
        </motion.h1>
        <p className={`${theme.styles.subtext} text-white/90`}>Your one-stop shop</p>
      </div>
        
      </section>

      {/* Featured Categories */}
      <section className={`${theme.colors.background} py-12 px-4 text-center w-full`}>
        <h2 className={`${theme.styles.subheadings}`}>Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              className={`${theme.styles.card} border ${theme.colors.border} hover:shadow-lg transition`}
            >
              <h3 className="font-semibold text-lg text-[#2D2A26]">{capitalize(cat.name)}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-12 px-4 text-center w-full">
        <h2 className={`${theme.styles.subheadings}`}>Our Trusted Brands</h2>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {brands.slice(0, 5).map((brand) => (
            <div
              key={brand.id}
              className="text-sm font-semibold bg-[#F5F3EF] text-[#2D2A26] rounded-xl px-5 py-2 shadow border border-[#D9CFC3]"
            >
              {capitalize(brand.name)}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className={`${theme.colors.background} py-12 px-4 w-full`}>
        <h2 className={`${theme.styles.subheadings} text-center`}>Hot Picks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.slice(0, 8).map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className={`${theme.styles.card} group border ${theme.colors.border} hover:shadow-md transition flex flex-col`}
            >
              <img
                src={product.images?.[0] || "https://via.placeholder.com/300?text=Product+Image"}
                alt={product.name}
                className="w-full h-40 object-cover rounded group-hover:scale-105 transition"
                loading="lazy"
              />
              <h3 className={`mt-3 text-lg font-semibold text-[#2D2A26] group-hover:${theme.colors.primary}`}>
                {product.name}
              </h3>
              <p className="text-[#C0402F] mt-1 font-bold">${product.price}</p>
              <div className="mt-2">
                <StarRating rating={product.rating || 4.5} />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/products" className={theme.styles.button}>
            Shop All Products
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 text-center bg-white">
        <h2 className={`${theme.styles.subheadings}`}>What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {reviews.slice(0, 4).map((review) => (
            <div key={review.id} className={`${theme.styles.card} text-left`}>
              <div className="mb-2 text-sm text-[#7D7264] italic">"{review.message}"</div>
              <div className="flex justify-between items-center mt-3">
                <div className="font-semibold text-[#2D2A26]">
                  {review.user?.name || "Anonymous"}
                </div>
                <StarRating rating={review.rating || 4} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className={`${theme.colors.background} py-12 px-4 w-full`}>
        <h2 className={`${theme.styles.subheadings} text-center`}>Our Location</h2>
        <div className="h-80 max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
          <MapContainer center={[6.5244, 3.3792]} zoom={13} scrollWheelZoom={false} className="h-full w-full z-10">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <Marker position={[6.5244, 3.3792]}>
              <Popup>We deliver from Lagos, Nigeria</Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </>
  )
}
