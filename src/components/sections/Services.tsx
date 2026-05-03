import { Globe, Smartphone, Monitor, Sparkles, Server, Bug, MessageSquare, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const services = [
  {
    num: '01',
    icon: Globe,
    title: 'Web Development',
    body: 'Marketing sites, dashboards, and SaaS platforms built on modern stacks — React, Next.js, Vue, Svelte, and the rest.',
    deliverables: ['React', 'Next.js', 'TypeScript'],
  },
  {
    num: '02',
    icon: Smartphone,
    title: 'Mobile Apps',
    body: 'Native and cross-platform apps that ship to the App Store and Play Store — built once, polished everywhere.',
    deliverables: ['iOS', 'Android', 'React Native'],
  },
  {
    num: '03',
    icon: Monitor,
    title: 'Desktop Software',
    body: 'Cross-platform desktop apps for Mac, Windows, and Linux — from utilities to full creative suites.',
    deliverables: ['Electron', 'Tauri', 'Native'],
  },
  {
    num: '04',
    icon: Sparkles,
    title: 'AI & LLM Apps',
    body: 'Custom AI-powered features inside your product — agents, automations, and LLM integrations with the prompts, evals, and guardrails to ship.',
    deliverables: ['LLMs', 'Agents', 'Evals'],
  },
  {
    num: '05',
    icon: MessageSquare,
    title: 'RAG & AI Chatbots',
    body: 'Customer-support bots, doc Q&A, and knowledge bases trained on your data. Vector search, retrieval pipelines, and a UI that actually feels good to talk to.',
    deliverables: ['RAG', 'Chatbots', 'Vector DBs'],
  },
  {
    num: '06',
    icon: Server,
    title: 'Backend & APIs',
    body: 'REST and GraphQL APIs, real-time systems, queues, and the cloud infra that keeps them online at 3am.',
    deliverables: ['Node', 'Python', 'Postgres'],
  },
  {
    num: '07',
    icon: Bug,
    title: 'Bug Squashing',
    body: 'Inherited a codebase with bugs nobody can fix? We hunt them down, patch them clean, and leave a runbook behind.',
    deliverables: ['Audits', 'Refactors', 'Tests'],
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="px-6 lg:px-10 max-w-7xl mx-auto py-32 md:py-44"
    >
      <Reveal variant="up">
        <div className="flex items-center gap-4 mb-8">
          <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
            04 — Services
          </span>
          <span className="h-px w-16 bg-black/20" />
        </div>
      </Reveal>

      <Reveal variant="up" delay={100}>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-20 max-w-3xl leading-[1.02]">
          Seven disciplines,
          <br />
          <span className="italic font-light">one bakery.</span>
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-px bg-black/10 border border-black/10 rounded-xl overflow-hidden">
        {services.map((s, i) => {
          const lastOdd = i === services.length - 1 && services.length % 2 === 1;
          return (
          <Reveal key={s.title} variant="up" delay={i * 100} className={lastOdd ? 'md:col-span-2' : undefined}>
            <div className="bg-gray-200 p-10 md:p-14 hover:bg-gray-100 transition-colors group h-full flex flex-col">
              <div className="flex items-start justify-between mb-10">
                <s.icon
                  className="w-10 h-10 transition-transform duration-500 group-hover:-translate-y-1"
                  strokeWidth={1.25}
                />
                <span className="section-num text-xs uppercase tracking-[0.3em] opacity-40">
                  {s.num}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {s.title}
              </h3>
              <p className="opacity-70 leading-relaxed mb-8 max-w-md">
                {s.body}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-6">
                <ul className="flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="text-xs uppercase tracking-widest px-3 py-1 border border-black/15 rounded-full"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
                <ArrowUpRight
                  size={20}
                  className="opacity-40 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </div>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
