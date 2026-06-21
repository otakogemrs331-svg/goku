import { type CartItem } from "@/context/CartContext"
import { type CalculatedCosts, type ShippingInfo } from "@/lib/checkout-calculator"
import Image from "next/image"

interface OrderSummaryProps {
  items: CartItem[]
  calculatedCosts: CalculatedCosts
  shippingInfo: ShippingInfo | null
}

export default function OrderSummary({ items, calculatedCosts, shippingInfo }: OrderSummaryProps) {
  return (
    <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow sticky top-24">
      <h2 className="font-serif text-xl text-gold mb-6">Order Summary</h2>
      
      {/* Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 flex-shrink-0 bg-forest-light rounded-lg overflow-hidden relative">
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
            <div className="flex-1">
              <p className="text-cream text-sm font-medium line-clamp-2">{item.title}</p>
              <p className="text-cream-dark text-xs">Qty: {item.quantity}</p>
              <p className="text-gold text-sm font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Costs */}
      <div className="space-y-3 border-t border-gold/20 pt-4">
        <div className="flex justify-between text-cream-dark">
          <span>Subtotal</span>
          <span>${calculatedCosts.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-cream-dark">
          <span>Shipping</span>
          <span>
            {shippingInfo
              ? calculatedCosts.shipping === 0
                ? "FREE"
                : `$${calculatedCosts.shipping.toFixed(2)}`
              : "Calculated at checkout"}
          </span>
        </div>
        <div className="flex justify-between text-cream-dark">
          <span>Tax</span>
          <span>
            {shippingInfo
              ? `$${calculatedCosts.tax.toFixed(2)}`
              : "Calculated at checkout"}
          </span>
        </div>
        <div className="border-t border-gold/20 pt-3 flex justify-between font-semibold text-gold text-lg">
          <span>Total</span>
          <span>${calculatedCosts.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Info */}
      {shippingInfo && (
        <div className="mt-6 pt-4 border-t border-gold/20">
          <h3 className="text-gold font-semibold mb-2 text-sm uppercase tracking-wider">
            Shipping To
          </h3>
          <p className="text-cream-dark text-sm">
            {shippingInfo.city}
            {shippingInfo.state && `, ${shippingInfo.state}`}
            {shippingInfo.postalCode && ` ${shippingInfo.postalCode}`}
            {`, ${shippingInfo.country}`}
          </p>
        </div>
      )}

      {/* Free Shipping Notice */}
      {calculatedCosts.shipping === 0 && (
        <div className="mt-4 p-3 bg-gold/10 border border-gold/30 rounded-lg">
          <p className="text-gold text-sm font-semibold">
            🎉 Free Shipping Applied!
          </p>
        </div>
      )}
    </div>
  )
}
