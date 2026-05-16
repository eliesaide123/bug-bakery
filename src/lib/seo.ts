import { posts } from '@/content/posts';
import { faqs } from '@/content/faqs';

const SITE_URL = 'https://bug-bakery.com';

export type SeoOptions = {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  jsonLd?: object[];
  noindex?: boolean;
};

const upsertMeta = (
  selector: string,
  attr: 'name' | 'property',
  attrValue: string,
  content: string,
) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const clearDynamicJsonLd = () => {
  document.head
    .querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]')
    .forEach((n) => n.remove());
};

const appendJsonLd = (obj: object) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.dynamic = 'true';
  script.textContent = JSON.stringify(obj);
  document.head.appendChild(script);
};

export const applySeo = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = `${SITE_URL}/og.png`,
  ogImageAlt = 'Bug Bakery — Software engineering studio',
  jsonLd = [],
  noindex = false,
}: SeoOptions) => {
  document.title = title;
  upsertMeta('meta[name="description"]', 'name', 'description', description);
  upsertMeta(
    'meta[name="robots"]',
    'name',
    'robots',
    noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
  );
  upsertLink('canonical', canonical);

  upsertMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
  upsertMeta(
    'meta[property="og:description"]',
    'property',
    'og:description',
    description,
  );
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
  upsertMeta(
    'meta[property="og:image:alt"]',
    'property',
    'og:image:alt',
    ogImageAlt,
  );

  upsertMeta(
    'meta[name="twitter:card"]',
    'name',
    'twitter:card',
    'summary_large_image',
  );
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  upsertMeta(
    'meta[name="twitter:description"]',
    'name',
    'twitter:description',
    description,
  );
  upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

  clearDynamicJsonLd();
  for (const block of jsonLd) appendJsonLd(block);
};

export const breadcrumb = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const blogPosting = (post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  datePublished: post.date,
  dateModified: post.date,
  inLanguage: 'en',
  url: `${SITE_URL}/blog/${post.slug}/`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/blog/${post.slug}/`,
  },
  image: `${SITE_URL}/og.png`,
  articleSection: post.category,
  keywords: post.tags.join(', '),
  author: { '@id': `${SITE_URL}/#organization` },
  publisher: { '@id': `${SITE_URL}/#organization` },
});

export const faqPage = (faqs: Array<{ q: string; a: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const blogList = (
  postsList: Array<{ slug: string; title: string; excerpt: string; date: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  url: `${SITE_URL}/blog/`,
  name: 'Bug Bakery Journal',
  description:
    'Tactical software-engineering writing on web, mobile, desktop, and AI from the Bug Bakery team.',
  publisher: { '@id': `${SITE_URL}/#organization` },
  blogPost: postsList.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    url: `${SITE_URL}/blog/${p.slug}/`,
  })),
});

const HOME_SEO: SeoOptions = {
  title:
    'Bug Bakery — Software engineering studio · Web, Mobile, Desktop, AI',
  description:
    'Bug Bakery is a software engineering studio shipping web, mobile, desktop, and AI products for 1,000+ clients. Fixed-fee, weekly demos, fewer bugs.',
  canonical: `${SITE_URL}/`,
  ogType: 'website',
  jsonLd: [faqPage(faqs), breadcrumb([{ name: 'Home', url: `${SITE_URL}/` }])],
};

const BLOG_INDEX_SEO: SeoOptions = {
  title: 'Journal — Bug Bakery',
  description:
    'Tactical software-engineering writing from Bug Bakery on React, React Native, Tauri, LLMs, and the infrastructure that ships product to production.',
  canonical: `${SITE_URL}/blog/`,
  ogType: 'website',
  jsonLd: [
    blogList(posts),
    breadcrumb([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Journal', url: `${SITE_URL}/blog/` },
    ]),
  ],
};

const seoForBlogPost = (slug: string): SeoOptions | null => {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    title: `${post.title} — Bug Bakery`,
    description: post.excerpt,
    canonical: `${SITE_URL}/blog/${post.slug}/`,
    ogType: 'article',
    jsonLd: [
      blogPosting(post),
      breadcrumb([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Journal', url: `${SITE_URL}/blog/` },
        { name: post.title, url: `${SITE_URL}/blog/${post.slug}/` },
      ]),
    ],
  };
};

export const getSeoForUrl = (pathname: string): SeoOptions => {
  const slugMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (slugMatch) {
    const seo = seoForBlogPost(slugMatch[1]);
    if (seo) return seo;
  }
  if (pathname.replace(/\/+$/, '') === '/blog') return BLOG_INDEX_SEO;
  return HOME_SEO;
};

type HeadElement = { type: string; props: Record<string, string>; children?: string };

export const composeHead = (
  seo: SeoOptions,
): { lang: string; title: string; elements: Set<HeadElement> } => {
  const ogImage = seo.ogImage ?? `${SITE_URL}/og.png`;
  const ogImageAlt = seo.ogImageAlt ?? 'Bug Bakery — Software engineering studio';
  const elements: HeadElement[] = [
    { type: 'meta', props: { name: 'description', content: seo.description } },
    {
      type: 'meta',
      props: {
        name: 'robots',
        content: seo.noindex
          ? 'noindex, nofollow'
          : 'index, follow, max-image-preview:large',
      },
    },
    { type: 'link', props: { rel: 'canonical', href: seo.canonical } },
    { type: 'meta', props: { property: 'og:type', content: seo.ogType ?? 'website' } },
    { type: 'meta', props: { property: 'og:url', content: seo.canonical } },
    { type: 'meta', props: { property: 'og:title', content: seo.title } },
    { type: 'meta', props: { property: 'og:description', content: seo.description } },
    { type: 'meta', props: { property: 'og:image', content: ogImage } },
    { type: 'meta', props: { property: 'og:image:alt', content: ogImageAlt } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
    { type: 'meta', props: { name: 'twitter:title', content: seo.title } },
    { type: 'meta', props: { name: 'twitter:description', content: seo.description } },
    { type: 'meta', props: { name: 'twitter:image', content: ogImage } },
  ];
  for (const block of seo.jsonLd ?? []) {
    elements.push({
      type: 'script',
      props: { type: 'application/ld+json' },
      children: JSON.stringify(block),
    });
  }
  return { lang: 'en', title: seo.title, elements: new Set(elements) };
};

export { SITE_URL };
