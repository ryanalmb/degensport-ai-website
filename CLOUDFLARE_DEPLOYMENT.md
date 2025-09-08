# Cloudflare Pages Deployment Guide for degensport.AI

This document provides a detailed deployment architecture for deploying the degensport.AI Astro website to Cloudflare Pages.

## Project Overview

The degensport.AI website is built with Astro, Tailwind CSS, and uses environment variables for configuration. The site is currently configured to support dual hosting (GitHub Pages and Cloudflare Pages) through environment-aware configuration in `astro.config.mjs`.

## Current Configuration Analysis

### Astro Configuration (`astro.config.mjs`)
The project uses an environment-aware configuration that supports both GitHub Pages and Cloudflare Pages:

```javascript
// Environment-aware config for dual hosting (GitHub Pages / Cloudflare Pages)
// HOST_TARGET: 'gh' for GitHub Pages (project page), 'cf' for Cloudflare Pages (root)
const HOST_TARGET = process.env.HOST_TARGET || 'gh';

// GitHub Pages user site (override with GH_SITE_URL if needed)
const GH_SITE_URL = process.env.GH_SITE_URL || 'https://ryanalmb.github.io';
// Cloudflare Pages provides CF_PAGES_URL automatically; fallback to SITE_URL if set
const CF_SITE_URL = process.env.CF_PAGES_URL || process.env.SITE_URL || 'https://example.pages.dev';

const site = HOST_TARGET === 'cf' ? CF_SITE_URL : GH_SITE_URL;
const base = HOST_TARGET === 'cf' ? '/' : '/degensport-ai-website/';
```

### Package Dependencies
The project uses:
- Astro v5.13.5
- Tailwind CSS v4.1.13
- @tailwindcss/vite v4.1.13

### Environment Variables
The project uses environment variables for:
- `PUBLIC_TG_BOT_LINK` - Telegram bot link
- `PUBLIC_TG_GROUP_LINK` - Telegram group link
- `PUBLIC_GITHUB_REPO_LINK` - GitHub repository link

## Cloudflare Pages Deployment Requirements

### Build Settings
- **Build command**: `npm run build`
- **Build output directory**: `dist/`
- **Root directory**: `/degensport-ai-website`

### Environment Variables
Cloudflare Pages will automatically inject the following environment variables:
- `CF_PAGES` - Set to `true` when building on Cloudflare Pages
- `CF_PAGES_URL` - The URL of the deployed site
- `CF_PAGES_BRANCH` - The branch being built

### Cloudflare Pages Settings
When configuring your project in Cloudflare Pages, use the following settings:

#### Framework Preset
- Select "None" as the framework preset since Astro is not directly listed
- Cloudflare Pages will automatically detect the build settings

#### Build Settings
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/degensport-ai-website`

#### Environment Variables (to set in Cloudflare Pages dashboard)
- `HOST_TARGET` = `cf`
- Any other environment variables from `.env.example` that you want to use

## Required Modifications

### 1. Update Astro Configuration
The current configuration already supports Cloudflare Pages through the `HOST_TARGET` environment variable. To deploy to Cloudflare Pages:

1. Set `HOST_TARGET=cf` in Cloudflare Pages environment variables
2. Optionally set `SITE_URL` to your custom domain if you have one

### 2. Update robots.txt
The current `robots.txt` file references `https://degensport.ai/sitemap.xml`. If deploying to a Cloudflare Pages subdomain, this should be updated.

### 3. Update sitemap.xml
The current `sitemap.xml` references `https://degensport.ai/`. This should be updated to reflect the Cloudflare Pages URL.

### 4. Add Redirects File (Optional)
If you need to set up redirects for your Cloudflare Pages site, create a `_redirects` file in the `public` directory:

```txt
# Redirects from what the browser requests to what we serve
/old-path              /new-path               301
/blog/*                /new-blog/:splat        301
```

### 5. Add Headers File (Optional)
To set custom headers for your Cloudflare Pages site, create a `_headers` file in the `public` directory:

```txt
# Set custom headers for all files
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer-when-downgrade

# Set custom headers for specific file types
*.js
  Cache-Control: public, max-age=31536000
*.css
  Cache-Control: public, max-age=31536000
*.png
  Cache-Control: public, max-age=86400
```

## Step-by-Step Deployment Process

### 1. Connect Cloudflare Pages to Repository
1. Log in to your Cloudflare dashboard
2. Navigate to Pages
3. Click "Create a project"
4. Connect to your Git provider (GitHub, GitLab, etc.)
5. Select the repository containing the degensport-ai-website project

### 2. Configure Build Settings
1. **Project name**: `degensport-ai` (or your preferred name)
2. **Production branch**: `main` (or your preferred branch)
3. **Build command**: `npm run build`
4. **Build output directory**: `dist`
5. **Root directory**: `/degensport-ai-website`

### 3. Configure Environment Variables
Add the following environment variables in the Cloudflare Pages project settings:
- `HOST_TARGET` = `cf`

If you have a custom domain:
- `SITE_URL` = `https://your-custom-domain.com`

### 4. Configure Build Hooks (Optional)
Set up any additional build hooks or notifications as needed.

### 5. Deploy
1. Click "Save and Deploy"
2. Cloudflare Pages will automatically build and deploy your site
3. The first deployment will create a preview URL
4. Subsequent pushes to the production branch will automatically trigger deployments

### 6. GitHub Actions Workflow (Optional)
For teams that prefer to use GitHub Actions for deployment, you can create a workflow that deploys to Cloudflare Pages using the `cloudflare/pages-action`:

1. Create a Cloudflare API token with `Pages:Edit` permissions
2. Add the token as a secret in your GitHub repository (`CLOUDFLARE_API_TOKEN`)
3. Create a workflow file (e.g., `.github/workflows/deploy-cloudflare.yml`) with the following content:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: degensport-ai-website/package-lock.json

      - name: Install dependencies
        run: |
          cd degensport-ai-website
          npm ci

      - name: Build
        run: |
          cd degensport-ai-website
          npm run build
        env:
          HOST_TARGET: cf

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: degensport-ai
          directory: degensport-ai-website/dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

4. Add your Cloudflare Account ID as a secret (`CLOUDFLARE_ACCOUNT_ID`) in your GitHub repository

## Post-Deployment Verification Steps

### 1. Verify Deployment Success
- Check the Cloudflare Pages dashboard for successful deployment status
- Visit the deployed URL to ensure the site loads correctly
- Verify all pages and components render properly

### 2. Test Environment Variables
- Verify that Telegram links work correctly
- Check that all external links function as expected

### 3. Validate SEO Configuration
- Check that `robots.txt` is accessible
- Verify `sitemap.xml` is accessible and contains correct URLs
- Test meta tags and Open Graph properties

### 4. Performance Testing
- Use Cloudflare's built-in performance tools
- Check loading times across different devices
- Verify that all assets load correctly

### 5. Custom Domain Setup (If Applicable)
- Configure your custom domain in Cloudflare Pages settings
- Update DNS records as instructed
- Verify SSL certificate provisioning
- Test custom domain accessibility

### 6. Verify Cloudflare Features
- Check that Cloudflare's automatic optimizations are working (Auto Minify, Brotli compression)
- Verify that the site is being served from Cloudflare's CDN
- Test performance using tools like PageSpeed Insights or GTmetrix

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Build Failures
**Problem**: The build fails with dependency errors.
**Solution**: 
- Ensure all dependencies are correctly listed in `package.json`
- Check that the Node.js version used by Cloudflare Pages is compatible (currently 16.x, 18.x, or 20.x)
- Clear build cache and retry

#### 2. Environment Variables Not Working
**Problem**: Environment variables are not being applied correctly.
**Solution**:
- Verify that variables prefixed with `PUBLIC_` are accessible in client-side code
- Check that variables are correctly set in Cloudflare Pages project settings
- Ensure the `HOST_TARGET` variable is set to `cf`

#### 3. Routing Issues
**Problem**: Site navigation doesn't work correctly or returns 404 errors.
**Solution**:
- Verify `_redirects` file is correctly configured for SPA routing if needed
- Check that the `base` path in `astro.config.mjs` is set correctly for Cloudflare Pages (`/`)
- Ensure all internal links use relative paths

#### 4. Asset Loading Problems
**Problem**: CSS, images, or other assets fail to load.
**Solution**:
- Check that asset paths are correctly referenced
- Verify that the build output directory contains all necessary assets
- Ensure Tailwind CSS is properly configured and built

#### 5. SEO Configuration Issues
**Problem**: `robots.txt` or `sitemap.xml` not accessible or containing incorrect URLs.
**Solution**:
- Update these files to reflect the Cloudflare Pages URL
- Verify files are in the `public` directory
- Check that URLs in these files match the deployed site URL

### Advanced Troubleshooting

#### Debugging Build Issues
1. Check the build logs in the Cloudflare Pages dashboard
2. Run the build command locally to reproduce issues:
   ```bash
   cd degensport-ai-website
   npm run build
   ```
3. Verify Node.js version compatibility

#### 6. Caching Issues
**Problem**: Changes aren't appearing on the live site.
**Solution**:
- Purge the Cloudflare cache from the Cloudflare dashboard
- Check if browser caching is causing the issue
- Verify that Cloudflare's cache settings are configured correctly

#### 7. Mixed Content Issues
**Problem**: Some resources are loading over HTTP instead of HTTPS.
**Solution**:
- Ensure all asset URLs use relative paths or HTTPS
- Check for hardcoded HTTP URLs in your code
- Use Cloudflare's Automatic HTTPS Rewrites feature

#### Performance Optimization
1. Use Cloudflare's built-in optimization features:
   - Auto Minify for CSS, JavaScript, and HTML
   - Brotli compression
   - Rocket Loader for JavaScript
2. Optimize images using Cloudflare Images or third-party services
3. Implement proper caching headers

## Best Practices for Cloudflare Pages Deployment

### 1. Environment Configuration
- Use environment variables for all external URLs and configuration
- Separate development, preview, and production environment configurations
- Prefix client-side variables with `PUBLIC_`

### 2. Asset Optimization
- Optimize images before deployment
- Use modern image formats (WebP, AVIF) when possible
- Implement proper alt text for accessibility

### 3. Security Considerations
- Use Cloudflare's built-in security features
- Implement Content Security Policy (CSP) headers
- Regularly update dependencies to address security vulnerabilities

### 4. Monitoring and Analytics
- Set up Cloudflare Analytics for traffic monitoring
- Implement error tracking (e.g., Sentry)
- Configure uptime monitoring

### 5. Preview Deployments
- Use Cloudflare Pages preview deployments for pull requests
- Set up different environment variables for preview and production environments
- Test changes thoroughly in preview before merging to production

## Conclusion

The degensport.AI Astro website is well-suited for deployment to Cloudflare Pages with minimal modifications. The existing environment-aware configuration makes it easy to support multiple hosting platforms. By following this guide, you should be able to successfully deploy the site to Cloudflare Pages and take advantage of its global CDN, automatic HTTPS, and performance features.