export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'What does a typical engagement look like?',
    a: 'Most projects run 4–10 weeks from scoping to launch. We ship in weekly increments so you watch the product rise — no 4-week black boxes.',
  },
  {
    q: 'Do you work with early-stage teams?',
    a: 'Yes. About half our work is with seed-to-Series-A founders. We adapt the process to the stage — lighter on ceremony, heavier on shipping.',
  },
  {
    q: 'How do you price?',
    a: 'Fixed-fee per phase, billed monthly. You get a clear scope and a clear number up front. No hourly surprises, no scope creep invoices.',
  },
  {
    q: 'What stacks do you work in?',
    a: 'Web: React, Next.js, Angular, Vue, Svelte. Mobile: React Native, Swift, Kotlin. Desktop: Tauri, Electron. AI: Python, OpenAI, Anthropic, vector DBs. Backend: Node, .NET, Python, Postgres, Redis.',
  },
  {
    q: 'Can you fix an existing codebase instead of building new?',
    a: "Absolutely — that's the Bug Squashing service. We audit, refactor, and patch inherited code, and leave a runbook your team can extend.",
  },
];
