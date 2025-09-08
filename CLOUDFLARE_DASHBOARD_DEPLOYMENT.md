# Cloudflare Pages Deployment Instructions

This document provides step-by-step instructions for deploying the degensport.AI website to Cloudflare Pages through the Cloudflare dashboard.

## Prerequisites

1. A Cloudflare account
2. A GitHub account with the degensport-ai-website repository
3. Access to the Cloudflare dashboard

## Deployment Steps

### 1. Connect Cloudflare Pages to Your Repository

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** in the left sidebar
3. Click **Create a project**
4. Connect to your Git provider (GitHub, GitLab, etc.)
5. Select the repository containing the degensport-ai-website project

### 2. Configure Build Settings

In the "Set up builds and deployments" section, configure the following settings:

- **Project name**: `degensport-ai` (or your preferred name)
- **Production branch**: `main` (or your preferred branch)
- **Framework preset**: Select "None" (Astro is not directly listed)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/degensport-ai-website`

### 3. Configure Environment Variables

In the "Environment variables" section, add the following environment variable:

- **Variable name**: `HOST_TARGET`
- **Value**: `cf`

If you have a custom domain, you can also add:

- **Variable name**: `SITE_URL`
- **Value**: `https://your-custom-domain.com`

### 4. Deploy

1. Click **Save and Deploy**
2. Cloudflare Pages will automatically build and deploy your site
3. The first deployment will create a preview URL
4. Subsequent pushes to the production branch will automatically trigger deployments

## Build Configuration Summary

For quick reference, here are the key build settings:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/degensport-ai-website` |
| Required environment variables | `HOST_TARGET=cf` |

## Post-Deployment Verification

After deployment is complete:

1. Check the Cloudflare Pages dashboard for successful deployment status
2. Visit the deployed URL to ensure the site loads correctly
3. Verify all pages and components render properly
4. Test that environment variables are working (Telegram links, etc.)
5. Verify that `robots.txt` and `sitemap.xml` are accessible

## Custom Domain Setup (Optional)

If you want to use a custom domain:

1. In the Cloudflare Pages project settings, go to "Custom domains"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the instructions to update your DNS records
5. Wait for SSL certificate provisioning (usually automatic)
6. Test custom domain accessibility

## Troubleshooting

### Common Issues

1. **Build Failures**: Ensure all dependencies are correctly listed in `package.json`
2. **Environment Variables Not Working**: Verify that variables are correctly set in Cloudflare Pages project settings
3. **Routing Issues**: Check that the `base` path in `astro.config.mjs` is set correctly for Cloudflare Pages (`/`)
4. **Asset Loading Problems**: Verify that asset paths are correctly referenced

### Checking Build Logs

If you encounter issues:

1. Check the build logs in the Cloudflare Pages dashboard
2. Run the build command locally to reproduce issues:
   ```bash
   cd degensport-ai-website
   npm run build
   ```

## GitHub Actions Deployment (Alternative)

If you prefer to use GitHub Actions for deployment instead of direct Cloudflare integration:

1. Create a Cloudflare API token with `Pages:Edit` permissions
2. Add the token as a secret in your GitHub repository (`CLOUDFLARE_API_TOKEN`)
3. Add your Cloudflare Account ID as a secret (`CLOUDFLARE_ACCOUNT_ID`)
4. The workflow file is already created at `.github/workflows/deploy-cloudflare.yml`

For GitHub Actions deployment, you'll need to set these secrets in your repository settings.