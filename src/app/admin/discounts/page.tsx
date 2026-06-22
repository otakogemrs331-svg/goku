import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface Discount {
  id: string
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  min_purchase: number
  max_uses: number | null
  uses_count: number
  valid_from: string
  valid_until: string | null
  is_active: boolean
  created_at: string
}

async function getDiscounts() {
  try {
    const { data, error } = await (supabase
  .from('discounts')
  .select('*')
  .order('created_at', { ascending: false }) as any)

    if (error) throw error
    return data as Discount[]
  } catch (error) {
    return []
  }
}

export default async function AdminDiscounts() {
  const discounts = await getDiscounts()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl text-gold">Discount Codes</h1>
        <Link
          href="/admin/discounts/new"
          className="bg-gold text-forest-midnight px-6 py-3 font-semibold smooth-transition hover:bg-gold-light hover:scale-105 luxury-shadow"
        >
          Create Discount
        </Link>
      </div>

      {/* Discounts Table */}
      <div className="bg-forest-dark border border-gold/20 rounded-lg luxury-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-forest-light">
              <tr>
                <th className="text-left px-6 py-4 text-cream font-semibold">Code</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Type</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Value</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Min Purchase</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Uses</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Valid Until</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Status</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount.id} className="border-t border-gold/10 hover:bg-forest-light smooth-transition">
                  <td className="px-6 py-4">
                    <div className="text-cream font-mono font-bold">{discount.code}</div>
                  </td>
                  <td className="px-6 py-4 text-cream-dark capitalize">{discount.discount_type}</td>
                  <td className="px-6 py-4 text-gold font-semibold">
                    {discount.discount_type === 'percentage' 
                      ? `${discount.discount_value}%` 
                      : `$${discount.discount_value.toFixed(2)}`}
                  </td>
                  <td className="px-6 py-4 text-cream-dark">${discount.min_purchase}</td>
                  <td className="px-6 py-4 text-cream-dark">
                    {discount.uses_count} / {discount.max_uses || '∞'}
                  </td>
                  <td className="px-6 py-4 text-cream-dark">
                    {discount.valid_until 
                      ? new Date(discount.valid_until).toLocaleDateString() 
                      : 'No limit'}
                  </td>
                  <td className="px-6 py-4">
                    {discount.is_active ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/discounts/${discount.id}/edit`}
                        className="text-gold hover:text-gold-light smooth-transition"
                      >
                        Edit
                      </Link>
                      <form action={`/admin/discounts/${discount.id}/delete`} method="POST">
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

        {discounts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cream-dark">No discount codes found. Create your first discount code.</p>
          </div>
        )}
      </div>
    </div>
  )
}
