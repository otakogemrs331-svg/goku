"use client"

import { useState } from "react"
import Link from "next/link"
import ShoppingBagIcon from "./icons/ShoppingBagIcon"
import SearchIcon from "./icons/SearchIcon"
import UserIcon from "./icons/UserIcon"
import MenuIcon from "./icons/MenuIcon"
import XIcon from "./icons/XIcon"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const cartItemCount = getTotalItems()

  return (
    <header className="sticky top-0 z-50 bg-forest-midnight/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl md:text-3xl text-gold smooth-transition hover:text-gold-light">
            Antigravity
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-cream smooth-transition hover:text-gold">
              Collections
            </Link>
            <Link href="/about" className="text-cream smooth-transition hover:text-gold">
              About
            </Link>
            <Link href="/journal" className="text-cream smooth-transition hover:text-gold">
              Journal
            </Link>
            <Link href="/contact" className="text-cream smooth-transition hover:text-gold">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="smooth-transition text-cream hover:text-gold p-2" aria-label="Search">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="smooth-transition text-cream hover:text-gold p-2" aria-label="Account">
              <UserIcon className="w-5 h-5" />
            </button>
            <Link href="/cart" className="smooth-transition text-cream hover:text-gold p-2 relative" aria-label="Cart">
              <ShoppingBagIcon className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-forest-midnight text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden smooth-transition text-cream hover:text-gold p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-gold/20">
            <div className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="text-cream smooth-transition hover:text-gold py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-cream smooth-transition hover:text-gold py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/journal"
                className="text-cream smooth-transition hover:text-gold py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Journal
              </Link>
              <Link
                href="/contact"
                className="text-cream smooth-transition hover:text-gold py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
