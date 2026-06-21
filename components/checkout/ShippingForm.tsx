"use client"

import { useState } from "react"
import { type ShippingInfo } from "@/lib/checkout-calculator"

interface ShippingFormProps {
  onSubmit: (info: ShippingInfo) => void
}

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingInfo>({
    country: "US",
    state: "",
    postalCode: "",
    city: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
      <h2 className="font-serif text-2xl text-gold mb-6">Shipping Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-cream font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            required
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-cream font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-cream font-semibold mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            required
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="123 Luxury Lane"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-cream font-semibold mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
              placeholder="New York"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-cream font-semibold mb-2">
              State/Province
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
              placeholder="NY"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="postalCode" className="block text-cream font-semibold mb-2">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              required
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
              placeholder="10001"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-cream font-semibold mb-2">
              Country
            </label>
            <select
              id="country"
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="EU">European Union</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-cream font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gold text-forest-midnight py-3 px-6 font-semibold smooth-transition hover:bg-gold-light hover:scale-105 luxury-shadow mt-6"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  )
}
