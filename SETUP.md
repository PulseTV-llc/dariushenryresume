# Quick Setup Guide

## Step 1: Fix npm permissions (if needed)

If you see npm EACCES errors, you have two options:

### Option A: Use temporary cache (Recommended)
```bash
cd /Users/stockhousefilms/Documents/dariusHenry/portfolio-site
npm install --cache /tmp/npm-cache --legacy-peer-deps
```

### Option B: Fix permissions permanently
```bash
sudo chown -R $(whoami) ~/.npm
```

## Step 2: Install dependencies

```bash
cd /Users/stockhousefilms/Documents/dariusHenry/portfolio-site
npm install
```

## Step 3: Run the development server

```bash
npm run dev
```

## Step 4: Open in browser

Navigate to: http://localhost:3000

## Quick Commands

```bash
# Navigate to project
cd /Users/stockhousefilms/Documents/dariusHenry/portfolio-site

# Install (if you encounter errors)
npm install --cache /tmp/npm-cache --legacy-peer-deps

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Customize Your Portfolio

1. **Update contact info** → `components/Contact.tsx`
2. **Add/edit projects** → `data/projects.ts`
3. **Modify hero section** → `components/Hero.tsx`
4. **Change colors/theme** → `tailwind.config.ts`

## Deploy to Vercel

1. Push code to GitHub
2. Import repo in Vercel
3. Deploy automatically

**That's it! Your portfolio is ready to impress. 🚀**
