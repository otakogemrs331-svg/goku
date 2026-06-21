import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { error } = await supabase.from('discounts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting discount:', error)
    return new Response('Error deleting discount', { status: 500 })
  }

  redirect('/admin/discounts')
}
