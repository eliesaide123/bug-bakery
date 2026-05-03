import Reveal from '@/components/ui/Reveal';

const steps = [
  {
    num: '01',
    title: 'Scope',
    duration: 'Week 1',
    body: 'We dig into the problem before we touch a keyboard. What are you actually trying to ship? Who is it for? What does done look like? You leave week one with a fixed scope, fixed price, and a real timeline.',
  },
  {
    num: '02',
    title: 'Bake',
    duration: 'Week 2–6',
    body: 'Engineering happens in the open. Weekly demos, a staging URL from day one, and a Slack channel where you watch the product rise. No 4-week black boxes.',
  },
  {
    num: '03',
    title: 'Test',
    duration: 'Week 6–8',
    body: 'We hunt every bug we can find — automated tests, manual QA, real-device runs, and a polish pass on every interaction. Nothing ships half-baked.',
  },
  {
    num: '04',
    title: 'Ship',
    duration: 'Ongoing',
    body: 'Launch is the start. We monitor, patch, and iterate. You get a runbook your team can extend without us in the room — but we stick around when you want us to.',
  },
];

const Process = () => {
  return (
    <section
      id="process"
      className="px-6 lg:px-10 max-w-7xl mx-auto py-32 md:py-44"
    >
      <Reveal variant="up">
        <div className="flex items-center gap-4 mb-8">
          <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
            05 — Process
          </span>
          <span className="h-px w-16 bg-black/20" />
        </div>
      </Reveal>

      <Reveal variant="up" delay={100}>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-20 max-w-3xl leading-[1.02]">
          A recipe that
          <br />
          <span className="italic font-light">always rises.</span>
        </h2>
      </Reveal>

      <ol className="relative border-l border-black/15 ml-6 md:ml-12">
        {steps.map((s, i) => (
          <Reveal key={s.num} variant="up" delay={i * 80}>
            <li className="relative pl-10 md:pl-16 pb-16 last:pb-0">
              <span className="absolute -left-[9px] top-2 w-4 h-4 bg-black rounded-sm rotate-45 border-4 border-gray-200" />
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <p className="section-num text-5xl md:text-6xl font-bold tracking-tighter">
                    {s.num}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest opacity-60">
                    {s.duration}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {s.title}
                  </h3>
                  <p className="opacity-70 leading-relaxed text-lg max-w-2xl">
                    {s.body}
                  </p>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
};

export default Process;
