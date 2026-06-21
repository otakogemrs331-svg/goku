"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Category } from "@/lib/supabase"

interface ProductFiltersProps {
  categories: Category[]
}

const THEME_OPTIONS = [
  { value: "trail-reading", label: "Trail Reading" },
  { value: "survival", label: "Survival" },
  { value: "deep-woods", label: "Deep Woods" },
]

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentCategory = searchParams.get("category") || ""
  const currentTheme = searchParams.get("theme") || ""

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="bg-forest-dark border border-gold/20 rounded-lg p-6 luxury-shadow">
      <h2 className="font-serif text-xl text-gold mb-6">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-cream font-semibold mb-3 text-sm uppercase tracking-wider">
          Category
        </h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer smooth-transition">
            <input
              type="radio"
              name="category"
              value=""
              checked={!currentCategory}
              onChange={() => updateFilter("category", "")}
              className="w-4 h-4 accent-gold"
            />
            <span className="ml-3 text-cream-dark smooth-transition hover:text-gold">
              All Categories
            </span>
          </label>
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center cursor-pointer smooth-transition"
            >
              <input
                type="radio"
                name="category"
                value={category.slug}
                checked={currentCategory === category.slug}
                onChange={() => updateFilter("category", category.slug)}
                className="w-4 h-4 accent-gold"
              />
              <span className="ml-3 text-cream-dark smooth-transition hover:text-gold">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Theme Filter */}
      <div>
        <h3 className="text-cream font-semibold mb-3 text-sm uppercase tracking-wider">
          Outdoor Theme
        </h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer smooth-transition">
            <input
              type="radio"
              name="theme"
              value=""
              checked={!currentTheme}
              onChange={() => updateFilter("theme", "")}
              className="w-4 h-4 accent-gold"
            />
            <span className="ml-3 text-cream-dark smooth-transition hover:text-gold">
              All Themes
            </span>
          </label>
          {THEME_OPTIONS.map((theme) => (
            <label
              key={theme.value}
              className="flex items-center cursor-pointer smooth-transition"
            >
              <input
                type="radio"
                name="theme"
                value={theme.value}
                checked={currentTheme === theme.value}
                onChange={() => updateFilter("theme", theme.value)}
                className="w-4 h-4 accent-gold"
              />
              <span className="ml-3 text-cream-dark smooth-transition hover:text-gold">
                {theme.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
