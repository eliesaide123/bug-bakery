import { useState } from 'react';
import { RotateCw, ExternalLink } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const IpadShowcase = () => {
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <section
      id="preview"
      className="bg-black text-white py-32 md:py-44"
    >
      <div className="px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <Reveal variant="up">
              <div className="flex items-center gap-4 mb-8">
                <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
                  ◆ — Live preview
                </span>
                <span className="h-px w-16 bg-white/20" />
              </div>
            </Reveal>

            <Reveal variant="up" delay={100}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] max-w-3xl">
                See it
                <br />
                <span className="italic font-light">on a real device.</span>
              </h2>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <p className="mt-8 max-w-md opacity-70 leading-relaxed">
                The site you're reading, running live inside an iPad. Scroll
                inside the device to explore — every animation, transition,
                and interaction is the real thing.
              </p>
            </Reveal>
          </div>

          <Reveal variant="up" delay={300}>
            <div className="flex gap-2">
              <button
                onClick={() => setIframeKey((k) => k + 1)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors"
              >
                <RotateCw size={14} /> Replay
              </button>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors"
              >
                <ExternalLink size={14} /> Open in tab
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={400}>
          <div className="ipad-stage">
            <div className="ipad-frame mx-auto">
              <span className="ipad-camera" aria-hidden />
              <div className="ipad-screen">
                <iframe
                  key={iframeKey}
                  src="/?embed=1"
                  title="Bug Bakery — live preview"
                  className="w-full h-full border-0 bg-gray-200"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] opacity-50">
              Hover the device · scroll to interact
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default IpadShowcase;
