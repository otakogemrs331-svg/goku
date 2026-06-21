"use client"

import { useState } from "react"
import { ProductWithCategory } from "@/lib/supabase"
import HeartIcon from "./icons/HeartIcon"
import ShoppingBagIcon from "./icons/ShoppingBagIcon"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface ProductDetailProps {
  product: ProductWithCategory
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const router = useRouter()

  const images = product.images_array || []
  const isInStock = product.stock > 0

  const handleAddToCart = () => {
    if (!isInStock) return
    
    // Add multiple items based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        image: images[0] || '',
        stock: product.stock,
      })
    }
    
    // Navigate to cart page
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-forest-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-forest-dark rounded-lg overflow-hidden luxury-shadow relative">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImage]}
                  alt={`${product.title} - Image ${selectedImage + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-cream-dark">
                  No image available
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-forest-dark rounded-lg overflow-hidden smooth-transition border-2 ${
                      selectedImage === index ? 'border-gold' : 'border-transparent hover:border-gold/50'
                    } relative`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-cream-dark">
              <span className="hover:text-gold smooth-transition cursor-pointer">Collections</span>
              <span className="mx-2">/</span>
              <span className="hover:text-gold smooth-transition cursor-pointer">{product.categories.name}</span>
              <span className="mx-2">/</span>
              <span className="text-gold">{product.title}</span>
            </nav>

            {/* Title & Price */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
                {product.title}
              </h1>
              <p className="text-3xl text-gold font-semibold">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {isInStock ? (
                <>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-cream-dark">
                    {product.stock <= 5 ? `Only ${product.stock} left in stock` : 'In Stock'}
                  </span>
                </>
              ) : (
                <>
                  <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                  <span className="text-cream-dark">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-cream-dark leading-relaxed">{product.description}</p>
            </div>

            {/* Theme Tags */}
            {product.theme_tags && product.theme_tags.length > 0 && (
              <div>
                <h3 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wider">
                  Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.theme_tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-forest-dark border border-gold/30 text-cream-dark px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-6 border-t border-gold/20">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-cream font-semibold">
                  Quantity
                </label>
                <div className="flex items-center border border-gold/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-4 py-2 text-cream smooth-transition hover:text-gold disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    className="w-16 text-center bg-transparent text-cream border-none focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-4 py-2 text-cream smooth-transition hover:text-gold disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className="flex-1 bg-gold text-forest-midnight py-3 px-6 font-semibold smooth-transition hover:bg-gold-light hover:scale-105 luxury-shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <ShoppingBagIcon className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </span>
                </button>
                <button
                  className="px-6 py-3 border border-gold/30 text-gold smooth-transition hover:bg-gold/10 luxury-shadow"
                  aria-label="Add to wishlist"
                >
                  <HeartIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Info */}
            <div className="pt-6 border-t border-gold/20">
              <p className="text-cream-dark text-sm">
                Category: <span className="text-gold">{product.categories.name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
