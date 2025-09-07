// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Static config for GitHub Project Pages deployment
  site: 'https://ryanalmb.github.io',
  base: '/degensport-ai-website/',
  vite: {
    plugins: [tailwindcss()]
  }
});