"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/products", label: "Products", icon: "📦" },
    { href: "/admin/discounts", label: "Discounts", icon: "🏷️" },
    { href: "/admin/orders", label: "Orders", icon: "📋" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <div className="min-h-screen bg-forest-midnight">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-forest-dark border-r border-gold/20 min-h-screen fixed left-0 top-0">
          <div className="p-6">
            <Link href="/" className="font-serif text-2xl text-gold mb-8 block">
              Antigravity
              <span className="text-sm block text-cream-dark mt-1">Admin Panel</span>
            </Link>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg smooth-transition ${
                      isActive
                        ? "bg-gold/10 text-gold border border-gold/30"
                        : "text-cream-dark hover:text-gold hover:bg-forest-light"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gold/20">
            <Link
              href="/"
              className="flex items-center space-x-3 text-cream-dark hover:text-gold smooth-transition"
            >
              <span>←</span>
              <span>Back to Store</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
