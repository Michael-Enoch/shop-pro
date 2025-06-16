import { Link } from "react-router-dom"
import theme from "../themes/ThemeColors"
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className={`${theme.colors.surface} text-white py-10`}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: theme.fonts.primary }}>
            ShopPro
          </h3>
          <p className={`${theme.colors.textNav} text-sm`}>
            Your trusted tech marketplace delivering premium products with care.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3" style={{ fontFamily: theme.fonts.secondary }}>Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline text-white">Home</Link></li>
            <li><Link to="/products" className="hover:underline text-white">Products</Link></li>
            <li><Link to="/categories" className="hover:underline text-white">Categories</Link></li>
            <li><Link to="/brands" className="hover:underline text-white">Brands</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3" style={{ fontFamily: theme.fonts.secondary }}>Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail size={16} /> support@shoppro.com</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +234 800 123 4567</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-3" style={{ fontFamily: theme.fonts.secondary }}>Follow Us</h4>
          <div className="flex gap-4 text-white">
            <a href="#" className="hover:text-[#D97706]"><Facebook size={20} /></a>
            <a href="#" className="hover:text-[#D97706]"><Instagram size={20} /></a>
            <a href="#" className="hover:text-[#D97706]"><Twitter size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-[#FAF8F6] border-t border-[#444] pt-4">
        &copy; {new Date().getFullYear()} ShopPro. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
