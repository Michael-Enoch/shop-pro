import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { getProducts, getCategories } from "../services/userService"
import { Link } from "react-router-dom"
import theme from "../themes/ThemeColors"

export const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get("category")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await getProducts()
      const categoryRes = await getCategories()
      setCategories(categoryRes.categories)
      setProducts(productRes.products)
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = selectedCategory
    ? products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase())
    : products

  const handleCategoryClick = (category) => {
    navigate(`?category=${category.toLowerCase()}`)
  }

  return (
    <div className={`p-6 max-w-7xl mx-auto ${theme.colors.background} min-h-screen`}>
      {/* Heading */}
      <h2 className={`${theme.styles.headings} font-bold`} style={{ fontFamily: theme.fonts.primary }}>
        All Products
      </h2>

      {/* Categories */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          className={`px-4 py-2 rounded-full transition-all duration-200 border ${theme.colors.border} ${!selectedCategory ? `${theme.colors.accent} text-white` : "bg-white text-[#2D2A26]"}`}
          onClick={() => navigate("")}
        >
          All
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name.toLowerCase()
          return (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-full transition-all duration-200 border ${theme.colors.border} ${
                isSelected ? `${theme.colors.accent} text-white` : "bg-white text-[#2D2A26]"
              }`}
              onClick={() => handleCategoryClick(cat.name)}
            >
              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </button>
          )
        })}
      </div>

      {/* Loading */}
      {loading ? (
        <p className={`${theme.styles.subtext}`}>Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className={`${theme.styles.card} transition hover:shadow-lg`}
            >
              <img
                src={product.images}
                alt={product.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="text-md font-semibold mb-1" style={{ fontFamily: theme.fonts.secondary }}>
                {product.name}
              </h3>
              <p className={`${theme.colors.primary} font-bold`} style={{ fontFamily: theme.fonts.alt }}>
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
