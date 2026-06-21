import { notFound } from "next/navigation"
import { supabase, ProductWithCategory } from "@/lib/supabase"
import ProductDetail from "@/components/ProductDetail"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProduct(slug: string): Promise<ProductWithCategory | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as ProductWithCategory
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Product Not Found | Antigravity',
    }
  }

  return {
    title: `${product.title} | Antigravity`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images_array?.[0] ? [product.images_array[0]] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
