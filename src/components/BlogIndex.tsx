import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { posts } from '@/content/posts';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const BlogIndex = () => {
  return (
    <div className="bg-gray-200 text-black min-h-screen">
      <header className="max-w-5xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity mb-12"
        >
          <ArrowLeft size={16} />
          Back to Bug Bakery
        </a>
        <div className="flex items-center gap-4 mb-8">
          <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
            Journal
          </span>
          <span className="h-px w-16 bg-black/20" />
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] mb-8">
          Notes from
          <br />
          <span className="italic font-light">the kitchen.</span>
        </h1>
        <p className="max-w-2xl text-lg opacity-70 leading-relaxed">
          Tactical software-engineering writing from the Bug Bakery team —
          covering the stacks we ship in (web, mobile, desktop, AI) and the
          process we use to ship them.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 lg:px-10 pb-32">
        <ul className="border-t border-black/10">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-black/10">
              <a
                href={`/blog/${p.slug}/`}
                className="group grid md:grid-cols-12 gap-6 py-10 hover:opacity-80 transition-opacity"
              >
                <div className="md:col-span-3 flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest opacity-60">
                    {formatDate(p.date)}
                  </span>
                  <span className="text-xs uppercase tracking-widest opacity-60">
                    {p.category} · {p.readTime}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 leading-tight">
                    {p.title}
                  </h2>
                  <p className="opacity-70 leading-relaxed mb-4 max-w-2xl">
                    {p.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm underline-offset-4 group-hover:underline">
                    Read article
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-black/10 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <span className="opacity-60">
            © {new Date().getFullYear()} Bug Bakery. All rights reserved.
          </span>
          <a href="/" className="opacity-60 hover:opacity-100 transition-opacity">
            bug-bakery.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default BlogIndex;
