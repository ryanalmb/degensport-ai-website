// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Dynamically set base & site so local dev uses '/', while GitHub Pages uses subpath.
const isPages = process.env.BUILD_FOR_PAGES === '1';
const SITE_URL = process.env.SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site: SITE_URL,
  base: isPages ? '/degensport-ai-website/' : '/',
  vite: {
    plugins: [tailwindcss()]
  }
});