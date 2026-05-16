# Bug Bakery — SEO Audit (May 2026)

A prioritized audit of `https://bug-bakery.com` covering technical SEO, on-page
content, off-page authority, and geo strategy. Findings are grouped by impact,
not by category — fix top-to-bottom for the fastest results.

---

## TL;DR — the three things that matter most

1. **Every URL serves the same empty SPA shell.** `curl https://bug-bakery.com/`
   and `curl https://bug-bakery.com/blog/shipping-react-apps-that-load-fast-in-2026/`
   return byte-identical HTML with the same title, description, JSON-LD, and an
   empty `<div id="root">`. Google's second-wave JS rendering may eventually index
   the blog posts, but Bing, social crawlers, AI-search bots, and link-preview
   bots will not. **Fix: prerender at build time** (see §7).
2. **The Open Graph image and touch icon don't exist.** `https://bug-bakery.com/og.png`
   returns `Content-Type: text/html` — Netlify's SPA rewrite is serving `index.html`
   in its place. Every Twitter/LinkedIn/Slack share looks broken. **Fix: ship a real
   `og.png` and `apple-touch-icon.png`** (see §3).
3. **The site has no per-page metadata.** A search result for a blog post and a
   search result for the homepage are indistinguishable to a crawler reading the
   raw HTML. **Fix: per-route title/description/canonical/OG injection** (we can
   do this client-side now, but it only fully works after prerendering).

---

## 1. Technical SEO — current state

| Finding | Severity | Notes |
| --- | --- | --- |
| Empty SPA shell on every URL | **Critical** | See TL;DR #1. |
| `og.png` and `apple-touch-icon.png` 404 → SPA fallback | **Critical** | Returns HTML with `Content-Type: text/html`. |
| `ProfessionalService` schema is deprecated | High | Schema.org deprecated it in favor of `Service`. Migrate now or Google will silently devalue it. |
| `addressCountry: "Worldwide"` invalid | High | Must be an ISO 3166-1 alpha-2 code. Either pick a country (`LB`, given the +961 phone) or drop the address. |
| `telephone: ""` empty in JSON-LD | Medium | Either fill it in or remove the key. Empty strings can fail Rich Results validation. |
| `sameAs: []` empty | Medium | LinkedIn + TikTok exist in the footer — list them here for entity disambiguation. |
| No `WebSite` schema with `SearchAction` | Medium | Adds sitelinks search box eligibility. |
| No `BlogPosting` schema per post | High | Required for Article rich results. |
| No `BreadcrumbList` schema | Medium | Helps Google build breadcrumb rich results for `/blog/<slug>/`. |
| No `FAQPage` schema | Medium | The Contact section has 5 FAQs — marking them earns FAQ rich results in some markets. |
| Sitemap script regexes `posts.ts` | Low | Brittle (sensitive to formatting). Refactor to import the module. |
| Sitemap homepage `lastmod` = build date | Low | Every build bumps it, which can train crawlers to ignore `lastmod`. Use latest post date or a checked-in date. |
| `meta name="keywords"` present | Low | Google ignores it; doesn't hurt. Leave or remove. |
| No `meta name="robots"` | Low | Default behaviour is fine; explicit is clearer. |

## 2. On-page & content — current state

| Finding | Severity | Notes |
| --- | --- | --- |
| Per-page titles set only client-side | **Critical** | `BlogPost.tsx:62-66` updates `document.title`, but the raw HTML never gets it. |
| Per-page descriptions only set client-side | **Critical** | Same problem. |
| Per-page canonicals not set | **Critical** | Every URL canonicalizes to `/`. Google will collapse all blog posts into the homepage. |
| Internal links to `#` waste link equity | High | `Work.tsx` project tiles, `Footer.tsx` Privacy/Terms/Cookies. |
| Hero has two `<h1>` elements | Medium | "We bake" + "software." — combine into one or demote the second to a span. Google generally handles this, but it's a needless ambiguity. |
| Homepage meta description isn't intent-rich | Medium | Current: "Bug Bakery is a software engineering studio shipping web, mobile, desktop, and AI products for 1,000+ clients. Fixed-fee, weekly demos, fewer bugs." Solid for brand but light on transactional intent like "hire", "agency", "build". |
| No author/byline on blog posts | Medium | Hurts E-E-A-T. Even "By Bug Bakery" with an Organization link helps. |
| Blog tags aren't linked / no tag pages | Medium | Each tag (`React`, `Performance`, `LLM`) is a missed long-tail entry point. Optional — adds routes to maintain. |
| Headings are very brand-voice heavy | Low | "Code is the recipe." / "Seven disciplines, one bakery." Strong brand, but no `<h2>` like "Software development services" or "Custom AI development". |

## 3. Missing assets

The deployed `https://bug-bakery.com/` HTML references:

- `https://bug-bakery.com/og.png` — **missing**, returns SPA HTML
- `https://bug-bakery.com/apple-touch-icon.png` — **missing**, returns SPA HTML

Recommended `og.png` spec: **1200×630 PNG**, < 8MB, < 5MB ideal, with the brand
name and tagline ("We bake software." would work) on a dark background. Apple
touch icon: **180×180 PNG**, transparent or solid background.

**Two paths** to ship them:

- **Design once, commit.** Quickest. Drop the two PNGs into `public/` and done.
- **Script with Playwright.** `playwright` is already in `devDependencies`. A
  `scripts/generate-og-image.mjs` could render an HTML template and screenshot
  it as `public/og.png` during `prebuild`. Useful if you want per-post OG images
  later (`/og/<slug>.png`).

## 4. Off-page & authority — opportunities

The Organization JSON-LD has `sameAs: []`. That's the first thing to fix — list
LinkedIn, TikTok, and a GitHub org if you have one. Then:

- **Agency directory listings.** The high-trust ones, ordered by SEO juice:
  - [Clutch](https://clutch.co/) — single biggest backlink for studios, has 200k+ listings.
  - [GoodFirms](https://www.goodfirms.co/) — IT/software focus, friendlier to smaller shops.
  - [DesignRush](https://www.designrush.com/) — free basic listing, paid sponsorship.
  - [G2](https://www.g2.com/) — usually for products, but service profiles work.
  - [Crunchbase](https://www.crunchbase.com/) — organization profile, helps entity recognition.
  - [The Manifest](https://themanifest.com/) (sister to Clutch).
- **Niche directories.** [Awwwards](https://www.awwwards.com/), [Behance](https://www.behance.net/) (case studies), GitHub (public repos).
- **Reviews drive Clutch ranking** more than listings alone — collect 3-5 client
  reviews in your first quarter on Clutch and your profile starts surfacing.
- **Content partnerships.** Guest posts on dev.to, Smashing Magazine, CSS-Tricks
  for backlinks from authoritative dev sites. The existing blog posts (Tauri vs
  Electron, RN vs native) are already in the right tone for republishing on
  Hashnode or dev.to with a canonical pointing back here.
- **GitHub org + open-source.** A `bug-bakery` GitHub org with even one or two
  small public utilities boosts both backlinks and E-E-A-T for developer-oriented
  search queries.

## 5. Geo strategy — local vs global

The site says "Remote worldwide" but the contact phone is **+961 71 375 587**
(Lebanon). For a remote studio with a Lebanon home base, the right move is a
**hybrid** stance:

- Organization JSON-LD with `address.addressCountry: "LB"` (or
  `addressLocality: "Beirut"` if you want local pickup). This grounds your entity
  in Google's knowledge graph.
- `areaServed: ["Worldwide"]` keeps you discoverable for global queries.
- `<link rel="alternate" hreflang="en" />` + `hreflang="x-default"` — both
  pointing to the same URL since the site is English-only. Tells Google "no
  language alternatives exist."
- **Don't** create dedicated location pages ("Software development in Beirut")
  unless you actively want local SMB business. The brand voice is global and the
  blog is global; mixing in geo-pages dilutes intent.

If a Beirut/MENA-region presence becomes important: add a Google Business
Profile (free, even for service-area businesses without a storefront), Lebanese
directory listings, and one well-written `Software development in Lebanon`
landing page that earns its own keywords. That's a follow-on, not a now-thing.

## 6. AI search & LLM discoverability

A new dimension since 2024: AI Overviews, ChatGPT search, Perplexity, and
Anthropic's web search all index and cite from the open web. They behave more
like Bing than Google — **they need real HTML in the raw response**. A
client-rendered SPA is invisible to them. Once prerendering ships, the structured
data (`BlogPosting`, `FAQPage`, `Service`) is what they parse to decide whether
to cite you.

The blog post titles read like they were written for LLM citations already
("Building LLM agents that don't hallucinate (much)", "Tauri vs Electron: which
one in 2026?"). Keep doing that.

## 7. The big architectural decision — prerendering

Three options, ordered by effort:

### Option A — `vite-prerender-plugin` (Preact team, framework-agnostic)

**Effort:** half a day. **Maintenance:** low.

- Add the plugin to `vite.config.ts`, supply a render function that uses
  `react-dom/server`'s `renderToString`, list the 8 routes (or generate them
  from `posts.ts`).
- Add a `prerender` flag the React app checks to skip `<LoadingScreen>` (which
  doesn't make sense in a snapshot anyway).
- Build produces real HTML per route in `dist/`. Netlify keeps serving them.
- Hydration: minimal — your app is mostly static.

**Recommended.** Lowest cost, highest payoff. Doesn't lock you into a framework.

### Option B — migrate to Astro

**Effort:** 2–3 days. **Maintenance:** lower long-term.

- Astro is designed for content-led sites with islands of React. Your site is
  basically that pattern already: mostly static marketing + a small reactive
  loader + contact form.
- Astro builds static HTML by default. Per-page metadata is first-class.
- You'd rewrite `App.tsx`'s routing as Astro pages, keep React components as
  islands where interactivity matters (Contact form, Navbar mobile menu).

Pick this if you expect the blog to grow significantly or want first-class
content collections.

### Option C — migrate to Next.js (App Router)

**Effort:** 3–5 days. **Maintenance:** medium.

- Server Components, full SSR, image optimization, native sitemap/robots APIs.
- More tool than this site needs today, but the best ceiling if you later add
  authenticated routes (client dashboards, gated case studies).

### What I'd ship now

**Option A.** It's the smallest change with the biggest SEO win, and it doesn't
foreclose B or C later.

## 8. Recommended phased plan

### Phase 1 — Quick wins (no build changes, ship today)

- [x] Fix Organization JSON-LD (real `sameAs`, ISO country, drop empty fields)
- [x] Replace `ProfessionalService` with valid `Service` entries
- [x] Add `WebSite` JSON-LD with `SearchAction`
- [x] Add `BlogPosting` JSON-LD per blog post (client-side; helps after JS runs)
- [x] Add `BreadcrumbList` for `/blog/` and `/blog/<slug>/`
- [x] Add `FAQPage` JSON-LD wired to the Contact FAQ list
- [x] Set per-route title/description/canonical via JS (homepage, /blog, /blog/<slug>)
- [x] Add a `<noscript>` block to `index.html` with real content
- [x] Fix internal link dead-ends (`#` → real anchors or remove)
- [x] Refactor sitemap script to import `posts.ts` instead of regex
- [x] Add `hreflang` link tags

### Phase 2 — Prerendering (shipped)

- [x] Installed `vite-prerender-plugin`
- [x] Created `src/prerender.tsx` (uses `renderToString` + auto-crawl)
- [x] `LoadingScreen` now mounts client-only so SSR HTML doesn't ship a fixed overlay
- [x] `src/main.tsx` uses `hydrateRoot` in prod, `createRoot` in dev
- [x] Wired plugin into `vite.config.ts`, all 9 routes prerendered (`/`, `/blog/`, `/blog`, 6 posts)
- [x] Verified per-route title, canonical, description, OG, and BlogPosting/FAQPage/BreadcrumbList JSON-LD in `dist/`
- [ ] Optional: per-post OG images at `/og/<slug>.png` via the same Playwright pipeline

### Phase 3 — Assets (shipped)

- [x] `scripts/generate-og-image.mjs` (Playwright) writes `public/og.png` (1200×630) and `public/apple-touch-icon.png` (180×180)
- [x] Run via `npm run generate-og`; re-run when the brand changes
- [ ] Optional: a `favicon.ico` for legacy bots (low priority)

### Phase 4 — Off-page (you, not me)

- [ ] Submit `sitemap.xml` to Google Search Console (with property verification)
- [ ] Submit to Bing Webmaster Tools
- [ ] Submit to IndexNow (Bing+) — push notifications when new posts ship
- [ ] Create profiles on Clutch, GoodFirms, DesignRush, Crunchbase, G2
- [ ] Collect 3-5 client reviews on Clutch in Q3
- [ ] Republish 1-2 best blog posts on dev.to with `rel="canonical"` back to your domain

### Phase 5 — Content (ongoing)

- [ ] Add 1 blog post per month — your topic mix (RN, Tauri, LLMs, pricing) is on point
- [ ] Add a `/case-studies/<project>` template — Work tiles currently link to `#`
- [ ] Add a `/team` or `/about` page with named engineers for E-E-A-T
- [ ] Consider tag/topic pages (`/blog/tag/llm`) once you have 15+ posts

---

## Appendix — research sources

- [Why Google can't index your React site (2026 SPA SEO guide)](https://luminousdigitalvisions.com/blog/why-google-cant-index-your-react-site-spa-seo-guide-2026)
- [JavaScript SEO: How to make SPAs crawlable (2026)](https://fuelonline.com/seo/javascript-seo-guide-2026/)
- [vite-prerender-plugin (Preact team)](https://github.com/preactjs/vite-prerender-plugin)
- [schema.org Service](https://schema.org/Service) (ProfessionalService deprecated)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [47 SEO best practices for 2026](https://almcorp.com/blog/seo-best-practices-complete-guide-2026/)
- [Local SEO vs Global SEO (2026)](https://yogrowsolutions.com/global-seo-vs-local-seo/)
- [Top agency directories 2026 (Clutch, GoodFirms, DesignRush)](https://vocal.media/journal/design-rush-clutch-g2-the-top-agency-rating-directories-to-scout-a-reliable-service-provider)
