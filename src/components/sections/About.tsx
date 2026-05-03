import Reveal from '@/components/ui/Reveal';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

const stats: Array<{ value: number; suffix?: string; label: string }> = [
  { value: 1000, suffix: '+', label: 'Happy clients' },
  { value: 350, suffix: '+', label: 'Projects shipped' },
  { value: 8, suffix: 'y', label: 'Years engineering' },
  { value: 24, label: 'Industries served' },
];

const About = () => {
  return (
    <section
      id="about"
      className="px-6 lg:px-10 max-w-7xl mx-auto py-32 md:py-44"
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-7">
          <Reveal variant="up">
            <div className="flex items-center gap-4 mb-8">
              <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
                02 — About
              </span>
              <span className="h-px w-16 bg-black/20" />
            </div>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-10 leading-[1.02]">
              Code is the
              <br />
              <span className="italic font-light">recipe.</span>
            </h2>
          </Reveal>

          <Reveal variant="up" delay={250}>
            <p className="opacity-70 leading-relaxed mb-5 text-lg max-w-xl">
              Bug Bakery is a software engineering shop run on the principle
              that great products are baked, not slapped together. We treat
              every project as a fresh batch — measured, tested, and shipped
              with care.
            </p>
          </Reveal>
          <Reveal variant="up" delay={350}>
            <p className="opacity-70 leading-relaxed text-lg max-w-xl">
              We work with founders, agencies, and product teams across web,
              mobile, desktop, and AI — turning rough ideas into production
              software your users actually love.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal variant="left" delay={200}>
            <div className="stack-scene relative aspect-square">
              <div className="stack-card s1 absolute inset-0 bg-gray-300 rounded-xl shadow-lg border border-black/10" />
              <div className="stack-card s2 absolute inset-0 bg-gray-700 rounded-xl shadow-xl translate-x-2 translate-y-2 translate-z-0" />
              <div className="stack-card s3 absolute inset-0 bg-black rounded-xl shadow-2xl translate-x-4 translate-y-4 flex items-center justify-center text-white">
                <span className="text-[8rem] md:text-[10rem] font-bold tracking-tighter leading-none">
                  /B
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10 rounded-xl overflow-hidden">
        {stats.map((s, i) => (
          <Reveal key={s.label} variant="up" delay={i * 100}>
            <div className="bg-gray-200 p-8 md:p-10 h-full">
              <p className="text-5xl md:text-6xl font-bold tracking-tighter section-num">
                <AnimatedNumber to={s.value} suffix={s.suffix ?? ''} />
              </p>
              <p className="mt-4 text-xs md:text-sm uppercase tracking-widest opacity-60">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default About;
