Build a full-featured e-commerce frontend using **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**. Only generate frontend code (backend will be added later). Use clean, modular architecture, and create all relevant folders and components.

### 📁 Structure:
Organize the frontend project using this folder structure:

- `app/` for routing pages
- `components/` for reusable UI
- `features/` for state and business logic
- `services/` for calling backend APIs (assume they exist)
- `hooks/`, `lib/`, and `styles/` for organization

### 📦 Dependencies to assume installed:
- `tailwindcss`
- `axios`
- `zustand`
- `react-query`
- `clsx`
- `react-icons`
- `next-themes` (for dark mode toggle)

---

## 🌐 Pages & Routes (App Router)
Create the following routes in `app/`:
- `/` → Home
- `/products` → Product listing
- `/products/[slug]` → Product detail page
- `/cart` → Cart page
- `/wishlist` → Wishlist
- `/checkout` → Multi-step checkout
- `/checkout/success` and `/checkout/failure`
- `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/reset/[token]`
- `/account` → User profile
- `/account/addresses` → Address management
- `/account/orders` → Order history
- `/orders/[id]` → Order tracking

---

## 🎨 Components
Create reusable components for:
- `Navbar`, `Footer`, `Sidebar`, `Breadcrumbs`
- `ProductCard`, `ProductGrid`, `FilterSidebar`
- `CartItem`, `WishlistItem`, `OrderCard`
- `LoginForm`, `RegisterForm`, `AuthModal`
- `CheckoutSteps`, `AddressForm`, `PaymentForm`
- `SearchBar`, `SortDropdown`, `CategoryFilter`

---

## ⚙️ Features (Zustand/React Query)
Implement local state using Zustand:
- Auth: Login/logout, token storage
- Cart: Add/remove items, quantity, total calculation
- Wishlist: Add/remove favorites
- Checkout: Shipping info, payment step
- Products: Search, filters, variants, review count
- Orders: Order status, cancellations

---

## 🔧 Utilities (lib/)
- `api.ts` – Axios instance
- `formatPrice.ts` – Price formatter
- `auth.ts` – Helpers for tokens
- `constants.ts` – Static values like TAX, shipping options

---

## 📄 Example to start:
Generate the layout in `app/layout.tsx` that wraps all routes and includes:
- `<Navbar />` and `<Footer />`
- `<main className="min-h-screen">` for content
- Use `next-themes` to toggle light/dark mode

---

✅ Focus only on frontend logic, mock API calls using `services/` functions, no need to implement real backend yet. Structure code as if it's meant to be connected to a real backend later.

Generate TypeScript code that compiles and runs correctly. Give reusable and responsive components. Don’t hardcode data — use placeholder APIs where needed. Keep it scalable.
