/* eslint-disable no-unused-vars */
import { motion, AnimatePresence, color } from "framer-motion";
import { Home, Info, LayoutDashboard, LogIn, LogOut, Menu, Phone, Search, ShoppingBag, ShoppingCart, UserPlus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import theme from "../themes/ThemeColors"
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const dropdownRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setInputFocused(false); 
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    console.log("Searching for:", tag);
  };

  const toggle = () => setMenuOpen(!menuOpen)
  const searchToggle = () => setShowSearch(!showSearch)

  const {user , logout,} = useAuth();
   const { cartCount } = useCart();

  const navLinks = [
    { name: "Home", to: "/", icon: <Home size={18} /> },
    { name: "About Us", to: "/about", icon: <Info size={18} /> },
    { name: "Contact Us", to: "/contact", icon: <Phone size={18} /> },
    { name: "Shop", to: "/products", icon: <ShoppingBag size={18} /> },
  ];
  
  const utilityLinks = [
    { name: "Cart", to: "/cart", icon: <ShoppingCart size={18} /> },
  ];
  
  const authLinks = [
    { name: "Login", to: "/login", icon: <LogIn size={18} /> },
    { name: "Register", to: "/register", icon: <UserPlus size={18} /> },
  ];
  
  const userLinks = [
    { name: "Dashboard", to: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Logout", to: "/", icon: <LogOut size={18} /> },
  ];


  return (
    <>
      <nav className={`flex items-center justify-between px-6 py-4 ${theme.colors.surface} ${theme.colors.textNav} shadow-md sticky top-0 z-50`}>
        <div className={`text-xl font-bold`}>
          <span className={`${theme.colors.primary}`}>Velvet</span><span className={`${theme.colors.textNav}`}>Luxe</span>
        </div>
  
        <div className="hidden md:flex gap-6 font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 transition-colors duration-200 ${
                  isActive ? `${theme.colors.primary} font-semibold` : `${theme.colors.textNav}`
                } hover:${theme.colors.hover}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
  
        <div className="hidden md:flex items-center gap-4 ">
          <Search
            className={`w-5 h-5 cursor-pointer ${theme.colors.textNav} ${theme.colors.hover}`}
            onClick={searchToggle}
          />
  
          <div className="relative" ref={dropdownRef}>
            <AnimatePresence>
              {showSearch && (
                <>
                  <motion.input
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        console.log("Searching for:", searchQuery);
                        setInputFocused(false);
                      }
                    }}
                    className="mt-2 border border-border px-2 py-1 rounded-md outline-none"
                  />
  
                  <AnimatePresence>
                    {inputFocused && (
                      <motion.div
                        key="search-tags"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-64 p-4 bg-surface border border-border rounded-md shadow-md z-10"
                      >
                        <p className="font-semibold mb-2 text-sm text-textDark">Commonly searched:</p>
                        <div className="flex flex-wrap gap-2">
                          {["Sneakers", "Laptops", "Cameras", "Headphones", "Watches"]
                            .filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((tag) => (
                              <span
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className="px-2 py-1 text-xs bg-background text-textDark rounded-md cursor-pointer hover:bg-border"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </AnimatePresence>
          </div>
  
          {utilityLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `relative flex items-center gap-1 transition-colors duration-200 ${
                  isActive ? "font-semibold text-[#D97706]" : theme.colors.textNav
                } ${theme.colors.hover}`
              }
            >
              {link.icon}

              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center bg-[#D97706] shadow-md"
                >
                  {cartCount}
                </span>
              )}
            </NavLink>
          ))}
  
          {user ? (
            <>
              <NavLink to="/dashboard" className={`flex items-center gap-1 ${theme.colors.textNav} ${theme.colors.hover}`}>
                Dashboard
              </NavLink>
              <button onClick={logout} className={`cursor-pointer flex items-center gap-1 ${theme.colors.textNav} ${theme.colors.hover}`}>
                Logout
              </button>
            </>
          ) : (
            authLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={`hover:underline flex items-center gap-1 ${theme.colors.textLight} hover:${theme.colors.primary}`}
              >
                {link.name}
              </NavLink>
            ))
          )}
        </div>
  
        <button onClick={toggle} className="md:hidden">
          <Menu className="w-6 h-6 text-textDark" />
        </button>
      </nav>
  
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggle}
            />
  
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-surface z-50 shadow-lg p-6 flex flex-col gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button onClick={toggle} className="flex justify-end">
                <X className="w-6 h-6 cursor-pointer text-textDark" />
              </button>
  
              <div className="w-full">
                <div className="flex items-center border border-border rounded-md px-2 py-1 mb-4">
                  <Search className="w-5 h-5 text-textLight" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 outline-none px-2 text-sm text-textDark"
                  />
                </div>
              </div>
  
              <nav className="flex flex-col gap-4 font-medium text-textDark">
                {[...navLinks, ...utilityLinks].map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="flex items-center gap-2 hover:text-hover"
                    onClick={toggle}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
  
                {(user ? userLinks : authLinks).map((link) =>
                  link.name === "Logout" ? (
                    <button
                      key={link.name}
                      onClick={() => {
                        logout();
                        toggle();
                      }}
                      className="flex items-center gap-2 hover:text-hover text-left text-textDark"
                    >
                      {link.icon}
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.to}
                      className="flex items-center gap-2 hover:text-hover text-textDark"
                      onClick={toggle}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  )
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

