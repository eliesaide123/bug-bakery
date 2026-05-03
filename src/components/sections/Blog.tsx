import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { posts } from '@/content/posts';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Blog = () => {
  const featured = posts[0];
  const rest = posts.slice(1, 5);

  return (
    <section
      id="blog"
      className="px-6 lg:px-10 max-w-7xl mx-auto py-32 md:py-44"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
        <div>
          <Reveal variant="up">
            <div className="flex items-center gap-4 mb-8">
              <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
                06 — Journal
              </span>
              <span className="h-px w-16 bg-black/20" />
            </div>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] max-w-3xl">
              Notes from
              <br />
              <span className="italic font-light">the kitchen.</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="mt-8 max-w-xl opacity-70 leading-relaxed">
              Tactical engineering writing on the stacks we ship in — React,
              React Native, Tauri, LLMs, and the unsexy infrastructure that
              makes software actually work.
            </p>
          </Reveal>
        </div>
        <Reveal variant="up" delay={300}>
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
          >
            All posts
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <Reveal variant="up" className="lg:col-span-7">
          <a
            href={`/blog/${featured.slug}/`}
            className="group block bg-gray-200 rounded-xl overflow-hidden border border-black/10 hover:border-black/30 transition-colors h-full"
          >
            <div className="relative aspect-[16/10] bg-black overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-black" />
              <div className="absolute inset-0 bg-grid opacity-15 mix-blend-overlay" />
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/80 text-xs uppercase tracking-widest">
                <span className="px-3 py-1 border border-white/30 rounded-full">
                  {featured.category}
                </span>
                <span>{formatDate(featured.date)}</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                  {featured.title}
                </h3>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <p className="opacity-70 leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between border-t border-black/10 pt-6">
                <span className="text-xs uppercase tracking-widest opacity-60">
                  {featured.readTime} read
                </span>
                <span className="inline-flex items-center gap-2 text-sm group-hover:underline underline-offset-4">
                  Read article
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </div>
          </a>
        </Reveal>

        <div className="lg:col-span-5 grid gap-6">
          {rest.map((p, i) => (
            <Reveal key={p.slug} variant="up" delay={i * 80}>
              <a
                href={`/blog/${p.slug}/`}
                className="group block bg-gray-200 rounded-xl border border-black/10 hover:border-black/30 transition-colors p-6 md:p-7"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest opacity-60 mb-4">
                  <span>{p.category}</span>
                  <span>{formatDate(p.date)}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 leading-tight">
                  {p.title}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed line-clamp-2">
                  {p.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest opacity-50">
                    {p.readTime} read
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
