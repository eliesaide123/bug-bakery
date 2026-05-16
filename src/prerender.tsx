// Build-time prerender entry for vite-prerender-plugin.
// Called once per discovered route. Returns the static HTML for that route
// plus the head metadata the plugin should inject into the page's <head>.

import { renderToString } from 'react-dom/server';
import App from './App';
import { composeHead, getSeoForUrl } from './lib/seo';

type PrerenderInput = { url: string };

export async function prerender({ url }: PrerenderInput) {
  const seo = getSeoForUrl(url);
  const html = renderToString(<App url={url} />);
  const head = composeHead(seo);

  const { parseLinks } = await import('vite-prerender-plugin/parse');
  const links = parseLinks(html);

  return {
    html,
    head,
    links: new Set(links),
  };
}
