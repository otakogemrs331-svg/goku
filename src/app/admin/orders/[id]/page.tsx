import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"

async function getOrder(id: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .single()

  if (error) {
    return null
  }

  return data
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = await getOrder(id)

  if (!order) {
    notFound()
  }

  const orderTotal = order.order_items?.reduce(
    (sum: number, item: any) => sum + (item.price * item.quantity),
    0
  ) || 0

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl text-gold">Order Details</h1>
        <Link
          href="/admin/orders"
          className="border border-gold/30 text-gold px-6 py-3 font-semibold smooth-transition hover:bg-gold/10"
        >
          Back to Orders
        </Link>
      </div>

      {/* Order Info */}
      <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-gold font-semibold mb-3">Order Information</h3>
            <div className="space-y-2 text-cream-dark">
              <p><span className="text-cream">Order ID:</span> {order.id}</p>
              <p><span className="text-cream">Date:</span> {new Date(order.created_at).toLocaleString()}</p>
              <p><span className="text-cream">Status:</span> {order.status || 'Processing'}</p>
            </div>
          </div>
          <div>
            <h3 className="text-gold font-semibold mb-3">Customer Information</h3>
            <div className="space-y-2 text-cream-dark">
              <p><span className="text-cream">Email:</span> {order.customer_email}</p>
              <p><span className="text-cream">Name:</span> {order.customer_name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow mb-6">
        <h3 className="text-gold font-semibold mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center py-3 border-b border-gold/10 last:border-0">
              <div className="flex-1">
                <p className="text-cream font-medium">{item.title}</p>
                <p className="text-cream-dark text-sm">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
              </div>
              <div className="text-gold font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gold/20 mt-4 pt-4 flex justify-between font-semibold text-gold text-lg">
          <span>Total</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Info */}
      {order.shipping_address && (
        <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
          <h3 className="text-gold font-semibold mb-4">Shipping Address</h3>
          <div className="text-cream-dark whitespace-pre-line">
            {typeof order.shipping_address === 'string' 
              ? order.shipping_address 
              : JSON.stringify(order.shipping_address, null, 2)}
          </div>
        </div>
      )}
    </div>
  )
}
