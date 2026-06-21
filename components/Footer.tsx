import Link from "next/link"
import InstagramIcon from "./icons/InstagramIcon"
import TwitterIcon from "./icons/TwitterIcon"
import HeartIcon from "./icons/HeartIcon"

export default function Footer() {
  return (
    <footer className="bg-forest-dark border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl text-gold mb-4">Antigravity</h3>
            <p className="text-cream-dark text-sm leading-relaxed">
              Curated luxury for the discerning. Experience excellence in every detail.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/products/new" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products/bestsellers" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/products/sale" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-cream-dark smooth-transition hover:text-gold text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gold/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream-dark text-sm">
              © 2026 Antigravity. Crafted with <HeartIcon className="w-4 h-4 inline text-gold mx-1" /> for luxury.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-dark smooth-transition hover:text-gold"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-dark smooth-transition hover:text-gold"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
