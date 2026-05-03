import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-10 max-w-7xl mx-auto pt-32 pb-24"
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative">
        <Reveal variant="fade">
          <div className="flex items-center gap-4 mb-10">
            <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
              01 — Studio est. 2018
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-black/20" />
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-black opacity-40 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
              </span>
              Booking Q3 2026
            </span>
          </div>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9]">
            We bake
          </h1>
        </Reveal>
        <Reveal variant="up" delay={250}>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] italic font-light tracking-tighter leading-[0.9] mt-1">
            software.
          </h1>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-10 items-end">
          <Reveal variant="up" delay={400} className="md:col-span-2">
            <p className="max-w-xl text-lg md:text-xl opacity-70 leading-relaxed">
              Bug Bakery is a software engineering studio shipping web, mobile,
              desktop, and AI products for founders, teams, and ambitious solo
              builders. Fresh code, fewer bugs — the way it should be served.
            </p>
          </Reveal>
          <Reveal variant="up" delay={550}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-black text-white text-sm rounded-full hover:opacity-80 transition-opacity"
              >
                See our work
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-4 border border-black text-sm rounded-full hover:bg-black hover:text-white transition-colors"
              >
                Start a project
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={750}>
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black/10 pt-10">
            {[
              ['Web', 'Marketing sites & SaaS'],
              ['Mobile', 'iOS & Android apps'],
              ['Desktop', 'Mac, Windows, Linux'],
              ['AI', 'LLM apps & agents'],
            ].map(([title, body], i) => (
              <div key={title} className="flex items-start gap-3">
                <span className="section-num text-xs opacity-30 mt-1">
                  0{i + 1}
                </span>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="opacity-60 text-xs mt-1 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
      >
        Scroll
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
