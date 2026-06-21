import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const createMockClient = () => ({
  from: () => ({
    select: () => ({
      order: () => ({
        limit: () => ({
          then: (cb: any) => cb({ data: [], error: null }),
        }),
      }),
      eq: () => ({
        single: () => ({
          then: (cb: any) => cb({ data: null, error: null }),
        }),
      }),
      lt: () => ({
        then: (cb: any) => cb({ data: [], error: null }),
      }),
    }),
    insert: () => ({
      then: (cb: any) => cb({ error: null }),
    }),
    update: () => ({
      eq: () => ({
        then: (cb: any) => cb({ error: null }),
      }),
    }),
    delete: () => ({
      eq: () => ({
        then: (cb: any) => cb({ error: null }),
      }),
    }),
  }),
  auth: {
    getSession: () => ({
      then: (cb: any) => cb({ data: { session: null }, error: null }),
    }),
  },
})

export const supabase = (!supabaseUrl || !supabaseAnonKey)
  ? (process.env.NODE_ENV === 'production'
      ? (() => { throw new Error('Missing Supabase environment variables') })()
      : createMockClient())
  : createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  title: string
  slug: string
  price: number
  stock: number
  description: string
  category_id: string
  theme_tags: string[]
  images_array: string[]
  created_at: string
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string
  created_at: string
}

export type ProductWithCategory = Product & {
  categories: Category
}
