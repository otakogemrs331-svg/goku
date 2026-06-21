import { supabase } from "@/lib/supabase"

async function getOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return data
  } catch (error) {
    return []
  }
}

async function getSalesMetrics() {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const [totalRevenue, orderCount, topProducts] = await Promise.all([
      supabase
        .from('order_items')
        .select('price, quantity')
        .then(({ data }) => {
          if (!data) return 0
          return data.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }),
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase
        .from('order_items')
        .select('product_id, title, quantity')
        .order('quantity', { ascending: false })
        .limit(5),
    ])

    return {
      totalRevenue,
      orderCount: orderCount.count || 0,
      topProducts: topProducts.data || [],
    }
  } catch (error) {
    return {
      totalRevenue: 0,
      orderCount: 0,
      topProducts: [],
    }
  }
}

export default async function AdminOrders() {
  const orders = await getOrders()
  const metrics = await getSalesMetrics()

  return (
    <div>
      <h1 className="font-serif text-4xl text-gold mb-8">Orders & Analytics</h1>

      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
          <div className="text-cream-dark text-sm mb-2">Total Revenue</div>
          <div className="text-3xl font-serif text-gold">${metrics.totalRevenue.toFixed(2)}</div>
        </div>
        <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
          <div className="text-cream-dark text-sm mb-2">Total Orders</div>
          <div className="text-3xl font-serif text-gold">{metrics.orderCount}</div>
        </div>
        <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
          <div className="text-cream-dark text-sm mb-2">Average Order Value</div>
          <div className="text-3xl font-serif text-gold">
            ${metrics.orderCount > 0 ? (metrics.totalRevenue / metrics.orderCount).toFixed(2) : '0.00'}
          </div>
        </div>
      </div>

      {/* Top Products */}
      {metrics.topProducts.length > 0 && (
        <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow mb-8">
          <h2 className="font-serif text-xl text-gold mb-4">Top Selling Products</h2>
          <div className="space-y-3">
            {metrics.topProducts.map((product: any, index: number) => (
              <div key={product.product_id} className="flex items-center justify-between py-2 border-b border-gold/10 last:border-0">
                <div className="flex items-center space-x-3">
                  <span className="text-gold font-bold">#{index + 1}</span>
                  <span className="text-cream">{product.title}</span>
                </div>
                <span className="text-gold font-semibold">{product.quantity} sold</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-forest-dark border border-gold/20 rounded-lg luxury-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-forest-light">
              <tr>
                <th className="text-left px-6 py-4 text-cream font-semibold">Order ID</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Date</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Items</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Total</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Status</th>
                <th className="text-left px-6 py-4 text-cream font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => {
                const orderTotal = order.order_items?.reduce(
                  (sum: number, item: any) => sum + (item.price * item.quantity),
                  0
                ) || 0

                return (
                  <tr key={order.id} className="border-t border-gold/10 hover:bg-forest-light smooth-transition">
                    <td className="px-6 py-4">
                      <div className="text-cream font-mono">{order.id.slice(0, 8)}</div>
                    </td>
                    <td className="px-6 py-4 text-cream-dark">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-cream-dark">
                      {order.order_items?.length || 0} items
                    </td>
                    <td className="px-6 py-4 text-gold font-semibold">
                      ${orderTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        {order.status || 'Processing'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`/admin/orders/${order.id}`}
                        className="text-gold hover:text-gold-light smooth-transition"
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cream-dark">No orders found yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
