import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"
import DiscountForm from "@/components/admin/DiscountForm"
import { notFound } from "next/navigation"

async function getDiscount(id: string) {
  // التعديل الأول: تغليف استعلام الجلب لتفادي اعتراض TypeScript الحاد
  const { data, error } = await (supabase
    .from('discounts')
    .select('*')
    .eq('id', id)
    .single() as any)

  if (error) {
    console.error('Error fetching discount:', error)
    return null
  }

  return data
}

export default async function EditDiscountPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const discount = await getDiscount(id)

  if (!discount) {
    notFound()
  }

  async function updateDiscount(formData: FormData) {
    'use server'
    
    const code = formData.get('code') as string
    const discountType = formData.get('discount_type') as 'percentage' | 'fixed'
    const discountValue = parseFloat(formData.get('discount_value') as string)
    const minPurchase = parseFloat(formData.get('min_purchase') as string)
    const maxUses = formData.get('max_uses') ? parseInt(formData.get('max_uses') as string) : null
    const validFrom = formData.get('valid_from') as string
    const validUntil = formData.get('valid_until') as string

    // التعديل الثاني: تغليف استعلام التحديث لضمان عدم حدوث خطأ آخر أثناء الـ Build
    const { error } = await (supabase
      .from('discounts')
      .update({
        code: code.toUpperCase(),
        discount_type: discountType,
        discount_value: discountValue,
        min_purchase: minPurchase,
        max_uses: maxUses,
        valid_from: validFrom,
        valid_until: validUntil || null,
      })
      .eq('id', id) as any)

    if (error) {
      console.error('Error updating discount:', error)
      return
    }

    redirect('/admin/discounts')
  }

  return (
    <div>
      <h1 className="font-serif text-4xl text-gold mb-8">Edit Discount Code</h1>
      <DiscountForm
        discount={discount}
        onSubmit={updateDiscount}
        submitButtonText="Update Discount"
      />
    </div>
  )
}
