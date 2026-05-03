export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Web' | 'Mobile' | 'Desktop' | 'AI' | 'Engineering';
  tags: string[];
  body: string;
};

export const posts: Post[] = [
  {
    slug: 'shipping-react-apps-that-load-fast-in-2026',
    title: 'Shipping React apps that actually load fast in 2026',
    excerpt:
      "A practical checklist for getting Lighthouse from 60 to 99 — bundle splitting, server components, image strategy, and the unsexy CSS work that actually moves the needle.",
    date: '2026-04-22',
    readTime: '9 min',
    category: 'Web',
    tags: ['React', 'Performance', 'Vite', 'Next.js', 'Web Vitals'],
    body: `
Performance is a team sport. The reason most React apps feel sluggish in 2026 isn't React — it's everything else: a 600KB JS bundle on first paint, hero images shipped at 4K, fonts that block render, and a hydration cascade that locks the main thread for two full seconds.

## The boring wins (do these first)
1. **Image strategy.** Serve AVIF with a WebP fallback. Set width and height on every <img>. Lazy-load anything below the fold.
2. **Font loading.** \`font-display: swap\`, preload one weight, subset to the characters you actually use.
3. **Code splitting.** Route-level by default, component-level only where the bundle warrants it. Don't lazy-load tiny components — the request roundtrip costs more than the bytes you save.
4. **Defer non-critical JS.** Analytics, chat widgets, marketing pixels — all of them load after \`load\`, never before.

## The architectural wins
Move data fetching to the server. React Server Components, server actions, or just a plain old SSR endpoint — the goal is to ship HTML the user can read before JS hydrates. Hydration is no longer free; treat it like a precious budget.

## What we measure
LCP under 2s, INP under 200ms, CLS under 0.05. That's the minimum bar at Bug Bakery. Anything worse and we don't ship.
`,
  },
  {
    slug: 'react-native-vs-native-when-to-pick-which',
    title: 'React Native vs native: when to pick which in 2026',
    excerpt:
      "We've shipped both. Here's the honest tradeoff matrix — team size, budget, hardware features, and the long-tail maintenance cost nobody talks about.",
    date: '2026-04-08',
    readTime: '7 min',
    category: 'Mobile',
    tags: ['React Native', 'iOS', 'Android', 'Swift', 'Kotlin'],
    body: `
Every founder asks: "should we go native or React Native?" The answer is almost never the one they expect.

## Pick React Native when
- You have a small team (1–3 engineers).
- 80%+ of the app is forms, lists, and screens. No heavy camera, AR, or audio work.
- Your web product already exists and the mobile app is a companion, not the flagship.
- You want one codebase to maintain for the next 3 years.

## Pick native when
- The product *is* the hardware integration (cameras, ML on-device, BLE, AR).
- You have iOS-first or Android-first user pull and the other platform is a 6-month follow-up.
- You're optimizing for the App Store's discovery algorithm and want every native polish point.

## What people get wrong
React Native isn't slow. The bridge isn't slow. What's slow is React Native developers writing mobile code like web code — re-rendering 200 list items on every keystroke, fetching on the JS thread, animating with \`setState\`. Hire mobile engineers for mobile work, regardless of stack.
`,
  },
  {
    slug: 'building-llm-agents-that-dont-hallucinate',
    title: "Building LLM agents that don't hallucinate (much)",
    excerpt:
      "Tool use, retrieval, evals, guardrails — the unglamorous engineering that turns a demo agent into something you can put in front of a paying customer.",
    date: '2026-03-19',
    readTime: '11 min',
    category: 'AI',
    tags: ['LLM', 'Agents', 'RAG', 'Evals', 'Anthropic', 'OpenAI'],
    body: `
The gap between an agent that demos well and one you'd ship to production is enormous. It's not the model — Claude and GPT and Gemini are all good enough now. It's the engineering around the model.

## Retrieval first
If your agent needs facts, give it facts. Don't trust pretraining. A small embedding index over your own docs beats every prompt-engineering trick.

## Tools, not text
Anywhere the model needs to look up a value, take an action, or hit an API — give it a tool. Free-text "the user's email is X" is a hallucination waiting to happen. \`get_user_email()\` returning a real value is not.

## Evals before prompts
Write 50 test cases before you write the prompt. Score them automatically. When you tweak the prompt, re-run the suite. Without evals you're vibes-coding a system your customers depend on.

## Guardrails are part of the product
Output validation. Refusal handling. Cost caps. Token limits. PII redaction on the way in. These aren't nice-to-haves — they're the difference between a feature and a lawsuit.
`,
  },
  {
    slug: 'tauri-vs-electron-desktop-apps',
    title: "Tauri vs Electron: which one in 2026?",
    excerpt:
      "We've shipped production apps in both. Here's what the benchmarks don't tell you about install size, plugin ecosystems, and the moments you actually reach for native code.",
    date: '2026-02-27',
    readTime: '6 min',
    category: 'Desktop',
    tags: ['Tauri', 'Electron', 'Rust', 'Desktop'],
    body: `
Tauri 2.0 changed our default. We used to reach for Electron every time because the ecosystem was unmatched. In 2026, that's no longer true.

## Tauri wins on
- **Install size.** 5–10MB vs Electron's 80–150MB. Users notice.
- **Memory.** Roughly half on most apps we've measured.
- **Security.** A real permission model out of the box. Electron requires you to build that.

## Electron still wins on
- **Plugin ecosystem.** If you need a niche integration that already exists as an npm package, Electron will be faster.
- **Hiring.** Every JS dev can ship in Electron tomorrow. Tauri requires at least one Rust-comfortable engineer on the team.
- **Mature debugging.** Chromium DevTools is unmatched.

## Our default
Tauri for new projects, unless we hit a specific blocker in the first week of scoping.
`,
  },
  {
    slug: 'why-fixed-fee-beats-hourly-for-software-projects',
    title: 'Why fixed-fee beats hourly for software projects',
    excerpt:
      "Hourly billing aligns the studio's incentives against the client's. Here's how we structure fixed-fee engagements that protect both sides — and what we do when scope changes.",
    date: '2026-02-10',
    readTime: '5 min',
    category: 'Engineering',
    tags: ['Pricing', 'Process', 'Studio'],
    body: `
Hourly billing is a perverse incentive. The slower we work, the more we get paid. The more bugs we ship, the more we charge to fix them. The more meetings we run, the higher your invoice.

## How we price
Every Bug Bakery engagement is fixed-fee per phase. We scope tightly in week one, and the price doesn't move unless the scope does — explicitly, in writing, with you signing off.

## What happens when scope changes
It will. It always does. Here's the playbook:
1. We tell you the moment we notice it, not at the end of the sprint.
2. We give you three options: descope, defer to v2, or scope-change with a fixed price.
3. You pick. We don't proceed until we hear back.

## Why this works for both sides
You know your number. We know our deadline. Nobody is incentivized to drag it out. Everyone is incentivized to ship.
`,
  },
  {
    slug: 'database-choice-postgres-vs-sqlite-vs-others',
    title: "When SQLite is the right answer (and when it isn't)",
    excerpt:
      "The default of 'always Postgres' is a habit, not a decision. Here's a pragmatic guide to picking SQLite, Postgres, or one of the new kids — based on what your app actually does.",
    date: '2026-01-18',
    readTime: '8 min',
    category: 'Engineering',
    tags: ['SQLite', 'Postgres', 'Databases', 'Architecture'],
    body: `
"Just use Postgres" is fine advice. It's also a thought-terminator. Sometimes Postgres is wrong.

## SQLite is right when
- Single-writer or read-heavy workload.
- Embedded in a desktop app, mobile app, or edge function.
- You want zero ops. No server, no migrations service, no managed plan.
- Data fits comfortably on one disk (which is more data than people think — multiple terabytes).

## Postgres is right when
- Multiple concurrent writers.
- You need rich types, JSON columns with indexes, full-text search, geospatial.
- Multiple services share a database.
- You want the deepest tooling ecosystem on earth.

## The new kids
Turso, Neon, PlanetScale, Cloudflare D1 — each solves a specific deployment pain. Pick them when you've felt the pain, not because they're new.
`,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
