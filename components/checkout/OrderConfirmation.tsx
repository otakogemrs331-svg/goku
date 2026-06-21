import Link from "next/link"

interface OrderConfirmationProps {
  orderNumber: string
}

export default function OrderConfirmation({ orderNumber }: OrderConfirmationProps) {
  return (
    <div className="bg-forest-dark border border-gold/20 rounded-lg p-8 luxury-shadow text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="font-serif text-3xl text-gold mb-2">Order Confirmed!</h2>
        <p className="text-cream-dark">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      <div className="bg-forest-midnight border border-gold/20 rounded-lg p-6 mb-6">
        <p className="text-cream-dark text-sm mb-1">Order Number</p>
        <p className="text-gold text-2xl font-serif font-semibold">{orderNumber}</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-2 text-cream-dark">
          <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Confirmation email sent</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-cream-dark">
          <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Tracking information will follow</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-cream-dark">
          <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Expected delivery: 3-5 business days</span>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/products"
          className="block w-full bg-gold text-forest-midnight py-3 px-6 font-semibold smooth-transition hover:bg-gold-light hover:scale-105 luxury-shadow"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="block w-full border border-gold/30 text-gold py-3 px-6 font-semibold smooth-transition hover:bg-gold/10"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
