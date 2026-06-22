import { Suspense } from "react"
import { supabase, ProductWithCategory, Category } from "@/lib/supabase"
import ProductGrid from "@/components/ProductGrid"
import ProductFilters from "@/components/ProductFilters"

async function getProductsAndCategories() {
  // التعديل هنا: تغليف كلا الاستعلامين بالأقواس وإضافة as any لتأمين الأخطاء والبيانات الراجعة
  const [productsResponse, categoriesResponse] = await Promise.all([
    (supabase
      .from('products')
      .select('*, categories(*)')
      .order('created_at', { ascending: false }) as any),
    (supabase
      .from('categories')
      .select('*')
      .order('name') as any)
  ])

  if (productsResponse.error) throw productsResponse.error
  if (categoriesResponse.error) throw categoriesResponse.error

  return {
    products: productsResponse.data as ProductWithCategory[],
    categories: categoriesResponse.data as Category[]
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; theme?: string }>
}) {
  const { category, theme } = await searchParams
  const { products, categories } = await getProductsAndCategories()

  return (
    <div className="min-h-screen bg-forest-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            Collections
          </h1>
          <p className="text-cream-dark text-lg">
            Discover our curated selection of premium products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Suspense fallback={<div className="text-cream">Loading filters...</div>}>
              <ProductFilters categories={categories} />
            </Suspense>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <Suspense fallback={<div className="text-cream">Loading products...</div>}>
              <ProductGrid 
                products={products} 
                initialCategory={category}
                initialTheme={theme}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
