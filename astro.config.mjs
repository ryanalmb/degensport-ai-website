// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Environment-aware config for dual hosting (GitHub Pages / Cloudflare Pages)
// HOST_TARGET: 'gh' for GitHub Pages (project page), 'cf' for Cloudflare Pages (root)
const HOST_TARGET = process.env.HOST_TARGET || 'gh';

// GitHub Pages user site (override with GH_SITE_URL if needed)
const GH_SITE_URL = process.env.GH_SITE_URL || 'https://ryanalmb.github.io';
// Cloudflare Pages provides CF_PAGES_URL automatically; fallback to SITE_URL if set
const CF_SITE_URL = process.env.CF_PAGES_URL || process.env.SITE_URL || 'https://example.pages.dev';

const site = HOST_TARGET === 'cf' ? CF_SITE_URL : GH_SITE_URL;
const base = HOST_TARGET === 'cf' ? '/' : '/degensport-ai-website/';

export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()]
  }
});