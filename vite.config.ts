import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve(__dirname, './src/prerender.tsx'),
      // Auto-crawl starts at "/" and follows discovered links; this seeds the
      // queue with the blog index in case the homepage Blog section is later
      // restructured and stops linking out to it.
      additionalPrerenderRoutes: ['/blog/'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
