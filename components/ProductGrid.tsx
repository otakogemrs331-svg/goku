"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ProductWithCategory } from "@/lib/supabase"
import HeartIcon from "./icons/HeartIcon"
import Image from "next/image"

interface ProductGridProps {
  products: ProductWithCategory[]
  initialCategory?: string
  initialTheme?: string
}

export default function ProductGrid({
  products,
  initialCategory,
  initialTheme,
}: ProductGridProps) {
  const [categoryFilter, setCategoryFilter] = useState(initialCategory || "")
  const [themeFilter, setThemeFilter] = useState(initialTheme || "")

  // Zero-flicker in-memory filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = !categoryFilter || product.categories.slug === categoryFilter
      const matchesTheme = !themeFilter || product.theme_tags.includes(themeFilter)
      return matchesCategory && matchesTheme
    })
  }, [products, categoryFilter, themeFilter])

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-cream-dark text-lg">No products found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.slug}`}
          className="group smooth-transition"
        >
          <article className="bg-forest-dark border border-gold/20 rounded-lg overflow-hidden luxury-shadow hover:border-gold/40 smooth-transition">
            {/* Product Image */}
            <div className="relative aspect-square bg-forest-light">
              {product.images_array && product.images_array.length > 0 ? (
                <Image
                  src={product.images_array[0]}
                  alt={product.title}
                  fill
                  className="object-cover smooth-transition group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-cream-dark">
                  No image
                </div>
              )}
              {/* Wishlist Button */}
              <button
                className="absolute top-4 right-4 bg-forest-midnight/80 backdrop-blur-sm p-2 rounded-full smooth-transition hover:bg-gold hover:text-forest-midnight"
                onClick={(e) => {
                  e.preventDefault()
                  // Wishlist functionality to be implemented
                }}
                aria-label="Add to wishlist"
              >
                <HeartIcon className="w-5 h-5" />
              </button>
              {/* Stock Badge */}
              {product.stock <= 5 && product.stock > 0 && (
                <span className="absolute top-4 left-4 bg-gold text-forest-midnight text-xs font-bold px-2 py-1 rounded">
                  Low Stock
                </span>
              )}
              {product.stock === 0 && (
                <span className="absolute top-4 left-4 bg-red-600 text-cream text-xs font-bold px-2 py-1 rounded">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <p className="text-gold text-sm mb-1">{product.categories.name}</p>
              <h3 className="font-serif text-lg text-cream mb-2 group-hover:text-gold smooth-transition">
                {product.title}
              </h3>
              <p className="text-gold font-semibold text-xl">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
