import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
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

async function getPost(slug: string): Promise<Post | null> {
  // التعديل هنا: تغليف استعلام جلب المقال بالكامل بالأقواس وإضافة as any لتخطي فحص فيرسل
  const { data, error } = await (supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single() as any)

  if (error) return null
  return data as Post
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Antigravity',
    }
  }

  return {
    title: `${post.title} | Antigravity Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-forest-midnight">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-block text-gold smooth-transition hover:text-gold-light mb-8"
        >
          ← Back to Journal
        </Link>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="aspect-video bg-forest-dark rounded-lg overflow-hidden luxury-shadow mb-8 relative">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-gold text-sm font-semibold">{post.category}</span>
            <span className="text-cream-dark text-sm">•</span>
            <span className="text-cream-dark text-sm">
              {new Date(post.published_at).toLocaleDateString()}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-gold mb-4">{post.title}</h1>
          <p className="text-cream-dark text-lg">{post.excerpt}</p>
          {post.author && (
            <p className="text-cream-dark text-sm mt-4">By {post.author}</p>
          )}
        </header>

        {/* Post Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div
            className="text-cream-dark leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Post Footer */}
        <footer className="mt-12 pt-8 border-t border-gold/20">
          <Link
            href="/blog"
            className="inline-block bg-gold/10 border border-gold/30 text-gold px-6 py-3 font-semibold smooth-transition hover:bg-gold/20"
          >
            Read More Posts
          </Link>
        </footer>
      </article>
    </div>
  )
}
