import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Plus, Minus, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const faqs = [
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
    a: 'Web: React, Next.js, Vue, Svelte. Mobile: React Native, Swift, Kotlin. Desktop: Tauri, Electron. AI: Python, OpenAI, Anthropic, vector DBs. Backend: Node, Python, Postgres, Redis.',
  },
  {
    q: 'Can you fix an existing codebase instead of building new?',
    a: "Absolutely — that's the Bug Squashing service. We audit, refactor, and patch inherited code, and leave a runbook your team can extend.",
  },
];

const FaqItem = ({
  q,
  a,
  open,
  onClick,
}: {
  q: string;
  a: string;
  open: boolean;
  onClick: () => void;
}) => (
  <li className="border-b border-black/10">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-6 py-6 text-left group"
    >
      <span className="text-lg md:text-xl font-medium tracking-tight pr-4">
        {q}
      </span>
      <span className="shrink-0 w-9 h-9 rounded-full border border-black/30 flex items-center justify-center transition-colors group-hover:bg-black group-hover:text-white group-hover:border-black">
        {open ? <Minus size={16} /> : <Plus size={16} />}
      </span>
    </button>
    <div
      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        <p className="opacity-70 leading-relaxed pb-6 max-w-2xl">{a}</p>
      </div>
    </div>
  </li>
);

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="px-6 lg:px-10 max-w-7xl mx-auto py-32 md:py-44"
    >
      <Reveal variant="up">
        <div className="flex items-center gap-4 mb-8">
          <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
            07 — Contact
          </span>
          <span className="h-px w-16 bg-black/20" />
        </div>
      </Reveal>

      <Reveal variant="up" delay={100}>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-16 max-w-3xl leading-[1.02]">
          Let's bake
          <br />
          <span className="italic font-light">something.</span>
        </h2>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal variant="up" delay={150}>
            <p className="opacity-70 leading-relaxed mb-12 text-lg max-w-md">
              Tell us about the project. We reply within one business day, and
              we'll never push you onto a discovery call until we know what
              we're talking about.
            </p>
          </Reveal>

          <Reveal variant="up" delay={250}>
            <ul className="space-y-5 mb-12">
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center">
                  <Mail size={16} strokeWidth={1.5} />
                </span>
                <a href="mailto:hello@bug-bakery.com" className="hover:opacity-60 transition-opacity">
                  hello@bug-bakery.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center">
                  <Phone size={16} strokeWidth={1.5} />
                </span>
                <span>Available on request</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center">
                  <MapPin size={16} strokeWidth={1.5} />
                </span>
                <span>Remote worldwide</span>
              </li>
            </ul>
          </Reveal>

          <Reveal variant="up" delay={350}>
            <div className="border-t border-black/10 pt-8">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
                Office hours
              </p>
              <p className="opacity-70 leading-relaxed">
                Mon — Fri, 9:00 — 18:00
                <br />
                Reply within 1 business day
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal variant="up" delay={200}>
            <form
              onSubmit={onSubmit}
              className="space-y-8 bg-gray-100 p-8 md:p-12 rounded-xl border border-black/10"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider opacity-60 mb-3">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-1 py-3 bg-transparent border-b border-black/30 focus:border-black outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider opacity-60 mb-3">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full px-1 py-3 bg-transparent border-b border-black/30 focus:border-black outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider opacity-60 mb-3">
                  Company / role
                </label>
                <input
                  type="text"
                  className="w-full px-1 py-3 bg-transparent border-b border-black/30 focus:border-black outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider opacity-60 mb-3">
                  Project budget
                </label>
                <div className="flex flex-wrap gap-2">
                  {['<$25k', '$25–75k', '$75–150k', '$150k+'].map((b) => (
                    <label
                      key={b}
                      className="px-4 py-2 border border-black/20 rounded-full text-sm cursor-pointer hover:bg-black hover:text-white hover:border-black transition-colors"
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={b}
                        className="hidden"
                      />
                      {b}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider opacity-60 mb-3">
                  Tell us about the project
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-1 py-3 bg-transparent border-b border-black/30 focus:border-black outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="group inline-flex items-center gap-2 px-7 py-4 bg-black text-white text-sm rounded-full hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {submitted ? 'Sent ✓' : 'Send message'}
                {!submitted && (
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      <div className="mt-32">
        <Reveal variant="up">
          <div className="flex items-center gap-4 mb-12">
            <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
              FAQ — Frequently asked
            </span>
            <span className="h-px flex-1 bg-black/10" />
          </div>
        </Reveal>

        <ul className="border-t border-black/10">
          {faqs.map((f, i) => (
            <Reveal key={f.q} variant="up" delay={i * 60}>
              <FaqItem
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
