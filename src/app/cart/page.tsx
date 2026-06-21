"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"
import XIcon from "@/components/icons/XIcon"
import ShoppingBagIcon from "@/components/icons/ShoppingBagIcon"
import Image from "next/image"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-forest-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBagIcon className="w-24 h-24 text-gold/30 mx-auto mb-6" />
            <h1 className="font-serif text-4xl text-gold mb-4">Your Cart is Empty</h1>
            <p className="text-cream-dark text-lg mb-8">
              Discover our premium collections and add items to your cart.
            </p>
            <Link
              href="/products"
              className="inline-block bg-gold text-forest-midnight px-8 py-3 font-semibold smooth-transition hover:bg-gold-light hover:scale-105 luxury-shadow"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const subtotal = getTotalPrice()

  return (
    <div className="min-h-screen bg-forest-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-gold mb-2">Shopping Cart</h1>
          <p className="text-cream-dark">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-forest-dark border border-gold/20 rounded-lg p-4 luxury-shadow smooth-transition hover:border-gold/40"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-forest-light rounded-lg overflow-hidden relative">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cream-dark text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-serif text-lg text-cream smooth-transition hover:text-gold"
                        >
                          {item.title}
                        </Link>
                        <p className="text-gold font-semibold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-cream-dark smooth-transition hover:text-gold p-1"
                        aria-label="Remove item"
                      >
                        <XIcon className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center space-x-3">
                      <label htmlFor={`quantity-${item.id}`} className="text-cream-dark text-sm">
                        Quantity
                      </label>
                      <div className="flex items-center border border-gold/30 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-cream smooth-transition hover:text-gold disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          max={item.stock}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              Math.max(1, Math.min(item.stock, parseInt(e.target.value) || 1))
                            )
                          }
                          className="w-12 text-center bg-transparent text-cream border-none focus:outline-none text-sm"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="px-3 py-1 text-cream smooth-transition hover:text-gold disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-cream-dark text-sm ml-auto">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Stock Warning */}
                    {item.quantity >= item.stock && (
                      <p className="text-red-400 text-xs mt-2">
                        Maximum quantity reached
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="text-cream-dark smooth-transition hover:text-gold text-sm underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow sticky top-24">
              <h2 className="font-serif text-xl text-gold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-cream-dark">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-cream-dark">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-cream-dark">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gold/20 pt-3 flex justify-between font-semibold text-gold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-gold text-forest-midnight py-3 px-6 font-semibold text-center smooth-transition hover:bg-gold-light hover:scale-105 luxury-shadow"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="block w-full mt-4 text-center text-cream-dark smooth-transition hover:text-gold text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
