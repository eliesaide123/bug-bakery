import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { type Post, posts } from '@/content/posts';
import { applySeo, getSeoForUrl } from '@/lib/seo';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const renderBody = (body: string) => {
  const blocks = body.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2
          key={i}
          className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-5"
        >
          {block.replace(/^##\s+/, '')}
        </h2>
      );
    }
    if (/^\d+\.\s/.test(block) || /^[-*]\s/.test(block)) {
      const ordered = /^\d+\.\s/.test(block);
      const items = block.split('\n').map((l) => l.replace(/^(\d+\.|[-*])\s/, ''));
      const ListTag = ordered ? 'ol' : 'ul';
      return (
        <ListTag
          key={i}
          className={`my-6 space-y-2 pl-6 ${
            ordered ? 'list-decimal' : 'list-disc'
          }`}
        >
          {items.map((item, j) => (
            <li
              key={j}
              className="opacity-80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: applyInline(item) }}
            />
          ))}
        </ListTag>
      );
    }
    return (
      <p
        key={i}
        className="opacity-80 leading-relaxed text-lg my-6"
        dangerouslySetInnerHTML={{ __html: applyInline(block) }}
      />
    );
  });
};

const applyInline = (s: string) =>
  s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-black/10 rounded text-sm">$1</code>');

const BlogPost = ({ post }: { post: Post }) => {
  useEffect(() => {
    applySeo(getSeoForUrl(`/blog/${post.slug}/`));
  }, [post]);

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-gray-200 text-black min-h-screen">
      <header className="max-w-3xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <a
          href="/blog/"
          className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity mb-12"
        >
          <ArrowLeft size={16} />
          All posts
        </a>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest opacity-60 mb-6">
          <span>{formatDate(post.date)}</span>
          <span className="opacity-40">·</span>
          <span>{post.category}</span>
          <span className="opacity-40">·</span>
          <span>{post.readTime} read</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] mb-6">
          {post.title}
        </h1>
        <p className="text-lg md:text-xl opacity-70 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="text-xs uppercase tracking-widest px-3 py-1 border border-black/15 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 lg:px-10 py-12 border-t border-black/10">
        {renderBody(post.body)}
      </article>

      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-16 border-t border-black/10">
        <div className="flex items-center gap-4 mb-8">
          <span className="section-num text-xs uppercase tracking-[0.4em] opacity-60">
            Keep reading
          </span>
          <span className="h-px flex-1 bg-black/10" />
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {others.map((p) => (
            <li key={p.slug}>
              <a
                href={`/blog/${p.slug}/`}
                className="group block bg-white/40 rounded-xl border border-black/10 hover:border-black/30 transition-colors p-6 h-full"
              >
                <p className="text-xs uppercase tracking-widest opacity-60 mb-3">
                  {p.category}
                </p>
                <h3 className="text-lg font-bold tracking-tight leading-tight mb-2">
                  {p.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs underline-offset-4 group-hover:underline">
                  Read
                  <ArrowUpRight size={12} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
            Got a project to bake?
          </h2>
          <p className="opacity-70 max-w-xl mx-auto mb-8 leading-relaxed">
            Web, mobile, desktop, or AI — Bug Bakery has shipped over 350
            projects for 1,000+ clients. Tell us what you need.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-black text-sm rounded-full hover:opacity-90 transition-opacity"
          >
            Start a project
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <footer className="bg-black text-white border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
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

export default BlogPost;
