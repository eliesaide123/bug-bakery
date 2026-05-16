// One-off OG image + Apple touch icon generator.
//
// Usage:
//   npx playwright install chromium    # one-time, ~200 MB download
//   npm run generate-og                # renders public/og.png + public/apple-touch-icon.png
//
// Re-run whenever the brand changes. Commit the resulting PNGs.

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
mkdirSync(publicDir, { recursive: true });

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const ICON_SIZE = 180;

const ogHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        width: ${OG_WIDTH}px;
        height: ${OG_HEIGHT}px;
        background: #000;
        color: #fff;
        font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        position: relative;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
      }
      .grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
        -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
      }
      .frame {
        position: absolute;
        inset: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .top { display: flex; align-items: center; gap: 16px; }
      .badge {
        width: 56px; height: 56px; border-radius: 12px;
        background: #fff; color: #000;
        display: flex; align-items: center; justify-content: center;
        font-weight: 900; font-size: 28px; letter-spacing: -2px;
      }
      .brand { font-weight: 800; font-size: 32px; letter-spacing: -1px; }
      .brand .dim { opacity: 0.5; }
      .tag {
        margin-left: auto;
        text-transform: uppercase;
        letter-spacing: 0.3em;
        font-size: 14px;
        opacity: 0.6;
      }
      .headline {
        font-weight: 800; letter-spacing: -4px; line-height: 0.9;
        font-size: 168px; margin: 0 0 -10px;
      }
      .headline em {
        font-weight: 300; font-style: italic;
      }
      .footer { display: flex; align-items: flex-end; justify-content: space-between; }
      .services {
        display: flex; gap: 14px; flex-wrap: wrap; align-items: center;
        font-size: 18px; opacity: 0.7;
      }
      .dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; opacity: 0.4; }
      .url { font-size: 18px; opacity: 0.7; letter-spacing: 0.05em; }
    </style>
  </head>
  <body>
    <div class="grid"></div>
    <div class="frame">
      <div class="top">
        <div class="badge">BB</div>
        <div class="brand">Bug<span class="dim">Bakery</span></div>
        <div class="tag">Studio · est. 2018</div>
      </div>
      <div>
        <div class="headline">We bake</div>
        <div class="headline"><em>software.</em></div>
      </div>
      <div class="footer">
        <div class="services">
          <span>Web</span><div class="dot"></div>
          <span>Mobile</span><div class="dot"></div>
          <span>Desktop</span><div class="dot"></div>
          <span>AI &amp; LLMs</span>
        </div>
        <div class="url">bug-bakery.com</div>
      </div>
    </div>
  </body>
</html>`;

const iconHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; padding: 0; }
      body {
        width: ${ICON_SIZE}px;
        height: ${ICON_SIZE}px;
        background: #000;
        color: #fff;
        font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        display: flex; align-items: center; justify-content: center;
        position: relative;
      }
      .dot {
        position: absolute; top: 20px; left: 20px;
        width: 8px; height: 8px; border-radius: 50%;
        background: #fff; opacity: 0.7;
      }
      .mono {
        font-weight: 900; font-size: 88px; letter-spacing: -6px;
      }
    </style>
  </head>
  <body>
    <span class="dot"></span>
    <span class="mono">BB</span>
  </body>
</html>`;

const browser = await chromium.launch();
try {
  const og = await browser.newPage({ viewport: { width: OG_WIDTH, height: OG_HEIGHT } });
  await og.setContent(ogHtml, { waitUntil: 'load' });
  const ogPng = await og.screenshot({ type: 'png', omitBackground: false });
  writeFileSync(path.join(publicDir, 'og.png'), ogPng);
  console.log(`Wrote public/og.png (${OG_WIDTH}x${OG_HEIGHT})`);

  const icon = await browser.newPage({ viewport: { width: ICON_SIZE, height: ICON_SIZE } });
  await icon.setContent(iconHtml, { waitUntil: 'load' });
  const iconPng = await icon.screenshot({ type: 'png', omitBackground: false });
  writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), iconPng);
  console.log(`Wrote public/apple-touch-icon.png (${ICON_SIZE}x${ICON_SIZE})`);
} finally {
  await browser.close();
}
