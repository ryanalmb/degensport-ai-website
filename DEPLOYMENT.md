# GitHub Pages Deployment Guide

This document explains how the degensport.AI website is deployed to GitHub Pages using GitHub Actions.

## Deployment Workflow

The deployment process is automated using a GitHub Actions workflow defined in `.github/workflows/deploy.yml`. This workflow handles building and deploying the site whenever changes are pushed to the main branch.

### How It Works

1. When code is pushed to the `main` branch, the workflow is automatically triggered
2. The workflow uses `withastro/action` to install dependencies, build the site, and upload the build artifacts
3. A separate deployment job then deploys the built site to GitHub Pages

### Deployment Triggers

The deployment workflow is triggered by:

- **Push events** to the `main` branch (automatic deployment)
- **Pull request events** to the `main` branch (for preview deployments)
- **Manual triggering** from the GitHub Actions tab (workflow_dispatch)

### Manual Deployment

To manually trigger a deployment:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch you want to deploy (typically `main`)
5. Click "Run workflow" to start the deployment

## Astro Configuration

The `astro.config.mjs` file contains important configuration settings for GitHub Pages deployment:

### Site Configuration

```js
site: 'https://ryanalmb.github.io'
```

The `site` property defines the root URL of your website. For GitHub Pages, this should be set to `https://USERNAME.github.io` where USERNAME is your GitHub username.

### Base Path Configuration

```js
base: '/degensport-ai-website'
```

The `base` property defines the base path for your site. For project pages on GitHub Pages, this should match your repository name (e.g., `/REPO_NAME/`). For user/organization pages, this should be set to `/`.

### Configuration for Different Usernames or Repository Names

If you fork this repository or want to deploy to a different GitHub account or repository:

1. Update the `site` property to use your GitHub username:
   ```js
   site: 'https://YOUR_USERNAME.github.io'
   ```

2. Update the `base` property to match your repository name:
   ```js
   base: '/YOUR_REPOSITORY_NAME/'
   ```
   
   For user/organization pages, use:
   ```js
   base: '/'
   ```

3. Commit and push these changes to your repository

After making these changes, the next deployment will use your updated configuration.

## Permissions and Security

The workflow requires specific permissions to deploy to GitHub Pages:

- `contents: read` - To clone the repository
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - To authenticate with GitHub Pages

These permissions are automatically handled by the workflow and do not require additional configuration.

## Concurrent Deployment Handling

The workflow is configured to allow only one concurrent deployment:

- Uses a concurrency group named "pages"
- Queued deployments will wait for the current deployment to complete
- In-progress deployments will not be cancelled

This ensures that deployments happen in order and prevents conflicts.