"use client"

import { useState } from "react"
import { type CalculatedCosts } from "@/lib/checkout-calculator"

interface PaymentFormProps {
  onSubmit: () => void
  onBack: () => void
  calculatedCosts: CalculatedCosts
}

export default function PaymentForm({ onSubmit, onBack, calculatedCosts }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
      <h2 className="font-serif text-2xl text-gold mb-6">Payment Information</h2>
      
      <div className="mb-6 p-4 bg-forest-midnight border border-gold/20 rounded-lg">
        <p className="text-cream-dark text-sm mb-2">
          <span className="text-gold font-semibold">Note:</span> This is a checkout simulator. 
          No actual payment will be processed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardName" className="block text-cream font-semibold mb-2">
            Name on Card
          </label>
          <input
            type="text"
            id="cardName"
            required
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="JOHN DOE"
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className="block text-cream font-semibold mb-2">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            required
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-cream font-semibold mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              required
              value={expiryDate}
              onChange={handleExpiryDateChange}
              maxLength={5}
              className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-cream font-semibold mb-2">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              required
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
              maxLength={4}
              className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
              placeholder="123"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gold/20 pt-4 mt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-cream-dark">
              <span>Subtotal</span>
              <span>${calculatedCosts.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream-dark">
              <span>Shipping</span>
              <span>${calculatedCosts.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream-dark">
              <span>Tax</span>
              <span>${calculatedCosts.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gold text-lg pt-2 border-t border-gold/20">
              <span>Total</span>
              <span>${calculatedCosts.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-gold/30 text-gold py-3 px-6 font-semibold smooth-transition hover:bg-gold/10"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-gold text-forest-midnight py-3 px-6 font-semibold smooth-transition hover:bg-gold-light hover:scale-105 luxury-shadow"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  )
}
