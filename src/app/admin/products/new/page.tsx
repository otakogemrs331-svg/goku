import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"
import ProductForm from "@/components/admin/ProductForm"

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export default async function NewProductPage() {
  const categories = await getCategories()

  async function createProduct(formData: FormData) {
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

    const { error } = await supabase.from('products').insert({
      title,
      slug,
      price,
      stock,
      description,
      category_id: categoryId,
      images_array: imagesArray,
      theme_tags: themeTagsArray,
    })

    if (error) {
      console.error('Error creating product:', error)
      return
    }

    redirect('/admin/products')
  }

  return (
    <div>
      <h1 className="font-serif text-4xl text-gold mb-8">Add New Product</h1>
      <ProductForm
        categories={categories}
        onSubmit={createProduct}
        submitButtonText="Create Product"
      />
    </div>
  )
}
