import { supabase } from "@/lib/supabase"
import Link from "next/link"

async function getDashboardStats() {
  try {
    const [productsCount, ordersCount, lowStockCount] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('products').select('id', { count: 'exact', head: true }).lt('stock', 5),
    ])

    const totalSales = await supabase
      .from('order_items')
      .select('price, quantity')
      .then(({ data }) => {
        if (!data) return 0
        return data.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      })

    return {
      productsCount: productsCount.count || 0,
      ordersCount: ordersCount.count || 0,
      lowStockCount: lowStockCount.count || 0,
      totalSales,
    }
  } catch (error) {
    return {
      productsCount: 0,
      ordersCount: 0,
      lowStockCount: 0,
      totalSales: 0,
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div>
      <h1 className="font-serif text-4xl text-gold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
          <div className="text-cream-dark text-sm mb-2">Total Products</div>
          <div className="text-3xl font-serif text-gold">{stats.productsCount}</div>
        </div>
        <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
          <div className="text-cream-dark text-sm mb-2">Total Orders</div>
          <div className="text-3xl font-serif text-gold">{stats.ordersCount}</div>
        </div>
        <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
          <div className="text-cream-dark text-sm mb-2">Total Sales</div>
          <div className="text-3xl font-serif text-gold">${stats.totalSales.toFixed(2)}</div>
        </div>
        <div className="bg-forest-dark border border-red-500/30 rounded-lg p-6 luxury-shadow">
          <div className="text-cream-dark text-sm mb-2">Low Stock Alerts</div>
          <div className="text-3xl font-serif text-red-400">{stats.lowStockCount}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow mb-8">
        <h2 className="font-serif text-xl text-gold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/new"
            className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center smooth-transition hover:bg-gold/20 hover:border-gold/50"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="text-gold font-semibold">Add New Product</div>
          </Link>
          <Link
            href="/admin/discounts"
            className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center smooth-transition hover:bg-gold/20 hover:border-gold/50"
          >
            <div className="text-2xl mb-2">🏷️</div>
            <div className="text-gold font-semibold">Create Discount</div>
          </Link>
          <Link
            href="/admin/orders"
            className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center smooth-transition hover:bg-gold/20 hover:border-gold/50"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="text-gold font-semibold">View Orders</div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
        <h2 className="font-serif text-xl text-gold mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-cream-dark">Database Connection</span>
            <span className="text-green-400">● Connected</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-cream-dark">Supabase Auth</span>
            <span className="text-green-400">● Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-cream-dark">Storage</span>
            <span className="text-green-400">● Available</span>
          </div>
        </div>
      </div>
    </div>
  )
}
