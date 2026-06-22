import { redirect } from "next/navigation"
import DiscountForm from "@/components/admin/DiscountForm"

export default function NewDiscountPage() {
  async function createDiscount(formData: FormData) {
    'use server'
    
    const code = formData.get('code') as string
    const discountType = formData.get('discount_type') as 'percentage' | 'fixed'
    const discountValue = parseFloat(formData.get('discount_value') as string)
    const minPurchase = parseFloat(formData.get('min_purchase') as string)
    const maxUses = formData.get('max_uses') ? parseInt(formData.get('max_uses') as string) : null
    const validFrom = formData.get('valid_from') as string
    const validUntil = formData.get('valid_until') as string

    const { supabase } = await import('@/lib/supabase')
    
    // التعديل هنا: تغليف استعلام الإدخال بالكامل داخل أقواس وإضافة as any لحل خطأ المترجم
    const { error } = await (supabase.from('discounts').insert({
      code: code.toUpperCase(),
      discount_type: discountType,
      discount_value: discountValue,
      min_purchase: minPurchase,
      max_uses: maxUses,
      uses_count: 0,
      valid_from: validFrom,
      valid_until: validUntil || null,
      is_active: true,
    }) as any)

    if (error) {
      console.error('Error creating discount:', error)
      return
    }

    redirect('/admin/discounts')
  }

  return (
    <div>
      <h1 className="font-serif text-4xl text-gold mb-8">Create Discount Code</h1>
      <DiscountForm
        onSubmit={createDiscount}
        submitButtonText="Create Discount"
      />
    </div>
  )
}
