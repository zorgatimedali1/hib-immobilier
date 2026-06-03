# Hibiscus Immobiliere — Technical Specification

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | `^19.0.0` | UI framework, `use()` API for promise handling |
| `react-dom` | `^19.0.0` | React DOM renderer |
| `react-router-dom` | `^7.1.0` | Client-side routing (4 routes) |
| `gsap` | `^3.12.0` | Animation engine + ScrollTrigger plugin |
| `lenis` | `^1.2.0` | Smooth scroll with inertia |
| `swiper` | `^11.2.0` | Touch carousels (hero slider, property gallery) |
| `react-countup` | `^6.5.0` | Animated number counters |
| `sonner` | `^1.7.0` | Toast notifications |
| `react-icons` | `^5.4.0` | Icon library (tree-shakeable) |
| `lucide-react` | `^0.469.0` | Consistent UI icon set |
| `tailwind-merge` | `^2.6.0` | Tailwind class merging utility |
| `clsx` | `^2.1.0` | Conditional class names |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | `^5.7.0` | Type checking |
| `vite` | `^6.0.0` | Build tool |
| `@vitejs/plugin-react` | `^4.3.0` | React fast-refresh for Vite |
| `tailwindcss` | `^3.4.0` | Utility CSS framework |
| `postcss` | `^8.4.0` | CSS processing |
| `autoprefixer` | `^10.4.0` | Vendor prefixing |
| `@types/react` | `^19.0.0` | React type definitions |
| `@types/react-dom` | `^19.0.0` | ReactDOM type definitions |

---

## Component Inventory

### Layout (shared across routes)

| Component | Source | Notes |
|-----------|--------|-------|
| **Navbar** | Custom | Two states (transparent → solid) via scroll. Language toggle pill. Mobile hamburger drawer. Active link magenta dot indicator. |
| **Footer** | Custom | 4-column grid, dark bg. Social icons. |
| **WhatsAppButton** | Custom | Fixed floating CTA, pulse ring animation, tooltip on hover. |
| **PageTransition** | Custom | Wraps `<Outlet>`, GSAP fade in/out on route change. |

### Sections — Home Page

| Component | Source | Notes |
|-----------|--------|-------|
| **HeroSlider** | Custom + Swiper | Full-viewport Swiper with parallax. GSAP SplitText title animation per slide change. Scroll-down indicator. |
| **ServicesSection** | Custom | 4-column grid of ServiceCard components. |
| **StatsSection** | Custom + react-countup | 4 animated counters, scroll-triggered. |
| **FeaturedProperties** | Custom | SectionHeader + 3-col PropertyCard grid. "Voir tous les biens" CTA. |
| **TestimonialsSection** | Custom | Swiper carousel of testimonial cards with avatars. |

### Sections — Listings Page

| Component | Source | Notes |
|-----------|--------|-------|
| **ListingsHero** | Custom | Sub-page hero, shorter height (40vh). |
| **FilterBar** | Custom | Dropdown filters (type, location, status, price range). Sticky on scroll. |
| **PropertyGrid** | Custom | Responsive grid (1/2/3 cols), PropertyCard items. |

### Sections — Listing Detail Page

| Component | Source | Notes |
|-----------|--------|-------|
| **DetailHero** | Custom | Swiper gallery (thumbnails + main), property title overlay. |
| **PropertySpecs** | Custom | Two-column layout: spec table + description + amenities list. |
| **VirtualTour** | Custom | Placeholder container with preview + launch button. |
| **SimilarProperties** | Custom | Horizontal scroll or 3-col grid of related properties. |

### Sections — Contact Page

| Component | Source | Notes |
|-----------|--------|-------|
| **ContactHero** | Custom | Short hero with page title. |
| **ContactInfo** | Custom | Contact cards (phone, email, address, hours) with icons. |
| **ContactForm** | Custom | Form with validation (name, email, phone, subject, message). |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| **PropertyCard** | Custom | FeaturedProperties, PropertyGrid, SimilarProperties |
| **ServiceCard** | Custom | ServicesSection |
| **StatCounter** | Custom | StatsSection |
| **SectionHeader** | Custom | All sections |
| **OptimizedImage** | Custom | PropertyCard, HeroSlider, DetailHero, etc. |
| **LazyVideo** | Custom | VirtualTour placeholder, any video content |
| **Badge** | Custom | PropertyCard, FilterBar |
| **PrimaryButton** | Custom | Throughout |
| **SecondaryButton** | Custom | Throughout |

### Hooks

| Hook | Purpose |
|------|---------|
| **useScrollReveal** | GSAP ScrollTrigger entrance animation (fade + translateY) with configurable params. Wraps the per-section boilerplate. |
| **useLenis** | Initializes and exposes Lenis instance, integrates with GSAP ticker. |
| **useLanguage** | Consumes I18nContext, returns `lang`, `dir`, `toggleLanguage`, `t()` translate function. |
| **useNavbarScroll** | Tracks scroll position, returns `isScrolled` boolean for navbar state. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Smooth scroll | Lenis + GSAP ticker | Global Lenis instance synced via `gsap.ticker.add`. ScrollTrigger.update called on every Lenis scroll event. | Medium |
| Hero slider text reveal | GSAP + SplitText | On Swiper `slideChange` event: SplitText splits title into chars, GSAP timeline staggers chars from `{opacity:0, y:40}` to `{opacity:1, y:0}` with `stagger:0.02, duration:0.6, ease:power2.out`. Reverse previous slide text. | High |
| useScrollReveal | GSAP ScrollTrigger | Reusable hook: creates ScrollTrigger with `start:"top bottom-=15%"`, animates `opacity` and `y` with configurable stagger. `once:true`. | Low |
| Navbar entrance | GSAP | `translateY(-100%) → 0` on mount, `duration:0.5, ease:power2.out`. | Low |
| Navbar scroll transition | CSS transition | `background-color` and `box-shadow` transition via CSS class toggle based on `isScrolled`. | Low |
| Active link dot | CSS transition | `left` position transitioned `0.3s ease` as dot follows active link. | Low |
| Property card hover | CSS transition | `translateY(-4px)`, shadow change, image `scale(1.05)` within `overflow:hidden`. Pure CSS. | Low |
| Service card hover | CSS transition | `translateY(-6px)`, top border color transition, shadow change. Pure CSS. | Low |
| Stats counter | react-countup | `<CountUp end={value} duration={2.5} />` triggered by IntersectionObserver. | Low |
| SectionHeader stagger | GSAP + ScrollTrigger | Eyebrow → title → subtitle → divider sequential fade-in with 0.1s stagger. Implemented within SectionHeader component using useScrollReveal. | Low |
| Footer column entrance | GSAP + ScrollTrigger | 4 columns fade in with `translateY(30px)`, `stagger:0.1`. | Low |
| WhatsApp pulse | CSS keyframes | Two concentric `box-shadow` rings expanding/fading, `animation: pulse-ring 3s infinite`. | Low |
| Page transitions | GSAP timeline | Exit: fade out 0.2s. Scroll to top. Enter: fade in + `translateY(10px)→0` 0.3s. | Medium |
| Image skeleton → loaded | CSS transition | Opacity 0→1 fade on `onLoad` event. Skeleton pulse via CSS keyframes. | Low |
| Video lazy play | IntersectionObserver | Observer at 30% threshold calls `video.play()`. No GSAP needed. | Low |
| Language switch | CSS transition | Content wrapper fades out 0.15s, lang switches, fades in 0.15s. | Low |
| Mobile nav drawer | CSS transition | `transform: translateX(100%) → translateX(0)`, `backdrop-filter` on overlay. | Low |
| Scroll-down indicator | CSS keyframes | Chevron bouncing animation, `animation: bounce 2s infinite`. | Low |

---

## State & Logic Plan

### Language State (React Context)

A single `I18nContext` at the app root manages:
- `lang: 'fr' | 'ar'`
- `dir: 'ltr' | 'rtl'` (derived from `lang`)
- `toggleLanguage(): void`
- `t(key: string): string` (nested key lookup into translations object)

On mount: detect browser language preference, default to `'fr'`.
On toggle: update state → set `document.documentElement.dir` → set `document.documentElement.lang`.

All text content lives in a centralized `translations` object. Every component that renders text calls `useLanguage()` and accesses `t('section.key')`.

### Routing (React Router v7)

4 route definitions with `React.lazy()` code splitting:
- `/` → Home (lazy)
- `/biens` → Listings (lazy)
- `/biens/:id` → ListingDetail (lazy)
- `/contact` → Contact (lazy)

`React.Suspense` fallback: a centered spinner (magenta ring animation).

On every route change: Lenis scrolls to top immediately, GSAP page transition plays.

### Scroll-Triggered Animations (GSAP + Lenis)

Lenis is initialized once at app root. It feeds into GSAP's ticker:
```js
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

The `useScrollReveal` hook encapsulates all per-element ScrollTrigger setup. Each section/element that needs entrance animation gets a ref and calls the hook — no manual ScrollTrigger creation in components.

### Property Data

Static mock data module exporting `Property[]` array with 8-12 diverse properties. Each property has: id, title, location, type, status, price, surface, rooms, bathrooms, description, amenities[], images[], virtualTourUrl?, featured boolean.

FeaturedProperties section filters by `featured: true`. Listings page shows all with client-side filtering. ListingDetail finds by `id` param.

### Form Handling (Contact)

Controlled inputs with basic validation (required fields, email regex). On submit: show success toast via Sonner, log to console (no backend). Form state: `name, email, phone, subject, message`.

---

## Other Key Decisions

### Tailwind Configuration

Extended with all design tokens (colors, fonts, spacing, shadows, breakpoints). Custom utility classes for RTL-aware margins/paddings where needed.

### Font Loading

Google Fonts loaded via `<link>` in `index.html`: Plus Jakarta Sans (400,500,600,700), Cairo (400,500,600,700). `font-display: swap` on both. Arabic font applied conditionally via `lang` attribute selector.

### Image Strategy

All property images generated as opaque JPEGs. Hero slider images at high resolution (1920x1080). Card images at 800x600. Gallery images at 1200x800. `OptimizedImage` component handles WebP source + lazy loading.

### Swiper Configuration

Hero: `effect: 'fade'`, `fadeEffect: { crossFade: true }`, `speed: 800`, `autoplay: { delay: 5000 }`, `parallax: true`.
Gallery: `thumbs` module for thumbnail navigation, `zoom: true`.
Testimonials: `slidesPerView: 1` mobile, `3` desktop, `spaceBetween: 24`.
