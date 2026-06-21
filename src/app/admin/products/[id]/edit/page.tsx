import { supabase, ProductWithCategory } from "@/lib/supabase"
import { redirect } from "next/navigation"
import ProductForm from "@/components/admin/ProductForm"
import { notFound } from "next/navigation"

async function getProduct(id: string): Promise<ProductWithCategory | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as ProductWithCategory
}

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)
  const categories = await getCategories()

  if (!product) {
    notFound()
  }

  async function updateProduct(formData: FormData) {
    'use server'
    
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const price = parseFloat(formData.get('price') as string)
    const stock = parseInt(formData.get('stock') as string)
    const description = formData.get('description') as string
    const categoryId = formData.get('category_id') as string
    const images = formData.get('images') as string
    const themeTags = formData.get('theme_tags') as string

    const imagesArray = images ? images.split(',').map(url => url.trim()) : []
    const themeTagsArray = themeTags ? themeTags.split(',').map(tag => tag.trim()) : []

    const { error } = await supabase
      .from('products')
      .update({
        title,
        slug,
        price,
        stock,
        description,
        category_id: categoryId,
        images_array: imagesArray,
        theme_tags: themeTagsArray,
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating product:', error)
      return
    }

    redirect('/admin/products')
  }

  return (
    <div>
      <h1 className="font-serif text-4xl text-gold mb-8">Edit Product</h1>
      <ProductForm
        categories={categories}
        product={product}
        onSubmit={updateProduct}
        submitButtonText="Update Product"
      />
    </div>
  )
}
