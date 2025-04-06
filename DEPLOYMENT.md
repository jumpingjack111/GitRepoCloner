# ISI MSQE Study Tracker - Deployment Guide

This guide provides instructions for deploying the ISI MSQE Study Tracker application to various free hosting platforms.

## Option 1: Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier is sufficient) - Sign up at [vercel.com](https://vercel.com)

### Steps
1. Push your code to a GitHub repository
2. Log in to Vercel and click "New Project"
3. Import your GitHub repository
4. Keep the default settings (Vercel will auto-detect the React application)
5. Add any required environment variables (see `.env.example`)
6. Click "Deploy"

## Option 2: Deploy to Netlify

### Prerequisites
- GitHub account
- Netlify account (free tier is sufficient) - Sign up at [netlify.com](https://netlify.com)

### Steps
1. Push your code to a GitHub repository
2. Log in to Netlify and click "New site from Git"
3. Connect to your GitHub account and select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add any required environment variables
6. Click "Deploy site"

## Option 3: Deploy to Render

### Prerequisites
- GitHub account
- Render account (free tier is sufficient) - Sign up at [render.com](https://render.com)

### Steps for Frontend (Static Site)
1. Push your code to a GitHub repository
2. Log in to Render and click "New Static Site"
3. Connect to your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Create Static Site"

### Steps for Backend (Web Service)
1. From your Render dashboard, click "New Web Service"
2. Connect to the same GitHub repository
3. Configure settings:
   - Runtime: Node
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
4. Add environment variables from `.env.example`
5. Click "Create Web Service"

## Option 4: Deploy to GitHub Pages

### Prerequisites
- GitHub account

### Steps
1. Add GitHub Pages configuration to your `vite.config.ts` file:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // other config
   });
   ```
2. Add a deploy script to your `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Install the gh-pages package: `npm install --save-dev gh-pages`
4. Run `npm run deploy`

## Tips for All Deployments

1. Make sure your application works locally before deploying
2. Check for environment variables that need to be set on the hosting platform
3. Test the deployed application thoroughly after deployment
4. Set up a custom domain if desired (all these platforms support custom domains)

## Troubleshooting

- If you encounter CORS issues, check the server-side CORS configuration
- For routing issues, make sure your hosting platform is configured for client-side routing
- Check the logs on your hosting platform for specific error messages