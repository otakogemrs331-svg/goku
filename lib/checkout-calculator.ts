export interface ShippingInfo {
  country: string
  state?: string
  postalCode: string
  city: string
}

export interface CalculatedCosts {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

// Premium shipping rates based on location
const SHIPPING_RATES: Record<string, { baseRate: number; perItemRate: number }> = {
  US: { baseRate: 12.99, perItemRate: 2.50 },
  CA: { baseRate: 18.99, perItemRate: 3.50 },
  UK: { baseRate: 24.99, perItemRate: 4.00 },
  EU: { baseRate: 22.99, perItemRate: 3.75 },
  DEFAULT: { baseRate: 29.99, perItemRate: 5.00 },
}

// Tax rates by region (simplified for demo)
const TAX_RATES: Record<string, number> = {
  US: 0.08, // 8% average
  CA: 0.13, // 13% HST
  UK: 0.20, // 20% VAT
  EU: 0.21, // 21% average VAT
  DEFAULT: 0.15, // 15% default
}

export function calculateShipping(
  itemCount: number,
  country: string
): number {
  const rate = SHIPPING_RATES[country.toUpperCase()] || SHIPPING_RATES.DEFAULT
  const shipping = rate.baseRate + (rate.perItemRate * itemCount)
  
  // Free shipping for orders over $200
  if (itemCount * 50 > 200) {
    return 0
  }
  
  return Math.max(0, shipping)
}

export function calculateTax(
  subtotal: number,
  country: string
): number {
  const rate = TAX_RATES[country.toUpperCase()] || TAX_RATES.DEFAULT
  return subtotal * rate
}

export function calculateTotalCosts(
  subtotal: number,
  itemCount: number,
  shippingInfo: ShippingInfo
): CalculatedCosts {
  const shipping = calculateShipping(itemCount, shippingInfo.country)
  const tax = calculateTax(subtotal, shippingInfo.country)
  const total = subtotal + shipping + tax

  return {
    subtotal,
    shipping,
    tax,
    total,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
