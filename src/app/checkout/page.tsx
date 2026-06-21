"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import ShippingForm from "@/components/checkout/ShippingForm"
import PaymentForm from "@/components/checkout/PaymentForm"
import OrderSummary from "@/components/checkout/OrderSummary"
import OrderConfirmation from "@/components/checkout/OrderConfirmation"
import { calculateTotalCosts, type ShippingInfo } from "@/lib/checkout-calculator"

type CheckoutStep = "shipping" | "payment" | "confirmation"

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  const subtotal = getTotalPrice()
  const itemCount = getTotalItems()

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const calculatedCosts = shippingInfo
    ? calculateTotalCosts(subtotal, itemCount, shippingInfo)
    : { subtotal, shipping: 0, tax: 0, total: subtotal }

  const handleShippingSubmit = (info: ShippingInfo) => {
    setShippingInfo(info)
    setCurrentStep("payment")
  }

  const handlePaymentSubmit = async () => {
    // Generate mock order number
    const mockOrderNumber = `AG-${Date.now().toString().slice(-8)}`
    setOrderNumber(mockOrderNumber)
    setCurrentStep("confirmation")
    
    // Trigger mock email
    await sendTrackingEmail(mockOrderNumber, shippingInfo!, items)
    
    // Clear cart
    clearCart()
  }

  const sendTrackingEmail = async (orderNumber: string, shippingInfo: ShippingInfo, items: any[]) => {
    // Mock email trigger - in production this would call an API endpoint
    console.log("📧 MOCK EMAIL TRIGGERED:")
    console.log(`Order #${orderNumber}`)
    console.log(`Shipping to: ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.postalCode}, ${shippingInfo.country}`)
    console.log(`Items: ${items.length}`)
    console.log("Email would be sent to customer with tracking information.")
  }

  return (
    <div className="min-h-screen bg-forest-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-gold mb-2">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            <div className={`flex items-center ${currentStep === "shipping" ? "text-gold" : "text-cream-dark"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === "shipping" ? "border-gold bg-gold/10" : "border-gold/30"
              }`}>
                {currentStep === "shipping" ? "1" : "✓"}
              </div>
              <span className="ml-2 font-semibold">Shipping</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === "shipping" ? "bg-gold/30" : "bg-gold"}`}></div>
            <div className={`flex items-center ${currentStep === "payment" ? "text-gold" : currentStep === "confirmation" ? "text-gold" : "text-cream-dark"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === "payment" || currentStep === "confirmation" ? "border-gold bg-gold/10" : "border-gold/30"
              }`}>
                {currentStep === "payment" ? "2" : currentStep === "confirmation" ? "✓" : "2"}
              </div>
              <span className="ml-2 font-semibold">Payment</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === "confirmation" ? "bg-gold" : "bg-gold/30"}`}></div>
            <div className={`flex items-center ${currentStep === "confirmation" ? "text-gold" : "text-cream-dark"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === "confirmation" ? "border-gold bg-gold/10" : "border-gold/30"
              }`}>
                {currentStep === "confirmation" ? "✓" : "3"}
              </div>
              <span className="ml-2 font-semibold">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === "shipping" && (
              <ShippingForm onSubmit={handleShippingSubmit} />
            )}
            {currentStep === "payment" && (
              <PaymentForm
                onSubmit={handlePaymentSubmit}
                onBack={() => setCurrentStep("shipping")}
                calculatedCosts={calculatedCosts}
              />
            )}
            {currentStep === "confirmation" && orderNumber && (
              <OrderConfirmation orderNumber={orderNumber} />
            )}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep !== "confirmation" && (
            <div className="lg:col-span-1">
              <OrderSummary
                items={items}
                calculatedCosts={calculatedCosts}
                shippingInfo={shippingInfo}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
