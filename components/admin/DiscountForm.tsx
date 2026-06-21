interface DiscountFormProps {
  discount?: any
  onSubmit: (formData: FormData) => Promise<void>
  submitButtonText: string
}

export default function DiscountForm({
  discount,
  onSubmit,
  submitButtonText,
}: DiscountFormProps) {
  return (
    <form action={onSubmit} className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code */}
        <div>
          <label htmlFor="code" className="block text-cream font-semibold mb-2">
            Discount Code *
          </label>
          <input
            type="text"
            id="code"
            name="code"
            required
            defaultValue={discount?.code}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream font-mono uppercase focus:outline-none focus:border-gold smooth-transition"
            placeholder="LUXURY20"
          />
        </div>

        {/* Discount Type */}
        <div>
          <label htmlFor="discount_type" className="block text-cream font-semibold mb-2">
            Discount Type *
          </label>
          <select
            id="discount_type"
            name="discount_type"
            required
            defaultValue={discount?.discount_type || 'percentage'}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>

        {/* Discount Value */}
        <div>
          <label htmlFor="discount_value" className="block text-cream font-semibold mb-2">
            Discount Value *
          </label>
          <input
            type="number"
            id="discount_value"
            name="discount_value"
            required
            step="0.01"
            min="0"
            defaultValue={discount?.discount_value}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="20"
          />
        </div>

        {/* Minimum Purchase */}
        <div>
          <label htmlFor="min_purchase" className="block text-cream font-semibold mb-2">
            Minimum Purchase (USD)
          </label>
          <input
            type="number"
            id="min_purchase"
            name="min_purchase"
            step="0.01"
            min="0"
            defaultValue={discount?.min_purchase || 0}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="0"
          />
        </div>

        {/* Max Uses */}
        <div>
          <label htmlFor="max_uses" className="block text-cream font-semibold mb-2">
            Maximum Uses (optional)
          </label>
          <input
            type="number"
            id="max_uses"
            name="max_uses"
            min="1"
            defaultValue={discount?.max_uses || ''}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="Leave empty for unlimited"
          />
        </div>

        {/* Valid From */}
        <div>
          <label htmlFor="valid_from" className="block text-cream font-semibold mb-2">
            Valid From *
          </label>
          <input
            type="date"
            id="valid_from"
            name="valid_from"
            required
            defaultValue={discount?.valid_from || new Date().toISOString().split('T')[0]}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
          />
        </div>

        {/* Valid Until */}
        <div className="md:col-span-2">
          <label htmlFor="valid_until" className="block text-cream font-semibold mb-2">
            Valid Until (optional)
          </label>
          <input
            type="date"
            id="valid_until"
            name="valid_until"
            defaultValue={discount?.valid_until || ''}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
          />
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          type="submit"
          className="bg-gold text-forest-midnight px-8 py-3 font-semibold smooth-transition hover:bg-gold-light hover:scale-105 luxury-shadow"
        >
          {submitButtonText}
        </button>
        <a
          href="/admin/discounts"
          className="border border-gold/30 text-gold px-8 py-3 font-semibold smooth-transition hover:bg-gold/10"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
