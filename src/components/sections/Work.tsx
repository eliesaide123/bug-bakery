import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import ProjectImage from '@/components/ui/ProjectImage';

type Project = {
  num: string;
  name: string;
  type: string;
  year: string;
  primary: string;
  fallback: string;
  fallbackGradient: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const picsum = (seed: string) =>
  `https://picsum.photos/seed/${seed}/1400/1050?grayscale`;

const projects: Project[] = [
  {
    num: '01',
    name: 'Crumb Analytics',
    type: 'SaaS Web App · React + Node',
    year: '2026',
    primary: unsplash('1551288049-bebda4e38f71'),
    fallback: picsum('crumb-analytics'),
    fallbackGradient: 'from-gray-700 to-black',
  },
  {
    num: '02',
    name: 'Loaf Mobile',
    type: 'iOS & Android · React Native',
    year: '2025',
    primary: unsplash('1512941937669-90a1b58e7e9c'),
    fallback: picsum('loaf-mobile'),
    fallbackGradient: 'from-black to-gray-600',
  },
  {
    num: '03',
    name: 'Sourdough OS',
    type: 'Desktop App · Tauri + Rust',
    year: '2025',
    primary: unsplash('1518770660439-4636190af475'),
    fallback: picsum('sourdough-os'),
    fallbackGradient: 'from-gray-600 to-gray-900',
  },
  {
    num: '04',
    name: 'Yeast AI',
    type: 'LLM Agent Platform · Python',
    year: '2025',
    primary: unsplash('1677442136019-21780ecad995'),
    fallback: picsum('yeast-ai'),
    fallbackGradient: 'from-gray-800 to-black',
  },
];

const Work = () => {
  return (
    <section
      id="work"
      className="px-6 lg:px-10 max-w-7xl mx-auto py-32 md:py-44"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
        <div>
          <Reveal variant="up">
            <div className="flex items-center gap-4 mb-8">
              <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
                03 — Selected work
              </span>
              <span className="h-px w-16 bg-black/20" />
            </div>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] max-w-2xl">
              Software that
              <br />
              <span className="italic font-light">ships and stays shipped.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal variant="up" delay={200}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
          >
            Have a project? Let's talk
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <Reveal key={p.num} variant="up" delay={i * 100}>
            <a
              href="#"
              className="group block bg-gray-200 rounded-xl overflow-hidden border border-black/10 hover:border-black/30 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <ProjectImage
                  primary={p.primary}
                  fallback={p.fallback}
                  fallbackGradient={p.fallbackGradient}
                  alt={`${p.name} — ${p.type}`}
                />
                <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/30" />
                <div className="absolute inset-0 bg-grid opacity-15 mix-blend-overlay" />

                <div className="absolute top-6 left-6 right-6 flex items-start justify-between text-white/80 text-xs uppercase tracking-widest">
                  <span className="section-num">{p.num}</span>
                  <span>{p.year}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <span className="text-3xl md:text-4xl font-bold tracking-tighter">
                    {p.name}
                  </span>
                  <ArrowUpRight
                    size={28}
                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
              <div className="px-6 py-5 flex items-center justify-between">
                <p className="text-sm opacity-70">{p.type}</p>
                <span className="text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Work;
