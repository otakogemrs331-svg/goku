import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    return new Response('Error deleting product', { status: 500 })
  }

  redirect('/admin/products')
}
