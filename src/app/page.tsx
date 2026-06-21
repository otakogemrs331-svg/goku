import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="font-serif text-5xl md:text-7xl text-gold mb-6 text-center">
        Antigravity
      </h1>
      <p className="text-cream-light text-lg md:text-xl text-center max-w-2xl mb-8">
        Experience luxury redefined. Premium collections curated for the discerning.
      </p>
      <Link 
        href="/products"
        className="smooth-transition bg-gold text-forest-midnight px-8 py-3 font-semibold hover:bg-gold-light hover:scale-105 luxury-shadow"
      >
        Explore Collection
      </Link>
    </div>
  )
}
