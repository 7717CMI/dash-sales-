# 🚀 GitHub & Vercel Deployment Guide

## Step 1: Initialize Git Repository

Open terminal in your project directory and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Sales Projection Dashboard for Rituva"
```

## Step 2: Add Remote Repository

Replace `your-username` with your actual GitHub username:

```bash
# Add remote
git remote add origin https://github.com/Vimarsh-Coherent/sales-daas.git

# Verify remote
git remote -v
```

## Step 3: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

## Step 4: Vercel Deployment Setup

### Option A: Direct Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option B: GitHub Integration (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Import Project"

2. **Connect GitHub Repository**
   - Select "Import Git Repository"
   - Paste: `https://github.com/Vimarsh-Coherent/sales-daas`
   - Click "Continue"

3. **Configure Project**
   - Framework: Next.js ✓ (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` ✓ (auto-filled)
   - Output Directory: `.next` ✓ (auto-filled)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Get your live URL

### Option C: GitHub Actions with Auto-Deploy

1. **Create Vercel Secrets**
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Add three secrets:
     - `VERCEL_TOKEN`: From [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
     - `VERCEL_ORG_ID`: From Vercel dashboard
     - `VERCEL_PROJECT_ID`: From project settings

2. **GitHub Actions Workflow**
   - Workflow file is at `.github/workflows/ci-cd.yml`
   - On every push to main, it will:
     - Install dependencies
     - Run linting
     - Build project
     - Auto-deploy to Vercel

## Step 5: Verify Deployment

After deployment completes:

```bash
# Your dashboard will be live at:
# https://your-project.vercel.app

# Check build logs in Vercel dashboard
# Verify all charts load correctly
# Test on mobile devices
```

## Environment Setup for GitHub Secrets

### For GitHub Actions CI/CD (Optional)

If using GitHub Actions auto-deployment:

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add these secrets:

```
VERCEL_TOKEN         = Your Vercel API token
VERCEL_ORG_ID        = Your Vercel organization ID
VERCEL_PROJECT_ID    = Your project ID in Vercel
```

**How to get these:**

**VERCEL_TOKEN**:
- Go to [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
- Click "Create"
- Copy the token

**VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**:
- Deploy to Vercel first
- Go to Project Settings in Vercel dashboard
- Find IDs in the URL or settings page

## Useful Git Commands

```bash
# Check git status
git status

# View commit history
git log --oneline

# Make changes and commit
git add .
git commit -m "Your commit message"
git push origin main

# Create feature branch
git checkout -b feature/your-feature
git push origin feature/your-feature

# Create Pull Request on GitHub
# Go to repo → Pull Requests → New
```

## GitHub Repository Best Practices

✅ **Good Commit Messages**:
```
git commit -m "Add three scenario lines to ROAS and Revenue charts"
git commit -m "Update chart layout to vertical stacking"
git commit -m "Fix responsive design for mobile"
```

❌ **Avoid**:
```
git commit -m "Update"
git commit -m "Fix stuff"
git commit -m "Changes"
```

## Vercel Project Settings

After deploying to Vercel, configure:

1. **Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add any API endpoints needed

2. **Domains**
   - Add custom domain if you have one
   - Configure DNS settings

3. **Analytics**
   - Enable Web Analytics (free)
   - Monitor performance

4. **Git Integration**
   - Auto-deploy on push to main ✓ (enabled)
   - Manage deployments from Vercel dashboard

## Live Dashboard URL

After successful deployment:

```
🌐 Production: https://your-project.vercel.app
📊 Dashboard: https://your-project.vercel.app
```

## Monitoring & Maintenance

### Check Deployment Status
```bash
# List all Vercel deployments
vercel ls

# Show logs
vercel logs
```

### Update Dashboard
```bash
# Make changes locally
# Commit and push
git add .
git commit -m "Update dashboard"
git push origin main

# Vercel auto-deploys (if GitHub integration enabled)
# Or manually deploy with: vercel
```

### Troubleshooting

**Build fails on Vercel:**
```bash
# Check local build works
npm run build

# If it works locally but fails on Vercel:
# - Check environment variables
# - Check Node version (use 18+)
# - Check build logs in Vercel dashboard
```

**Dashboard not updating:**
```bash
# Clear Vercel cache and redeploy
vercel --prod --force
```

## Success Checklist

- [x] Git initialized
- [x] Remote added (GitHub)
- [x] Code pushed to GitHub
- [x] Vercel connected to GitHub
- [x] Project deployed to Vercel
- [x] Live URL working
- [x] Dashboard displays correctly
- [x] All charts loading
- [x] Responsive on mobile
- [x] Environment variables set (if needed)

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy to Vercel
3. ✅ Get live URL
4. ✅ Share with team
5. ✅ Monitor performance
6. ✅ Make updates as needed

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Guides](https://guides.github.com)
- [Git Tutorial](https://git-scm.com/book/en/v2)

---

**Your dashboard is now ready for production deployment!** 🚀

