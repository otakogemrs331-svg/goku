import { ProductWithCategory } from "@/lib/supabase"

interface ProductFormProps {
  categories: any[]
  product?: ProductWithCategory
  onSubmit: (formData: FormData) => Promise<void>
  submitButtonText: string
}

export default function ProductForm({
  categories,
  product,
  onSubmit,
  submitButtonText,
}: ProductFormProps) {
  return (
    <form action={onSubmit} className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-cream font-semibold mb-2">
            Product Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={product?.title}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="Premium Luxury Product"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-cream font-semibold mb-2">
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            required
            defaultValue={product?.slug}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="premium-luxury-product"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category_id" className="block text-cream font-semibold mb-2">
            Category *
          </label>
          <select
            id="category_id"
            name="category_id"
            required
            defaultValue={product?.category_id}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-cream font-semibold mb-2">
            Price (USD) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            step="0.01"
            min="0"
            defaultValue={product?.price}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="99.99"
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-cream font-semibold mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            required
            min="0"
            defaultValue={product?.stock}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="100"
          />
        </div>

        {/* Images */}
        <div className="md:col-span-2">
          <label htmlFor="images" className="block text-cream font-semibold mb-2">
            Image URLs (comma-separated)
          </label>
          <textarea
            id="images"
            name="images"
            defaultValue={product?.images_array?.join(', ')}
            rows={3}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
        </div>

        {/* Theme Tags */}
        <div className="md:col-span-2">
          <label htmlFor="theme_tags" className="block text-cream font-semibold mb-2">
            Theme Tags (comma-separated)
          </label>
          <input
            type="text"
            id="theme_tags"
            name="theme_tags"
            defaultValue={product?.theme_tags?.join(', ')}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="trail-reading, survival, deep-woods"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-cream font-semibold mb-2">
            Product Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            defaultValue={product?.description}
            rows={6}
            className="w-full bg-forest-midnight border border-gold/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold smooth-transition"
            placeholder="Describe your premium product..."
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
          href="/admin/products"
          className="border border-gold/30 text-gold px-8 py-3 font-semibold smooth-transition hover:bg-gold/10"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
