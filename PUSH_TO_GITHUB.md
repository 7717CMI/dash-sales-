# 📤 Step-by-Step: Push Code to GitHub

## Quick Start (Copy & Paste Commands)

### Step 1: Navigate to Project
```bash
cd "C:\Users\vimarsh\Desktop\dashboard rituva"
```

### Step 2: Initialize Git
```bash
git init
```

### Step 3: Configure Git User (First time only)
```bash
git config --global user.name "Vimarsh"
git config --global user.email "vimarsh@coherent.ai"
```

### Step 4: Add All Files
```bash
git add .
```

### Step 5: Initial Commit
```bash
git commit -m "Initial commit: Sales Projection Dashboard for Rituva with multi-scenario analysis"
```

### Step 6: Add Remote Repository
```bash
git remote add origin https://github.com/Vimarsh-Coherent/sales-daas.git
```

### Step 7: Verify Remote
```bash
git remote -v
```

### Step 8: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

---

## ✅ If Git Asks for Authentication

### Option 1: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `admin:repo_hook`
4. Generate and copy token
5. Paste when git asks for password

### Option 2: SSH Key
1. Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "vimarsh@coherent.ai"
```
2. Add to GitHub → Settings → SSH and GPG keys
3. Use SSH URL instead:
```bash
git remote set-url origin git@github.com:Vimarsh-Coherent/sales-daas.git
```

---

## Full Command Sequence (Copy All At Once)

```bash
# Navigate to project
cd "C:\Users\vimarsh\Desktop\dashboard rituva"

# Initialize git
git init

# Configure user (if not done globally)
git config user.name "Vimarsh"
git config user.email "vimarsh@coherent.ai"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Sales Projection Dashboard for Rituva

- 3 interactive charts (Bar, Line, Area)
- Multi-scenario analysis (Pessimistic, Likely, Optimistic)
- Professional dark theme with Tailwind CSS
- Fully responsive design
- 12 months projection data
- Production-ready Next.js app
- Ready for Vercel deployment"

# Add remote
git remote add origin https://github.com/Vimarsh-Coherent/sales-daas.git

# Verify connection
git remote -v

# Create main branch and push
git branch -M main
git push -u origin main
```

---

## Verify Push Success

```bash
# Check current branch
git branch

# View commit history
git log --oneline

# Check status
git status
```

Expected output should show:
- ✓ On branch main
- ✓ Nothing to commit, working tree clean
- ✓ origin/main tracking the remote

---

## After Push to GitHub

1. Go to https://github.com/Vimarsh-Coherent/sales-daas
2. Verify all files are there
3. Check file structure
4. View commit message

---

## Now Deploy to Vercel

### Method 1: GitHub Integration (Automated)

```bash
# Go to https://vercel.com/import
# Select GitHub repository: Vimarsh-Coherent/sales-daas
# Click Import
# Vercel auto-configures Next.js
# Click Deploy
```

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd "C:\Users\vimarsh\Desktop\dashboard rituva"
vercel --prod
```

### Method 3: GitHub + Vercel Auto-Deploy

1. Push to GitHub ✓ (done above)
2. Connect repository to Vercel
3. Every push to main auto-deploys

---

## Common Git Commands Going Forward

```bash
# Check what changed
git status

# View changes before committing
git diff

# Make a new commit after changes
git add .
git commit -m "Your message here"
git push origin main

# View commit history
git log --oneline -10

# Create feature branch
git checkout -b feature/new-feature
git push origin feature/new-feature

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## Troubleshooting

### Git not found
```bash
# Install Git from: https://git-scm.com/download/win
# Add to PATH
# Restart terminal
```

### Push rejected
```bash
# Pull latest changes
git pull origin main

# If conflicts, resolve them
# Then commit and push
git add .
git commit -m "Merge changes"
git push origin main
```

### Wrong email in commits
```bash
# Fix for this repository only
git config user.email "vimarsh@coherent.ai"

# Fix globally
git config --global user.email "vimarsh@coherent.ai"
```

### Delete commit from GitHub
```bash
# Revert commit (creates new commit)
git revert HEAD

# Push revert
git push origin main
```

---

## Success Indicators

✅ GitHub shows all files
✅ File count matches local
✅ Commit message visible
✅ Recent activity shows your commit
✅ Vercel can import repository
✅ Dashboard deploys to Vercel

---

## Next: Vercel Deployment

After pushing to GitHub:

```bash
# Option 1: Use GitHub integration
# 1. Go to https://vercel.com/new
# 2. Import GitHub repository
# 3. Click Deploy

# Option 2: Use Vercel CLI
vercel --prod
```

---

**You're all set for GitHub and Vercel!** 🚀

