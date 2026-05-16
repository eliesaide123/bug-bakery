// Generates public/sitemap.xml from src/content/posts.ts.
// Runs as part of `npm run build` (see package.json).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE = 'https://bug-bakery.com';

const postsSrc = readFileSync(path.join(root, 'src/content/posts.ts'), 'utf8');

// Pair slug + date per post object so they can't desync if a field is reordered.
// Matches across newlines but stops at the closing brace of each post object.
const posts = [
  ...postsSrc.matchAll(/slug:\s*'([^']+)'[^}]*?date:\s*'([^']+)'/gs),
].map((m) => ({ slug: m[1], date: m[2] }));

if (posts.length === 0) {
  console.error('generate-sitemap: parsed 0 posts from src/content/posts.ts');
  process.exit(1);
}

const latestPostDate = posts
  .map((p) => p.date)
  .sort()
  .at(-1);

const urls = [
  {
    loc: `${SITE}/`,
    lastmod: latestPostDate,
    priority: '1.0',
    changefreq: 'monthly',
  },
  {
    loc: `${SITE}/blog/`,
    lastmod: latestPostDate,
    priority: '0.8',
    changefreq: 'weekly',
  },
  ...posts.map((p) => ({
    loc: `${SITE}/blog/${p.slug}/`,
    lastmod: p.date,
    priority: '0.7',
    changefreq: 'yearly',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`Wrote public/sitemap.xml — ${urls.length} URLs (${posts.length} posts)`);
