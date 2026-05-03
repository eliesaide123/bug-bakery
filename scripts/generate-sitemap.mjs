// Generates public/sitemap.xml from src/content/posts.ts.
// Runs as part of `npm run build` (see package.json).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE = 'https://bug-bakery.com';

const postsSrc = readFileSync(path.join(root, 'src/content/posts.ts'), 'utf8');

const slugs = [...postsSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const dates = [...postsSrc.matchAll(/date:\s*'([^']+)'/g)].map((m) => m[1]);

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${SITE}/`, lastmod: today, priority: '1.0', changefreq: 'monthly' },
  { loc: `${SITE}/blog/`, lastmod: today, priority: '0.8', changefreq: 'weekly' },
  ...slugs.map((slug, i) => ({
    loc: `${SITE}/blog/${slug}/`,
    lastmod: dates[i] || today,
    priority: '0.7',
    changefreq: 'monthly',
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
console.log(`Wrote public/sitemap.xml — ${urls.length} URLs`);
