import { supabase, ProductWithCategory } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"

async function getProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(*)')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as ProductWithCategory[]
  } catch (error) {
    return []
  }
}

async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  } catch (error) {
    return []
  }
}

export default async function AdminProducts() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl text-gold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-gold text-forest-midnight px-6 py-3 font-semibold smooth-transition hover:bg-gold-light hover:scale-105 luxury-shadow"
        >
          Add New Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-forest-dark border border-gold/20 rounded-lg luxury-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-forest-light">
              <tr>
                <th className="text-left px-6 py-4 text-cream font-semibold">Product</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Category</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Price</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Stock</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Status</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gold/10 hover:bg-forest-light smooth-transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {product.images_array && product.images_array[0] && (
                        <div className="w-12 h-12 relative">
                          <Image
                            src={product.images_array[0]}
                            alt={product.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-cream font-medium">{product.title}</div>
                        <div className="text-cream-dark text-sm">{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-cream-dark">{product.categories.name}</td>
                  <td className="px-6 py-4 text-gold font-semibold">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-cream-dark">{product.stock}</td>
                  <td className="px-6 py-4">
                    {product.stock === 0 ? (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                        Out of Stock
                      </span>
                    ) : product.stock <= 5 ? (
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                        Low Stock
                      </span>
                    ) : (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-gold hover:text-gold-light smooth-transition"
                      >
                        Edit
                      </Link>
                      <form action={`/admin/products/${product.id}/delete`} method="POST">
                        <button
                          type="submit"
                          className="text-red-400 hover:text-red-300 smooth-transition"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cream-dark">No products found. Add your first product to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
