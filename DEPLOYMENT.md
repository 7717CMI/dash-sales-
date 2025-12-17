# 🚀 Deployment Guide

Complete guide to deploy the Sales Projection Dashboard to various platforms.

---

## 📋 Table of Contents
1. [Vercel (Recommended)](#vercel)
2. [Docker](#docker)
3. [Traditional Node.js Server](#nodejs)
4. [AWS](#aws)
5. [Heroku](#heroku)
6. [Self-Hosted](#self-hosted)

---

## <a name="vercel"></a> 1. Vercel Deployment (Recommended)

### Why Vercel?
- Zero-config deployment
- Automatic HTTPS
- Edge caching
- Free tier available
- Seamless Next.js integration

### Steps

#### Step 1: Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub/GitLab/Bitbucket

#### Step 2: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 3: Deploy
```bash
vercel
```

#### Step 4: Follow Prompts
- Confirm project directory
- Link to existing project (if applicable)
- Select production environment

#### Step 5: Get URL
- Vercel provides a live URL
- Example: `https://dashboard-rituva.vercel.app`

### Auto-Deploy from Git
1. Connect GitHub repository
2. Every push to `main` auto-deploys
3. Preview URLs for pull requests

### Environment Variables (if needed)
```bash
vercel env add NEXT_PUBLIC_API_URL
```

---

## <a name="docker"></a> 2. Docker Deployment

### Prerequisites
- Docker installed ([download](https://www.docker.com/products/docker-desktop))
- Docker Hub account (optional)

### Build & Run Locally

#### Build Image
```bash
docker build -t sales-dashboard:latest .
```

#### Run Container
```bash
docker run -p 3000:3000 sales-dashboard:latest
```

#### Access Dashboard
Open `http://localhost:3000`

### Using Docker Compose

#### Start All Services
```bash
docker-compose up -d
```

#### Stop Services
```bash
docker-compose down
```

#### View Logs
```bash
docker-compose logs -f
```

### Push to Docker Hub

#### Tag Image
```bash
docker tag sales-dashboard:latest username/sales-dashboard:latest
```

#### Login to Hub
```bash
docker login
```

#### Push Image
```bash
docker push username/sales-dashboard:latest
```

#### Pull and Run
```bash
docker run -p 3000:3000 username/sales-dashboard:latest
```

### Deploy to Docker-Compatible Services
- **AWS ECS**: Docker container registry
- **Azure Container Instances**: Direct container deployment
- **Google Cloud Run**: Serverless containers
- **DigitalOcean App Platform**: Simple Docker deployment
- **Railway**: One-click Docker deployment

---

## <a name="nodejs"></a> 3. Traditional Node.js Server

### Prerequisites
- Node.js 18+ installed
- Linux/Windows/Mac server with SSH access

### Deployment Steps

#### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/sales-dashboard.git
cd sales-dashboard
```

#### Step 2: Install Dependencies
```bash
npm install --production
```

#### Step 3: Build Application
```bash
npm run build
```

#### Step 4: Start Server
```bash
npm start
```

Server runs on `http://localhost:3000`

### Production Setup with PM2

#### Install PM2
```bash
npm install -g pm2
```

#### Create Ecosystem Config
Save as `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: "sales-dashboard",
    script: "./node_modules/.bin/next",
    args: "start",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    error_file: "./logs/err.log",
    out_file: "./logs/out.log"
  }]
};
```

#### Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Manage Application
```bash
pm2 status          # Check status
pm2 logs            # View logs
pm2 restart all     # Restart all
pm2 stop all        # Stop all
pm2 delete all      # Remove all
```

### Reverse Proxy with Nginx

#### Install Nginx
```bash
# Ubuntu/Debian
sudo apt-get install nginx

# CentOS
sudo yum install nginx
```

#### Configure Nginx
Edit `/etc/nginx/sites-available/dashboard`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### HTTPS with Let's Encrypt

#### Install Certbot
```bash
sudo apt-get install certbot python3-certbot-nginx
```

#### Generate Certificate
```bash
sudo certbot --nginx -d yourdomain.com
```

#### Auto-Renewal
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## <a name="aws"></a> 4. AWS Deployment

### Option A: AWS EC2

#### Launch Instance
1. Go to AWS Console → EC2
2. Click "Launch Instance"
3. Choose Ubuntu 22.04 LTS
4. Select t3.micro (free tier eligible)
5. Configure security group (allow HTTP/HTTPS)

#### Connect & Deploy
```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone & build
git clone your-repo-url
cd sales-dashboard
npm install --production
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "dashboard" -- start
pm2 startup
pm2 save
```

### Option B: AWS App Runner

#### Push to ECR
```bash
aws ecr get-login-password | docker login --username AWS --password-stdin YOUR_ECR_URI
docker tag sales-dashboard YOUR_ECR_URI/sales-dashboard:latest
docker push YOUR_ECR_URI/sales-dashboard:latest
```

#### Create App Runner Service
1. Go to AWS Console → App Runner
2. Choose "Container registry"
3. Select ECR image
4. Configure service
5. Deploy

---

## <a name="heroku"></a> 5. Heroku Deployment

### Prerequisites
- Heroku account
- Heroku CLI installed

### Deploy

#### Login
```bash
heroku login
```

#### Create App
```bash
heroku create sales-dashboard-rituva
```

#### Deploy
```bash
git push heroku main
```

#### View Logs
```bash
heroku logs --tail
```

#### Open App
```bash
heroku open
```

---

## <a name="self-hosted"></a> 6. Self-Hosted VPS

### Popular VPS Providers
- DigitalOcean ($5-6/month)
- Linode ($5/month)
- Vultr ($5/month)
- Hetzner (€2.49/month)

### Basic Setup (DigitalOcean Example)

#### Step 1: Create Droplet
- Choose Ubuntu 22.04 LTS
- Select $5/month plan
- Enable IPv6

#### Step 2: SSH In
```bash
ssh root@your.droplet.ip
```

#### Step 3: System Setup
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install Nginx
apt install -y nginx

# Install PM2
npm install -g pm2

# Install Git
apt install -y git
```

#### Step 4: Deploy App
```bash
# Clone repository
cd /var/www
git clone your-repo
cd sales-dashboard

# Build
npm install --production
npm run build

# Start with PM2
pm2 start npm --name "dashboard" -- start
pm2 startup
pm2 save
```

#### Step 5: Configure Nginx
(See Nginx section above)

#### Step 6: Enable HTTPS
(See Let's Encrypt section above)

---

## 📊 Comparison Table

| Platform | Cost | Setup Time | Maintenance | Best For |
|----------|------|-----------|-------------|----------|
| **Vercel** | Free-$20/mo | 2 min | None | Quick deployment |
| **Docker + Heroku** | Free-$7/mo | 5 min | Low | Learning |
| **DigitalOcean** | $5-50/mo | 10 min | Medium | Production |
| **AWS** | Pay-as-you-go | 15 min | High | Scale & reliability |
| **Self-hosted VPS** | $5-20/mo | 20 min | High | Full control |

---

## 🔍 Performance Tips

### Before Deployment
1. **Build optimization**
   ```bash
   npm run build
   ```

2. **Bundle analysis**
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

3. **Environment variables** - Set production values
4. **CORS headers** - Configure if needed

### After Deployment
1. Enable CDN caching
2. Set up monitoring (Sentry, LogRocket)
3. Enable compression (gzip)
4. Use image optimization

---

## ✅ Deployment Checklist

- [ ] Code committed to Git
- [ ] Dependencies listed in package.json
- [ ] Environment variables configured
- [ ] Build passes without errors
- [ ] Tests pass (if applicable)
- [ ] ESLint passes
- [ ] Domain configured (if custom domain)
- [ ] HTTPS enabled
- [ ] Monitoring/logging set up
- [ ] Database configured (if needed)

---

## 🆘 Troubleshooting

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Linux/Mac
lsof -i :3000
kill -9 PID

# Windows
netstat -ano | findstr :3000
taskkill /PID PID /F
```

### Out of Memory
- Increase server RAM
- Use `--max_old_space_size=4096` before npm command

### CORS Issues
Add to `next.config.ts`:
```typescript
headers: async () => [{
  source: '/api/:path*',
  headers: [
    { key: 'Access-Control-Allow-Origin', value: '*' }
  ]
}]
```

---

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com)
- [Nginx Docs](https://nginx.org/en/docs)

---

## 🎯 Quick Reference

**Fastest Deployment**: Vercel (2 minutes)
**Best Free Option**: Vercel Free Tier
**Most Control**: Self-hosted VPS
**Best for Learning**: Docker + Heroku
**Enterprise**: AWS

Choose based on your needs and comfort level! 🚀

