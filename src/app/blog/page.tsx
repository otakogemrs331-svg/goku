import { supabase } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  author: string
  published_at: string
  category: string
}

async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) throw error
  return data as Post[]
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-forest-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">Journal</h1>
          <p className="text-cream-dark text-lg">
            Trail reviews, reading logs, and nature narratives from the Antigravity team.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-cream-dark text-lg">No posts published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-forest-dark border border-gold/20 rounded-lg overflow-hidden luxury-shadow smooth-transition hover:border-gold/40"
              >
                {post.featured_image && (
                  <div className="aspect-video bg-forest-light relative">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-gold text-sm font-semibold">{post.category}</span>
                    <span className="text-cream-dark text-sm">•</span>
                    <span className="text-cream-dark text-sm">
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif text-xl text-cream mb-3 smooth-transition hover:text-gold">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-cream-dark text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-gold text-sm font-semibold smooth-transition hover:text-gold-light"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
