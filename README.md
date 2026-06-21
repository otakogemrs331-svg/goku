# Antigravity: Luxury E-Commerce Platform

## Project Overview
Antigravity is a premium, high-end full-stack e-commerce platform designed to offer a curated selection of luxury books and elite reading accessories. Blending sophisticated typography with an organic nature aesthetic, the platform is driven by Next.js 15 and Supabase to provide a seamless, live shopping experience.

---

## 💎 Visual Identity & Premium UX/UI Rules

### Aesthetic & Typography
- **Overall Feel:** The platform embodies a high-end luxury and organic nature boutique. Typography and spacing must look highly customized and exclusive.
- **Color Palette:**
  - **Primary Background:** Deep Forest Midnight (`#0B132B` or rich dark navy/green forest hues).
  - **Accents & Highlights:** Premium Metallic Gold (`#D4AF37`) for titles, borders, custom states, and boutique buttons.
  - **Text Typography:** Clean cream/off-white for high-contrast elite readability.

### Micro-interactions
- **Hover Transitions:** All interactive elements (cards, buttons, links) MUST feature smooth transitions (`transition-all duration-300`). Raw, unstyled HTML elements are strictly forbidden.

---

## 🛠️ Core Architecture & Tech Stack

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, TypeScript.
- **Database & Auth:** Live Supabase Integration (via `@supabase/supabase-js`).
- **State Management:** React Context API for client-side state (Cart) and Server Components by default for live data fetching.
- **Performance Icons:** Optimized inline SVGs exclusively. No heavy third-party icon libraries are allowed.

---

## 🔐 Database Architecture & Integration Rules (Strict)

### 1. Unified Supabase Client
- The application must export and use a single unified Supabase instance from `src/lib/supabase.ts`.
- **Dependency:** `@supabase/supabase-js` must be declared in `package.json`.

### 2. Live Data Enforcement
- **Zero Mock Data:** All storefront catalogs, product detail updates, admin dashboard modules, and blog posts must execute real-time async database fetching using the `supabase` client instance.
- **Build-Time Fallback:** If environment variables are missing during the build phase (e.g., on Vercel deployment), components must handle this gracefully using premium skeleton loaders or empty arrays instead of throwing an unhandled runtime error.

### 3. Environment Variables Structure
The application strictly loads credentials from a local `.env.local` file using these exact keys:
```env (A .env.local.example template must reside at the root of the project).

4. Database Schema
A root-level supabase/schema.sql file governs the automatic generation of database relations, indexes, and constraints for the following tables:

profiles (Users/Profiles mapping)

products (Fields: id, title, slug, price, stock, description, category_id, theme_tags, images_array)

categories (Fields: id, name, slug, description)

orders & order_items (Maturity tracks for customer purchases)

inventory_logs (Stock tracking)

posts (Blog content storage)

📦 Project Functional Scope (Milestones Breakdown)
Storefront & Discovery: Live indexing at /products fetching dynamic records from Supabase, featuring smooth, zero-flicker client-side filtering via URL searchParams.

Cart & Checkout Simulator: Luxury Client-side Cart state context (src/context/CartContext.tsx) with dynamic location-based tax/shipping computations.

Lightweight Admin CMS Panel: Secured route system at /admin hooked directly to Supabase table CRUD operations, allowing product mutations, stock alters, discount rules management, and live sales logs aggregation.

SEO, Blogs & Optimization: High-end dynamic blog listing (/blog and /blog/[slug]) linked to the database, utilizing Next.js 15 async metadata handling and dynamic friendly URLs.