"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { 
  FiMoon, 
  FiSun, 
  FiShoppingCart, 
  FiHeart, 
  FiUser, 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiMapPin,
  FiLogOut,
  FiSettings,
  FiPackage,
  FiCreditCard,
  FiMapPin as FiAddress,
  FiHeart as FiWishlist
} from "react-icons/fi";
import SearchBar from "./SearchBar";
import { useCartStore } from "../features/cart/store";
import { useAuthStore } from "../features/auth/store";
import { PRODUCT_CATEGORIES, SITE_CONFIG } from "../constants";

export default function Navbar() {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/admin") || pathname?.startsWith("/employee") || pathname?.startsWith("/delivery");
  if (isPortal) return null;

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const cartItemCount = useCartStore((s) => s.totalQuantity);
  const { user, logout } = useAuthStore();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-700 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-soft">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FiMapPin className="h-4 w-4" />
                <span>Free shipping on orders over ${SITE_CONFIG.freeShippingThreshold}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/help" className="hover:text-primary-50 transition-colors cursor-pointer">
                Help Center
              </Link>
              <Link href="/contact" className="hover:text-primary-50 transition-colors cursor-pointer">
                Contact Us
              </Link>
              {user && (
                <>
                  <span className="text-primary-200">|</span>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="hover:text-primary-50 transition-colors cursor-pointer">
                      Admin Panel
                    </Link>
                  )}
                  {user.role === 'employee' && (
                    <Link href="/employee" className="hover:text-primary-50 transition-colors cursor-pointer">
                      Employee Portal
                    </Link>
                  )}
                  {user.role === 'delivery' && (
                    <Link href="/delivery" className="hover:text-primary-50 transition-colors cursor-pointer">
                      Delivery Portal
                    </Link>
                  )}
                </>
              )}
              <span className="text-primary-200">|</span>
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-primary-100">Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="hover:text-primary-50 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className="hover:text-primary-50 transition-colors cursor-pointer">
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="hover:text-primary-50 transition-colors cursor-pointer">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo and Categories */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold text-neutral-800 dark:text-white hover:text-primary transition-colors">
              {SITE_CONFIG.name}
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/products" className="font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors cursor-pointer">
                Products
              </Link>
              <Link href="/deals" className="font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors cursor-pointer">
                Deals
              </Link>
              <Link href="/new-arrivals" className="font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors cursor-pointer">
                New Arrivals
              </Link>
              <Link href="/brands" className="font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors cursor-pointer">
                Brands
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 hidden md:block max-w-2xl mx-6">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              aria-label="Wishlist" 
              className="relative p-2 rounded-md hover:bg-highlight transition-colors group cursor-pointer"
            >
              <FiHeart className="h-5 w-5 text-neutral-600 dark:text-neutral-300 group-hover:text-primary transition-colors" />
            </Link>

            {/* Cart */}
            <Link 
              href="/cart" 
              aria-label="Cart" 
              className="relative p-2 rounded-md hover:bg-highlight transition-colors group cursor-pointer"
            >
              <FiShoppingCart className="h-5 w-5 text-neutral-600 dark:text-neutral-300 group-hover:text-primary transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-secondary-500 text-xs font-semibold text-white ring-2 ring-white dark:ring-neutral-900 animate-bounce-gentle">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-highlight transition-colors cursor-pointer"
                  aria-label="Profile menu"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {user.name}
                  </span>
                  <FiChevronDown className={`h-4 w-4 text-neutral-500 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                          {user.profilePicture ? (
                            <img 
                              src={user.profilePicture} 
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FiUser className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-800 dark:text-neutral-200">{user.name}</p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href="/account"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiUser className="h-4 w-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiPackage className="h-4 w-4" />
                        My Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiWishlist className="h-4 w-4" />
                        Wishlist
                      </Link>
                      <Link
                        href="/account/addresses"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiAddress className="h-4 w-4" />
                        Addresses
                      </Link>
                      <Link
                        href="/account/payment-methods"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiCreditCard className="h-4 w-4" />
                        Payment Methods
                      </Link>
                      <Link
                        href="/account/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FiSettings className="h-4 w-4" />
                        Settings
                      </Link>

                      {/* Portal Links for Admin/Employee/Delivery */}
                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FiSettings className="h-4 w-4" />
                          Admin Panel
                        </Link>
                      )}
                      {user.role === 'employee' && (
                        <Link
                          href="/employee"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FiSettings className="h-4 w-4" />
                          Employee Portal
                        </Link>
                      )}
                      {user.role === 'delivery' && (
                        <Link
                          href="/delivery"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FiSettings className="h-4 w-4" />
                          Delivery Portal
                        </Link>
                      )}

                      {/* Logout */}
                      <div className="border-t border-neutral-200 dark:border-neutral-700 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                        >
                          <FiLogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                aria-label="Sign in" 
                className="p-2 rounded-md hover:bg-highlight transition-colors group cursor-pointer"
              >
                <FiUser className="h-5 w-5 text-neutral-600 dark:text-neutral-300 group-hover:text-primary transition-colors" />
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              aria-label="Toggle Theme"
              className="p-2 rounded-md hover:bg-highlight transition-colors cursor-pointer"
              onClick={() => theme && setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? (
                <FiSun className="h-5 w-5 text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors" />
              ) : (
                <FiMoon className="h-5 w-5 text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-highlight transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-5 w-5 text-neutral-600" />
              ) : (
                <FiMenu className="h-5 w-5 text-neutral-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden py-3 border-t border-neutral-200 dark:border-neutral-700">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-700 bg-background">
          <div className="px-4 py-4 space-y-4">
            {/* User Info */}
            {user && (
              <div className="pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-800 dark:text-neutral-200">{user.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block mt-2 text-sm text-primary hover:text-primary-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                {user.role === 'employee' && (
                  <Link
                    href="/employee"
                    className="block mt-2 text-sm text-primary hover:text-primary-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Employee Portal
                  </Link>
                )}
                {user.role === 'delivery' && (
                  <Link
                    href="/delivery"
                    className="block mt-2 text-sm text-primary hover:text-primary-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Delivery Portal
                  </Link>
                )}
              </div>
            )}

            <nav className="space-y-2">
              <Link
                href="/products"
                className="block px-3 py-2 text-base font-medium text-neutral-800 dark:text-neutral-200 hover:text-primary hover:bg-highlight rounded-md transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/deals"
                className="block px-3 py-2 text-base font-medium text-neutral-800 dark:text-neutral-200 hover:text-primary hover:bg-highlight rounded-md transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                href="/new-arrivals"
                className="block px-3 py-2 text-base font-medium text-neutral-800 dark:text-neutral-200 hover:text-primary hover:bg-highlight rounded-md transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                href="/brands"
                className="block px-3 py-2 text-base font-medium text-neutral-800 dark:text-neutral-200 hover:text-primary hover:bg-highlight rounded-md transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Brands
              </Link>
            </nav>
            
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="text-sm font-medium text-neutral-600 mb-2 px-3">Categories</div>
              <div className="space-y-1">
                {PRODUCT_CATEGORIES.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.id}`}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:text-primary hover:bg-highlight rounded-md transition-colors cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-base">{category.icon}</span>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}