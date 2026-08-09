# Deployment Guide - QA Automation Portfolio

This guide covers deploying the portfolio to various hosting platforms.

---

## 🚀 Quick Start Deployment

### Prerequisites
- Git account (GitHub, GitLab, Bitbucket)
- Code pushed to repository
- Node.js 18+ installed locally

---

## 1️⃣ Vercel (Recommended for Next.js)

**Why Vercel?**
- Made by creators of Next.js
- Zero-config deployment
- Free for personal projects
- Automatic previews on PRs
- Serverless functions
- Global CDN

### Steps

**Method A: Via CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts to connect GitHub and deploy
# Your site will be live at: https://your-project.vercel.app
```

**Method B: Via Web Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Click "Deploy"
5. Done! 🎉

**Custom Domain Setup**
```bash
# Via CLI
vercel --prod --alias yourdomain.com

# Or via dashboard:
# Settings > Domains > Add custom domain
```

**Environment Variables**
```bash
vercel env add NEXT_PUBLIC_GITHUB_URL https://github.com/yourusername
vercel env add NEXT_PUBLIC_EMAIL your-email@example.com
```

---

## 2️⃣ Netlify

**Why Netlify?**
- Supports multiple frameworks
- Free tier generous
- Great build cache
- Easy form handling
- Analytics included

### Steps

**Method A: Via Netlify CLI**
```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

**Method B: Via Dashboard**
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Select "Import an existing project"
4. Connect GitHub
5. Select your repo
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Deploy!

**netlify.toml Configuration**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NEXT_PUBLIC_GITHUB_URL = "https://github.com/yourusername"
  NODE_VERSION = "18.0.0"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Custom headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
```

---

## 3️⃣ GitHub Pages (Static Deploy)

**Why GitHub Pages?**
- Free
- Integrated with GitHub
- Great for static sites
- Custom domain support

### Setup

**Install gh-pages**
```bash
npm install --save-dev gh-pages
```

**Update package.json**
```json
{
  "homepage": "https://yourusername.github.io",
  "scripts": {
    "deploy": "next build && gh-pages -d out",
    "predeploy": "npm run build"
  }
}
```

**Update next.config.js**
```javascript
const nextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: '',
};

module.exports = nextConfig;
```

**Deploy**
```bash
npm run deploy
```

**Enable GitHub Pages**
1. Go to repository Settings
2. Pages > Source > Deploy from a branch
3. Select `gh-pages` branch
4. Custom domain (optional)

---

## 4️⃣ AWS Amplify

**Why AWS Amplify?**
- Powerful AWS ecosystem
- CI/CD built-in
- Auth, analytics, APIs
- Global CDN

### Steps

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure
amplify configure

# Create app
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify push

# Open live site
amplify open
```

**amplify.yml Configuration**
```yaml
version: 1
applications:
  - appRoot: '.'
    env: prod
    jobs:
      build:
        commands:
          - npm ci
          - npm run build
    artifacts:
      baseDirectory: .next
      files:
        - '**/*'
    cache:
      paths:
        - node_modules/**/*
      - .next/cache/**/*
    appArtifactFile: .next
```

---

## 5️⃣ Docker + Any Provider

**Why Docker?**
- Works anywhere
- Easy to scale
- Production-grade
- Cloud-agnostic

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV NODE_ENV production

CMD ["npm", "start"]
```

**.dockerignore**
```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.env.local
.next/cache
```

**Build & Run Locally**
```bash
# Build image
docker build -t portfolio:latest .

# Run container
docker run -p 3000:3000 portfolio:latest

# Visit http://localhost:3000
```

**Deploy to Docker Registry**
```bash
# Tag image
docker tag portfolio:latest yourusername/portfolio:latest

# Push to Docker Hub
docker push yourusername/portfolio:latest
```

---

## 6️⃣ Railway.app

**Why Railway?**
- Simple, modern platform
- Pay-as-you-go pricing
- Git integration
- Easy scaling

### Steps

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. "Deploy from GitHub"
4. Select repository
5. Configure:
   - Build command: `npm run build`
   - Start command: `npm start`
6. Add domain
7. Deploy!

**railway.json**
```json
{
  "buildCommand": "npm run build",
  "startCommand": "npm start",
  "environment": "production"
}
```

---

## 7️⃣ Render.com

**Why Render?**
- Modern alternative to Heroku
- Free tier available
- Auto-deploys from Git
- Easy SSL

### Steps

1. Go to [render.com](https://render.com)
2. "New Web Service"
3. Connect GitHub
4. Select repository
5. Configure:
   - Build: `npm install && npm run build`
   - Start: `npm start`
6. Deploy!

---

## Domain Setup (All Platforms)

### Register Domain
- GoDaddy
- Namecheap
- Domain.com
- Google Domains

### Point to Deployment

**For Vercel/Netlify/Railway:**
1. Login to your DNS provider
2. Find DNS settings
3. Add CNAME record:
   ```
   Name: www
   Value: [your-platform].app
   ```
4. Wait 24-48 hours for propagation

**Verify**
```bash
# Check DNS propagation
nslookup yourdomain.com
# or
dig yourdomain.com
```

---

## 🔒 Security Checklist

### Before Production Deployment

- [ ] Remove console.log statements
- [ ] Secure environment variables
- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Add robots.txt
- [ ] Add sitemap.xml
- [ ] Test on mobile
- [ ] Test cross-browser
- [ ] Check Lighthouse score
- [ ] Enable analytics
- [ ] Set up error tracking

### Environment Variables Template

```env
# .env.production
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourusername
NEXT_PUBLIC_EMAIL=your-email@example.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 📊 Post-Deployment Checklist

### Performance
```bash
# Check Lighthouse
# Use web.dev/measure

# Pagespeed insights
# Google PageSpeed Insights

# GTmetrix
# GTmetrix.com
```

### Analytics Setup

**Google Analytics**
1. Create property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID
3. Add to environment: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
4. Implement in app

**Google Search Console**
1. Verify at [search.google.com/search-console](https://search.google.com/search-console)
2. Submit sitemap
3. Monitor indexing

### Monitoring & Errors

**Sentry (Error Tracking)**
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
});
```

---

## 🚀 CI/CD Pipeline

### GitHub Actions Example

**.github/workflows/deploy.yml**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🆘 Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Try build again
npm run build
```

### Deployment Issues

- Check build logs
- Verify environment variables
- Ensure correct Node version
- Check for missing dependencies
- Verify custom domain DNS

### Performance Issues

- Enable caching
- Optimize images
- Minify CSS/JS
- Use CDN
- Implement lazy loading

---

## 📞 Deployment Support

**For Platform-Specific Issues:**
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [netlify.com/docs](https://netlify.com/docs)
- AWS: [aws.amazon.com/amplify](https://aws.amazon.com/amplify)
- Railway: [railway.app/docs](https://railway.app/docs)
- Render: [render.com/docs](https://render.com/docs)

---

**Recommended:** Start with **Vercel** for simplicity, then migrate to other platforms as needed.

Last Updated: 2026-01-15
